# Implementation Plan: Hero Section

**Branch**: `002-hero-section` | **Date**: 2026-05-04 | **Spec**: `specs/002-hero-section/spec.md`
**Input**: Feature specification from `/specs/002-hero-section/spec.md`

## Summary

Build the Hero section — the full-viewport-height first screen of the portfolio. Displays name (`<h1>`), role, tagline, location badge, two CTA anchor buttons, geometric SVG background overlays, and an animated scroll chevron. Static content is a Server Component; only the entrance animation wrapper and scroll chevron use `'use client'` with `motion/react`. Installs `motion` and `lucide-react` as the first new runtime dependencies of M3.

## Technical Context

**Framework**: Next.js 16 (App Router, Turbopack, SSG)
**Language**: TypeScript 5 (strict mode, no `any`, no unguarded `as`)
**Styling**: Tailwind CSS v4 (utility-first, no CSS-in-JS)
**Testing**: Vitest (unit/integration) + Playwright (e2e)
**Deploy**: Vercel (serverless functions, CDN edge, auto SSL)
**Analytics**: @vercel/analytics + @vercel/speed-insights
**Target Platform**: Web (SSG, served from Vercel CDN)
**Project Type**: Portfolio website (static-first, minimal client JS)
**Performance Goals**: LCP < 1.5s, INP < 100ms, CLS < 0.05, JS < 50KB gzip
**Constraints**: Zero `force-dynamic`, max 10 runtime deps, WCAG 2.1 AA

**New deps this feature**:
- `motion` (Framer Motion v11+) — animations only in client wrappers
- `lucide-react` — tree-shakeable icons (MapPin, ChevronDown)

## Constitution Check

- [x] **I. Server-First**: `HeroSection` is a Server Component. Only `HeroAnimations` wrapper and `ScrollChevron` use `'use client'` (justified: entrance transitions + bounce animation require JS)
- [x] **II. SEO-First**: `<h1>` with name is crawlable plain text; root layout already provides `generateMetadata` and JSON-LD
- [x] **III. Privacy-First**: No email or sensitive data in hero; SVG geometries are local
- [x] **IV. Type Safety**: `HeroData` interface typed in `src/types/index.ts`; `HERO_DATA` const in `src/data/hero.ts` with `as const`
- [x] **V. Testing**: Vitest for `HERO_DATA` shape; Playwright for rendering, CTA navigation, scroll chevron
- [x] **VI. Minimal Deps**: `motion` + `lucide-react` = 2 new deps. Total runtime deps after: ≤ 6. Both justified
- [x] **VII. Accessibility**: Single `<h1>`, `aria-hidden` on decorative icons and SVGs, `aria-label` on scroll chevron, contrast AA
- [x] **VIII. Performance**: SSG only; SVG backgrounds are Server Components (zero JS); motion wrapper is minimal client island

**Complexity justified**:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `'use client'` on HeroAnimations | Framer Motion entrance transitions require DOM | CSS-only `@keyframes` can't replicate staggered delays per design |
| `'use client'` on ScrollChevron | Bounce animation via `motion` | CSS-only bounce loses automatic `prefers-reduced-motion` respect |

## Project Structure

### Documentation (this feature)

```text
specs/002-hero-section/
├── plan.md              # This file
├── research.md          # Phase 0 — dep analysis, animation patterns
├── data-model.md        # Phase 1 — HeroData entity
├── contracts/
│   └── components.md    # Component API contracts
├── quickstart.md        # Phase 1 — implementation guide
└── tasks.md             # Phase 2 (/speckit-tasks output)
```

### Source Code (this feature adds)

```text
src/
├── app/
│   └── page.tsx                           # Replace hero placeholder with <HeroSection>
├── components/
│   ├── sections/
│   │   └── HeroSection.tsx                # Server Component — layout + content
│   ├── ui/
│   │   ├── geometry/
│   │   │   ├── GeometricDots.tsx          # Server Component — SVG dot grid
│   │   │   └── FibonacciSpiral.tsx        # Server Component — SVG spiral
│   │   └── HeroAnimations.tsx             # 'use client' — motion entrance wrapper
│   └── layout/
│       └── ScrollChevron.tsx              # 'use client' — bounce + #about link
├── data/
│   └── hero.ts                            # HERO_DATA constant
└── types/
    └── index.ts                           # Add HeroData, CtaLink types

tests/
├── unit/
│   └── hero.test.ts                       # Vitest — HERO_DATA shape validation
└── e2e/
    └── hero.spec.ts                       # Playwright — render, CTA nav, a11y
```

## Architecture Decisions

### AD-001: Server Component shell + minimal client islands

`HeroSection` is a Server Component that imports two client islands:
- `HeroAnimations` (`'use client'`) wraps the text block with entrance transitions
- `ScrollChevron` (`'use client'`) handles the bounce animation

Background SVG components (`GeometricDots`, `FibonacciSpiral`) are pure Server Components with zero JS.

**Why**: Maximizes SSG surface. The page HTML is fully crawlable and renders without JS. Client bundle limited to two animation islands.

### AD-002: `motion/react` with `useReducedMotion`

Both client components call `const shouldReduce = useReducedMotion()` and skip animations when true. Idiomatic Framer Motion pattern, satisfies A11Y constitution requirement.

### AD-003: Geometry components as Server Components

`GeometricDots` and `FibonacciSpiral` render pure SVG. They accept `className` prop. No animation — positioning handled by CSS. Zero JS payload.

### AD-004: `HERO_DATA as const` in `src/data/hero.ts`

Single source of truth for hero content. `HeroData` type in `src/types/index.ts`. Tests validate shape without reading JSX.

### AD-005: No `next/dynamic` for animations

`HeroAnimations` is always wanted — `next/dynamic` with `ssr: false` would delay rendering unnecessarily. The component SSR-renders content without animations, which is correct behavior.

## Phase 0: Research

See `research.md` for full findings. Key decisions:

1. `motion/react` API — `<motion.div>` with `initial`/`animate`/`transition`; `useReducedMotion()` for a11y
2. `lucide-react` — import only `MapPin` and `ChevronDown` (tree-shakeable, no barrel imports)
3. SVG geometry pattern — inline SVG via Server Component, `aria-hidden="true"` on wrapper, `pointer-events-none`, `absolute inset-0`
4. Tailwind v4 + motion — no conflicts; Tailwind classes on `motion.div` work as expected

## Phase 1: Design

See `data-model.md` and `contracts/components.md`.

**HeroData shape**:
```typescript
interface CtaLink { readonly label: string; readonly href: string }
interface HeroData {
  readonly name: string
  readonly role: string
  readonly tagline: string
  readonly location: string
  readonly ctaPrimary: CtaLink
  readonly ctaSecondary: CtaLink
  readonly scrollTarget: string
}
```

**Component hierarchy**:
```
HeroSection (Server)
├── [absolute] GeometricDots (Server) — aria-hidden, pointer-events-none
├── [absolute] FibonacciSpiral (Server) — aria-hidden, pointer-events-none
├── HeroAnimations (Client) — staggered entrance wrapper
│   ├── <h1> name
│   ├── <p> role (mono font, letter-spacing)
│   ├── <p> tagline
│   ├── location badge (MapPin icon aria-hidden + text)
│   └── CTA row
│       ├── <a href="#projects"> VIEW PROJECTS (primary — white bg, black text)
│       └── <a href="#contact"> CONTACT ME (secondary — border, white text)
└── ScrollChevron (Client) — ChevronDown bounce, aria-label, links to #about
```
