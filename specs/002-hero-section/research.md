# Research: Hero Section

**Date**: 2026-05-04
**Feature**: `002-hero-section`

## 1. `motion/react` (Framer Motion v11+) API

**Decision**: Use `motion/react` package (the new export from Framer Motion v11). Import as:
```typescript
import { motion, useReducedMotion } from "motion/react"
```

**Key APIs used**:
- `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>` — entrance animation
- `useReducedMotion()` — returns `true` when `prefers-reduced-motion: reduce` is active; set `animate` to final state immediately when true
- Staggered children: use `transition={{ delay: index * 0.1 }}` on each child

**Rationale**: `motion/react` is the modern package name for Framer Motion v11. Lighter than v10 (`framer-motion`). Supports React Server Components boundary correctly.

**Alternatives considered**:
- CSS `@keyframes` — rejected: can't stagger multiple elements with individual delays without complex Tailwind config
- `react-spring` — rejected: adds another dep, `motion` is already chosen in content-brief

## 2. `lucide-react` Tree-shaking

**Decision**: Import only the icons used:
```typescript
import { MapPin } from "lucide-react"
import { ChevronDown } from "lucide-react"
```

Never: `import * from "lucide-react"`. Next.js + Turbopack tree-shakes at module level, but explicit named imports are safer and linter-friendly.

**Bundle impact**: Each Lucide icon is ~1KB gzip. Two icons = ~2KB total.

## 3. SVG Geometry Server Components Pattern

**Decision**: Inline SVG wrapped in a positioning div:

```tsx
// GeometricDots.tsx (Server Component)
export function GeometricDots({ className }: { className?: string }): React.JSX.Element {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className ?? ""}`}>
      <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        {/* dot pattern */}
      </svg>
    </div>
  )
}
```

**Positioning**: `HeroSection` wraps both in `absolute inset-0 overflow-hidden opacity-[0.35]`.

**Why inline SVG**: No external fetch, no FOUC, SSR-compatible, `aria-hidden` covers the entire SVG.

## 4. Tailwind v4 + motion/react Compatibility

**Decision**: No conflicts. `motion.div` accepts `className` prop normally. Tailwind v4 utility classes work on `motion.*` elements. No special config needed.

**Tested pattern**:
```tsx
<motion.div
  className="flex flex-col gap-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

## 5. `prefers-reduced-motion` Pattern

```tsx
"use client"
import { motion, useReducedMotion } from "motion/react"

export function HeroAnimations({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  const variants = {
    hidden: shouldReduce ? {} : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  )
}
```

## 6. CTA Button Styling (from Figma)

Primary CTA: white background, black text, uppercase, mono font, `px-8 py-3`
Secondary CTA: transparent background, white border `border border-white/30`, white text, hover: `border-white`

## 7. Scroll Chevron Animation

Bounce pattern with `motion/react`:
```tsx
<motion.div
  animate={shouldReduce ? {} : { y: [0, 8, 0] }}
  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
>
  <ChevronDown />
</motion.div>
```
