# Implementation Plan: [FEATURE]

**Branch**: `[feat/feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Framework**: Next.js 16 (App Router, Turbopack, SSG)
**Language**: TypeScript 5 (strict mode, no `any`, no unguarded `as`)
**Styling**: Tailwind CSS v4 (utility-first, no CSS-in-JS)
**Testing**: Vitest (unit/integration) + Playwright (e2e)
**Deploy**: Vercel (serverless functions, CDN edge, auto SSL)
**Email**: Resend API (server-side only, via Route Handlers)
**Analytics**: @vercel/analytics + @vercel/speed-insights
**Target Platform**: Web (SSG, served from Vercel CDN)
**Project Type**: Portfolio website (static-first, minimal client JS)
**Performance Goals**: LCP < 1.5s, INP < 100ms, CLS < 0.05, JS < 50KB gzip
**Constraints**: Zero `force-dynamic`, max 10 runtime deps, WCAG 2.1 AA

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] **I. Server-First**: No unnecessary `'use client'`. Each usage justified with comment
- [ ] **II. SEO-First**: `generateMetadata` on every page, JSON-LD in layout, sitemap/robots present
- [ ] **III. Privacy-First**: No email in source/HTML/headers. Contact via Route Handler + env vars only
- [ ] **IV. Type Safety**: `strict: true`, no `any`, no unguarded `as`, explicit types on functions
- [ ] **V. Testing**: Vitest tests for logic/data, Playwright for pages/navigation. All pass before merge
- [ ] **VI. Minimal Deps**: New dependency justified. Runtime deps < 10. No icon libs, no CSS-in-JS
- [ ] **VII. Accessibility**: One h1/page, no skipped headings, keyboard nav, aria-labels, contrast AA
- [ ] **VIII. Performance**: SSG only. Meets LCP/INP/CLS/bundle targets. Lighthouse Perf >= 95

## Project Structure

### Documentation (this feature)

```text
specs/[feature-name]/
├── plan.md              # This file (/speckit-plan output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (if applicable)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts if applicable)
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (metadata, fonts, analytics, JSON-LD)
│   ├── page.tsx                   # Homepage
│   ├── [section]/page.tsx         # Section pages (about, projects, contact)
│   ├── api/contact/route.ts       # Serverless: contact form via Resend
│   ├── sitemap.ts                 # Auto-generated sitemap
│   ├── robots.ts                  # Robots.txt config
│   └── not-found.tsx              # Custom 404
│
├── components/
│   ├── layout/                    # Header, Footer, Navigation
│   ├── sections/                  # Hero, ProjectCard, Skills, etc.
│   ├── contact/                   # ContactForm ('use client'), SocialLinks
│   └── ui/                        # Button, Badge, Card (server components)
│
├── lib/
│   ├── metadata.ts                # generateMetadata helpers
│   ├── schema.ts                  # JSON-LD structured data builders
│   └── resend.ts                  # Resend email client
│
├── data/
│   ├── projects.ts                # Project entries (typed)
│   ├── skills.ts                  # Tech stack data (typed)
│   └── social.ts                  # Social links (typed)
│
├── types/
│   └── index.ts                   # Shared TypeScript types
│
└── styles/
    └── globals.css                # Tailwind base + custom styles

tests/
├── unit/                          # Vitest unit tests
├── integration/                   # Vitest integration tests
└── e2e/                           # Playwright e2e tests

public/
├── icons/                         # Self-hosted social SVGs
└── images/                        # Optimized images
```

**Structure Decision**: Next.js App Router single-project layout with colocated
routes, separated data layer, and test directories at root level.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
