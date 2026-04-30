# Phase 0: Research — Global Layout and Header

> Resolver decisiones tecnicas concretas antes de diseñar contratos.

## R1. Estrategia de fuentes

**Decision**: Cargar Space Grotesk, JetBrains Mono e Inter via `next/font/google`, exponer cada una como una `--font-*` CSS variable en `<html>`, y aplicar via Tailwind v4 `@theme`.

**Rationale**:
- `next/font/google` self-hostea las fuentes en build time → cero requests a `fonts.googleapis.com` (Constitution III).
- `display: 'swap'` por defecto → cero CLS (Constitution VIII).
- CSS variables permiten que cada componente use la fuente correcta sin imports adicionales.
- Tailwind v4 `@theme` mapea las variables a utilities `font-display`, `font-mono`, `font-body`.

**Alternatives considered**:
- `@import` desde Google Fonts → REJECTED por Constitution III (request a tercero).
- Auto-hostear `.woff2` manualmente en `public/fonts/` → REJECTED, mas codigo y mismo resultado que `next/font`.
- Solo una tipografia → REJECTED, los diseños usan tres y cada una aporta jerarquia visual.

## R2. JSON-LD strategy

**Decision**: Builder functions en `src/lib/schema.ts` que retornan objetos JSON-LD tipados; renderizar via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}>` dentro de `<head>` en root layout.

**Rationale**:
- Builders aislados → testeables con Vitest sin renderizar React.
- Tipado estricto previene schemas malformados.
- `dangerouslySetInnerHTML` con `JSON.stringify` es seguro porque el input es nuestro (no user input).
- Inyectar en `<head>` antes de `<body>` ayuda a parsers que escanean linealmente.

**Alternatives considered**:
- `next/script` con `strategy="afterInteractive"` → REJECTED, JSON-LD no debe esperar a interactividad.
- Componente React con `<script>` inline → puede funcionar pero `dangerouslySetInnerHTML` es el patron documentado de Next.js para JSON-LD.

## R3. Navegacion sticky y anchor links

**Decision**: `<header>` con `position: sticky; top: 0;` mas `backdrop-blur` + fondo semi-transparente. Links nativos `<a href="#section-id">` (sin JS). `scroll-behavior: smooth` en `<html>` via Tailwind/CSS, con `@media (prefers-reduced-motion: reduce)` que lo desactiva. Cada `<section id="...">` tiene `scroll-margin-top` que compensa la altura del header sticky.

**Rationale**:
- Constitucion I (Server-First): cero JS para algo que el navegador ya hace.
- `prefers-reduced-motion` cumple WCAG 2.3.3.
- `scroll-margin-top` evita que el header sticky tape el inicio de cada seccion al hacer scroll.

**Alternatives considered**:
- `next/link` con scroll a hash → REJECTED, mismo comportamiento que `<a href="#...">` pero con overhead de client component.
- IntersectionObserver para "active link highlight" en nav → DEFERRED a una iteracion futura (P3 visual nicety).

## R4. Skip-to-content link

**Decision**: `<a href="#main">` como primer elemento en `<body>`, oculto visualmente con `sr-only` Tailwind class, visible al focus con `focus:not-sr-only` + posicionado top-left con z-index alto. Apunta a `<main id="main">`.

**Rationale**:
- Patron WCAG 2.4.1 estandar.
- `sr-only` mantiene en DOM (accesible para screen readers).
- Cero impacto visual hasta que recibe focus por teclado.

**Alternatives considered**:
- Boton con onClick scroll → REJECTED, requiere client component.
- `display: none` hasta focus → REJECTED, `display: none` lo retira del tab order.

## R5. Film grain overlay

**Decision**: Un componente `<FilmGrain>` Server Component que renderiza un `<div>` `fixed inset-0 z-50 pointer-events-none` con `aria-hidden="true"`, conteniendo un SVG inline con filtro `feTurbulence` codificado como `data:image/svg+xml,...` en `background-image`. Opacity 0.03 con `mix-blend-mode: overlay`.

**Rationale**:
- Inline SVG → cero requests externos.
- `pointer-events-none` evita que intercepte clicks.
- `aria-hidden` lo invisibiliza para screen readers.
- `mix-blend-mode: overlay` da el efecto cinematografico sin oscurecer contenido.

**Alternatives considered**:
- Imagen PNG en `public/` → REJECTED, request adicional + tamano mayor que el SVG inline.
- Canvas con noise generado en cliente → REJECTED, requiere client component y consume CPU.

## R6. Crosshair cursor

**Decision**: CSS global en `globals.css`:
```css
* { cursor: crosshair; }
button, a, [role="button"], [role="link"], input, textarea, select, label[for] {
  cursor: pointer;
}
input[type="text"], input[type="email"], textarea { cursor: text; }
```

**Rationale**:
- Cero JS, cero ASCII art.
- Asegura que inputs de texto mantengan caret cursor (UX correcta).
- `[role="button"]` cubre custom componentes de futuras features.

**Alternatives considered**:
- Inline `<style>` en App.tsx (como en el Figma original) → REJECTED, `globals.css` es el lugar canonical.
- Usar `!important` (como en el original) → REJECTED, no se necesita si declaramos por especificidad apropiada.

## R7. Header sticky vs fixed

**Decision**: `position: sticky` con `top: 0`, sin altura reservada (el header ocupa flujo normal y se "pega" al hacer scroll).

**Rationale**:
- `sticky` evita el "salto" visual que tiene `fixed` cuando se carga la pagina.
- No requiere `padding-top` en `<main>` para compensar.
- Comportamiento consistente con el patron del diseño Figma.

**Alternatives considered**:
- `position: fixed` → REJECTED, requiere `padding-top` y rompe `prefers-reduced-motion`.

## R8. Tailwind v4 design tokens

**Decision**: En `globals.css`, declarar los tokens en `@theme inline`:
```css
@theme inline {
  --color-background: #000;
  --color-foreground: #fff;
  --color-muted: #A0A0A0;
  --color-border-subtle: rgb(255 255 255 / 0.1);
  --font-display: var(--font-space-grotesk);
  --font-mono: var(--font-jetbrains-mono);
  --font-body: var(--font-inter);
}
```
Las variables `--font-*` vienen de `next/font` aplicadas a `<html>`.

**Rationale**:
- Tailwind v4 expone automaticamente cada token como utility (`bg-background`, `font-display`, etc.).
- Centraliza la paleta para futuras iteraciones (light mode en M8 cambiara estos tokens).

**Alternatives considered**:
- `tailwind.config.ts` clasico → REJECTED, Tailwind v4 prefiere CSS-first.
- Hex colors hardcoded en componentes → REJECTED, dificulta light mode futuro.

## R9. SITE constant y env vars

**Decision**: `src/lib/site.ts` con un objeto `SITE` typed que contiene:
- `name`: "Carlos San Juan Martin"
- `role`: "Full Stack Developer"
- `tagline`: "From biology to code — building end-to-end digital experiences"
- `location`: "Madrid"
- `url`: viene de `process.env.NEXT_PUBLIC_SITE_URL` con fallback `http://localhost:3000`
- `defaultTitle`: "Carlos San Juan Martin — Full Stack Developer"
- `defaultDescription`: 150 chars resumen
- `ogImage`: ruta relativa `/og-image.png` (la imagen real se generara en M4)

**Rationale**:
- Constante tipada → autocompletado y errores en compile time.
- `NEXT_PUBLIC_SITE_URL` permite distintas URLs en preview/production sin redeploy.

**Alternatives considered**:
- Hardcodear URL → REJECTED, romperia preview deployments.
- Generar canonical desde `headers()` → REJECTED, requiere dynamic rendering.

## R10. Sitemap y robots — alcance en este feature

**Decision**: Crear stubs `app/sitemap.ts` y `app/robots.ts` con la URL del homepage y el path al sitemap respectivamente. La logica completa (multiples rutas, lastModified) se desarrolla en M4.

**Rationale**:
- Tener los archivos creados desde el principio ayuda a Vercel a servir `/sitemap.xml` y `/robots.txt` desde el deploy 1.
- M4 los enriquece con el resto de URLs.

**Alternatives considered**:
- Posponer enteramente a M4 → REJECTED, los crawlers tempranos del preview lo agradeceran.

## Resumen de decisiones

| ID | Decision |
|---|---|
| R1 | `next/font/google` + Tailwind v4 `@theme` con CSS variables |
| R2 | JSON-LD via builder functions + `dangerouslySetInnerHTML` en `<head>` |
| R3 | `<a href="#section">` nativos + `scroll-behavior: smooth` + `scroll-margin-top` |
| R4 | Skip link estandar con `sr-only` / `focus:not-sr-only` |
| R5 | Film grain inline SVG `feTurbulence` con `mix-blend-mode: overlay` |
| R6 | Cursor crosshair global con overrides para buttons/links/inputs |
| R7 | Header `position: sticky` |
| R8 | Tokens en `@theme inline` de globals.css |
| R9 | `SITE` constant tipado + `NEXT_PUBLIC_SITE_URL` env var |
| R10 | Stubs minimos de sitemap.ts y robots.ts |

**Status**: All NEEDS CLARIFICATION resolved. Listo para Phase 1.
