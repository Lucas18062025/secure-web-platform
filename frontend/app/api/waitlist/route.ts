import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL = 254;
const MAX_BODY_BYTES = 16 * 1024;

// Rate-limit: KV (persiste entre isolates) con fallback en memoria.
// Sin binding (dev local) usa el Map. 5 req / 10 min por IP.
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_WINDOW_S = 10 * 60;
const hits = new Map<string, number[]>();

function rateLimitedMemory(ip: string): boolean {
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    if (arr.length >= RATE_MAX) {
        hits.set(ip, arr);
        return true;
    }
    arr.push(now);
    hits.set(ip, arr);
    return false;
}

type KvLike = {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
};

async function rateLimited(kv: KvLike | null, ip: string): Promise<boolean> {
    if (!kv) return rateLimitedMemory(ip);
    try {
        const key = `rl:${ip}`;
        const raw = await kv.get(key);
        const now = Date.now();
        const arr: number[] = raw
            ? (JSON.parse(raw) as number[]).filter((t) => now - t < RATE_WINDOW_MS)
            : [];
        if (arr.length >= RATE_MAX) return true;
        arr.push(now);
        await kv.put(key, JSON.stringify(arr), { expirationTtl: RATE_WINDOW_S });
        return false;
    } catch {
        return rateLimitedMemory(ip);
    }
}

function sanitizeEmail(v: unknown): string {
    let t = typeof v === "string" ? v.trim() : "";
    t = t.replace(/[\u0000-\u001F\u007F]/g, "");
    return t.slice(0, MAX_EMAIL);
}

const SEC_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function POST(request: NextRequest) {
    try {
        const ip =
            request.headers.get("cf-connecting-ip") ||
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";
        // KV desde el contexto Cloudflare (undefined en dev local → memoria).
        let kv: KvLike | null = null;
        try {
            const ctx = await getCloudflareContext({ async: true });
            kv = (ctx.env.WAITLIST_RATE_KV as KvLike | undefined) ?? null;
        } catch {
            kv = null;
        }
        if (await rateLimited(kv, ip)) {
            return NextResponse.json(
                { error: "Demasiadas solicitudes, intentá en unos minutos" },
                { status: 429, headers: { ...SEC_HEADERS, "Retry-After": "600" } }
            );
        }
        const raw = await request.text();
        if (raw.length > MAX_BODY_BYTES) {
            return NextResponse.json(
                { error: "Payload demasiado grande" },
                { status: 413, headers: SEC_HEADERS }
            );
        }
        let parsed: { email?: unknown };
        try {
            parsed = JSON.parse(raw);
        } catch {
            return NextResponse.json(
                { error: "JSON inválido" },
                { status: 400, headers: SEC_HEADERS }
            );
        }
        const email = sanitizeEmail(parsed.email);

        if (!email || !EMAIL_RE.test(email)) {
            return NextResponse.json(
                { error: "Email inválido" },
                { status: 400, headers: SEC_HEADERS }
            );
        }

        // Acceso correcto a secrets de Cloudflare Workers con OpenNext
        const { env } = await getCloudflareContext({ async: true });
        const token = (env as unknown as Record<string, string>).TELEGRAM_BOT_TOKEN;
        const chatId = (env as unknown as Record<string, string>).TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Faltan variables de entorno de Telegram");
            return NextResponse.json(
                { error: "Configuración del servidor incompleta" },
                { status: 500, headers: SEC_HEADERS }
            );
        }

        const now = new Date().toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
            dateStyle: "short",
            timeStyle: "short",
        });

        // Texto plano, sin parse_mode: evita inyección Markdown/HTML vía email.
        const message = `Secure Web Platform\nNueva inscripción en lista de espera\nEmail: ${email}\nFecha: ${now}`;

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Error de Telegram API:", err);
            return NextResponse.json(
                { error: "No se pudo enviar la notificación" },
                { status: 500, headers: SEC_HEADERS }
            );
        }

        return NextResponse.json({ success: true }, { headers: SEC_HEADERS });
    } catch (error) {
        console.error("Error en /api/waitlist:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500, headers: SEC_HEADERS }
        );
    }
}
