"""Fase 3: perfil passive-python. Chequeos 100% pasivos sobre UNA respuesta HTTP.

Cada chequeo devuelve dicts con key estable (para dedup entre scans),
severity, technical, business_impact, remediation y compliance.
"""

from __future__ import annotations

import httpx

_MISSING_HEADERS = {
    "strict-transport-security": {
        "key": "HDR-HSTS",
        "title": "Falta Strict-Transport-Security",
        "severity": "medium",
        "technical": "El servidor no envía HSTS: la primera visita podría degradarse a HTTP.",
        "business_impact": "Riesgo de downgrade y robo de sesión en redes no confiables.",
        "remediation": "Emitir Strict-Transport-Security con max-age largo e includeSubDomains.",
        "compliance": ["OWASP Top 10: A05:2021", "ISO 27001: A.14.1.2"],
    },
    "content-security-policy": {
        "key": "HDR-CSP",
        "title": "Falta Content-Security-Policy",
        "severity": "medium",
        "technical": "Sin CSP el navegador no restringe orígenes de scripts/recursos.",
        "business_impact": "Mayor superficie ante XSS y robo de sesión de clientes.",
        "remediation": "Definir CSP restrictiva (default-src 'self') y endurecer por iteración.",
        "compliance": ["OWASP Top 10: A05:2021", "PCI-DSS: 6.5.7"],
    },
    "x-content-type-options": {
        "key": "HDR-XCTO",
        "title": "Falta X-Content-Type-Options",
        "severity": "low",
        "technical": "Sin nosniff el navegador puede interpretar MIME distinto al declarado.",
        "business_impact": "Superficie ante MIME-sniffing con contenido subido por usuarios.",
        "remediation": "Emitir X-Content-Type-Options: nosniff desde el edge.",
        "compliance": ["OWASP Top 10: A05:2021"],
    },
    "x-frame-options": {
        "key": "HDR-FRAME",
        "title": "Falta X-Frame-Options / frame-ancestors",
        "severity": "low",
        "technical": "Sin frame-ancestors (CSP) ni X-Frame-Options la página puede embeberse.",
        "business_impact": "Riesgo de clickjacking sobre acciones de usuarios.",
        "remediation": "Definir frame-ancestors en CSP (o X-Frame-Options: DENY/SAMEORIGIN).",
        "compliance": ["OWASP Top 10: A05:2021"],
    },
    "referrer-policy": {
        "key": "HDR-REF",
        "title": "Falta Referrer-Policy",
        "severity": "low",
        "technical": "Sin política, el navegador puede filtrar URLs internas a terceros.",
        "business_impact": "Fuga de rutas/parámetros internos vía Referer.",
        "remediation": "Emitir Referrer-Policy: strict-origin-when-cross-origin (o más estricta).",
        "compliance": ["OWASP Top 10: A05:2021"],
    },
}


def run_passive(url: str, response: httpx.Response) -> list[dict]:
    """Chequeos sobre la respuesta ya obtenida. No hace más requests."""
    findings: list[dict] = []
    headers = {k.lower(): v for k, v in response.headers.items()}

    if url.startswith("http://"):
        findings.append(
            {
                "key": "TLS-PLAIN",
                "title": "Sitio servido por HTTP sin TLS",
                "severity": "high",
                "technical": "El tráfico viaja en claro: cualquiera en la red lo lee y modifica.",
                "business_impact": "Exposición de sesiones y datos; navegadores marcan 'no seguro'.",
                "remediation": "Servir todo por HTTPS con certificado válido y redirigir HTTP→HTTPS.",
                "compliance": ["OWASP Top 10: A05:2021", "PCI-DSS: 4.1"],
            }
        )
    else:
        missing = _MISSING_HEADERS.get("strict-transport-security")
        if "strict-transport-security" not in headers and missing:
            findings.append({**missing})

    for name, template in _MISSING_HEADERS.items():
        if name == "strict-transport-security":
            continue
        csp_ok = name == "x-frame-options" and "content-security-policy" in headers and "frame-ancestors" in headers.get("content-security-policy", "")
        if name not in headers and not csp_ok:
            findings.append({**template})

    for cookie in response.headers.get_list("set-cookie"):
        parts = [p.strip().lower() for p in cookie.split(";")]
        if "secure" not in parts:
            findings.append(
                {
                    "key": "COOKIE-SEC",
                    "title": "Cookie sin flag Secure",
                    "severity": "medium",
                    "technical": f"Set-Cookie sin Secure: {parts[0]}.",
                    "business_impact": "La cookie de sesión podría viajar por HTTP y ser robada.",
                    "remediation": "Emitir cookies de sesión con Secure, HttpOnly y SameSite.",
                    "compliance": ["OWASP Top 10: A07:2021"],
                }
            )
            break
    for cookie in response.headers.get_list("set-cookie"):
        parts = [p.strip().lower() for p in cookie.split(";")]
        if "httponly" not in parts:
            findings.append(
                {
                    "key": "COOKIE-HTTPONLY",
                    "title": "Cookie sin flag HttpOnly",
                    "severity": "low",
                    "technical": f"Set-Cookie sin HttpOnly: {parts[0]}.",
                    "business_impact": "Un XSS podría leer la cookie desde JavaScript.",
                    "remediation": "Emitir cookies de sesión con HttpOnly.",
                    "compliance": ["OWASP Top 10: A07:2021"],
                }
            )
            break

    server = headers.get("server", "") + " " + headers.get("x-powered-by", "")
    if server.strip():
        findings.append(
            {
                "key": "INFO-SERVER",
                "title": "Divulgación de tecnología del servidor",
                "severity": "low",
                "technical": f"Cabeceras que revelan stack: {server.strip()[:120]}.",
                "business_impact": "Facilita fingerprinting y búsqueda de exploits conocidos.",
                "remediation": "Minimizar/ocultar Server y X-Powered-By en el edge.",
                "compliance": ["OWASP Top 10: A05:2021"],
            }
        )
    return findings
