# Feature Specification: Mobile Navigation (Hamburger Menu)

**Feature Branch**: `010-mobile-nav`
**Created**: 2026-08-05
**Status**: Draft

## User Scenarios & Testing

### User Story 1 — Visitor on mobile/tablet opens the nav via hamburger icon (Priority: P1)

On viewports narrower than the `md` breakpoint (768px), the horizontal nav list currently wraps and overflows, degrading the visual experience. A visitor on a phone or tablet needs a hamburger icon that opens a full-width drawer with all nav links.

**Why this priority**: The current Header is already live in production (merged in `001-layout-header`) and visibly breaks on small viewports. This is a regression fix, not new content.

**Independent Test**: Load `/` at a 375px viewport. Desktop `<ul>` nav is hidden; a hamburger button is visible. Clicking it opens a drawer with all `NAV_LINKS`. Clicking a link closes the drawer and navigates.

**Constitution Compliance**:
- Server-First: `Header` stays a Server Component; only the interactive drawer (`MobileNav`) is `'use client'` (justified: open/closed state + keyboard/DOM APIs)
- Accessibility: `aria-expanded`, `aria-controls`, `aria-label` on the toggle button; focus trap while open; Escape closes; focus returns to the toggle button on close
- SEO: nav links remain plain `<a>` tags in the DOM regardless of open state (no content hidden from crawlers via JS-only rendering)

**Acceptance Scenarios**:

1. **Given** a viewport `< 768px`, **When** the page loads, **Then** the desktop nav list is hidden and a hamburger button (`aria-label="Open menu"`) is visible
2. **Given** the hamburger button is clicked, **When** the drawer opens, **Then** all `NAV_LINKS` are visible, `aria-expanded="true"`, and the button becomes `aria-label="Close menu"`
3. **Given** the drawer is open, **When** the visitor presses `Escape`, **Then** the drawer closes and focus returns to the toggle button
4. **Given** the drawer is open, **When** the visitor clicks a nav link, **Then** the drawer closes and the URL hash updates
5. **Given** a viewport `>= 768px` (`md:`), **Then** the hamburger button is hidden and the existing desktop nav renders unchanged

**Vitest Coverage**:
- [x] `tests/unit/mobile-nav.test.tsx` — `MobileNav` renders closed by default; toggling state flips `aria-expanded`; `Escape` key handler closes when open

**Playwright Coverage**:
- [x] `tests/e2e/mobile-nav.spec.ts` — hamburger visible at 375px viewport; desktop nav hidden at 375px; drawer opens/closes; nav link click closes drawer + navigates; desktop nav visible and hamburger hidden at 1280px viewport

---

### User Story 2 — Accessibility: keyboard and screen reader support (Priority: P2)

A keyboard-only or screen-reader visitor must be able to open the drawer, navigate the links, and close it without a mouse.

**Why this priority**: WCAG 2.1 AA compliance is a constitution requirement (Accessibility principle); a broken mobile nav that's also inaccessible compounds the problem.

**Independent Test**: Tab to the hamburger button, press Enter/Space to open, Tab through links, press Escape to close — focus returns to the button.

**Constitution Compliance**:
- Accessibility: focus trap inside the open drawer (Tab/Shift+Tab cycle within it); `role="dialog"` `aria-modal="true"` on the drawer container

**Acceptance Scenarios**:

1. **Given** the drawer is open, **When** the visitor presses `Tab` repeatedly, **Then** focus cycles only among the drawer's focusable elements (does not escape to content behind it)
2. **Given** `prefers-reduced-motion: reduce`, **Then** the drawer open/close has no animated transition

**Playwright Coverage**:
- [x] `tests/e2e/mobile-nav.spec.ts` — focus trap cycles within drawer; closing restores focus to toggle button

### Edge Cases

- Body scroll is locked (`overflow-hidden`) while the drawer is open, restored on close
- Resizing from mobile to desktop while the drawer is open does not leave it stuck open behind the desktop nav (drawer state resets/hides via `md:hidden`)
- No third-party dialog/drawer library — native `<div role="dialog">`, matching the "minimal dependencies" principle

## Requirements

### Functional Requirements

- **FR-001**: Header MUST render a hamburger toggle button visible only `< md`, hidden `md:` and above
- **FR-002**: Header MUST render the existing desktop `<ul>` nav visible only `md:` and above, hidden below
- **FR-003**: Toggle button MUST open/close a full-viewport (or near full) drawer containing all `NAV_LINKS`
- **FR-004**: Drawer MUST close on: nav link click, Escape key, or clicking outside the drawer content
- **FR-005**: Toggle button MUST expose `aria-expanded` (boolean) and `aria-controls` (drawer id)
- **FR-006**: Drawer container MUST have `role="dialog"` and `aria-modal="true"`
- **FR-007**: Body scroll MUST be locked while drawer is open
- **FR-008**: All nav content MUST come from existing `NAV_LINKS` (`src/data/navigation.ts`) — no new data file needed

### Accessibility Requirements
- **A11Y-001**: Focus trap within the open drawer
- **A11Y-002**: Focus returns to toggle button on close
- **A11Y-003**: `aria-label` on toggle button changes between "Open menu" / "Close menu"
- **A11Y-004**: `prefers-reduced-motion` disables the drawer's entrance/exit transition

### Performance Requirements
- **PERF-001**: SSG — no runtime data fetching
- **PERF-002**: `MobileNav` is the only new client component; `Header` itself stays a Server Component
- **PERF-003**: No new dependencies — implemented with native DOM APIs and existing `lucide-react`/`motion` packages already installed

## Success Criteria

- **SC-001**: Lighthouse Performance >= 95, SEO >= 95, A11y >= 90
- **SC-002**: Vitest + Playwright all pass, including new mobile-viewport Playwright project/config
- **SC-003**: `npm run typecheck` + `npm run lint` zero errors
- **SC-004**: Manual check at 375px, 768px, and 1280px viewports confirms no overflow and correct nav visible at each breakpoint

## Assumptions

- Breakpoint is Tailwind's default `md` (768px), matching existing `md:` usage across Hero/About sections
- `lucide-react` `Menu` / `X` icons used for the toggle (already an approved dependency)
- `motion` (already installed) used for the drawer transition, respecting `useReducedMotion`
