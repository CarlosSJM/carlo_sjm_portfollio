<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Added principles: I–VIII (initial constitution)
- Added sections: Quality Standards, Development Workflow, Governance
- Templates updated:
  - .specify/templates/plan-template.md ✅ customized (Technical Context, Project Structure, Constitution Check)
  - .specify/templates/spec-template.md ✅ customized (Constitution Compliance per story, SEO/Privacy/A11y/Perf requirements)
  - .specify/templates/tasks-template.md ✅ customized (Path Conventions, Constitution Gate, Compliance Checklist)
- Follow-up TODOs: none
-->

# Portfolio Carlos SJM Constitution

## Core Principles

### I. Server-First Rendering (NON-NEGOTIABLE)

All components MUST be React Server Components by default. The `'use client'`
directive is ONLY permitted when the component requires browser APIs, event
handlers, or React state/effects. Every `'use client'` usage MUST be justified
in a code comment explaining why server rendering is insufficient.

Rationale: Server Components produce zero client JS, yielding the fastest LCP
and smallest bundle — critical for SEO ranking and Core Web Vitals.

### II. SEO-First Architecture (NON-NEGOTIABLE)

Every page MUST export `generateMetadata` (or static `metadata`) with unique
title (50-60 chars), description (150-160 chars), canonical URL, and Open Graph
tags. JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`) MUST be
present in the root layout. The project MUST include `app/sitemap.ts` and
`app/robots.ts`. All images MUST use `next/image` with `alt` text. All fonts
MUST use `next/font`.

Rationale: The primary purpose of this portfolio is discoverability. SEO is not
an afterthought — it drives every architectural decision.

### III. Privacy-First Contact (NON-NEGOTIABLE)

The owner's real email MUST NEVER appear in source code, HTML output, HTTP
headers, or API responses. Contact form submissions MUST be processed entirely
server-side via Route Handlers + Resend API. The recipient email MUST be stored
exclusively in Vercel environment variables. An addy.io alias SHOULD be used
as the `CONTACT_EMAIL` to add a second privacy layer.

Social media links MUST use `rel="noopener noreferrer"`, self-hosted SVG icons
(no external CDNs), and zero tracking parameters. The `Referrer-Policy` header
MUST be set to `strict-origin-when-cross-origin` or stricter.

### IV. Strict Type Safety (NON-NEGOTIABLE)

TypeScript strict mode MUST be enabled (`strict: true` in tsconfig.json).
The `any` type is FORBIDDEN — use `unknown` with type guards instead. Type
assertions (`as`) are FORBIDDEN unless accompanied by a runtime check or a
comment explaining why the assertion is safe. All function parameters and return
types MUST be explicitly typed. Shared types MUST live in `src/types/`.

Rationale: A portfolio demonstrates professional standards. Loose typing signals
lack of rigor to potential employers reviewing the codebase.

### V. Testing Discipline

Unit and integration tests MUST use **Vitest**. End-to-end tests MUST use
**Playwright**. Tests MUST cover:
- All `generateMetadata` exports (correct title, description, OG tags)
- JSON-LD schema output (valid structured data)
- Contact form validation and submission (server-side Route Handler)
- Data integrity of `src/data/` files (no broken links, no empty fields)
- Page rendering and navigation (Playwright)
- Accessibility basics (heading hierarchy, alt text, aria-labels)

Tests MUST pass before any commit to main. `npm run test` MUST execute Vitest.
`npm run test:e2e` MUST execute Playwright.

### VI. Minimal Dependencies

No package MUST be installed if Next.js, React, or the Node.js standard library
already provides equivalent functionality. Every new dependency MUST be
justified in the commit message or PR description. Runtime dependencies
(non-dev) MUST be kept under 10 packages total. Icon libraries, CSS-in-JS
runtimes, and form libraries are FORBIDDEN — use Tailwind CSS utilities,
native HTML forms, and self-hosted SVGs.

Rationale: Fewer dependencies = smaller attack surface, smaller bundle, fewer
breaking upgrades, less maintenance burden.

### VII. Accessibility (WCAG 2.1 AA)

Every page MUST have exactly one `<h1>`. Heading levels MUST NOT skip (no h1
directly to h3). All interactive elements MUST be keyboard-accessible. All
images MUST have descriptive `alt` text. Icon-only buttons/links MUST have
`aria-label`. Color contrast MUST meet WCAG AA ratios (4.5:1 for normal text,
3:1 for large text). Lighthouse accessibility score MUST be >= 90.

### VIII. Performance Budget

Target thresholds for production pages:

| Metric | Target |
|--------|--------|
| LCP | < 1.5s |
| INP | < 100ms |
| CLS | < 0.05 |
| Total JS bundle | < 50KB (gzipped) |
| Lighthouse Performance | >= 95 |
| Lighthouse Accessibility | >= 90 |
| Lighthouse SEO | >= 95 |

All pages MUST be statically generated (SSG). `force-dynamic` is FORBIDDEN.
ISR (`revalidate`) is ONLY permitted for pages fetching external APIs.

## Quality Standards

### Code Style

- ESLint with `eslint-config-next` MUST pass with zero warnings
- Conventional Commits MUST be used: `feat:`, `fix:`, `docs:`, `test:`,
  `refactor:`, `style:`, `chore:`
- Files MUST use named exports (no default exports except Next.js pages/layouts)
- Components MUST be in PascalCase files, utilities in camelCase files

### Data Architecture

- All editable content MUST live in `src/data/` as typed TypeScript objects
- Components MUST NEVER contain hardcoded text content
- Data files MUST export typed constants (using `as const` or explicit types)
- Changes to displayed content MUST require editing only `src/data/` files

### Documentation

- Every commit or technical decision MUST trigger updates to relevant `/docs/`
  files (see CLAUDE.md "Documentacion viva" section)
- `docs/INDEX.md` MUST reflect the current documentation structure at all times

## Development Workflow

### Branching

- `main` is the production branch, protected
- Feature branches: `feat/short-description`
- Fix branches: `fix/short-description`

### Commit Process

1. Code MUST pass `npm run lint` (ESLint)
2. Code MUST pass `npx tsc --noEmit` (TypeScript strict check)
3. Code MUST pass `npm run test` (Vitest)
4. Documentation MUST be updated if applicable
5. Commit with Conventional Commits format

### Spec-Driven Development

New features MUST follow the spec-kit workflow:
1. `/speckit-specify` — Create specification
2. `/speckit-plan` — Generate implementation plan
3. `/speckit-tasks` — Generate actionable tasks
4. `/speckit-implement` — Execute implementation

## Governance

This constitution supersedes all other practices and conventions in the
project. All code reviews, PRs, and implementations MUST verify compliance
with these principles.

Amendments require:
1. Clear justification documenting why the change is needed
2. Impact analysis on existing code and documentation
3. Version bump following semantic versioning (see below)
4. Update to all dependent artifacts and documentation

Version policy:
- MAJOR: Principle removed or fundamentally redefined
- MINOR: New principle added or existing principle materially expanded
- PATCH: Clarification, wording improvement, or non-semantic refinement

**Version**: 1.0.0 | **Ratified**: 2026-04-05 | **Last Amended**: 2026-04-05
