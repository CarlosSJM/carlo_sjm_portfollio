# Mapa de Componentes

## Layout (`src/components/layout/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `Header` | Server | ✅ implementado [001] | Sticky nav con NAV_LINKS, aria-label="Main", logo a `/` |
| `Footer` | Server | ✅ implementado [001] | Copyright dinamico (`new Date().getFullYear()`) + tagline |
| `SkipToContent` | Server | ✅ implementado [001] | Link `#main` con `sr-only`/`focus:not-sr-only` |
| `FilmGrain` | Server | ✅ implementado [001] | Overlay SVG `feTurbulence` inline, `aria-hidden`, mix-blend-overlay |

## Secciones (`src/components/sections/`)

| Componente | Tipo | Estado | Responsabilidad |
|---|---|---|---|
| `Hero` | Server | TODO M3 | Presentacion principal, CTA |
| `About` | Server | TODO M3 | Bio + foto perfil |
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
| `SkillCard` | Mixed | TODO M3 | Card con motion wrapper |
| `ProjectCard` | Mixed | TODO M3 | Card de proyecto con motion |
| `TimelineItem` | Mixed | TODO M3 | Item del timeline de experiencia |

## Lib (`src/lib/`)

| Modulo | Estado | Exports |
|---|---|---|
| `site.ts` | ✅ [001] | `SITE: SiteConfig` |
| `metadata.ts` | ✅ [001] | `buildMetadata(overrides?): Metadata` |
| `schema.ts` | ✅ [001] | `buildPersonSchema()`, `buildWebSiteSchema()` + types |
| `resend.ts` | TODO M4 | Cliente Resend |

## Tipos (`src/types/index.ts`)

`NavLink`, `SiteConfig`, `PersonSchemaData` — definidos en feature 001-layout-header.

## Principio clave

**Server Components por defecto**. Solo se permite `'use client'` cuando se necesita estado, eventos o APIs de browser. Hasta ahora (cierre US1 de 001-layout-header): cero clients en el codigo.

**Leyenda**:
- ✅ implementado
- TODO M3/M4 — pendiente en hito siguiente
- [001] — implementado en feature 001-layout-header
