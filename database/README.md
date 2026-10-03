# Database — alcance

Persistencia: **PostgreSQL** en Supabase (`DATABASE_URL` en `/.env`;
en deploy se usa variable de entorno, ver `backend/app/db.py`).

Esquema gestionado con **Alembic** (`backend/alembic/`):
`accounts`, `users` (+ `auth_id` de Supabase Auth), `projects`,
`targets`, `scans`, `findings`. Migraciones:

```powershell
# desde backend/
.\venv\Scripts\python.exe -m alembic upgrade head
```

Alternativa edge: Cloudflare D1 si el deploy exige Workers puros.
