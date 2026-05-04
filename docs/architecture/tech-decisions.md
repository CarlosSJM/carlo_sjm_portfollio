# Decisiones Tecnicas

## Framework: Next.js 16 (App Router, Turbopack)

**Por que Next.js y no React SPA:**
- SSG nativo: paginas pre-renderizadas como HTML estatico, servidas desde CDN edge
- SEO superior: HTML completo disponible para Googlebot sin JS rendering
- Route Handlers: API serverless incluidas (`app/api/`) para el formulario de contacto
- `generateMetadata`: meta tags y OG por pagina de forma nativa
- `sitemap.ts` / `robots.ts`: generacion automatica sin libs externas
- Optimizado para Vercel: zero-config deploy, edge caching, image optimization

## Lenguaje: TypeScript

- Type safety en todo el proyecto
- Mejor DX con autocompletado y deteccion de errores
- Estandar de la industria para proyectos profesionales

## Styling: Tailwind CSS

- Purge automatico: solo se incluye el CSS usado (bundle minimo)
- No runtime CSS-in-JS: zero impacto en INP/LCP
- Utility-first: rapido para prototipar y mantener
- Soporte nativo en Next.js

### Design tokens (Tailwind v4 `@theme inline`)

Definidos en `src/app/globals.css`:

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#000` | Body, secciones primarias |
| `--color-foreground` | `#fff` | Texto principal |
| `--color-muted` | `#a0a0a0` | Texto secundario |
| `--color-surface-1/2/3` | `#0a0a0a / #0d0d0d / #1a1a1a` | Backgrounds alternados de seccion |
| `--color-border-subtle/medium/strong` | `rgb(255 255 255 / 0.1/0.2/0.3)` | Bordes |
| `--font-display` | Space Grotesk (700) | Headings |
| `--font-mono` | JetBrains Mono (300/400/500) | Eyebrows, dates, code |
| `--font-body` | Inter (300/400/500/600) | Bio, descripciones |

## Fonts: next/font/google

- Self-hosted en build time → cero requests a `fonts.googleapis.com`
- `display: swap` → cero CLS
- Aplicadas via CSS variables en `<html>` y mapeadas en `@theme`
- Variables inyectadas: `--font-display`, `--font-mono`, `--font-body`

## Emails: Resend API

- Free tier: 100 emails/dia, 3000/mes (sobra para portfolio)
- API moderna y simple
- Soporte para dominios custom (el email del remitente puede ser noreply@tudominio.com)
- El email real del destinatario solo existe en env vars del servidor

## Deploy: Vercel

- Deploy automatico desde git push
- CDN global con edge caching
- Serverless functions para API de contacto
- Analytics y Speed Insights incluidos
- SSL automatico

## Animaciones: motion (Framer Motion v11+)

Instalado en M3 feature `002-hero-section`.

- Nombre del paquete: `motion` (renombrado de `framer-motion` en v11)
- Uso exclusivo en Client Components (`'use client'`) — `HeroAnimations` y `ScrollChevron`
- `useReducedMotion()` hook para respetar `prefers-reduced-motion`
- No se usa en Server Components ni en la capa de datos

## Iconos: lucide-react

Instalado en M3 feature `002-hero-section`.

- Tree-shakeable: importar solo los iconos usados (`MapPin`, `ChevronDown`)
- Nunca usar barrel imports (`import * from "lucide-react"`)
- Todos los iconos decorativos llevan `aria-hidden="true"`

## Dependencias actuales

```json
{
  "dependencies": {
    "next": "16.2.2",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "motion": "^11.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9",
    "eslint-config-next": "16.2.2",
    "jsdom": "^29.1.1",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.5"
  }
}
```

## Testing: Vitest + Playwright

**Por que Vitest y no Jest:**
- Soporte nativo de ESM y TypeScript (sin transforms extra)
- Reutiliza Vite module graph: watch mode instantaneo
- Misma API que Jest (describe, it, expect) — zero curva de aprendizaje
- Compatible con Next.js 16 sin configuracion adicional

**Por que Playwright y no Cypress:**
- Multi-browser (Chromium, Firefox, WebKit)
- Mas rapido en headless
- Soporte oficial desde la documentacion de Next.js
- Ligero en CI/CD

**Cobertura de tests:**
- Vitest: metadata SEO, JSON-LD schemas, validacion contact form, datos de src/data/
- Playwright: renderizado de paginas, navegacion, accesibilidad, formulario e2e

## Configuracion adicional

- **TypeScript strict**: `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`
- **ESLint**: reglas de Constitution IV — `no-explicit-any: error`, `consistent-type-assertions`, `no-non-null-assertion`
- **Security headers** (`next.config.ts`):
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

## Pendientes de instalar

- `resend` — cuando se implemente el formulario de contacto (M4)

Principio: dependencias minimas. No instalar nada que Next.js ya provea.
