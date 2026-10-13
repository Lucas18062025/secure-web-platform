import { NextRequest, NextResponse } from "next/server";

// Colector de reportes CSP (paridad con Portafolio): el navegador avisa
// cada bloqueo. Sin PII esperable: solo metadatos del bloqueo.
export async function POST(request: NextRequest) {
    try {
        const report = await request.json();
        console.log("[csp-report]", JSON.stringify(report).slice(0, 2000));
    } catch {
        // cuerpo vacío o inválido: igual se responde 204
    }
    return new NextResponse(null, { status: 204 });
}
