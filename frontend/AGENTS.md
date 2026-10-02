<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Proyecto
Frontend Next.js 16.3.1 + React 19 + Tailwind CSS 4 + TypeScript, desplegado en
Cloudflare Workers vía OpenNext (`@opennextjs/cloudflare`).

## Estructura
- `app/`: App Router (`page.tsx`, `dashboard/`, `analysis/`). No usar `pages/`.
- `components/`, `public/`, `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc`.

## Comandos
- Dev: `npm run dev` | Build: `npm run build` | Lint: `npm run lint`
- Preview Cloudflare: `npm run preview` | Deploy: `npm run deploy`
- Tipos Cloudflare: `npm run cf-typegen` (obligatorio tras tocar `wrangler.jsonc`)

## Cloudflare (wrangler.jsonc)
- Worker `frontend`; entry `.open-next/worker.js`, assets `.open-next/assets`.
- Bindings: `ASSETS`, `IMAGES`, `WORKER_SELF_REFERENCE`, R2 `NEXT_INC_CACHE_R2_BUCKET`
  (`frontend-opennext-cache`). Observability activada.
- No cambies bindings ni el bucket sin actualizar `wrangler.jsonc` + `cf-typegen`.

## Estilo
- TypeScript strict, Server Components por defecto (`"use client"` solo si hace falta).
- Tailwind CSS 4, `next/image` para imágenes (binding `IMAGES`).

## Reglas
- Orden: este AGENTS.md > código. Ante breaking changes de Next 16, lee `node_modules/next/dist/docs/`.
- Respeta security headers de `next.config.ts`; no los relajes sin justificación.
- `allowedDevOrigins` incluye IP local: no la elimines.
- No toques generados: `.open-next/`, `.next/`, `.wrangler/`, `cloudflare-env.d.ts`.
- No toques `open-next.config.ts` sin justificación.
- No instales dependencias (npm) sin aprobación explícita.
- No modifiques archivos fuera de `frontend/`.
- No hagas `deploy` sin `lint` + `build` en verde.

## Al terminar cualquier tarea
- Sin tests: verifica con `npm run lint` + `npm run build`.
- Explica los cambios importantes realizados.
