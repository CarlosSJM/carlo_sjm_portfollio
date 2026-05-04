---
description: "Task list for implementing 002-hero-section"
---

# Tasks: Hero Section

**Input**: Design documents from `/specs/002-hero-section/`
**Prerequisites**: spec.md, plan.md, research.md, data-model.md, contracts/components.md, quickstart.md
**Constitution**: `.specify/memory/constitution.md` v1.0.0

**Tests**: Vitest (unit/integration) and Playwright (e2e) tasks INCLUDED per Constitution V.

**Organization**: Tasks grouped by user story (US1, US2, US3) for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 (P1 content+layout), US2 (P2 CTA nav), US3 (P3 visual+animation)

## Path Conventions (Next.js App Router)

- Components: `src/components/{sections,ui/geometry,layout}/`
- Data: `src/data/hero.ts`
- Types: `src/types/index.ts`
- Tests: `tests/{unit,e2e}/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install deps and define shared types before any user story begins

- [x] T001 Install `motion` and `lucide-react`: `npm install motion lucide-react` — verify `npm run typecheck` still passes
- [x] T002 [P] Add `CtaLink` and `HeroData` interfaces to `src/types/index.ts`
- [x] T003 [P] Create `src/data/hero.ts` with `HERO_DATA` constant (name, role, tagline, location, ctaPrimary, ctaSecondary, scrollTarget) using `HeroData` type

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verify existing infrastructure supports this feature — no new code needed

- [x] T004 Verify `src/app/layout.tsx` exports `buildMetadata()` — hero lives on homepage, root layout already covers SEO (no changes needed)
- [x] T005 Verify `src/app/page.tsx` has placeholder `<section id="hero">` ready to be replaced

**Constitution Gate**: Run before proceeding:
- `npm run typecheck` — zero errors
- `npm run lint` — zero warnings

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — First-time visitor sees identity (Priority: P1) MVP

**Goal**: Render full hero section with h1, role, tagline, location badge, and CTA buttons — fully crawlable, accessible, SSG.

**Independent Test**: Open `/`. View source shows `<h1>` with "CARLOS SJM", role text, tagline, and two CTA anchor links to `#projects` and `#contact`. No JS required to see content.

### Tests for User Story 1 (write FIRST, ensure they FAIL before implementation)

- [x] T006 [P] [US1] Vitest: `tests/unit/hero.test.ts` — import `HERO_DATA`; assert `name`, `role`, `tagline`, `location` are non-empty strings; assert `ctaPrimary.href === "#projects"` and `ctaSecondary.href === "#contact"`; assert `scrollTarget === "#about"`
- [x] T007 [P] [US1] Playwright: `tests/e2e/hero.spec.ts` — load `/`; assert `<h1>` contains "CARLOS SJM"; assert role text visible; assert tagline visible; assert location "Segovia" visible; assert CTA href `#projects` and `#contact` present

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `src/components/sections/HeroSection.tsx` as Server Component: `<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">` — includes geometry backgrounds (absolute, aria-hidden), HeroAnimations content wrapper, ScrollChevron — reads from `HERO_DATA`
- [x] T009 [P] [US1] Create `src/components/ui/HeroAnimations.tsx` as `'use client'` component with `motion/react`: wraps children in staggered entrance animation (opacity 0→1, y 20→0, delay per child); calls `useReducedMotion()` and skips animation if true
- [x] T010 [US1] Replace placeholder `<section id="hero">` in `src/app/page.tsx` with `<HeroSection />`

**Checkpoint**: User Story 1 fully functional, tested, accessible.

---

## Phase 4: User Story 2 — CTA navigation (Priority: P2)

**Goal**: Both CTA buttons scroll the page to their target sections when clicked.

**Independent Test**: Click "VIEW PROJECTS" → URL hash `#projects`; click "CONTACT ME" → URL hash `#contact`.

### Tests for User Story 2

- [x] T011 [P] [US2] Playwright: `tests/e2e/hero.spec.ts` (add test) — click link with text "VIEW PROJECTS"; assert `page.url()` contains `#projects`. Click link with text "CONTACT ME"; assert URL contains `#contact`

### Implementation for User Story 2

- [x] T012 [US2] Verify CTA links in `HeroSection.tsx` use plain `<a href={ctaPrimary.href}>` and `<a href={ctaSecondary.href}>` — no client component needed; smooth scroll is provided by `globals.css` `scroll-behavior: smooth`

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 — Visual atmosphere and scroll invitation (Priority: P3)

**Goal**: Geometric SVG backgrounds (GeometricDots + FibonacciSpiral) and animated scroll chevron enhance visual identity.

**Independent Test**: Background SVG wrappers have `aria-hidden="true"` and `pointer-events: none`. Scroll chevron links to `#about` with `aria-label`.

### Tests for User Story 3

- [x] T013 [P] [US3] Playwright: `tests/e2e/hero.spec.ts` (add test) — assert elements with `aria-hidden="true"` present inside `#hero`; assert scroll chevron `<a>` with `aria-label="Scroll to about section"` present and `href="#about"`

### Implementation for User Story 3

- [x] T014 [P] [US3] Create `src/components/ui/geometry/GeometricDots.tsx` as Server Component: `<div aria-hidden="true" className="pointer-events-none select-none {className}">` wrapping inline SVG dot pattern (regular grid of small circles, `viewBox="0 0 800 600"`, `fill="white"`, opacity on each circle)
- [x] T015 [P] [US3] Create `src/components/ui/geometry/FibonacciSpiral.tsx` as Server Component: `<div aria-hidden="true" className="pointer-events-none select-none {className}">` wrapping inline SVG golden ratio spiral arcs (`viewBox="-200 -200 400 400"`, `stroke="white"`, `fill="none"`)
- [x] T016 [US3] Create `src/components/layout/ScrollChevron.tsx` as `'use client'` component: `<a href={href} aria-label={ariaLabel}>` wrapping `<motion.div animate={{ y: [0,8,0] }} transition={{ repeat: Infinity, duration: 1.5 }}>` with `ChevronDown` from lucide-react; calls `useReducedMotion()` and pauses animation when true
- [x] T017 [US3] Add geometry components to `HeroSection.tsx`: `<GeometricDots className="absolute inset-0 opacity-[0.35]" />` and `<FibonacciSpiral className="absolute inset-0 opacity-[0.35]" />`; add `<ScrollChevron href={HERO_DATA.scrollTarget} ariaLabel="Scroll to about section" />` below content

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T018 [P] Run Lighthouse on `/`: Performance >= 95, SEO >= 95, A11y >= 90, Best Practices >= 95
- [x] T019 [P] Verify no external network requests from hero section (Playwright network audit — already covered in layout e2e tests)
- [x] T020 [P] Update `docs/architecture/folder-structure.md` with new files: `src/components/sections/HeroSection.tsx`, `src/components/ui/geometry/`, `src/components/ui/HeroAnimations.tsx`, `src/components/layout/ScrollChevron.tsx`, `src/data/hero.ts`
- [x] T021 [P] Update `docs/architecture/tech-decisions.md`: mark `motion` and `lucide-react` as installed
- [x] T022 [P] Update `docs/architecture/components.md` with HeroSection, GeometricDots, FibonacciSpiral, HeroAnimations, ScrollChevron component docs
- [x] T023 Final gate: `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e` all green

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — MVP
- **User Story 2 (Phase 4)**: Depends on Phase 3 (HeroSection must exist for CTA verification)
- **User Story 3 (Phase 5)**: Depends on Foundational; can run in parallel with US2 (different files)
- **Polish (Phase 6)**: Depends on US1 + US2 + US3

### Within Each User Story

1. Tests written and FAILING before implementation (Constitution V)
2. Types/data → components → page integration
3. All tests pass before marking story complete
4. Commit per logical group

### Parallel Opportunities

- **Phase 1**: T002, T003 parallel (different files)
- **Phase 3 tests**: T006, T007 parallel (different test files)
- **Phase 3 impl**: T008, T009 parallel (different component files)
- **Phase 5 impl**: T014, T015, T016 parallel (different files)
- **Phase 6**: T018, T019, T020, T021, T022 parallel

---

## Constitution Compliance Checklist (per story)

After completing each user story:

- [ ] No `'use client'` without justification comment (US1: HeroAnimations — entrance animation; ScrollChevron — bounce animation; geometry: Server Component)
- [ ] Root layout already provides `generateMetadata` + JSON-LD (hero is part of homepage)
- [ ] No email/personal data in source or HTML
- [ ] `strict: true` TypeScript, no `any`, no unguarded `as`
- [ ] Vitest + Playwright tests pass
- [ ] `motion` and `lucide-react` justified (animation + icons per content-brief decision 1)
- [ ] Single `<h1>` with name, `aria-hidden` on decorative SVGs, `aria-label` on scroll chevron
- [ ] SSG only (verify `npm run build` output: homepage marked `○ (Static)`)

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 (deps + types) → Phase 2 (verify) → Phase 3 (US1)
2. Validate: open `/`, view-source shows `<h1>CARLOS SJM`, CTA links present
3. Commit

### Incremental Delivery

1. Setup + Foundational → types and data ready
2. US1 → Hero content visible, accessible, SEO-correct
3. US2 → CTAs functional (trivially true if hrefs are correct)
4. US3 → SVG backgrounds + scroll animation
5. Polish → Lighthouse + audits

---

## Notes

- All tasks inside `002-hero-section` branch
- Implementation MUST follow Constitution v1.0.0
- Total tasks: **23** (T001–T023)
- Per-phase breakdown: Setup 3, Foundational 2, US1 5, US2 2, US3 5, Polish 6
