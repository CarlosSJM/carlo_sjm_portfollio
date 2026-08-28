# Feature Specification: Experience Section

**Feature Branch**: `005-experience-section`
**Created**: 2026-08-06
**Status**: Draft

## User Scenarios & Testing

### User Story 1 — Visitor reviews Carlos's work history as a timeline (Priority: P1)

A visitor scrolls to the Experience section and sees a vertical timeline of 4 roles (BravePay, ICARUS, Ust-Global, Datmean), each showing company, role, period, a short description, and a technology tag list, in reverse-chronological order (most recent first).

**Why this priority**: Core content — recruiters scan work history for role progression and stack breadth. Must be fully crawlable and readable without JS.

**Independent Test**: Navigate to `/#experience`. View source shows eyebrow "JOURNEY", heading "EXPERIENCE", and 4 `TimelineItem` blocks each with company, role, period, description, and tech tags as plain text. No JS required.

**Constitution Compliance**:
- Server-First: `ExperienceSection` and `TimelineItem` are Server Components (no interactivity beyond `whileInView`, isolated in the item itself as a thin client boundary)
- SEO: `<h2>` eyebrow + `<h3>` heading (continues hierarchy after Skills' h3); company name as `<h4>`
- Privacy: no personal data beyond already-public professional history (company names, roles, dates) — matches `docs/content-brief.md`
- Accessibility: correct heading hierarchy; timeline markers `aria-hidden`; tech tags as visible text

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/#experience`, **When** the section loads, **Then** the eyebrow "JOURNEY", heading "EXPERIENCE", and all 4 timeline items are visible with company, role, period, description, and tech tags
2. **Given** a screen reader navigates the page, **Then** heading hierarchy continues correctly (h3 "EXPERIENCE" after Skills' h3, company names as h4)
3. **Given** JavaScript is disabled, **Then** all item content is visible; only entrance animations absent
4. **Given** the items render, **Then** they appear in the order defined in `EXPERIENCE_DATA` (BravePay, ICARUS, Ust-Global, Datmean — reverse-chronological)

**Vitest Coverage**:
- [x] `tests/unit/experience.test.ts` — `EXPERIENCE_DATA` has exactly 4 items; each has non-empty `company`, `role`, `period`, `description`, and a non-empty `technologies` array; order matches expected reverse-chronological sequence

**Playwright Coverage**:
- [x] `tests/e2e/experience.spec.ts` — eyebrow "JOURNEY" visible; heading "EXPERIENCE" visible; all 4 company names visible; at least one known tech tag per item visible (e.g. "Next.js", "Kubernetes", "PostgreSQL", "Material UI")

---

### User Story 2 — Visual layout: vertical timeline with connecting line (Priority: P2)

Each item shows a diamond marker connected by a vertical line to the next item, creating a continuous timeline down the section, at any viewport width.

**Why this priority**: Visual identity — the timeline marker/line is a key design element from Figma, but content is fully usable without it (progressive enhancement).

**Independent Test**: Visual check at 375px, 768px, 1280px — markers align vertically, connecting line has no gaps or overlaps, no horizontal overflow, description text wraps correctly at narrow widths.

**Constitution Compliance**:
- Server-First: timeline line/marker is pure CSS (`w-px h-full bg-white/20`, `w-3 h-3 rotate-45`), no client JS needed for layout
- Accessibility: decorative marker/line elements `aria-hidden="true"`

**Acceptance Scenarios**:

1. **Given** any viewport width, **Then** no horizontal overflow occurs within `#experience` (lesson from `010-mobile-nav` and `004-skills-section`)
2. **Given** the last timeline item, **Then** its connecting line does not overflow below the section (matches Figma: line only needed between items, not after the last one)

**Playwright Coverage**:
- [x] `tests/e2e/experience.spec.ts` — no horizontal overflow within `#experience`'s own bounding box at 375px, 768px, 1280px (scoped assertion, not document-wide, per the pre-existing Hero/About overflow bug documented in `docs/roadmap.md`)

---

### User Story 3 — Scroll-triggered entrance animations (Priority: P3)

The section heading fades in on scroll, and each timeline item slides in from the left with a stagger as it enters the viewport.

**Why this priority**: Polish. Animations enhance UX but content is fully usable without them (matches Hero/About/Skills precedent).

**Constitution Compliance**:
- Server-First: `'use client'` isolated to `TimelineItem` (needs `whileInView` + stagger `delay: index * 0.1`) and a thin heading wrapper
- `useReducedMotion` respected — no animation if the user prefers reduced motion

**Playwright Coverage**:
- [x] `tests/e2e/experience.spec.ts` — all item content visible after scrolling into view (animation completes or is skipped under reduced motion)

### Edge Cases

- Exactly 4 items, order matters (BravePay, ICARUS, Ust-Global, Datmean — reverse-chronological per `docs/content-brief.md` and the approved Figma design)
- ICARUS has 11 technology tags (longest list) vs. BravePay's 3 (shortest) — `flex-wrap` must handle this without breaking layout at any width
- Last item's connecting line: Figma renders `<div className="relative flex gap-8 pb-12">` uniformly per item including a line under the last one; kept as-is to match Figma exactly (no special-casing removes it)
- No horizontal overflow at any breakpoint — manual browser verification via Claude-in-Chrome is required per `CLAUDE.md` before declaring this feature done, in addition to Playwright breakpoint tests

## Requirements

### Functional Requirements

- **FR-001**: Experience section MUST render as `<section id="experience">` replacing the placeholder
- **FR-002**: MUST display eyebrow "JOURNEY" (with decorative line, left-aligned) and `<h3>` "EXPERIENCE"
- **FR-003**: MUST display exactly 4 `TimelineItem` components in the order defined in `EXPERIENCE_DATA`
- **FR-004**: Each `TimelineItem` MUST show: diamond marker + connecting line (`aria-hidden`), company (`<h4>`, bold), role (uppercase, mono), period (small, muted), description (paragraph), and a wrapped list of technology tags
- **FR-005**: Section background MUST be `bg-[#0a0a0a]`
- **FR-006**: Heading fades in `whileInView`; each item slides in from the left (`x: -30 → 0`) `whileInView` with `delay: index * 0.1` stagger
- **FR-007**: All content sourced from `src/data/experience.ts`

### Accessibility Requirements
- **A11Y-001**: Timeline marker and connecting line `aria-hidden="true"`
- **A11Y-002**: Heading hierarchy: h3 "EXPERIENCE" (after Skills' h3), h4 per company name
- **A11Y-003**: Technology tags are visible text, not conveyed by color alone

### Performance Requirements
- **PERF-001**: SSG — no runtime data fetching
- **PERF-002**: `ExperienceSection` is a Server Component; only `TimelineItem`'s `whileInView` boundary and the heading wrapper are client-side
- **PERF-003**: No new dependencies — `motion` already installed

## Success Criteria

- **SC-001**: Lighthouse Performance >= 95, SEO >= 95, A11y >= 90
- **SC-002**: Vitest + Playwright all pass
- **SC-003**: `npm run typecheck` + `npm run lint` zero errors
- **SC-004**: Section visible and readable without JS
- **SC-005**: Manually verified in Chrome at 375px, 768px, and 1280px viewports (no overflow, tags wrap correctly) before merge — per `CLAUDE.md` manual verification rule

## Assumptions

- Company names, roles, periods, descriptions, and technology lists are final per `docs/content-brief.md` (already approved by the user, matches Figma source exactly — including ICARUS's 11-tag list)
- `motion` already installed (from Hero/About/Skills features)
- No links to company websites or verification (out of scope, not in Figma source)
