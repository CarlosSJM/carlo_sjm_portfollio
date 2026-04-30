---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md
**Constitution**: `.specify/memory/constitution.md` v1.0.0

**Tests**: Vitest (unit/integration) and Playwright (e2e) tasks are INCLUDED by default
per Constitution V. Testing Discipline.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions (Next.js App Router)

- **Pages**: `src/app/[route]/page.tsx`
- **Layouts**: `src/app/[route]/layout.tsx`
- **API Routes**: `src/app/api/[endpoint]/route.ts`
- **Components**: `src/components/{layout,sections,contact,ui}/[Name].tsx`
- **Data**: `src/data/[entity].ts`
- **Types**: `src/types/index.ts`
- **Lib/Utils**: `src/lib/[module].ts`
- **Unit tests**: `tests/unit/[module].test.ts`
- **Integration tests**: `tests/integration/[feature].test.ts`
- **E2E tests**: `tests/e2e/[flow].spec.ts`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Constitution checks (SEO, privacy, a11y, performance, type safety)
  - Feature requirements from plan.md
  - Data entities from src/data/

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure and shared types for this feature

- [ ] T001 Define TypeScript types/interfaces in `src/types/index.ts`
- [ ] T002 [P] Create data file(s) in `src/data/[entity].ts` with typed exports
- [ ] T003 [P] Create lib helpers in `src/lib/[module].ts` if needed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Ensure root layout has JSON-LD structured data (`src/lib/schema.ts`)
- [ ] T005 [P] Ensure `src/app/sitemap.ts` includes new routes
- [ ] T006 [P] Ensure security headers in `next.config.ts` are present
- [ ] T007 Verify `tsconfig.json` has `strict: true`

**Constitution Gate**: Run before proceeding:
- `npx tsc --noEmit` — zero errors
- `npm run lint` — zero warnings

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1

> **Write tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Vitest: test `generateMetadata` output in `tests/unit/[page]-metadata.test.ts`
- [ ] T009 [P] [US1] Vitest: test data integrity in `tests/unit/[data].test.ts`
- [ ] T010 [P] [US1] Playwright: page renders with correct h1 in `tests/e2e/[page].spec.ts`

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create Server Component in `src/components/sections/[Name].tsx`
- [ ] T012 [US1] Create page at `src/app/[route]/page.tsx` with `generateMetadata`
- [ ] T013 [US1] Add semantic HTML (heading hierarchy, landmarks, alt text)
- [ ] T014 [US1] Style with Tailwind CSS (responsive, contrast AA)
- [ ] T015 [US1] Verify `npm run test` passes (Vitest)
- [ ] T016 [US1] Verify `npm run test:e2e` passes (Playwright)

**Checkpoint**: User Story 1 fully functional, tested, accessible

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2

- [ ] T017 [P] [US2] Vitest: [specific test] in `tests/unit/[name].test.ts`
- [ ] T018 [P] [US2] Playwright: [specific test] in `tests/e2e/[name].spec.ts`

### Implementation for User Story 2

- [ ] T019 [P] [US2] Create component in `src/components/[category]/[Name].tsx`
- [ ] T020 [US2] Create/update page with `generateMetadata`
- [ ] T021 [US2] Verify all tests pass

**Checkpoint**: User Stories 1 AND 2 both work independently

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Update `/docs/` documentation (architecture, SEO, components)
- [ ] TXXX [P] Update `docs/INDEX.md` if new docs added
- [ ] TXXX Run Lighthouse audit: Performance >= 95, SEO >= 95, A11y >= 90
- [ ] TXXX Verify total JS bundle < 50KB gzip
- [ ] TXXX Verify all pages are SSG (no `force-dynamic`)
- [ ] TXXX Final `npm run lint && npx tsc --noEmit && npm run test && npm run test:e2e`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
  - Stories can proceed in parallel (if independent)
  - Or sequentially in priority order (P1 > P2 > P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Within Each User Story

1. Tests MUST be written and FAIL before implementation (Constitution V)
2. Types/data before components
3. Components before pages
4. Core implementation before styling
5. All tests pass before marking story complete
6. Commit with Conventional Commits after each logical group

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All tests for a user story marked [P] can run in parallel
- Components within a story marked [P] can run in parallel
- Different user stories can proceed in parallel if no shared state

---

## Constitution Compliance Checklist (per story)

Run after completing each user story:

- [ ] No `'use client'` without justification comment
- [ ] `generateMetadata` with title, description, canonical, OG
- [ ] No email/personal data in source or HTML
- [ ] `strict: true` TypeScript, no `any`, no unguarded `as`
- [ ] Vitest + Playwright tests pass
- [ ] No new unjustified dependencies
- [ ] One h1, correct heading hierarchy, aria-labels, contrast AA
- [ ] SSG only, LCP < 1.5s target met
