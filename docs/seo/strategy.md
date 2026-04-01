# Estrategia SEO

## Core Web Vitals (objetivos)

| Metrica | Objetivo | Como lograrlo |
|---|---|---|
| LCP | < 1.5s | SSG + CDN edge + `next/image priority` en hero |
| INP | < 100ms | Minimo JS client-side, solo `ContactForm` es client component |
| CLS | < 0.05 | `next/font` + dimensiones explicitas en imagenes |

## Structured Data (JSON-LD)

Schemas a implementar en `src/lib/schema.ts`:

### Person (root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Carlos SJM",
  "url": "https://dominio.com",
  "jobTitle": "Fullstack Developer",
  "sameAs": ["github", "linkedin", ...],
  "knowsAbout": ["React", "Next.js", "TypeScript", ...]
}
```

### WebSite (root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Carlos SJM Portfolio",
  "url": "https://dominio.com"
}
```

### ProfilePage (about page)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": { "@type": "Person", ... }
}
```

## Meta Tags por pagina

Cada pagina exporta `generateMetadata` o `metadata` con:
- `title`: 50-60 chars, keyword principal primero
- `description`: 150-160 chars, compelling
- `canonical`: URL canonica
- `openGraph`: title, description, image (1200x630), url, type
- `twitter`: card (summary_large_image), title, description, image

## OG Images

Usar `next/og` (ImageResponse) para generar imagenes dinamicas por pagina.

## Sitemap y Robots

- `app/sitemap.ts`: todas las paginas publicas con lastModified y changeFrequency
- `app/robots.ts`: Allow all, apuntar a sitemap URL
- Enviar sitemap a Google Search Console post-deploy

## Semantic HTML

- Un `<h1>` por pagina
- Jerarquia correcta: h1 > h2 > h3
- `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`
- `alt` descriptivo en todas las imagenes
- `lang` attribute en `<html>`
- Skip-to-content link

## Headers HTTP (next.config.ts)

```ts
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ]
  }
]
```
