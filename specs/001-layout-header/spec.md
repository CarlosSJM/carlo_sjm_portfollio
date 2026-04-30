# Feature Specification: Global Layout and Header

**Feature Branch**: `001-layout-header`
**Created**: 2026-04-30
**Status**: Draft
**Input**: User description: "Layout y header global para el portfolio: estructura base de pagina, fuentes, metadata global, JSON-LD, navegacion, footer, overlays esteticos (film grain, cursor crosshair) que comparten todas las paginas/secciones"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-time visitor lands on the portfolio (Priority: P1)

A potential employer or client opens `https://[domain]/` for the first time. The portfolio loads instantly from the CDN with the proper visual identity (dark theme, custom fonts, film grain overlay), they can see the page title and description in their browser tab, and search engines indexing the page have all the metadata they need to rank it. The visitor's browser does not load any third-party assets (fonts, icons, trackers).

**Why this priority**: Without the global layout, no other section can render. It is the foundation: typography, theme, metadata, JSON-LD, security headers, and accessibility primitives all live here. SEO ranking depends entirely on this layer being correct.

**Independent Test**: Open `/` in a browser, view source, and confirm: (a) page renders with custom fonts and dark background, (b) `<title>`, `<meta description>`, OG tags, and JSON-LD `Person`/`WebSite` are in the served HTML, (c) DevTools Network tab shows zero requests to googleapis.com, gravatar.com, or any third-party CDN, (d) Lighthouse SEO and Accessibility scores are >=95 and >=90 respectively.

**Constitution Compliance**:
- Server-First: All layout components are Server Components (no `'use client'`)
- SEO: Root `generateMetadata`, JSON-LD `Person` + `WebSite`, semantic `<main>`/`<header>`/`<footer>`/`<nav>`, `lang="en"` on `<html>`
- Privacy: Fonts via `next/font/google` (self-hosted), zero external CDNs, security headers active
- Accessibility: One `<h1>` reserved for page-level content, skip-to-content link, semantic landmarks

**Acceptance Scenarios**:

1. **Given** a visitor with JavaScript disabled, **When** they open `/`, **Then** the page still renders with fonts, theme, navigation links, and footer (server-rendered HTML).
2. **Given** a visitor on slow 3G, **When** they navigate the homepage, **Then** Largest Contentful Paint completes in under 1.5 seconds (Constitution VIII performance budget).
3. **Given** Googlebot crawls `/`, **When** it parses the HTML, **Then** it finds JSON-LD `Person` schema with name, jobTitle, sameAs, knowsAbout, plus `WebSite` schema with name and url.
4. **Given** a visitor checks DevTools Network on first load, **When** the page settles, **Then** zero requests go to `fonts.googleapis.com`, `cdnjs.cloudflare.com`, `unpkg.com`, or any other third-party domain.
5. **Given** a screen reader user lands on the page, **When** they activate the skip-to-content link (Tab + Enter), **Then** focus jumps directly to the `<main>` content past the navigation.

**Vitest Coverage**:
- Root `generateMetadata` returns title, description, canonical, OG, Twitter card with valid values
- JSON-LD builder functions produce valid `Person` and `WebSite` schemas (required fields present)
- Navigation data structure (`src/data/navigation.ts`) integrity: every link has label and anchor

**Playwright Coverage**:
- Page renders with `<html lang="en">`, `<title>`, `<main>`, `<header>`, `<footer>`, `<nav>` landmarks present
- Navigation anchor links scroll to the correct section IDs
- Skip-to-content link is keyboard-accessible and focuses `<main>`
- Footer copyright text and tagline render correctly
- No external network requests captured to third-party domains

---

### User Story 2 - Visitor navigates between sections (Priority: P2)

A visitor on the homepage clicks a link in the navigation (e.g., "Projects" or "Contact") and the page smoothly scrolls to that section. The active section is reflected in the URL hash so the visitor can share a deep link.

**Why this priority**: The portfolio is single-page (all sections on `/`), so navigation is anchor-based, not route-based. Without this, visitors cannot jump to specific sections. P2 because the page works without navigation (visitor can scroll), but UX is meaningfully better with it.

**Independent Test**: Click each navigation link and verify URL hash updates and the corresponding section is in viewport.

**Constitution Compliance**:
- Server-First: Anchor navigation uses native `<a href="#section">` — zero JavaScript needed
- SEO: Section IDs are stable and indexable
- Accessibility: Anchor links have descriptive labels, keyboard navigable

**Acceptance Scenarios**:

1. **Given** a visitor on `/`, **When** they click "Projects" in the nav, **Then** the URL becomes `/#projects` and the projects section is visible.
2. **Given** a visitor on `/#about`, **When** they refresh the page, **Then** the page loads scrolled to the about section.

**Vitest Coverage**:
- Navigation data: every nav link's anchor matches a known section ID

**Playwright Coverage**:
- Click each nav link, assert URL hash and section visibility

---

### User Story 3 - Visual identity overlays (Priority: P3)

The portfolio has aesthetic overlays that reinforce the design identity: a film grain texture on top of all content (subtle SVG noise) and a custom crosshair cursor across the entire page (pointer cursor on interactive elements). These render consistently on every section.

**Why this priority**: Pure aesthetic enhancement. The portfolio works without these, but they are part of the brand and make the design feel intentional. P3 because they are non-essential but expected by the design.

**Independent Test**: Visually inspect: (a) film grain overlay is visible at low opacity over all sections, (b) mouse cursor is crosshair globally and pointer on buttons/links.

**Constitution Compliance**:
- Server-First: Overlays are pure CSS / inline SVG — no JavaScript
- Accessibility: Custom cursor is purely visual (does not break click/focus); film grain has zero opacity impact on contrast (verified)
- Performance: SVG noise is inline (no extra request); CSS rules are < 1KB

**Acceptance Scenarios**:

1. **Given** a visitor on any section, **When** they look at the page, **Then** a subtle film grain is visible across the viewport.
2. **Given** a visitor moves their mouse, **When** they hover over text/background, **Then** the cursor is a crosshair; over buttons/links it becomes a pointer.

**Vitest Coverage**:
- Not applicable (purely visual, covered by Playwright)

**Playwright Coverage**:
- Visual snapshot test of homepage to verify overlay presence

---

### Edge Cases

- What happens when JavaScript is disabled? All structural content (header, nav, main, footer, fonts, theme, JSON-LD) must render. Only animations and Game of Life require JS.
- What happens when the visitor uses a screen reader? Skip-to-content link is the first focusable element. Landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`) are properly labeled. Decorative SVG overlays have `aria-hidden="true"`.
- What happens when a user has `prefers-reduced-motion` enabled? Film grain stays visible (it is static), but any future animations triggered from this layout must respect the preference.
- What happens when the viewport is very narrow (< 360px)? Navigation collapses gracefully (text wraps or hamburger pattern); no horizontal overflow.
- What happens when a section anchor in the URL hash does not exist? The page loads without scroll error; URL hash is preserved.
- What happens when the page is shared on Twitter/LinkedIn/WhatsApp? Open Graph image (1200x630) renders with name, role, and tagline.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a global layout with `<html lang="en">`, `<head>`, `<body>`, `<header>`, `<main>`, `<footer>` semantic structure on every page
- **FR-002**: System MUST load three custom typefaces (Space Grotesk, JetBrains Mono, Inter) self-hosted via the framework's font system
- **FR-003**: System MUST render a fixed/sticky navigation header with anchor links to each section (`#about`, `#skills`, `#experience`, `#projects`, `#education`, `#gameoflife`, `#contact`)
- **FR-004**: System MUST render a footer with copyright text and tagline
- **FR-005**: System MUST display a film grain SVG overlay at low opacity across the entire viewport
- **FR-006**: System MUST apply a `crosshair` cursor globally and `pointer` cursor on buttons and links
- **FR-007**: System MUST include a skip-to-content link as the first focusable element on the page
- **FR-008**: System MUST set the page background to dark (`#000000` or equivalent) and default text color to white

### SEO Requirements (per Constitution II)

- **SEO-001**: Root `generateMetadata` MUST export title (50-60 chars), description (150-160 chars), canonical, Open Graph (title, description, image 1200x630, url, type=website), Twitter card (summary_large_image, title, description, image)
- **SEO-002**: Root layout MUST embed JSON-LD `Person` schema with name, jobTitle, url, sameAs (LinkedIn, GitHub), knowsAbout (key technologies)
- **SEO-003**: Root layout MUST embed JSON-LD `WebSite` schema with name, url
- **SEO-004**: HTML MUST use semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` (not `<div>` soup)
- **SEO-005**: `<html>` MUST have `lang="en"` attribute

### Privacy Requirements (per Constitution III)

- **PRI-001**: No external CDNs for fonts, icons, or any other resource — fonts via `next/font`, icons inline or self-hosted
- **PRI-002**: No tracking scripts, analytics widgets, or third-party embeds
- **PRI-003**: Security headers active globally: `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`

### Accessibility Requirements (per Constitution VII)

- **A11Y-001**: Skip-to-content link is the first focusable element and visible on focus
- **A11Y-002**: Decorative overlays (film grain, geometric backgrounds) have `aria-hidden="true"`
- **A11Y-003**: Navigation links have descriptive text and meet WCAG AA contrast (4.5:1)
- **A11Y-004**: Color contrast across the layout meets WCAG AA on the dark background
- **A11Y-005**: Focus indicators are visible (no `outline: none` without replacement)

### Performance Requirements (per Constitution VIII)

- **PERF-001**: Layout renders as static HTML (SSG) — no `force-dynamic`
- **PERF-002**: Total layout JS bundle (excluding section-specific clients) < 5KB gzip
- **PERF-003**: Fonts load via `next/font` with `display: swap` and zero CLS
- **PERF-004**: Film grain overlay is inline SVG (no separate request)
- **PERF-005**: First-load TTFB < 200ms from Vercel CDN

### Key Entities

- **Navigation Link**: `label` (display text, e.g., "Projects"), `href` (anchor like `#projects`)
- **Site Metadata**: `siteName`, `siteUrl`, `defaultTitle`, `defaultDescription`, `ogImageUrl`, `twitterHandle` (optional)
- **Person Schema Data**: `name`, `jobTitle`, `url`, `sameAs[]`, `knowsAbout[]`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lighthouse Performance score on `/` >= 95
- **SC-002**: Lighthouse SEO score on `/` >= 95
- **SC-003**: Lighthouse Accessibility score on `/` >= 90
- **SC-004**: All Vitest tests for layout pass (`npm run test`)
- **SC-005**: All Playwright tests for layout pass (`npm run test:e2e`)
- **SC-006**: `npx tsc --noEmit` passes with zero errors
- **SC-007**: `npm run lint` passes with zero warnings
- **SC-008**: Visitors can complete first visual paint of the layout (text + theme + grain) in under 1 second on a fast connection
- **SC-009**: Zero requests to third-party domains during initial page load (verified in Playwright network log)
- **SC-010**: JSON-LD Person and WebSite schemas validate against Google Rich Results Test

## Assumptions

- All sections live on a single page (`/`) accessed via anchor navigation; multi-page routing is not part of this feature
- Single language (English) for now; i18n is out of scope (deferred to roadmap M8)
- Only dark theme; light theme is out of scope (deferred to roadmap M8, task #4)
- Profile image is a placeholder SVG until a real photo is provided (task #22)
- LinkedIn and GitHub URLs are placeholders until real ones are provided (task #23)
- The site is served from Vercel CDN with default Vercel network performance characteristics
- The visitor's browser supports modern CSS (Tailwind v4 target: Chrome 111+, Safari 16.4+, Firefox 128+)
