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
