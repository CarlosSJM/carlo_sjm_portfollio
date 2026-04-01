# Configuracion de Vercel

## Setup inicial

1. Instalar Vercel CLI: `npm i -g vercel`
2. Linkear proyecto: `vercel link`
3. Configurar env vars en Dashboard:
   - `RESEND_API_KEY` — API key de Resend
   - `CONTACT_EMAIL` — alias de email (addy.io)

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
