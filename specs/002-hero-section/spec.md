# Feature Specification: Hero Section

**Feature Branch**: `002-hero-section`
**Created**: 2026-05-04
**Status**: Draft
**Input**: Hero section — first screen of the portfolio

## User Scenarios & Testing *(mandatory)*

### User Story 1 — First-time visitor sees who Carlos is immediately (Priority: P1)

A visitor lands on the portfolio and instantly understands: who Carlos is, what he does, where he is based, and how to take action — all above the fold without scrolling.

**Why this priority**: This is the single most important screen. It determines whether a visitor stays or bounces. It must load fast, be crawlable, and communicate identity in under 2 seconds of reading.

**Independent Test**: Open `/`. The hero section renders with name, role, tagline, location badge, and two CTA buttons. View-source confirms `<h1>` with name and semantic structure. No JavaScript required to see the content.

**Constitution Compliance**:
- Server-First: Server Component for all static content; `'use client'` only in animation wrapper for entrance transitions
- SEO: `<h1>` with name, semantic role text, tagline as paragraph; single h1 per page
- Privacy: No personal data beyond public identity (name, location); no external requests
- Accessibility: Single `<h1>` on page, descriptive button text, decorative icon is aria-hidden

**Acceptance Scenarios**:

1. **Given** a visitor opens `/`, **When** the page loads, **Then** the hero section is fully visible above the fold with: `<h1>` "CARLOS SJM", role "FULL STACK DEVELOPER", tagline "From biology to code — building end-to-end digital experiences", location badge "Segovia", and two CTA buttons "VIEW PROJECTS" and "CONTACT ME"
2. **Given** the page loads, **When** a screen reader navigates, **Then** it encounters a single `<h1>` with the name, followed by role and tagline as semantic text
3. **Given** a visitor with JavaScript disabled, **When** the page loads, **Then** all text content is visible (animations gracefully absent; layout intact)

**Vitest Coverage**:
- [ ] `tests/unit/hero.test.ts` — `HERO_DATA` constant has all required fields: `name`, `role`, `tagline`, `location`, `ctaPrimary` (label + href), `ctaSecondary` (label + href), `scrollTarget`

**Playwright Coverage**:
- [ ] `tests/e2e/hero.spec.ts` — `<h1>` with "CARLOS SJM" present; role text present; tagline present; location badge present; two CTA buttons with correct hrefs (`#projects`, `#contact`)

---

### User Story 2 — Visitor navigates to a section using CTA buttons (Priority: P2)

A visitor clicks "VIEW PROJECTS" or "CONTACT ME" and the page smoothly scrolls to the corresponding section.

**Why this priority**: CTAs are the primary conversion action on the hero. They must work correctly to drive engagement.

**Independent Test**: Click "VIEW PROJECTS" → page scrolls to `#projects` section. Click "CONTACT ME" → page scrolls to `#contact` section. URL hash updates.

**Constitution Compliance**:
- Server-First: CTA buttons are plain `<a href="#...">` — no client component needed
- SEO: Anchor links are crawlable; sections have matching IDs
- Privacy: No data collected from click events
- Accessibility: `<a>` elements with visible descriptive text; no additional aria-label needed

**Acceptance Scenarios**:

1. **Given** the hero is visible, **When** visitor clicks "VIEW PROJECTS", **Then** the browser scrolls to `#projects` and URL updates to `/#projects`
2. **Given** the hero is visible, **When** visitor clicks "CONTACT ME", **Then** the browser scrolls to `#contact` and URL updates to `/#contact`

**Vitest Coverage**:
- [ ] (covered by US1 data test — CTA hrefs validated there)

**Playwright Coverage**:
- [ ] `tests/e2e/hero.spec.ts` — click "VIEW PROJECTS", assert URL contains `#projects`; click "CONTACT ME", assert URL contains `#contact`

---

### User Story 3 — Visual atmosphere and scroll invitation (Priority: P3)

The hero section has a geometric SVG background (GeometricDots + FibonacciSpiral) and an animated scroll indicator chevron that invites the visitor to continue down the page.

**Why this priority**: Visual identity differentiator. Enhances the aesthetic without blocking content. Lower priority because the core message (US1) and navigation (US2) work without it.

**Independent Test**: Visual check — two SVG overlays visible in background with `aria-hidden="true"` and `pointer-events: none`. Chevron links to `#about`.

**Constitution Compliance**:
- Server-First: SVG geometries are Server Components (static markup). Chevron animation uses `'use client'` wrapper with `motion/react` (justification: CSS-only bounce insufficient for design fidelity)
- SEO: Decorative elements are `aria-hidden`; no SEO impact
- Privacy: SVGs are inline — no external resources
- Accessibility: Scroll chevron has `aria-label="Scroll to about section"`; background SVGs are `aria-hidden`

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the hero renders, **Then** the background SVG overlays are present with `aria-hidden="true"` and do not intercept pointer events
2. **Given** the hero renders, **When** a visitor clicks the scroll chevron, **Then** the page scrolls to `#about`

**Vitest Coverage**:
- [ ] (Visual — covered by Playwright)

**Playwright Coverage**:
- [ ] `tests/e2e/hero.spec.ts` — assert `aria-hidden="true"` on background SVG containers; assert scroll chevron present with link to `#about`

---

### Edge Cases

- What happens when viewport height is very small (< 500px)? → `min-h-screen` ensures content fills but is scrollable; no content is clipped
- What if `prefers-reduced-motion` is active? → `motion/react` respects `useReducedMotion()`; all animations disabled
- What if `#projects` or `#contact` section IDs don't exist in DOM? → Anchor links still work; browser handles gracefully
- What if JavaScript is disabled? → All text content visible; SVG backgrounds render inline; only entrance animations absent

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hero MUST render as the first visible section (`id="hero"`) on the homepage, replacing the placeholder
- **FR-002**: Hero MUST display: `<h1>` name, role text, tagline, location badge with MapPin icon, two CTA anchor buttons
- **FR-003**: CTA "VIEW PROJECTS" MUST link to `#projects`; CTA "CONTACT ME" MUST link to `#contact`
- **FR-004**: Background MUST include `GeometricDots` and `FibonacciSpiral` SVG components at low opacity (~0.35), `aria-hidden="true"`, `pointer-events: none`
- **FR-005**: A scroll indicator (chevron/arrow) MUST appear below the CTAs, linking to `#about`, with a subtle bounce animation
- **FR-006**: Hero layout MUST be full viewport height (`min-h-screen`) with vertically centered content
- **FR-007**: All entrance animations MUST respect `prefers-reduced-motion`
- **FR-008**: Hero content (name, role, tagline, location, CTA labels and hrefs) MUST be sourced from a typed constant in `src/data/hero.ts`

### SEO Requirements (per Constitution II)

- **SEO-001**: The `<h1>` in the hero MUST be the single `<h1>` on the page
- **SEO-002**: Role and tagline MUST be rendered as plain text for crawlability (not inside SVG or image)
- **SEO-003**: Hero section MUST have `id="hero"` matching the nav anchor

### Privacy Requirements (per Constitution III)

- **PRI-001**: No personal email, phone, or sensitive contact data in hero
- **PRI-002**: SVG geometry components MUST be local (no external fetch)
- **PRI-003**: No third-party scripts, analytics, or CDN resources introduced

### Accessibility Requirements (per Constitution VII)

- **A11Y-001**: Single `<h1>` per page (hero name); role is `<p>`; tagline is `<p>`
- **A11Y-002**: MapPin icon MUST have `aria-hidden="true"` (decorative); location text is visible
- **A11Y-003**: CTA buttons are `<a>` elements with descriptive visible text
- **A11Y-004**: Scroll chevron MUST have `aria-label="Scroll to about section"`
- **A11Y-005**: Background SVG containers MUST have `aria-hidden="true"`
- **A11Y-006**: Text contrast on dark background MUST meet WCAG AA (4.5:1)

### Performance Requirements (per Constitution VIII)

- **PERF-001**: Hero section MUST be part of SSG homepage (no `force-dynamic`, no runtime data fetching)
- **PERF-002**: `motion/react` animation client wrapper MUST be minimal — only the animated elements, not the full section
- **PERF-003**: SVG geometry components are Server Components — no JS payload
- **PERF-004**: `motion` and `lucide-react` are the only new dependencies; total new bundle impact < 55KB gzip

### Key Entities

- **HeroData**: Public identity displayed in the hero — `{ name, role, tagline, location, ctaPrimary: { label, href }, ctaSecondary: { label, href }, scrollTarget: string }`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lighthouse Performance score >= 95
- **SC-002**: Lighthouse SEO score >= 95
- **SC-003**: Lighthouse Accessibility score >= 90
- **SC-004**: All Vitest tests pass (`npm run test`)
- **SC-005**: All Playwright tests pass (`npm run test:e2e`)
- **SC-006**: `npm run typecheck` passes with zero errors
- **SC-007**: `npm run lint` passes with zero warnings
- **SC-008**: View-source of `/` shows `<h1>CARLOS SJM</h1>` (or equivalent) with no external CDN requests from hero
- **SC-009**: Hero section fully visible above the fold on 1280×800 viewport

## Assumptions

- Content is in English (i18n ES is M8 task #5)
- `motion/react` (Framer Motion) will be installed as the first use of animation in the project
- `lucide-react` will be installed as the first icon library use in the project
- `GeometricDots` and `FibonacciSpiral` are created as Server Components in `src/components/ui/geometry/`
- The placeholder `<section id="hero">` in `page.tsx` is replaced by the real `<HeroSection>` component
- Profile photo is not part of this feature (task #22); hero has no photo
- Location is "Segovia" (per content-brief update)
- All pages are SSG (no server-side rendering at request time)
- Vercel is the only deployment target
