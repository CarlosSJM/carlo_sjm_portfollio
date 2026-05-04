# Feature Specification: About Section

**Feature Branch**: `003-about-section`
**Created**: 2026-05-04
**Status**: Draft

## User Scenarios & Testing

### User Story 1 — Visitor reads bio and understands Carlos's background (Priority: P1)

A visitor scrolls to the About section and reads Carlos's story: biology background, transition to web development, experience across the full stack, based in Segovia.

**Why this priority**: Core content. The bio communicates the personal brand and differentiator (biology → code). Must be fully crawlable and readable without JS.

**Independent Test**: Navigate to `/#about`. View source shows `<h2>` eyebrow "ABOUT", `<h3>` "From Nature to Code", and 3 bio paragraphs as plain text. No JS required.

**Constitution Compliance**:
- Server-First: All text content is Server Component
- SEO: `<h2>` eyebrow + `<h3>` heading (correct hierarchy under hero `<h1>`); bio as `<p>` tags
- Privacy: No personal email in bio; "Segovia" replaces "Madrid" per content-brief update
- Accessibility: Correct heading hierarchy (h1 in hero → h2/h3 in about); image placeholder has descriptive text

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/#about`, **When** the section loads, **Then** the eyebrow "ABOUT", heading "From Nature to Code", and 3 bio paragraphs are visible
2. **Given** a screen reader navigates the page, **Then** heading hierarchy is h1 (hero) → followed by h2 eyebrow and h3 section title in about
3. **Given** JavaScript is disabled, **Then** all text content is visible; only animations absent

**Vitest Coverage**:
- [x] `tests/unit/about.test.ts` — `ABOUT_DATA` has `heading`, `eyebrow`, `bio` array with 3 non-empty strings; `bio[2]` contains "Segovia" not "Madrid"

**Playwright Coverage**:
- [x] `tests/e2e/about.spec.ts` — eyebrow "ABOUT" visible; heading "From Nature to Code" visible; 3 bio paragraphs visible; section has `id="about"`

---

### User Story 2 — Visual identity: photo placeholder and geometry background (Priority: P2)

The about section has a geometric visual identity: SpiralPetals SVG background, grid overlay, and a Vesica Piscis framed photo placeholder.

**Why this priority**: Visual differentiator. The sacred geometry backgrounds are a key design element. Photo placeholder until real photo arrives (task #22).

**Independent Test**: Visual check — SpiralPetals SVG rotating slowly in background, grid overlay at low opacity, circular photo placeholder with Vesica Piscis frame visible.

**Constitution Compliance**:
- Server-First: `SpiralPetals`, `GridOverlay`, `PhotoPlaceholder` are all Server Components
- Privacy: No real photo — geometric placeholder only
- Accessibility: `aria-hidden` on all decorative SVGs; photo placeholder has `role="img" aria-label="Profile photo placeholder"`

**Acceptance Scenarios**:

1. **Given** the about section renders, **When** inspected, **Then** `aria-hidden="true"` elements are present for decorative backgrounds
2. **Given** the photo placeholder renders, **Then** it shows "PROFILE IMAGE" text in a circle

**Playwright Coverage**:
- [x] `tests/e2e/about.spec.ts` — `aria-hidden="true"` on background SVGs; photo placeholder visible

---

### User Story 3 — Scroll-triggered entrance animations (Priority: P3)

Content fades in as the visitor scrolls into the about section — opacity 0→1 for the grid, and opacity+x slide for the bio column.

**Why this priority**: Polish. Animations enhance the UX but content is fully usable without them.

**Constitution Compliance**:
- Server-First: `'use client'` on `AboutInView` wrapper (justified: `whileInView` requires IntersectionObserver)
- `useReducedMotion` respected

**Playwright Coverage**:
- [x] `tests/e2e/about.spec.ts` — content visible after scroll (animation completes)

### Edge Cases

- Bio text contains "Segovia" not "Madrid" (content-brief update)
- Photo placeholder renders until task #22 provides real photo
- `whileInView` with `viewport={{ once: true }}` — animates only on first scroll-into-view

## Requirements

### Functional Requirements

- **FR-001**: About section MUST render as `<section id="about">` replacing the placeholder
- **FR-002**: MUST display: eyebrow "ABOUT" with decorative line, `<h3>` "From Nature to Code", 3 bio paragraphs
- **FR-003**: MUST display photo placeholder (circle clip + Vesica Piscis SVG frame)
- **FR-004**: Background MUST include `SpiralPetals` SVG (200s rotation) and `GridOverlay` SVG
- **FR-005**: Bio column MUST animate `whileInView` (opacity+x slide, once)
- **FR-006**: Section background MUST be `bg-[#0d0d0d]`
- **FR-007**: Bio text MUST use "Segovia" (not "Madrid")
- **FR-008**: All content sourced from `src/data/about.ts`

### Accessibility Requirements
- **A11Y-001**: Decorative SVGs `aria-hidden="true"`
- **A11Y-002**: Photo placeholder `role="img" aria-label="Profile photo placeholder"`
- **A11Y-003**: Heading hierarchy: h3 for section title (under hero's h1)

### Performance Requirements
- **PERF-001**: SSG — no runtime data fetching
- **PERF-002**: `SpiralPetals` and `GridOverlay` are Server Components (zero JS)
- **PERF-003**: `AboutInView` is minimal client island (whileInView only)

## Success Criteria

- **SC-001**: Lighthouse Performance >= 95, SEO >= 95, A11y >= 90
- **SC-002**: Vitest + Playwright all pass
- **SC-003**: `npm run typecheck` + `npm run lint` zero errors
- **SC-004**: Section visible and readable without JS

## Assumptions

- Real profile photo arrives via task #22 — placeholder until then
- Location is "Segovia" per content-brief
- `motion` already installed (from hero feature)
