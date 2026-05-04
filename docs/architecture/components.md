# Mapa de Componentes

## Layout (`src/components/layout/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `Header` | Server | ✅ [001] | Sticky nav con NAV_LINKS, aria-label="Main", logo a `/` |
| `Footer` | Server | ✅ [001] | Copyright dinamico (`new Date().getFullYear()`) + tagline |
| `SkipToContent` | Server | ✅ [001] | Link `#main` con `sr-only`/`focus:not-sr-only` |
| `FilmGrain` | Server | ✅ [001] | Overlay SVG `feTurbulence` inline, `aria-hidden`, mix-blend-overlay |
| `ScrollChevron` | **Client** | ✅ [002] | Bounce animation `y:[0,10,0]`, links to `#about` |
| `MobileNav` | **Client** | TODO [010] | Hamburger drawer para `< md`; open/closed state, focus-trap, Escape key |

## Secciones (`src/components/sections/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `HeroSection` | Server | ✅ [002] | Hero full-viewport, h1, CTAs, location badge, scroll chevron |
| `AboutSection` | Server | ✅ [003] | Bio + foto placeholder, SpiralPetals, GridOverlay backgrounds |
| `AboutInView` | **Client** | ✅ [003] | `whileInView` animation wrapper (opacity fade + optional x slide) |
| `SkillsSection` | Server | TODO M3 | Grid 6 cards de stack tecnologico |
| `ExperienceSection` | Server | TODO M3 | Timeline 4 empresas |
| `ProjectsSection` | Server | TODO M3 | Grid 3 ProjectCards |
| `EducationSection` | Server | TODO M3 | Grid 4 cards |
| `GameOfLifeSection` | Mixed | TODO M3 | Container server + canvas client (next/dynamic) |
| `ContactSection` | Mixed | TODO M3 | Header server + ContactForm client |

## Contacto (`src/components/contact/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `ContactForm` | **Client** | TODO M4 | Formulario con validacion y envio via Resend |
| `SocialLinks` | Server | TODO M3 | Links a redes con SVGs locales |

## UI Base (`src/components/ui/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `HeroAnimations` | **Client** | ✅ [002] | Single `motion.div` entrance wrapper (opacity+y, `useReducedMotion`) |
| `PhotoPlaceholder` | Server | ✅ [003] | Circular clip placeholder con Vesica Piscis SVG frame |
| `SkillCard` | Mixed | TODO M3 | Card con motion wrapper |
| `ProjectCard` | Mixed | TODO M3 | Card de proyecto con motion |
| `TimelineItem` | Mixed | TODO M3 | Item del timeline de experiencia |

## Geometry (`src/components/ui/geometry/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `GeometricDots` | Server | ✅ [002] | CSS grid de 600 divs, pulse animation, seeded-random delays |
| `FibonacciSpiral` | Server | ✅ [002] | Sacred geometry (Seed of Life, Merkaba, dashed rings), `animate-slow-spin` 150s |
| `SpiralPetals` | Server | ✅ [003] | 8 petal spirals + 40 spiral lines, `animate-slow-rotate` 200s |
| `GridOverlay` | Server | ✅ [003] | SVG `<pattern>` grid 60×60, `opacity-10` |

## Lib (`src/lib/`)

| Modulo | Estado | Exports |
|---|---|---|
| `site.ts` | ✅ [001] | `SITE: SiteConfig` |
| `metadata.ts` | ✅ [001] | `buildMetadata(overrides?): Metadata` |
| `schema.ts` | ✅ [001] | `buildPersonSchema()`, `buildWebSiteSchema()` + types |
| `resend.ts` | TODO M4 | Cliente Resend |

## Tipos (`src/types/index.ts`)

`NavLink`, `SiteConfig`, `PersonSchemaData` — [001-layout-header]
`CtaLink`, `HeroData` — [002-hero-section]
`AboutData` — [003-about-section]

## Data (`src/data/`)

| Modulo | Estado | Exports |
|---|---|---|
| `navigation.ts` | ✅ [001] | `NAV_LINKS: NavLink[]` |
| `hero.ts` | ✅ [002] | `HERO_DATA: HeroData` |
| `about.ts` | ✅ [003] | `ABOUT_DATA: AboutData` |
| `projects.ts` | TODO M3 | — |
| `skills.ts` | TODO M3 | — |
| `social.ts` | TODO M3 | — |

## Client boundaries activas

| Componente | Justificacion |
|---|---|
| `ScrollChevron` | `motion.div` animate requiere DOM |
| `HeroAnimations` | `useReducedMotion` + entrance animation requiere DOM |
| `AboutInView` | `whileInView` requiere IntersectionObserver (browser API) |
| `MobileNav` *(pendiente)* | Estado open/closed + `useEffect` para Escape key y body overflow |

## Principio clave

**Server Components por defecto**. Solo se permite `'use client'` cuando se necesita estado, eventos o APIs de browser. Cada uso esta justificado en el codigo con un comentario.

**Leyenda**:
- ✅ [XXX] — implementado en feature branch XXX
- TODO M3/M4 — pendiente en hito siguiente
