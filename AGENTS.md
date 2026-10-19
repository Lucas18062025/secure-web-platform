# AGENTS.md — Secure Web Platform (raíz)

## Proyecto
Plataforma de ingeniería de seguridad: identificar, priorizar y remediar riesgos
de apps web. Frontend Next.js en Cloudflare + API FastAPI coordinadora +
worker de escaneo aislado + PostgreSQL (Supabase). Estado: persistencia +
auth + scans `passive-python` E2E funcionales; ZAP Baseline y login frontend
pendientes (ver `README.md`, `backend/README.md`, `database/README.md`).

## Estructura
- `frontend/`: Next.js 16.3.1 + React 19 + Tailwind 4 + TS, deploy Cloudflare
  vía OpenNext. Tiene su propio `frontend/AGENTS.md` (manda dentro de `frontend/`).
  Dashboard hoy con datos de ejemplo, sin login.
- `backend/`: FastAPI + worker `worker.py` (nunca en request). API real:
  `/api/projects`, `/api/targets`, `/api/scans`, `/api/scans/{id}/findings`.
  `/api/score` es legacy demo (deprecated, no usar para decisiones).
- `database/`: PostgreSQL en Supabase + Alembic (`backend/alembic/`):
  `accounts`, `users` (+ `auth_id`), `projects`, `targets`, `scans`, `findings`.
- `assets/`: banner y recursos.

## Arquitectura decidida (oct-2026)
- Frontend en Cloudflare; FastAPI como coordinador; el escaneo corre en un
  worker/cola aislado, nunca dentro de una request web. ZAP no corre en Workers:
  va en contenedor aislado aparte.
- MVP sin microservicios: FastAPI + PostgreSQL + un worker/cola pequeño + ZAP
  en contenedor aislado.

## Orden de construcción (seguridad antes que escaneos reales)
1. **Persistencia:** PostgreSQL + Alembic. Tablas: `accounts`, `users`,
   `projects`, `targets`, `scans`, `findings`. Todo pertenece a una cuenta;
   scans/findings asociados al target, con estado, fechas, perfil y origen.
2. **AuthN/AuthZ:** proveedor de identidad administrado, tokens validados en
   FastAPI. Permisos sobre proyecto/target verificados en cada operación
   server-side; ocultar botones en el frontend no alcanza.
3. **Ejecución:** `POST /api/scans` valida el target y crea scan `queued`;
   el worker ejecuta **OWASP ZAP Baseline** (perfil pasivo) y guarda hallazgos
   normalizados. Frontend consulta `GET /api/scans/{id}` y
   `GET /api/scans/{id}/findings`. Estados: `queued → running → done | failed`.
4. **Anti-abuso:** consentimiento explícito sobre el dominio, restricción al
   host aprobado, bloqueo de IP privada/loopback/metadata cloud y de
   redirecciones fuera de alcance. Activos/destructivos deshabilitados hasta
   tener límites, aislamiento y consentimiento.

## Comandos
- Frontend (desde `frontend/`): `npm run dev` | `npm run lint` | `npm run build` |
  `npm run preview` | `npm run deploy` | `npm run cf-typegen` (tras tocar `wrangler.jsonc`)
- Backend (desde `backend/`, con `venv` existente, sin instalar nada nuevo):
  `.\venv\Scripts\python.exe -m alembic upgrade head` |
  `.\venv\Scripts\python.exe -m uvicorn main:app --port 8000` (docs en `/docs`) |
  worker en 2da terminal: `.\venv\Scripts\python.exe worker.py`

## Reglas
- Orden: este AGENTS.md > `frontend/AGENTS.md` > código.
- No instalar dependencias (npm/pip) sin aprobación explícita.
- No tocar generados (`frontend/.open-next/`, `.next/`, `.wrangler/`).
- No hacer `deploy` del frontend sin `lint` + `build` en verde.
- CORS del backend hoy solo permite `localhost:3000`: ampliar solo con la URL
  pública justificada.
- Secretos solo vía variables de entorno / secretos Cloudflare, nunca en código.

## Al terminar cualquier tarea
- Frontend: `npm run lint` + `npm run build`.
- Backend: `uvicorn` levanta y `/api/health` responde.
- Explicar los cambios importantes realizados.

### Cierre: sincronización local → GitHub → Cloudflare

Este repo **no tiene CI/CD**: `.github/` solo contiene `copilot-instructions.md`,
así que un push no deploya nada. La sincronización no la garantiza GitHub, la
garantiza este ritual. Se corre siempre, salvo negación explícita del usuario.

```powershell
# Desde la raíz del repo

# 1. Local limpio
git status --porcelain

# 2. Local == GitHub
git rev-parse HEAD
git ls-remote origin refs/heads/main

# 3. Versión live (desde frontend/; la última entrada tiene el 100% del tráfico)
cd frontend
npx --yes wrangler@4.136.3 deployments list

# 4. El artefacto desplegado es el del commit (sigo en frontend/)
Get-Content .next\BUILD_ID
# https://frontend.lucaslean1806.workers.dev/_next/static/<BUILD_ID>/_buildManifest.js -> 200
```

La versión que reporta `npm run deploy` (`Current Version ID`) tiene que ser la
misma que figura al 100 % en `deployments list`.

- Deploy solo con `npm run deploy` (OpenNext), nunca `wrangler deploy` suelto.
- Cambio que no toca el artefacto (este `AGENTS.md`, docs, `specs/`): push sin
  deploy, y se dice en la respuesta final.
- Si el deploy falla o la versión no queda al 100 %, la tarea no está terminada.
- Partes client-side (modal, menú): verificar con navegador real (CDP), no con
  `grep` sobre el HTML inicial, porque no están en el primer render.
