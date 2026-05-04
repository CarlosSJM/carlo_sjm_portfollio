# Quickstart: Hero Section Implementation

**Branch**: `002-hero-section`
**Prerequisites**: `001-layout-header` merged to main (layout, fonts, globals.css ready)

## Install Dependencies First

```bash
npm install motion lucide-react
```

Verify with `npm run typecheck` — should still pass zero errors.

## Implementation Order

### 1. Types (`src/types/index.ts`)
Add `CtaLink` and `HeroData` interfaces.

### 2. Data (`src/data/hero.ts`)
Create `HERO_DATA` constant using `HeroData` type.

### 3. Vitest test (write FIRST, confirm RED)
Create `tests/unit/hero.test.ts` — import `HERO_DATA`, validate fields.
Run `npm run test` → should FAIL (no hero.ts yet). Then implement.

### 4. Geometry components (Server Components)
- `src/components/ui/geometry/GeometricDots.tsx`
- `src/components/ui/geometry/FibonacciSpiral.tsx`

### 5. Client components
- `src/components/ui/HeroAnimations.tsx` (`'use client'`)
- `src/components/layout/ScrollChevron.tsx` (`'use client'`)

### 6. HeroSection (Server Component)
`src/components/sections/HeroSection.tsx` — assembles all pieces.

### 7. Wire into page
Replace `<section id="hero">` placeholder in `src/app/page.tsx` with `<HeroSection />`.

### 8. Playwright tests (write FIRST, confirm RED on fresh page)
Create `tests/e2e/hero.spec.ts` — then confirm content renders.

### 9. Verify
```bash
npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e
```

## Key Patterns

### Client boundary (minimal)
```tsx
// HeroAnimations.tsx
"use client"
import { motion, useReducedMotion } from "motion/react"

export function HeroAnimations({ children }: { children: React.ReactNode }): React.JSX.Element {
  const shouldReduce = useReducedMotion()
  // ...
}
```

### Server geometry component
```tsx
// GeometricDots.tsx — no "use client"
export function GeometricDots({ className }: { className?: string }): React.JSX.Element {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className ?? ""}`}>
      <svg /* ... */ />
    </div>
  )
}
```

### Lucide icon (individual import)
```tsx
import { MapPin } from "lucide-react"
// <MapPin size={14} aria-hidden="true" />
```
