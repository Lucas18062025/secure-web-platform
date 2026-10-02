import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Email inválido" },
                { status: 400 }
            );
        }

        // @ts-expect-error — Cloudflare env vars are injected at runtime
        const token: string = process.env.TELEGRAM_BOT_TOKEN;
        // @ts-expect-error — Cloudflare env vars are injected at runtime
        const chatId: string = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Faltan variables de entorno de Telegram");
            return NextResponse.json(
                { error: "Configuración del servidor incompleta" },
                { status: 500 }
            );
        }

        const now = new Date().toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
            dateStyle: "short",
            timeStyle: "short",
        });

        const message = `🔐 *Secure Web Platform*\n\n📋 *Nueva inscripción en lista de espera*\n\n📧 Email: \`${email}\`\n🕐 Fecha: ${now}`;

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Error de Telegram API:", err);
            return NextResponse.json(
                { error: "No se pudo enviar la notificación" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error en /api/waitlist:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
