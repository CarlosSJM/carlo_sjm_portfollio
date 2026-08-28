# Configuracion de Vercel

## Estado actual

Proyecto desplegado en Vercel via **importacion del repo de GitHub** desde el Dashboard (no via `vercel link`/CLI — no hay `vercel.json` ni carpeta `.vercel/` en el repo, igual que en COLMENAPP). Cada push a una rama genera preview deploy automatico; cada push/merge a `main` genera deploy de produccion automatico.

**Deployment Protection**: desactivado (sitio publico, sin login) pero con **Protected Source Maps activado** — ver [`docs/privacy/deployment-protection.md`](../privacy/deployment-protection.md) para el detalle completo de por que y como.

## Setup inicial (si se necesita re-crear el proyecto)

1. Dashboard de Vercel → **Add New → Project** → importar `CarlosSJM/carlo_sjm_portfollio` desde GitHub
2. Framework Preset: Next.js (auto-detectado), Root Directory `.`
3. Configurar env vars en Dashboard (cuando exista el contact form, ver mas abajo):
   - `RESEND_API_KEY` — API key de Resend
   - `CONTACT_EMAIL` — alias de email (addy.io)
4. **Settings → Deployment Protection**: desactivar "Vercel Authentication" (scope Standard/All) para que la produccion sea publica, y activar **"Protected Source Maps"** aparte

Alternativa via CLI (no usada en este proyecto, mencionada por si se necesita en el futuro): `npm i -g vercel && vercel link`

## Framework detection

Vercel detecta Next.js automaticamente. No se necesita configuracion adicional de build.

## Environment Variables

| Variable | Entorno | Descripcion |
|---|---|---|
| `RESEND_API_KEY` | Production, Preview | API key de Resend para enviar emails |
| `CONTACT_EMAIL` | Production, Preview | Email destino (alias de addy.io) |

Configurar en: Vercel Dashboard > Project > Settings > Environment Variables

## Headers de seguridad

Configurados en `next.config.ts`, aplicados automaticamente por Vercel:
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

## Dominio

- Por defecto: `proyecto.vercel.app`
- Custom domain: configurar en Vercel Dashboard > Project > Settings > Domains
- SSL automatico con Let's Encrypt

## Observabilidad

- Vercel Analytics: pageviews sin cookies (privacy-friendly)
- Speed Insights: Core Web Vitals reales de usuarios
- Runtime Logs: logs de funciones serverless en Dashboard
