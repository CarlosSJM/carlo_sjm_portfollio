# Estructura de Carpetas

```
carlo_sjm_portfollio/
├── docs/                          # Documentacion del proyecto
│   ├── INDEX.md                   # Indice maestro
│   ├── roadmap.md                 # Hitos M0-M8 hasta produccion
│   ├── architecture/              # Docs de arquitectura
│   ├── seo/                       # Docs de SEO
│   ├── privacy/                   # Docs de privacidad
│   ├── speckit/                   # Uso de spec-kit (SDD)
│   └── deploy/                    # Docs de deploy
│
├── .specify/                      # Spec-kit: constitution, templates, scripts
│   ├── memory/constitution.md     # Principios del proyecto v1.0.0
│   ├── templates/                 # Templates plan/spec/tasks personalizados
│   └── scripts/bash/              # Scripts de automatizacion
│
├── .claude/skills/                # Spec-kit skills (speckit-*)
│
├── public/                        # Assets estaticos (favicon, og-image, robots)
│   ├── icons/                     # SVGs de redes sociales (self-hosted)
│   └── images/                    # Imagenes optimizadas del portfolio
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (metadata global, fonts, analytics)
│   │   ├── page.tsx               # Homepage / Landing
│   │   ├── projects/page.tsx      # Pagina de proyectos
│   │   ├── about/page.tsx         # Sobre mi
│   │   ├── contact/page.tsx       # Formulario de contacto
│   │   ├── api/contact/route.ts   # Serverless: envio de emails via Resend
│   │   ├── sitemap.ts             # Generacion automatica de sitemap
│   │   ├── robots.ts              # Configuracion de robots.txt
│   │   └── not-found.tsx          # Pagina 404 personalizada
│   │
│   ├── components/
│   │   ├── layout/                # Header, Footer, Navigation
│   │   ├── sections/              # Hero, ProjectCard, Skills, etc.
│   │   ├── contact/               # ContactForm, SocialLinks
│   │   └── ui/                    # Componentes base reutilizables
│   │
│   ├── lib/                       # Logica compartida
│   │   ├── metadata.ts            # Helpers para generateMetadata
│   │   ├── schema.ts              # JSON-LD (Person, WebSite, ProfilePage)
│   │   └── resend.ts              # Cliente de Resend para emails
│   │
│   ├── data/                      # Contenido editable centralizado
│   │   ├── projects.ts            # Datos de proyectos
│   │   ├── skills.ts              # Stack tecnologico
│   │   └── social.ts              # Links de redes sociales
│   │
│   ├── types/                     # Tipos TypeScript compartidos
│   │   └── index.ts
│   │
│   └── styles/
│       └── globals.css            # Tailwind base + custom styles
│
├── tests/
│   ├── setup.ts                   # Setup global de Vitest (jest-dom matchers)
│   ├── unit/                      # Tests unitarios (Vitest)
│   ├── integration/               # Tests de integracion (Vitest)
│   └── e2e/                       # Tests end-to-end (Playwright)
│
├── CLAUDE.md                      # Guia de contexto para Claude Code
├── AGENTS.md                      # Aviso de Next.js para agentes IA
├── next.config.ts                 # Config de Next.js (security headers)
├── eslint.config.mjs              # ESLint con reglas de Constitution IV
├── tsconfig.json                  # TypeScript strict + noUncheckedIndexedAccess
├── vitest.config.mts              # Config de Vitest (jsdom, paths, setup)
├── playwright.config.ts           # Config de Playwright (Chromium, baseURL)
├── package.json                   # Dependencias y scripts
└── .env.local                     # Variables de entorno locales (NO commitear)
```

## Principios de organizacion

1. **Colocation**: Cada ruta tiene su propio directorio con page.tsx
2. **Separacion de datos**: `src/data/` centraliza contenido editable sin tocar componentes
3. **Server-first**: Todo es Server Component por defecto. Solo marcar `'use client'` donde sea estrictamente necesario (formulario de contacto)
4. **Assets locales**: Iconos SVG en `public/icons/` — nunca CDNs externos
5. **Tipos compartidos**: `src/types/` para interfaces/types reutilizables; locales se declaran en su modulo
6. **Tests separados**: `tests/{unit,integration,e2e}/` fuera de `src/` para mantener el bundle limpio
