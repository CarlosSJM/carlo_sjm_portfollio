# Feature Specification: [FEATURE NAME]

**Feature Branch**: `feat/[feature-name]`
**Created**: [DATE]
**Status**: Draft
**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories MUST be PRIORITIZED as user journeys ordered by importance.
  Each story MUST be INDEPENDENTLY TESTABLE — implementing just ONE should deliver
  a viable increment.

  For this portfolio project, consider these dimensions per story:
  - SEO impact (does it affect discoverability?)
  - Privacy compliance (does it handle personal data?)
  - Accessibility (does it meet WCAG 2.1 AA?)
  - Performance (does it stay within budget: LCP < 1.5s, JS < 50KB?)
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Constitution Compliance**:
- Server-First: [Server Component / needs 'use client' because ___]
- SEO: [What metadata, structured data, or semantic HTML is needed]
- Privacy: [Any personal data handled? How?]
- Accessibility: [Heading level, aria needs, keyboard interaction]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

**Vitest Coverage**:
- [ ] [What unit/integration tests are needed]

**Playwright Coverage**:
- [ ] [What e2e tests are needed]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Constitution Compliance**:
- Server-First: [Server Component / needs 'use client' because ___]
- SEO: [What metadata, structured data, or semantic HTML is needed]
- Privacy: [Any personal data handled? How?]
- Accessibility: [Heading level, aria needs, keyboard interaction]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

**Vitest Coverage**:
- [ ] [What unit/integration tests are needed]

**Playwright Coverage**:
- [ ] [What e2e tests are needed]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when [the contact form is submitted with invalid email]?
- What happens when [the Resend API is down or rate-limited]?
- How does the page render when [JavaScript is disabled]?
- What happens when [a social link URL changes or is removed]?
- How does the page look when [screen reader navigates the heading hierarchy]?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST [specific capability]
- **FR-002**: System MUST [specific capability]

*Mark unclear requirements:*
- **FR-00X**: System MUST [NEEDS CLARIFICATION: reason]

### SEO Requirements (per Constitution II)

- **SEO-001**: Page MUST export `generateMetadata` with unique title (50-60 chars)
  and description (150-160 chars)
- **SEO-002**: Page MUST include canonical URL
- **SEO-003**: Page MUST include Open Graph tags (title, description, image 1200x630, url)
- **SEO-004**: Page MUST use semantic HTML with correct heading hierarchy (one h1)
- **SEO-005**: All images MUST use `next/image` with descriptive `alt` text

### Privacy Requirements (per Constitution III)

- **PRI-001**: No real email address in source code, HTML, or API responses
- **PRI-002**: External links MUST use `rel="noopener noreferrer"`
- **PRI-003**: No third-party CDNs, tracking pixels, or embedded widgets

### Accessibility Requirements (per Constitution VII)

- **A11Y-001**: All interactive elements MUST be keyboard-accessible
- **A11Y-002**: Icon-only buttons/links MUST have `aria-label`
- **A11Y-003**: Color contrast MUST meet WCAG AA (4.5:1 normal, 3:1 large)

### Performance Requirements (per Constitution VIII)

- **PERF-001**: Page MUST be statically generated (SSG, no `force-dynamic`)
- **PERF-002**: Page MUST meet LCP < 1.5s, INP < 100ms, CLS < 0.05
- **PERF-003**: No new runtime dependencies unless justified

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lighthouse Performance score >= 95
- **SC-002**: Lighthouse SEO score >= 95
- **SC-003**: Lighthouse Accessibility score >= 90
- **SC-004**: All Vitest tests pass (`npm run test`)
- **SC-005**: All Playwright tests pass (`npm run test:e2e`)
- **SC-006**: `npx tsc --noEmit` passes with zero errors
- **SC-007**: `npm run lint` passes with zero warnings
- **SC-008**: [Feature-specific measurable metric]

## Assumptions

- All pages are SSG (no server-side rendering at request time)
- Content is managed via typed TypeScript files in `src/data/`
- The visitor's browser supports modern CSS (Tailwind v4 target)
- Vercel is the only deployment target
- [Additional feature-specific assumptions]
