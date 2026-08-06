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
│   │   ├── layout/                # Header, Footer, SkipToContent, FilmGrain, ScrollChevron, MobileNav
│   │   │   ├── Header.tsx         # Sticky nav con NAV_LINKS [001]; lista oculta < md [010]
│   │   │   ├── Footer.tsx         # Copyright + tagline [001]
│   │   │   ├── SkipToContent.tsx  # A11y skip link [001]
│   │   │   ├── FilmGrain.tsx      # Overlay SVG inline [001]
│   │   │   ├── ScrollChevron.tsx  # Bounce animation, links to #about [002]
│   │   │   └── MobileNav.tsx      # 'use client' hamburger drawer < md [010-mobile-nav]
│   │   ├── sections/              # Secciones del portfolio
│   │   │   ├── HeroSection.tsx    # Hero full-viewport [002-hero-section]
│   │   │   ├── AboutSection.tsx   # About: bio + photo placeholder [003-about-section]
│   │   │   ├── AboutInView.tsx    # 'use client' whileInView wrapper [003]
│   │   │   ├── SkillsSection.tsx  # Skills: grid responsive 6 categorias [004-skills-section]
│   │   │   ├── SkillsHeadingInView.tsx # 'use client' whileInView wrapper para heading [004]
│   │   │   ├── ExperienceSection.tsx    # Experience: timeline vertical 4 empresas [005-experience-section]
│   │   │   └── ExperienceHeadingInView.tsx # 'use client' whileInView wrapper para heading [005]
│   │   ├── contact/               # ContactForm, SocialLinks (TODO M3/M4)
│   │   └── ui/                    # Componentes base reutilizables
│   │       ├── HeroAnimations.tsx # Framer Motion entrance wrapper [002]
│   │       ├── PhotoPlaceholder.tsx # Vesica Piscis photo placeholder [003]
│   │       ├── SkillCard.tsx      # 'use client' card con icono + whileInView stagger [004]
│   │       ├── TimelineItem.tsx   # 'use client' timeline item + whileInView stagger [005]
│   │       └── geometry/          # SVG geometry Server Components
│   │           ├── GeometricDots.tsx    # Dot grid 600 divs [002]
│   │           ├── FibonacciSpiral.tsx  # Sacred geometry spiral [002]
│   │           ├── SpiralPetals.tsx     # 8-petal spiral, slow-rotate 200s [003]
│   │           └── GridOverlay.tsx      # SVG pattern grid overlay [003]
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
│   │   ├── about.ts               # ABOUT_DATA constant [003-about-section]
│   │   ├── skills.ts              # SKILLS_DATA constant, 6 categorias [004-skills-section]
│   │   ├── experience.ts          # EXPERIENCE_DATA constant, 4 items [005-experience-section]
│   │   ├── projects.ts            # Datos de proyectos (TODO M3)
│   │   └── social.ts              # Links de redes sociales (TODO M3)
│   │
│   ├── types/                     # Tipos TypeScript compartidos
│   │   └── index.ts               # NavLink, SiteConfig, HeroData, AboutData, SkillCategory, ExperienceItem... [001-005]
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
