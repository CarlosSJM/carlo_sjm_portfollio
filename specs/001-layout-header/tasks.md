---
description: "Task list for implementing 001-layout-header"
---

# Tasks: Global Layout and Header

**Input**: Design documents from `/specs/001-layout-header/`
**Prerequisites**: spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md
**Constitution**: `.specify/memory/constitution.md` v1.0.0

**Tests**: Vitest (unit/integration) and Playwright (e2e) tasks INCLUDED per Constitution V.

**Organization**: Tasks grouped by user story (US1, US2, US3) for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 (P1 foundation), US2 (P2 navigation), US3 (P3 visual overlays)

## Path Conventions (Next.js App Router)

- Pages/layouts: `src/app/`
- Components: `src/components/layout/`
- Lib: `src/lib/`
- Data: `src/data/`
- Types: `src/types/`
- Tests: `tests/{unit,e2e}/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and shared types for this feature

- [x] T001 [P] Define types `NavLink`, `SiteConfig`, `PersonSchemaData` in `src/types/index.ts`
- [x] T002 [P] Create `SITE` constant in `src/lib/site.ts` (uses `process.env.NEXT_PUBLIC_SITE_URL`)
- [x] T003 [P] Create `NAV_LINKS` data in `src/data/navigation.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Configure `next/font/google` for Space Grotesk, JetBrains Mono, Inter inside `src/app/layout.tsx` and expose CSS variables on `<html>`
- [x] T005 Update `src/app/globals.css` with Tailwind v4 `@theme inline` design tokens (colors, font variables) and base styles (cursor crosshair rules, scroll-margin-top, scroll-behavior smooth with reduced-motion fallback)
- [x] T006 Verify `next.config.ts` security headers are active (already configured in M1; just smoke-test)

**Constitution Gate**: Run before proceeding:
- `npm run typecheck` — zero errors
- `npm run lint` — zero warnings

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — First-time visitor lands on the portfolio (Priority: P1) MVP

**Goal**: Render the global layout with metadata, JSON-LD, semantic landmarks, fonts, theme. The portfolio is discoverable, accessible, and privacy-respecting on first load.

**Independent Test**: Open `/` → view source confirms `<title>`, OG tags, JSON-LD `Person` + `WebSite`, landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`); DevTools Network shows zero third-party requests; Lighthouse SEO >= 95 and A11y >= 90.

### Tests for User Story 1 (write FIRST, ensure they FAIL before implementation)

- [ ] T007 [P] [US1] Vitest: `tests/unit/site.test.ts` — `SITE` constant has all required fields; `defaultTitle` 50-60 chars; `defaultDescription` 150-160 chars; `url` is valid URL
- [ ] T008 [P] [US1] Vitest: `tests/unit/metadata.test.ts` — `buildMetadata()` returns title, description, canonical, openGraph (with image 1200x630), twitter card with valid values; supports overrides
- [ ] T009 [P] [US1] Vitest: `tests/unit/schema.test.ts` — `buildPersonSchema()` returns `@context`, `@type: Person`, name, jobTitle, url, sameAs[], knowsAbout[]; `buildWebSiteSchema()` returns `@context`, `@type: WebSite`, name, url
- [ ] T010 [P] [US1] Playwright: `tests/e2e/layout.spec.ts` — landmarks (`<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<footer>`) present; `<html lang="en">`; title and description meta tags present; footer text matches expected
- [ ] T011 [P] [US1] Playwright: `tests/e2e/privacy.spec.ts` — load `/` and assert zero requests go to googleapis.com, gstatic.com, cdnjs, unpkg, jsdelivr (network audit)

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement `buildMetadata(overrides?)` in `src/lib/metadata.ts` per contracts/components.md
- [ ] T013 [P] [US1] Implement `buildPersonSchema()` and `buildWebSiteSchema()` in `src/lib/schema.ts` per contracts/components.md
- [ ] T014 [P] [US1] Implement `<Footer>` Server Component in `src/components/layout/Footer.tsx` with `currentYear = new Date().getFullYear()`, copyright + tagline
- [ ] T015 [P] [US1] Implement `<SkipToContent>` Server Component in `src/components/layout/SkipToContent.tsx` with `sr-only`/`focus:not-sr-only` styles
- [ ] T016 [P] [US1] Implement `<FilmGrain>` Server Component in `src/components/layout/FilmGrain.tsx` with inline SVG `feTurbulence` and `aria-hidden="true"`
- [ ] T017 [US1] Update `src/app/layout.tsx`: apply font CSS variables to `<html>`, set `lang="en"`, export `metadata` from `buildMetadata()`, render `<head>` JSON-LD scripts (Person + WebSite), wrap children in `<SkipToContent /> <FilmGrain /> <Header /> <main id="main">{children}</main> <Footer />`
- [ ] T018 [US1] Replace default `src/app/page.tsx` with placeholder that includes `<section id="about">`, `<section id="skills">`, ... `<section id="contact">` empty sections so anchor navigation tests pass (real content lands in subsequent features)

**Checkpoint**: User Story 1 fully functional, tested, accessible. Lighthouse on `/` >= 95/95/90.

---

## Phase 4: User Story 2 — Visitor navigates between sections (Priority: P2)

**Goal**: Anchor navigation lets visitors jump to any section and share deep links via URL hash.

**Independent Test**: Click each nav link, URL hash updates and section is in viewport.

### Tests for User Story 2

- [ ] T019 [P] [US2] Vitest: `tests/unit/navigation.test.ts` — every `NAV_LINKS` entry has `label` (non-empty) and `href` starting with `#`
- [ ] T020 [P] [US2] Playwright: `tests/e2e/navigation.spec.ts` — click each nav link, assert URL hash matches expected (`#about`, `#skills`, etc.); navigate to `/#projects` directly and assert no console errors

### Implementation for User Story 2

- [ ] T021 [US2] Implement `<Header>` Server Component in `src/components/layout/Header.tsx` with `position: sticky`, `aria-label="Main"` nav, render `NAV_LINKS` as `<a href="#...">` items, optional logo/name link to `/`
- [ ] T022 [US2] Stub `src/app/sitemap.ts` returning the homepage URL (full sitemap in M4)
- [ ] T023 [US2] Stub `src/app/robots.ts` allowing all and pointing to sitemap (full robots in M4)

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 — Visual identity overlays (Priority: P3)

**Goal**: Film grain overlay and crosshair cursor active across the site.

**Independent Test**: Visual check (via Playwright snapshot) confirms grain overlay and cursor styles applied.

### Tests for User Story 3

- [ ] T024 [P] [US3] Playwright: `tests/e2e/visual-overlay.spec.ts` — assert `<div aria-hidden="true">` for film grain is present in DOM at z-50 with `pointer-events: none`; assert computed `cursor` style on `body` is `crosshair`; assert computed `cursor` on a button/link is `pointer`

### Implementation for User Story 3

- [ ] T025 [US3] Verify FilmGrain (T016) and globals.css cursor rules (T005) cover all FR-005 / FR-006 / A11Y-002 requirements; adjust if Playwright check fails

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T026 [P] Run Lighthouse on `/`: Performance >= 95, SEO >= 95, A11y >= 90, Best Practices >= 95 (record results in `specs/001-layout-header/quickstart.md` or commit message)
- [ ] T027 [P] Validate JSON-LD with Google Rich Results Test (paste rendered HTML); record any warnings
- [ ] T028 [P] Verify HTTP security headers via `curl -I http://localhost:3000`
- [ ] T029 Update `docs/architecture/folder-structure.md` if anything changed; ensure `docs/INDEX.md` references are current
- [ ] T030 Final gate: `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e` all green

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — MVP
- **User Story 2 (Phase 4)**: Depends on Foundational + US1 (Header consumes layout primitives)
- **User Story 3 (Phase 5)**: Depends on Foundational; can run in parallel with US2
- **Polish (Phase 6)**: Depends on US1 + US2 + US3

### Within Each User Story

1. Tests written and FAILING before implementation (Constitution V)
2. Types/data → lib helpers → components → page integration
3. All tests pass before marking story complete
4. Commit per logical group

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 can all run in parallel (different files)
- **Phase 3 tests**: T007–T011 all parallel (different test files)
- **Phase 3 implementation**: T012–T016 parallel (different files); T017–T018 sequential because they touch app/
- **Phase 4 tests**: T019, T020 parallel
- **Phase 6**: T026, T027, T028 parallel

---

## Constitution Compliance Checklist (per story)

After completing each user story, verify:

- [ ] No `'use client'` without justification comment (US1: zero clients; US2: zero clients; US3: zero clients)
- [ ] `generateMetadata` with title, description, canonical, OG (root layout)
- [ ] No email/personal data in source or HTML
- [ ] `strict: true` TypeScript, no `any`, no unguarded `as`
- [ ] Vitest + Playwright tests pass
- [ ] No new unjustified dependencies (this feature adds zero deps)
- [ ] Skip-to-content link, landmarks, aria-label on nav, focus indicators, contrast AA
- [ ] SSG only (verify `npm run build` output: routes marked `○ (Static)`)

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1)
2. Validate independently: open `/`, view source, run tests
3. Deploy to preview if desired (sections empty, but layout fully functional)

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Layout MVP
3. Add US2 → Navigation works
4. Add US3 → Visual identity complete
5. Polish phase → Lighthouse + audits

---

## Notes

- All tasks are inside the `001-layout-header` branch
- Implementation MUST follow Constitution v1.0.0 (especially Server-First and Privacy-First)
- After all tasks done, run `/speckit-implement` is NOT needed — these tasks are designed for manual execution by Claude Code following this list
- Total tasks: **30** (T001–T030)
- Per-story breakdown: Setup 3, Foundational 3, US1 12, US2 5, US3 2, Polish 5
