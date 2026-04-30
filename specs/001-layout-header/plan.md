# Implementation Plan: Global Layout and Header

**Branch**: `001-layout-header` | **Date**: 2026-04-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-layout-header/spec.md`

## Summary

Build the foundational layout shared by every page of the portfolio: root `app/layout.tsx` with metadata + JSON-LD + fonts, a sticky `<Header>` with anchor navigation, a `<Footer>`, semantic landmarks, skip-to-content link, film grain overlay, and crosshair cursor styling. This feature unblocks every section that comes after (M3 stories US2..USN). Implementation is 100% Server Components with native HTML anchor navigation — zero client JS for layout primitives.

## Technical Context

**Framework**: Next.js 16.2.2 (App Router, Turbopack, SSG)
**Language**: TypeScript 5 (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `no-explicit-any: error`)
**Styling**: Tailwind CSS v4 (utility-first, design tokens via CSS custom properties)
**Fonts**: `next/font/google` for Space Grotesk (700), JetBrains Mono (300/400/500), Inter (300/400/500/600)
**Testing**: Vitest 4 + @testing-library/react (unit/integration), Playwright 1.59 (e2e)
**Deploy**: Vercel (CDN, security headers configured in `next.config.ts`)
**Analytics**: deferred to M7 (post-launch)
**Target Platform**: Modern browsers (Chrome 111+, Safari 16.4+, Firefox 128+)
**Project Type**: Portfolio website, single-page (`/`) with anchor sections
**Performance Goals**: LCP < 1.5s, INP < 100ms, CLS < 0.05, layout JS < 5KB gzip
**Constraints**: Zero `force-dynamic`, zero third-party CDNs, WCAG 2.1 AA

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Server-First**: All layout pieces are Server Components. No `'use client'` introduced by this feature.
- [x] **II. SEO-First**: Root `generateMetadata` + JSON-LD `Person`/`WebSite` in layout; sitemap/robots scaffolded but populated in M4.
- [x] **III. Privacy-First**: Fonts via `next/font` (self-hosted), zero external CDNs, no email exposed (no email used at all in this feature).
- [x] **IV. Type Safety**: All exports typed. Navigation/Site/Person types live in `src/types/`.
- [x] **V. Testing**: Vitest for metadata + JSON-LD + navigation data integrity. Playwright for landmarks, skip link, anchor navigation, network audit.
- [x] **VI. Minimal Deps**: Zero new runtime dependencies for this feature (next/font already in Next.js).
- [x] **VII. Accessibility**: Skip link, landmarks, decorative SVG `aria-hidden`, focus indicators, AA contrast.
- [x] **VIII. Performance**: SSG only, fonts via next/font (zero CLS), film grain inline SVG (no extra request).

**Result**: PASS — no violations. No Complexity Tracking entries.

## Project Structure

### Documentation (this feature)

```text
specs/001-layout-header/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component contracts)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (files touched by this feature)

```text
src/
├── app/
│   ├── layout.tsx                 # Root layout — metadata, fonts, JSON-LD, body wrappers
│   ├── page.tsx                   # Homepage shell (sections plug in via M3 next features)
│   └── globals.css                # Tailwind + cursor crosshair + film grain CSS (already exists, extend)
│
├── components/
│   └── layout/
│       ├── Header.tsx             # Sticky nav (Server Component)
│       ├── Footer.tsx             # Footer (Server Component)
│       ├── SkipToContent.tsx      # Skip link (Server Component)
│       └── FilmGrain.tsx          # Inline SVG noise overlay (Server Component)
│
├── lib/
│   ├── metadata.ts                # buildMetadata() helper for generateMetadata
│   ├── schema.ts                  # buildPersonSchema() / buildWebSiteSchema() JSON-LD builders
│   └── site.ts                    # SITE constant (name, url, default title/description, OG image)
│
├── data/
│   └── navigation.ts              # NAV_LINKS array
│
└── types/
    └── index.ts                   # NavLink, SiteConfig, PersonData

tests/
├── unit/
│   ├── metadata.test.ts           # buildMetadata returns correct shape
│   ├── schema.test.ts             # buildPersonSchema, buildWebSiteSchema validity
│   └── navigation.test.ts         # NAV_LINKS integrity (label + href present)
│
└── e2e/
    ├── layout.spec.ts             # Landmarks, skip link, footer text
    ├── navigation.spec.ts         # Anchor links scroll to sections (will fully pass once sections exist)
    └── privacy.spec.ts            # Network audit: zero third-party requests
```

**Structure Decision**: Next.js App Router single-project layout, with `layout/` components separated from future `sections/`, `contact/`, `ui/`. Library layer (`lib/`) keeps schema/metadata helpers reusable per page.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
