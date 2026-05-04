# Data Model: Hero Section

**Feature**: `002-hero-section`
**Date**: 2026-05-04

## Entities

### HeroData

Represents all static content displayed in the hero section.

**Location**: `src/types/index.ts` (interface) + `src/data/hero.ts` (constant)

```typescript
interface CtaLink {
  readonly label: string  // Display text, e.g. "VIEW PROJECTS"
  readonly href: string   // Anchor target, e.g. "#projects"
}

interface HeroData {
  readonly name: string         // Displayed as <h1>, e.g. "CARLOS SJM"
  readonly role: string         // Job title, e.g. "FULL STACK DEVELOPER"
  readonly tagline: string      // One-liner, e.g. "From biology to code..."
  readonly location: string     // City, e.g. "Segovia"
  readonly ctaPrimary: CtaLink  // Primary action (high contrast)
  readonly ctaSecondary: CtaLink // Secondary action (outline)
  readonly scrollTarget: string // Chevron link target, e.g. "#about"
}
```

**Constant**:
```typescript
// src/data/hero.ts
export const HERO_DATA: HeroData = {
  name: "CARLOS SJM",
  role: "FULL STACK DEVELOPER",
  tagline: "From biology to code — building end-to-end digital experiences",
  location: "Segovia",
  ctaPrimary: { label: "VIEW PROJECTS", href: "#projects" },
  ctaSecondary: { label: "CONTACT ME", href: "#contact" },
  scrollTarget: "#about",
} as const
```

**Validation rules**:
- `name`, `role`, `tagline`, `location` MUST be non-empty strings
- `ctaPrimary.href` and `ctaSecondary.href` MUST start with `#`
- `scrollTarget` MUST start with `#`

## Component Props

### HeroSection (Server Component)
No props — reads `HERO_DATA` directly.

### GeometricDots (Server Component)
```typescript
interface GeometricDotsProps {
  className?: string
}
```

### FibonacciSpiral (Server Component)
```typescript
interface FibonacciSpiralProps {
  className?: string
}
```

### HeroAnimations (Client Component)
```typescript
interface HeroAnimationsProps {
  children: React.ReactNode
}
```

### ScrollChevron (Client Component)
```typescript
interface ScrollChevronProps {
  href: string       // e.g. "#about"
  ariaLabel: string  // e.g. "Scroll to about section"
}
```
