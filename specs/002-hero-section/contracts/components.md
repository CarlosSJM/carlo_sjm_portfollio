# Component Contracts: Hero Section

**Feature**: `002-hero-section`
**Date**: 2026-05-04

## HeroSection

**File**: `src/components/sections/HeroSection.tsx`
**Type**: Server Component (no `'use client'`)

```typescript
export function HeroSection(): React.JSX.Element
```

**Renders**:
- `<section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">`
- Inside: GeometricDots + FibonacciSpiral (absolute, aria-hidden)
- Inside: HeroAnimations > content stack
- Inside: ScrollChevron (below content)

**Dependencies**: `HERO_DATA`, `GeometricDots`, `FibonacciSpiral`, `HeroAnimations`, `ScrollChevron`, `MapPin` from lucide-react

---

## HeroAnimations

**File**: `src/components/ui/HeroAnimations.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface HeroAnimationsProps { children: React.ReactNode }
export function HeroAnimations({ children }: HeroAnimationsProps): React.JSX.Element
```

**Behavior**:
- Wraps children with staggered `motion.div` entrance animation (opacity 0→1, y 20→0)
- Calls `useReducedMotion()` — if true, renders children immediately without animation
- Each direct child gets a staggered delay via `transition.delay`

---

## ScrollChevron

**File**: `src/components/layout/ScrollChevron.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface ScrollChevronProps { href: string; ariaLabel: string }
export function ScrollChevron({ href, ariaLabel }: ScrollChevronProps): React.JSX.Element
```

**Renders**: `<a href={href} aria-label={ariaLabel}>` wrapping `<motion.div>` with `ChevronDown` icon
**Animation**: `y: [0, 8, 0]` repeat infinite, duration 1.5s — paused when `useReducedMotion()` is true

---

## GeometricDots

**File**: `src/components/ui/geometry/GeometricDots.tsx`
**Type**: Server Component

```typescript
interface GeometricDotsProps { className?: string }
export function GeometricDots({ className }: GeometricDotsProps): React.JSX.Element
```

**Renders**: `<div aria-hidden="true" className={...}>` wrapping inline SVG dot grid
**SVG**: A pattern of small circles arranged in a regular grid (viewBox="0 0 800 600")

---

## FibonacciSpiral

**File**: `src/components/ui/geometry/FibonacciSpiral.tsx`
**Type**: Server Component

```typescript
interface FibonacciSpiralProps { className?: string }
export function FibonacciSpiral({ className }: FibonacciSpiralProps): React.JSX.Element
```

**Renders**: `<div aria-hidden="true" className={...}>` wrapping inline SVG spiral path
**SVG**: Golden ratio spiral arcs (viewBox="-200 -200 400 400")

---

## DOM Structure (rendered HTML)

```html
<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  <!-- Background geometry — aria-hidden, pointer-events-none -->
  <div aria-hidden="true" class="absolute inset-0 pointer-events-none opacity-[0.35]">
    <!-- GeometricDots SVG -->
  </div>
  <div aria-hidden="true" class="absolute inset-0 pointer-events-none opacity-[0.35]">
    <!-- FibonacciSpiral SVG -->
  </div>

  <!-- Content -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
    <!-- HeroAnimations wraps the following -->
    <h1 class="font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-tight">
      CARLOS SJM
    </h1>
    <p class="font-mono text-sm md:text-base tracking-[0.3em] text-white/60 uppercase mt-4">
      FULL STACK DEVELOPER
    </p>
    <p class="font-sans text-base md:text-lg text-white/70 mt-6 max-w-xl mx-auto">
      From biology to code — building end-to-end digital experiences
    </p>
    <div class="flex items-center justify-center gap-2 mt-4 text-white/40 text-sm">
      <!-- MapPin aria-hidden -->
      Segovia
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <a href="#projects" class="...">VIEW PROJECTS</a>
      <a href="#contact" class="...">CONTACT ME</a>
    </div>
  </div>

  <!-- ScrollChevron -->
  <a href="#about" aria-label="Scroll to about section" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors">
    <!-- ChevronDown with bounce animation -->
  </a>
</section>
```
