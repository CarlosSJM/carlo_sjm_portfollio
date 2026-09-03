# Mapa de Componentes

## Layout (`src/components/layout/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `Header` | Server | ✅ [001, actualizado 010] | Sticky nav con NAV_LINKS, aria-label="Main", logo a `/`; lista `<ul>` oculta `< md` (`hidden md:flex`), delega a `MobileNav` |
| `Footer` | Server | ✅ [001] | Copyright dinamico (`new Date().getFullYear()`) + tagline |
| `SkipToContent` | Server | ✅ [001] | Link `#main` con `sr-only`/`focus:not-sr-only` |
| `FilmGrain` | Server | ✅ [001] | Overlay SVG `feTurbulence` inline, `aria-hidden`, mix-blend-overlay |
| `ScrollChevron` | **Client** | ✅ [002] | Bounce animation `y:[0,10,0]`, links to `#about` |
| `MobileNav` | **Client** | ✅ [010] | Hamburger toggle + drawer `role="dialog"` visible `< md`; focus-trap, Escape key, click-outside, body scroll lock, foco restaurado al cerrar; drawer renderizado con `createPortal` a `document.body` (evita que `backdrop-blur` del `Header` lo reposicione como *containing block*) |

## Secciones (`src/components/sections/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `HeroSection` | Server | ✅ [002] | Hero full-viewport, h1, CTAs, location badge, scroll chevron |
| `AboutSection` | Server | ✅ [003, foto real 011] | Bio + foto de perfil real, SpiralPetals, GridOverlay backgrounds |
| `AboutInView` | **Client** | ✅ [003] | `whileInView` animation wrapper (opacity fade + optional x slide) |
| `SkillsSection` | Server | ✅ [004] | Grid responsive (1/2/3 columnas) de 6 `SkillCard` con eyebrow/heading |
| `SkillsHeadingInView` | **Client** | ✅ [004] | `whileInView` fade wrapper para eyebrow+heading |
| `ExperienceSection` | Server | ✅ [005] | Timeline vertical de 4 `TimelineItem` con eyebrow/heading |
| `ExperienceHeadingInView` | **Client** | ✅ [005] | `whileInView` fade wrapper para eyebrow+heading |
| `ProjectsSection` | Server | TODO M3 | Grid 3 ProjectCards |
| `EducationSection` | Server | TODO M3 | Grid 4 cards |
| `GameOfLifeSection` | Server | ✅ [008] | Eyebrow/heading/descripcion + `CircuitPattern` de fondo + delega el grid a `GameOfLifeGridInView` |
| `GameOfLifeHeadingInView` | **Client** | ✅ [008] | `whileInView` fade wrapper para eyebrow+heading+descripcion |
| `GameOfLifeGridInView` | **Client** | ✅ [008] | `next/dynamic(..., { ssr: false })` del canvas + `whileInView` fade/slide-in; skeleton `aria-hidden` mientras carga |
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
| `ProfilePhoto` | Server | ✅ [011, reemplaza PhotoPlaceholder de 003] | `next/image` con `fill` + `object-cover` dentro del mismo marco circular Vesica Piscis; recibe `src`/`alt` desde `ABOUT_DATA` |
| `SkillCard` | **Client** | ✅ [004] | Card con icono lucide, titulo, lista de skills; `whileInView` scale+fade con stagger `delay: index * 0.05`; hover border highlight |
| `ProjectCard` | Mixed | TODO M3 | Card de proyecto con motion |
| `TimelineItem` | **Client** | ✅ [005] | Diamond marker + linea conectora (`aria-hidden`), empresa, rol, periodo, descripcion, tags; `whileInView` slide-in-left con stagger `delay: index * 0.1` |
| `GameOfLife` | **Client** | ✅ [008] | Canvas 1200x500, controles Play/Pause/Reset/Randomize/Glider/Pulsar/velocidad/tamano celda; logica pura delegada a `src/lib/gameOfLife.ts` |

## Geometry (`src/components/ui/geometry/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `GeometricDots` | Server | ✅ [002] | CSS grid de 600 divs, pulse animation, seeded-random delays |
| `FibonacciSpiral` | Server | ✅ [002] | Sacred geometry (Seed of Life, Merkaba, dashed rings), `animate-slow-spin` 150s |
| `SpiralPetals` | Server | ✅ [003] | 8 petal spirals + 40 spiral lines, `animate-slow-rotate` 200s |
| `GridOverlay` | Server | ✅ [003] | SVG `<pattern>` grid 60×60, `opacity-10` |
| `CircuitPattern` | Server | ✅ [008] | SVG `<pattern>` circuit-board, `opacity-5`, fondo de Game of Life |

## Lib (`src/lib/`)

| Modulo | Estado | Exports |
|---|---|---|
| `site.ts` | ✅ [001] | `SITE: SiteConfig` |
| `metadata.ts` | ✅ [001] | `buildMetadata(overrides?): Metadata` |
| `schema.ts` | ✅ [001] | `buildPersonSchema()`, `buildWebSiteSchema()` + types |
| `gameOfLife.ts` | ✅ [008] | Logica pura de Conway (`countNeighbors`, `nextGeneration`, `toggleCell`, `createEmptyGrid`, `createRandomGrid`, `applyPattern`, `countPopulation`, `GLIDER_PATTERN`, `PULSAR_PATTERN`) — sin dependencias de canvas/React, testeable en jsdom |
| `resend.ts` | TODO M4 | Cliente Resend |

## Tipos (`src/types/index.ts`)

`NavLink`, `SiteConfig`, `PersonSchemaData` — [001-layout-header]
`CtaLink`, `HeroData` — [002-hero-section]
`AboutData` (+ `photoSrc`/`photoAlt` [011]) — [003-about-section]
`SkillCategory` — [004-skills-section]
`ExperienceItem` — [005-experience-section]
`GameOfLifeData` — [008-game-of-life]

## Data (`src/data/`)

| Modulo | Estado | Exports |
|---|---|---|
| `navigation.ts` | ✅ [001] | `NAV_LINKS: NavLink[]` |
| `hero.ts` | ✅ [002] | `HERO_DATA: HeroData` |
| `about.ts` | ✅ [003] | `ABOUT_DATA: AboutData` |
| `skills.ts` | ✅ [004] | `SKILLS_DATA: readonly SkillCategory[]` (6 categorias) |
| `experience.ts` | ✅ [005] | `EXPERIENCE_DATA: readonly ExperienceItem[]` (4 items) |
| `gameOfLife.ts` | ✅ [008] | `GAME_OF_LIFE_DATA: GameOfLifeData` |
| `projects.ts` | TODO M3 | — |
| `social.ts` | TODO M3 | — |

## Client boundaries activas

| Componente | Justificacion |
|---|---|
| `ScrollChevron` | `motion.div` animate requiere DOM |
| `HeroAnimations` | `useReducedMotion` + entrance animation requiere DOM |
| `AboutInView` | `whileInView` requiere IntersectionObserver (browser API) |
| `MobileNav` | Estado open/closed, focus-trap con `keydown`, bloqueo de `body.style.overflow`, todo requiere DOM |
| `SkillsHeadingInView` | `whileInView` requiere IntersectionObserver (browser API) |
| `SkillCard` | `whileInView` con stagger por indice requiere IntersectionObserver (browser API) |
| `ExperienceHeadingInView` | `whileInView` requiere IntersectionObserver (browser API) |
| `TimelineItem` | `whileInView` con stagger por indice requiere IntersectionObserver (browser API) |
| `GameOfLifeHeadingInView` | `whileInView` requiere IntersectionObserver (browser API) |
| `GameOfLifeGridInView` | `next/dynamic(..., { ssr: false })` requiere Client Component; `whileInView` requiere IntersectionObserver |
| `GameOfLife` | Estado (grid, generacion, controles), `canvas.getContext('2d')`, `setInterval` — todo requiere DOM |

## Principio clave

**Server Components por defecto**. Solo se permite `'use client'` cuando se necesita estado, eventos o APIs de browser. Cada uso esta justificado en el codigo con un comentario.

**Leyenda**:
- ✅ [XXX] — implementado en feature branch XXX
- TODO M3/M4 — pendiente en hito siguiente
