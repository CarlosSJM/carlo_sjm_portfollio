# Component Contracts — Global Layout and Header

> Contratos publicos de cada componente nuevo. Inputs, outputs, side effects.

## `<RootLayout>` (`src/app/layout.tsx`)

**Type**: Server Component (default Next.js root layout)

**Props**: `{ children: React.ReactNode }`

**Renders**:
- `<html lang="en" className={fontVariables}>`
- `<head>` con JSON-LD `Person` + `WebSite`
- `<body>`:
  - `<SkipToContent />`
  - `<FilmGrain />`
  - `<Header />`
  - `<main id="main">{children}</main>`
  - `<Footer />`

**Exports**:
- `default` — la function component
- `metadata: Metadata` — generado via `buildMetadata()`

**Side effects**: ninguno en runtime. En build time, `next/font` genera assets autohostados.

---

## `<Header>` (`src/components/layout/Header.tsx`)

**Type**: Server Component

**Props**: ninguno

**Renders**:
```html
<header class="sticky top-0 z-40 backdrop-blur ...">
  <nav aria-label="Main">
    <a href="/" aria-label="Home">[LOGO/NAME]</a>
    <ul>
      <li><a href="#about">About</a></li>
      ... (NAV_LINKS)
    </ul>
  </nav>
</header>
```

**Behavior**:
- Lee `NAV_LINKS` de `@/data/navigation`
- Anchor links nativos (sin client JS)
- Responsive: en viewport pequeño, los links se compactan (CSS-only)

**A11y**:
- `<nav aria-label="Main">`
- Logo link tiene `aria-label="Home"` o texto visible

---

## `<Footer>` (`src/components/layout/Footer.tsx`)

**Type**: Server Component

**Props**: ninguno

**Renders**:
```html
<footer class="border-t border-white/10 ...">
  <p>© {currentYear} CARLOS SAN JUAN MARTIN</p>
  <p>DESIGNED WITH PRECISION · BUILT WITH PASSION</p>
</footer>
```

**Behavior**:
- `currentYear` se resuelve en build time con `new Date().getFullYear()` (SSG: el build se reejecuta con cada deploy).

---

## `<SkipToContent>` (`src/components/layout/SkipToContent.tsx`)

**Type**: Server Component

**Props**: ninguno

**Renders**:
```html
<a href="#main"
   class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 ...">
  Skip to content
</a>
```

**A11y**:
- Primer elemento focuseable de la pagina.
- Visible solo on focus.

---

## `<FilmGrain>` (`src/components/layout/FilmGrain.tsx`)

**Type**: Server Component

**Props**: ninguno

**Renders**:
```html
<div aria-hidden="true"
     class="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-[0.03]"
     style="background-image: url('data:image/svg+xml,...feTurbulence...')">
</div>
```

**Behavior**:
- 100% CSS, cero JS.
- `aria-hidden="true"` lo oculta a screen readers.

---

## `buildMetadata()` (`src/lib/metadata.ts`)

**Signature**:
```ts
import type { Metadata } from "next";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata
```

**Output** (default, sin overrides):
```ts
{
  title: { default: SITE.defaultTitle, template: `%s — ${SITE.name}` },
  description: SITE.defaultDescription,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: SITE.ogImagePath, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [SITE.ogImagePath],
  },
}
```

**Behavior**: las paginas siguientes (Hero, About, etc.) llaman `buildMetadata({ title: "X", description: "Y" })` para overrides per-page.

---

## `buildPersonSchema()` (`src/lib/schema.ts`)

**Signature**:
```ts
export function buildPersonSchema(): { "@context": string; "@type": "Person"; [key: string]: unknown }
```

**Output**:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Carlos San Juan Martin",
  "jobTitle": "Full Stack Developer",
  "url": "https://...",
  "sameAs": ["https://github.com/TU-USER", "https://linkedin.com/in/TU-USER"],
  "knowsAbout": ["Next.js", "TypeScript", ...]
}
```

---

## `buildWebSiteSchema()` (`src/lib/schema.ts`)

**Signature**:
```ts
export function buildWebSiteSchema(): { "@context": string; "@type": "WebSite"; [key: string]: unknown }
```

**Output**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Carlos San Juan Martin",
  "url": "https://..."
}
```

---

## `<JsonLd>` helper (inline in root layout)

Pattern:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(buildPersonSchema()),
  }}
/>
```

No es un componente exportado — patron repetido inline en root layout para Person y WebSite.

---

## `app/sitemap.ts` (stub)

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
```

## `app/robots.ts` (stub)

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```
