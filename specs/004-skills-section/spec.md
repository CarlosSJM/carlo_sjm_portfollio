# Feature Specification: Skills Section

**Feature Branch**: `004-skills-section`
**Created**: 2026-08-05
**Status**: Draft

## User Scenarios & Testing

### User Story 1 — Visitor scans Carlos's tech stack by category (Priority: P1)

A visitor scrolls to the Skills section and sees 6 categorized cards (Front-End, Front Tools, Back-End, Back Tools, Databases, Scripts & Other), each with an icon, title, and a list of specific technologies.

**Why this priority**: Core content — recruiters and technical visitors scan this section to quickly assess stack fit. Must be fully crawlable and readable without JS.

**Independent Test**: Navigate to `/#skills`. View source shows eyebrow "EXPERTISE", heading "AREAS OF KNOWLEDGE", and 6 `SkillCard` blocks each with a category title and a list of skill names as plain text. No JS required.

**Constitution Compliance**:
- Server-First: `SkillsSection` and `SkillCard` are Server Components (no interactivity needed beyond `whileInView`, which is isolated in a client wrapper)
- SEO: `<h2>` eyebrow + `<h3>` heading (correct hierarchy after About's h3); card titles as `<h4>`
- Privacy: no personal data — purely technical content
- Accessibility: correct heading hierarchy; icons `aria-hidden`; skill lists as visible text (not icon-only)

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/#skills`, **When** the section loads, **Then** the eyebrow "EXPERTISE", heading "AREAS OF KNOWLEDGE", and all 6 category cards are visible with their skill lists
2. **Given** a screen reader navigates the page, **Then** heading hierarchy continues correctly (h3 "AREAS OF KNOWLEDGE" after About's h3, category titles as h4)
3. **Given** JavaScript is disabled, **Then** all card content (titles, skills) is visible; only entrance animations absent

**Vitest Coverage**:
- [x] `tests/unit/skills.test.ts` — `SKILLS_DATA` has exactly 6 categories; each has non-empty `title`, an icon reference, and a non-empty `skills` array

**Playwright Coverage**:
- [x] `tests/e2e/skills.spec.ts` — eyebrow "EXPERTISE" visible; heading "AREAS OF KNOWLEDGE" visible; all 6 category titles visible; at least one known skill per category visible (e.g. "React", "Docker", "PostgreSQL")

---

### User Story 2 — Visual layout: responsive grid + hover feedback (Priority: P2)

Cards are arranged in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop) with a subtle border-highlight on hover to indicate interactivity/polish.

**Why this priority**: Visual polish — the grid must not break on any breakpoint (this is the same class of bug fixed in `010-mobile-nav`), but content is fully usable without the hover effect.

**Independent Test**: Visual check at 375px (1 column), 768px (2 columns), 1280px (3 columns) — no overflow, no cut-off text, no overlapping cards. Hovering a card (desktop) shows a border color change.

**Constitution Compliance**:
- Server-First: grid layout is pure Tailwind (`grid md:grid-cols-2 lg:grid-cols-3 gap-6`), no client JS needed for layout
- Accessibility: hover state has a focus-visible equivalent for keyboard users (border highlight also triggers on `:focus-within` if cards become focusable, otherwise not required since cards have no interactive children)

**Acceptance Scenarios**:

1. **Given** viewport `< md`, **Then** cards stack in 1 column with no horizontal overflow
2. **Given** viewport `md` to `lg`, **Then** cards render in a 2-column grid
3. **Given** viewport `>= lg`, **Then** cards render in a 3-column grid
4. **Given** a card is hovered (desktop), **Then** its border color changes from `border-[#1F1F1F]` to a lighter shade (`hover:border-white/20`)

**Playwright Coverage**:
- [x] `tests/e2e/skills.spec.ts` — no horizontal scroll/overflow at 375px, 768px, 1280px viewports; grid column count assertions via bounding boxes (or computed style) at each breakpoint

---

### User Story 3 — Scroll-triggered entrance animations (Priority: P3)

The section heading fades in on scroll, and each card animates in with a staggered scale+fade as it enters the viewport.

**Why this priority**: Polish. Animations enhance UX but content is fully usable without them (progressive enhancement, matches Hero/About precedent).

**Constitution Compliance**:
- Server-First: `'use client'` isolated to a thin wrapper (`SkillsInView` for heading, `SkillCard` itself needs `'use client'` for the per-card `whileInView` + stagger `delay: index * 0.05`)
- `useReducedMotion` respected — no animation if the user prefers reduced motion

**Playwright Coverage**:
- [x] `tests/e2e/skills.spec.ts` — all card content visible after scrolling into view (animation completes or is skipped under reduced motion)

### Edge Cases

- Exactly 6 categories, order matters (Front-End, Front Tools, Back-End, Back Tools, Databases, Scripts & Other) — matches `docs/content-brief.md` and the approved Figma design
- Skill lists vary in length (4 to 6 items) — card height must not be forced equal in a way that causes visual misalignment; Grid uses `items-start` implicitly via natural row sizing, no fixed height needed since content matches (short lists don't look broken next to long ones in a 3-column grid, as all cards start at the top of their row)
- No horizontal overflow at any breakpoint (lesson from `010-mobile-nav`) — manual browser verification via Claude-in-Chrome is required per `CLAUDE.md` before declaring this feature done, in addition to Playwright breakpoint tests

## Requirements

### Functional Requirements

- **FR-001**: Skills section MUST render as `<section id="skills">` replacing the placeholder
- **FR-002**: MUST display eyebrow "EXPERTISE" (with decorative lines both sides, centered) and `<h3>` "AREAS OF KNOWLEDGE"
- **FR-003**: MUST display exactly 6 `SkillCard` components in the order defined in `SKILLS_DATA`
- **FR-004**: Each `SkillCard` MUST show: icon (`lucide-react`, `aria-hidden`), category title (`<h4>`, uppercase, bold), and a list of skill names
- **FR-005**: Grid MUST be responsive: 1 column `< md`, 2 columns `md:`, 3 columns `lg:`
- **FR-006**: Cards MUST have a hover state (`border-[#1F1F1F]` → `hover:border-white/20`)
- **FR-007**: Section background MUST be `bg-black`
- **FR-008**: Heading fades in `whileInView`; each card fades+scales in `whileInView` with `delay: index * 0.05` stagger
- **FR-009**: All content sourced from `src/data/skills.ts`

### Accessibility Requirements
- **A11Y-001**: Icons `aria-hidden="true"`
- **A11Y-002**: Heading hierarchy: h3 "AREAS OF KNOWLEDGE" (after About's h3), h4 per category title
- **A11Y-003**: Skill names are visible text, not conveyed by icon/color alone

### Performance Requirements
- **PERF-001**: SSG — no runtime data fetching
- **PERF-002**: `SkillsSection` is a Server Component; only the `whileInView` animation boundary is client-side
- **PERF-003**: No new dependencies — `lucide-react` and `motion` already installed

## Success Criteria

- **SC-001**: Lighthouse Performance >= 95, SEO >= 95, A11y >= 90
- **SC-002**: Vitest + Playwright all pass
- **SC-003**: `npm run typecheck` + `npm run lint` zero errors
- **SC-004**: Section visible and readable without JS
- **SC-005**: Manually verified in Chrome at 375px, 768px, and 1280px viewports (no overflow, correct column count) before merge — per `CLAUDE.md` manual verification rule

## Assumptions

- Skill categories and technology lists are final per `docs/content-brief.md` (already approved by the user, matches Figma source)
- `motion` and `lucide-react` already installed (from Hero/About features)
- Icons used: `Layout`, `Settings`, `Server`, `Terminal`, `Database`, `Code2` (all from `lucide-react`, matching the Figma source)
