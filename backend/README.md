# Backend — Secure Web Platform API (FastAPI)

Scoring API mínima. Hoy sirve findings demo con contexto técnico +
negocio; el scanner real (OWASP ZAP / Trivy) es el siguiente paso.

```powershell
# desde backend/
pip install -r requirements.txt
uvicorn main:app --port 8000
# Docs: http://localhost:8000/docs
# Health: http://localhost:8000/api/health
# Score:  http://localhost:8000/api/score
```

El frontend consume `NEXT_PUBLIC_API` (ver `/.env.example`).

## Worker fase 3 (escaneo pasivo)

Proceso aparte, nunca dentro de una request. Toma scans `queued`,
los ejecuta con el perfil `passive-python` (headers, TLS, cookies,
info disclosure) y guarda findings normalizados.

```powershell
# terminal 1 (desde backend/)
.\venv\Scripts\python.exe -m uvicorn main:app --port 8000
# terminal 2 (desde backend/)
.\venv\Scripts\python.exe worker.py
```

Flujo: `POST /api/targets` (con consentimiento) -> `POST /api/scans`
-> worker `queued -> running -> done|failed` -> `GET /api/scans/{id}`
y `GET /api/scans/{id}/findings`. Todo con Bearer token de Supabase Auth.
