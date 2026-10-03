# Instrucciones para Copilot / agentes IA — Secure Web Platform

Respondé siempre en español argentino (es-AR), con voseo y tono técnico claro.
Identificadores de código en inglés, mensajes y contenido en español.

## Proyecto
Frontend Next.js 16.3.1 + React 19 + Tailwind CSS 4 + TypeScript, desplegado en
Cloudflare Workers vía OpenNext (`@opennextjs/cloudflare`). Worker `frontend`.

## Estructura
- `frontend/app/`: App Router (`page.tsx`, `dashboard/`, `analysis/`). No usar `pages/`.
- `frontend/components/`, `frontend/public/`, `next.config.ts`,
  `open-next.config.ts`, `wrangler.jsonc`.
- `backend/`, `database/`, `assets/` (fuera de `frontend/`: no modificar sin pedido).

## Comandos (correr desde `frontend/`)
- Dev: `npm run dev` | Build: `npm run build` | Lint: `npm run lint`
- Preview Cloudflare: `npm run preview` | Deploy: `npm run deploy`
- Tipos Cloudflare: `npm run cf-typegen` (obligatorio tras tocar `wrangler.jsonc`)

## Cloudflare (`frontend/wrangler.jsonc`)
Worker `frontend`, entry `.open-next/worker.js`, assets `.open-next/assets`.
Bindings: `ASSETS`, `IMAGES`, `WORKER_SELF_REFERENCE`, R2
`NEXT_INC_CACHE_R2_BUCKET` (`frontend-opennext-cache`). Observability activada.

## Reglas (respetar siempre)
- TypeScript strict, Server Components por defecto (`"use client"` solo si hace falta).
- Tailwind CSS 4, `next/image` para imágenes (binding `IMAGES`).
- Respetá los security headers de `next.config.ts`; no los relajes sin justificación.
- No toques generados: `.open-next/`, `.next/`, `.wrangler/`, `cloudflare-env.d.ts`.
- No toques `open-next.config.ts` ni archivos fuera de `frontend/` sin justificación.
- No instales dependencias (npm) sin aprobación explícita.
- No hagas `deploy` sin `lint` + `build` en verde.
