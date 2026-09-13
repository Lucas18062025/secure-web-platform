# Database — alcance

Persistencia objetivo: **PostgreSQL** (`DATABASE_URL` en `/.env.example`).

Estado: sin esquema todavía. El API sirve datos demo estáticos
(`backend/main.py`). Antes de modelar tablas, definir:

1. `findings` (id, severity, technical, business_impact, remediation, status)
2. `scans` (target_url, score, grade, created_at)
3. `targets` (url, owner, consentimiento firmado — PyMEs solo con autorización)

Alternativa edge: Cloudflare D1 si el deploy exige Workers puros.
