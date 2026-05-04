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
│   │   ├── api/contact/route.ts   # Serverless: envio de emails via Resend (TODO M4)
│   │   ├── sitemap.ts             # Generacion automatica de sitemap [001]
│   │   ├── robots.ts              # Configuracion de robots.txt [001]
│   │   └── not-found.tsx          # Pagina 404 personalizada
│   │
│   ├── components/
│   │   ├── layout/                # Header, Footer, SkipToContent, FilmGrain, ScrollChevron
│   │   │   ├── Header.tsx         # Sticky nav con NAV_LINKS [001]
│   │   │   ├── Footer.tsx         # Copyright + tagline [001]
│   │   │   ├── SkipToContent.tsx  # A11y skip link [001]
│   │   │   ├── FilmGrain.tsx      # Overlay SVG inline [001]
│   │   │   └── ScrollChevron.tsx  # Bounce animation, links to #about [002]
│   │   ├── sections/              # Secciones del portfolio
│   │   │   └── HeroSection.tsx    # Hero full-viewport [002-hero-section]
│   │   ├── contact/               # ContactForm, SocialLinks (TODO M3/M4)
│   │   └── ui/                    # Componentes base reutilizables
│   │       ├── HeroAnimations.tsx # Framer Motion entrance wrapper [002]
│   │       └── geometry/          # SVG geometry Server Components [002]
│   │           ├── GeometricDots.tsx    # Dot grid pattern [002]
│   │           └── FibonacciSpiral.tsx  # Golden ratio spiral [002]
│   │
│   ├── lib/                       # Logica compartida
│   │   ├── site.ts                # Constante SITE [001]
│   │   ├── metadata.ts            # buildMetadata() helper [001]
│   │   ├── schema.ts              # buildPersonSchema, buildWebSiteSchema [001]
│   │   └── resend.ts              # Cliente de Resend para emails (TODO M4)
│   │
│   ├── data/                      # Contenido editable centralizado
│   │   ├── navigation.ts          # NAV_LINKS (anchor nav) [001-layout-header]
│   │   ├── hero.ts                # HERO_DATA constant [002-hero-section]
│   │   ├── projects.ts            # Datos de proyectos (TODO M3)
│   │   ├── skills.ts              # Stack tecnologico (TODO M3)
│   │   └── social.ts              # Links de redes sociales (TODO M3)
│   │
│   ├── types/                     # Tipos TypeScript compartidos
│   │   └── index.ts               # NavLink, SiteConfig, PersonSchemaData [001-layout-header]
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
