# AGENTS.md — Secure Web Platform (raíz)

## Proyecto
Plataforma de ingeniería de seguridad: identificar, priorizar y remediar riesgos
de apps web. Frontend Next.js en Cloudflare + API FastAPI coordinadora +
worker de escaneo aislado + PostgreSQL. Estado: demo funcional, núcleo de
análisis aún no real (ver `README.md`, `backend/README.md`, `database/README.md`).

## Estructura
- `frontend/`: Next.js 16.3.1 + React 19 + Tailwind 4 + TS, deploy Cloudflare
  vía OpenNext. Tiene su propio `frontend/AGENTS.md` (manda dentro de `frontend/`).
- `backend/`: FastAPI (`main.py`), hoy scoring demo (`/api/health`, `/api/score`).
- `database/`: PostgreSQL objetivo, aún sin esquema (ver `database/README.md`).
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
- Backend (desde `backend/`): `pip install -r requirements.txt` |
  `uvicorn main:app --port 8000` (docs en `/docs`)

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
