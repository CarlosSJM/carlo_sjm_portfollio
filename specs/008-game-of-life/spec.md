# Feature Specification: Game of Life Section

**Feature Branch**: `008-game-of-life`
**Created**: 2026-09-03
**Status**: Draft

## Scope decision

`docs/content-brief.md` originally scoped M3 as a "simple version" (toggle + play/pause/reset + auto-step), deferring presets, speed control, cell size control, and generation/population counters to a future task (#21). The actual Figma export (`GameOfLife.tsx`) already implements the full-featured version. **Decision (user, 2026-09-03): ship the full Figma version now** rather than the scoped-down one — it's already designed and coded, and closes task #21 in the same pass instead of leaving it as a stub.

## Post-implementation user feedback (2026-09-03)

After the first manual test, the user flagged three UX gaps not covered by the original spec:

1. **"Al dar a PLAY por primera vez no sale nada"** — the grid started empty, so Conway's rules produce no visible change on an all-dead board. Fix: seed the grid with a random population (`createRandomGrid`, same 30% density as Randomize) on mount and whenever the grid is resized (cell size / dimensions change), instead of `createEmptyGrid`. The explicit **Reset** button still clears to empty (drawing-your-own-pattern use case is unaffected). **Randomize** behavior unchanged.
2. **Missing help/explanation for newcomers** — added a "?" (`CircleHelp`) button, top-right of the canvas overlay (mirrors the stats overlay's position), opening an accessible modal (`GameOfLifeHelp.tsx`, portal-rendered to `document.body`, `role="dialog"`, focus trap, Escape/backdrop/✕ to close, focus restored to the trigger button on close — same accessible-dialog pattern as `MobileNav`). Content: what a cellular automaton is, the four Conway rules spelled out, and a plain-language explanation of every control (click-to-toggle, Play/Pause, Reset, Randomize, Speed, Cell size, Glider/Pulsar).
3. **First paragraph didn't explain what Game of Life actually is** — `GAME_OF_LIFE_DATA.description` rewritten to lead with a concrete definition ("a cellular automaton: a grid of cells that live, die, or are born each generation following four simple rules...") instead of only "a zero-player game that demonstrates emergent complexity."

**Bug found while implementing the help modal**: same class of bug as `010-mobile-nav` — the backdrop used `flex items-center` for vertical centering; since the modal's content (rules + 7 control descriptions) is taller than the viewport, the top portion became unreachable by scroll (centered-flex-item overflow is not scrollable toward the cross-axis start in the direction needed). Fixed with `items-start` instead of `items-center`, same resolution as the mobile nav drawer's `justify-start` fix.

**New tests**: Playwright `help modal` describe block (3 tests: opens with rules+controls content, closes via ✕ + focus restore, closes via Escape) + a dedicated "grid is seeded with a random population on load" test. Existing click-to-toggle tests updated to explicitly `Reset` first (grid is no longer deterministically empty on load, so those assertions needed a known starting state).

## User Scenarios & Testing

### User Story 1 — Visitor reads what the section is about (Priority: P1)

A visitor scrolls to the Game of Life section and understands what it is before interacting: title, explanation of the "zero-player game" concept.

**Independent Test**: Navigate to `/#gameoflife`. Eyebrow "INTERACTIVE", `<h3>` "CONWAY'S GAME OF LIFE", and the description paragraph are visible without JS.

**Constitution Compliance**:
- Server-First: heading/copy render server-side; only the interactive grid itself is client
- SEO: `<h2>` eyebrow + `<h3>` heading (correct hierarchy after Experience's headings)
- Accessibility: heading hierarchy continues correctly

**Acceptance Scenarios**:
1. **Given** a visitor navigates to `/#gameoflife`, **When** the section loads, **Then** eyebrow, heading, and description are visible
2. **Given** JavaScript is disabled, **Then** the copy is visible; the interactive grid shows a static/empty state instead of the canvas (progressive enhancement — see US2)

**Vitest Coverage**:
- [x] `tests/unit/game-of-life.test.ts` — `GAME_OF_LIFE_DATA` has non-empty `eyebrow`, `heading`, `description`

**Playwright Coverage**:
- [x] `tests/e2e/game-of-life.spec.ts` — eyebrow "INTERACTIVE" and heading "CONWAY'S GAME OF LIFE" visible

---

### User Story 2 — Visitor plays with the grid: toggle, play/pause, reset, randomize (Priority: P1)

A visitor clicks cells on the grid to toggle them alive/dead, presses Play to watch Conway's rules evolve the grid automatically, Pause to stop, Reset to clear, and Randomize to seed a random population.

**Why this priority**: Core interactive value of the section — this is the "zero-player game" demo itself.

**Independent Test**: Click a cell → it turns white (alive). Click Play → generation counter increments automatically. Click Pause → it stops. Click Reset → grid clears, generation resets to 0. Click Randomize → grid fills with a random population (~30% alive), generation resets to 0.

**Constitution Compliance**:
- Server-First: `GameOfLife` is `'use client'` (canvas + interaction state, unavoidable), loaded via `next/dynamic(..., { ssr: false })` from a Server Component container (`GameOfLifeSection`) — matches the pattern already documented for this section in `docs/architecture/components.md` and `docs/content-brief.md`
- Minimal Dependencies: no new packages — canvas is native Web API, `lucide-react`/`motion` already installed
- Testing-First: Conway's rules (neighbor counting, birth/survival/death) extracted into a pure, dependency-free module (`src/lib/gameOfLife.ts`) so they're fully unit-testable in jsdom (jsdom's `canvas.getContext('2d')` is `null` without a native canvas polyfill — not installed, per Minimal Dependencies — so canvas drawing itself is verified in Playwright/real Chromium, not Vitest)

**Acceptance Scenarios**:
1. **Given** the grid is idle (not playing), **When** a visitor clicks a cell, **Then** that cell toggles alive/dead and re-renders immediately
2. **Given** the grid has a live cell with 2 or 3 live neighbors, **When** a generation advances, **Then** that cell survives
3. **Given** a live cell has fewer than 2 or more than 3 live neighbors, **When** a generation advances, **Then** that cell dies
4. **Given** a dead cell has exactly 3 live neighbors, **When** a generation advances, **Then** that cell becomes alive
5. **Given** the grid is playing, **When** a visitor clicks Pause, **Then** the automatic stepping stops and the current state is preserved
6. **Given** any grid state, **When** a visitor clicks Reset, **Then** the grid clears to all-dead and generation returns to 0
7. **Given** any grid state, **When** a visitor clicks Randomize, **Then** the grid reseeds randomly and generation returns to 0
8. **Given** the grid is playing, **When** a visitor clicks a cell, **Then** the click is a no-op (matches Figma source: editing is disabled while playing, to avoid fighting the simulation)

**Vitest Coverage**:
- [x] `tests/unit/game-of-life.test.ts` — `countNeighbors` (toroidal wraparound at edges), `nextGeneration` (all 4 Conway rules), `createEmptyGrid`/`createRandomGrid` dimensions, `GLIDER_PATTERN`/`PULSAR_PATTERN` cell counts and bounds

**Playwright Coverage**:
- [x] `tests/e2e/game-of-life.spec.ts` — click toggles a cell (stats overlay POPULATION goes from 0 to 1); Play increments GENERATION over time; Pause stops it; Reset clears POPULATION to 0; Randomize sets POPULATION > 0

---

### User Story 3 — Visitor uses advanced controls: presets, speed, cell size (Priority: P2)

A visitor loads a classic pattern (Glider, Pulsar), adjusts simulation speed with a slider, and adjusts cell size (zoom) with a slider.

**Why this priority**: Enriches the demo (closes task #21) but the section is fully functional/understandable without it — core toggle+play/pause+reset (US2) stands alone.

**Independent Test**: Click "GLIDER" → a 5-cell glider pattern appears centered on the grid. Click "PULSAR" → the pulsar pattern appears. Drag the speed slider → the displayed "gen/s" value changes and playback speed changes accordingly. Drag the cell size slider → cells visibly resize and the grid re-partitions (rows/cols recompute), clearing to empty (matches Figma source behavior: changing cell size invalidates the grid).

**Constitution Compliance**:
- Accessibility: sliders are native `<input type="range">` with visible `<label>` text showing the current value (not color/icon-only)

**Acceptance Scenarios**:
1. **Given** the grid, **When** a visitor clicks GLIDER, **Then** the glider pattern is loaded, generation resets to 0, and playback pauses
2. **Given** the grid, **When** a visitor clicks PULSAR, **Then** the pulsar pattern is loaded, generation resets to 0, and playback pauses
3. **Given** the speed slider, **When** dragged, **Then** the "SPEED: X gen/s" label updates and playback interval changes
4. **Given** the cell size slider, **When** dragged, **Then** cell size updates, the grid clears, and playback pauses

**Vitest Coverage**:
- [x] `tests/unit/game-of-life.test.ts` — `GLIDER_PATTERN` and `PULSAR_PATTERN` cell coordinates are within grid bounds when centered on a representative grid size

**Playwright Coverage**:
- [x] `tests/e2e/game-of-life.spec.ts` — GLIDER/PULSAR buttons load a non-empty grid (POPULATION > 0); speed slider changes the displayed gen/s label; cell size slider changes displayed cell size label

---

### User Story 4 — Scroll-triggered entrance animation (Priority: P3)

The section heading and the grid fade/slide in as the visitor scrolls to it, matching every other section's entrance treatment.

**Constitution Compliance**:
- `useReducedMotion` respected — no animation if the user prefers reduced motion

**Playwright Coverage**:
- [x] `tests/e2e/game-of-life.spec.ts` — content visible after scrolling into view

### Edge Cases

- **Responsive canvas click accuracy**: the Figma source computes click→cell coordinates directly from `clientX/clientY - rect.left/top`, without correcting for the canvas being rendered at a different CSS size than its internal pixel resolution (`width={1200} height={500}` scaled down via `w-full h-auto` on any viewport narrower than 1200px — i.e. virtually all of them). This mis-maps every click below desktop-wide viewports. **Fixed during porting**: scale click coordinates by `canvas.width / rect.width` and `canvas.height / rect.height` before dividing by `cellSize`.
- **`noUncheckedIndexedAccess`**: this project's `tsconfig.json` has it enabled; the Figma source assumes `grid[row][col]` is always defined. Ported logic in `src/lib/gameOfLife.ts` handles the `T | undefined` array-index type explicitly (no unguarded `as`/`!`).
- **Immutable grid updates**: the Figma source's cell-toggle handler does `const newGrid = [...grid]; newGrid[x][y] = ...`, which shallow-copies the outer array but still mutates a shared inner row array. Ported logic does a proper immutable update (new row array, new outer array).
- Toroidal (wraparound) edges for neighbor counting — matches Figma source, kept as-is (classic Conway variant)
- No horizontal overflow at any breakpoint — manual browser verification via Claude-in-Chrome required per `CLAUDE.md` before declaring this feature done

## Requirements

### Functional Requirements

- **FR-001**: Game of Life section MUST render as `<section id="gameoflife">` replacing the placeholder
- **FR-002**: MUST display eyebrow "INTERACTIVE" (centered, decorative lines both sides) and `<h3>` "CONWAY'S GAME OF LIFE" and the description paragraph, sourced from `GAME_OF_LIFE_DATA` (`src/data/gameOfLife.ts`)
- **FR-003**: MUST render an interactive `<canvas>` grid, click-to-toggle cells when not playing
- **FR-004**: MUST provide Play/Pause, Reset (clear), and Randomize controls
- **FR-005**: MUST provide Glider and Pulsar preset buttons
- **FR-006**: MUST provide a speed slider (20–500ms/generation) and a cell size slider (4–16px)
- **FR-007**: MUST display live GENERATION and POPULATION counters overlaid on the canvas
- **FR-008**: `GameOfLife` (canvas + controls) MUST be `'use client'`, loaded via `next/dynamic(..., { ssr: false })` from the Server Component `GameOfLifeSection`, with a loading skeleton for the pre-hydration state
- **FR-009**: Conway's rules and grid helpers (`countNeighbors`, `nextGeneration`, `createEmptyGrid`, `createRandomGrid`, `GLIDER_PATTERN`, `PULSAR_PATTERN`) MUST live in `src/lib/gameOfLife.ts`, pure and framework-independent
- **FR-010**: Click coordinates MUST be scaled to the canvas's actual pixel resolution regardless of its rendered CSS size (fixes the responsive click bug noted above)

### Accessibility Requirements
- **A11Y-001**: All buttons have visible text labels (not icon-only); icons are `aria-hidden`
- **A11Y-002**: Sliders have visible `<label>` text showing the current value
- **A11Y-003**: The canvas has an `aria-label` describing its purpose; known limitation documented — a click-to-toggle canvas grid has no keyboard-equivalent interaction (matches the Figma source's interaction model; full keyboard support is out of scope, tracked as a future improvement alongside task #21's remaining ideas if ever revisited)
- **A11Y-004**: Heading hierarchy continues correctly (h3 after Experience's h3)

### Performance Requirements
- **PERF-001**: SSG for all copy; only the canvas/controls subtree is client-rendered (`ssr: false`)
- **PERF-002**: No new dependencies
- **PERF-003**: `setInterval`-based game loop, cleared on unmount/pause — no leaked timers

## Success Criteria

- **SC-001**: Lighthouse Performance >= 95, SEO >= 95, A11y >= 90
- **SC-002**: Vitest + Playwright all pass
- **SC-003**: `npm run typecheck` + `npm run lint` zero errors (including `noUncheckedIndexedAccess` compliance)
- **SC-004**: Section copy visible and readable without JS; interactive grid clearly a progressive enhancement
- **SC-005**: Manually verified in Chrome at 375px, 768px, and 1280px viewports — including an actual click-to-toggle test at a narrow viewport to confirm the coordinate-scaling fix — before merge, per `CLAUDE.md` manual verification rule

## Assumptions

- Copy (eyebrow/heading/description) is final per `docs/content-brief.md` §7 and the Figma source, unchanged
- `motion` and `lucide-react` already installed
- Icons used: `Play`, `Pause`, `RotateCcw`, `Shuffle`, `Grid3x3`, `Zap` (all from `lucide-react`, matching the Figma source)
- Canvas internal resolution stays fixed at 1200×500 (matches Figma source `<GameOfLife width={1200} height={500} />`); responsive behavior comes from CSS scaling (`w-full h-auto`), not from recomputing grid dimensions per viewport
