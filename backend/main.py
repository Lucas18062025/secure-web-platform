"""Secure Web Platform — API mínima de scoring (FastAPI).

Endpoints:
    GET /api/health  -> estado del servicio
    GET /api/score   -> security score + findings demo con
                        contexto técnico y de negocio

Ejecución local:
    pip install -r requirements.txt
    uvicorn main:app --port 8000
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Secure Web Platform API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

_DEMO_FINDINGS = [
    {
        "id": "XSS-01",
        "title": "Salida sin escapar en campo de búsqueda",
        "severity": "high",
        "technical": "El valor del query se refleja en el DOM sin sanitizar.",
        "business_impact": "Robo de sesión de clientes y daño reputacional.",
        "remediation": "Escapar output y aplicar Content-Security-Policy.",
    },
    {
        "id": "HDR-02",
        "title": "Faltan headers de seguridad",
        "severity": "medium",
        "technical": "Sin X-Content-Type-Options ni Referrer-Policy.",
        "business_impact": "Aumenta la superficie ante clickjacking y MIME-sniffing.",
        "remediation": "Emitir headers desde el edge (ver frontend/public/_headers).",
    },
]

_SEVERITY_WEIGHT = {"critical": 25, "high": 15, "medium": 7, "low": 2}


@app.get("/api/health")
def health() -> dict:
    """Estado del servicio."""
    return {"status": "ok", "service": "secure-web-api", "version": "0.1.0"}


@app.get("/api/score")
def score() -> dict:
    """Score demo + findings con contexto técnico y de negocio."""
    penalty = sum(_SEVERITY_WEIGHT.get(f["severity"], 0) for f in _DEMO_FINDINGS)
    return {
        "score": max(0, 100 - penalty),
        "grade": "B" if penalty < 30 else "C",
        "findings": _DEMO_FINDINGS,
        "source": "demo-estatica-v0.1",
    }
