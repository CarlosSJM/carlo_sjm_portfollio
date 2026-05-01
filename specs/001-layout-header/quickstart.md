# Quickstart — Global Layout and Header

> Pasos para validar el feature una vez implementado.

## 1. Verificacion local

```bash
npm run lint && npm run typecheck && npm run test && npm run build && npm run start
```

Despues abrir `http://localhost:3000`.

### Smoke checks (manual)

- [ ] La pagina renderiza con fondo negro y texto blanco
- [ ] Las tres fuentes cargan correctamente (Space Grotesk en headings, JetBrains Mono en eyebrows, Inter en bio)
- [ ] El film grain es visible al mover el mouse sobre areas claras
- [ ] El cursor es crosshair sobre el body, pointer sobre buttons/links
- [ ] El header esta sticky al hacer scroll
- [ ] Al pulsar Tab desde el inicio, el primer focusable es "Skip to content"
- [ ] Click en cada link de nav scrollea al ancla (las secciones aun no existen — el hash si cambia)

### View source

- [ ] `<html lang="en">`
- [ ] `<title>` con default title
- [ ] `<meta name="description">` 158 chars
- [ ] `<link rel="canonical" href="...">`
- [ ] `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type=website`
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<script type="application/ld+json">` con `Person` + `WebSite` schemas
- [ ] Landmarks: `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<footer>`

## 2. Lighthouse

```bash
# Asumiendo que el server corre en :3000
npx lighthouse http://localhost:3000 --view --quiet --chrome-flags="--headless"
```

**Targets**:
- Performance >= 95
- SEO >= 95
- Accessibility >= 90
- Best Practices >= 95

## 3. Privacy audit

En DevTools → Network → recargar pagina:

- [ ] Cero requests a `fonts.googleapis.com`
- [ ] Cero requests a `fonts.gstatic.com`
- [ ] Cero requests a CDNs externos (cdnjs, unpkg, jsdelivr)
- [ ] Cero requests a tracking (analytics, gtm, fbpixel)

## 4. JSON-LD validation

Pegar el HTML servido en https://search.google.com/test/rich-results :

- [ ] Person schema detected
- [ ] WebSite schema detected
- [ ] Sin warnings/errores

## 5. Tests

```bash
npm run test         # Vitest unit/integration
npm run test:e2e     # Playwright e2e
```

Ambos deben pasar al 100%.

## 6. Headers de seguridad

```bash
curl -I http://localhost:3000 | grep -i -E "(referrer|content-type-options|frame-options|permissions|hsts)"
```

Expected:
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), ...`
- `Strict-Transport-Security: max-age=63072000; ...`

## 7. Accesibilidad — recorrido por teclado

1. Pulsar Tab → focus visible en "Skip to content"
2. Pulsar Enter → focus salta a `<main>`
3. Tab continuo → recorre nav links en orden
4. Cada link tiene focus indicator visible (outline)

## 8. Definition of Done

- [ ] Todos los checks de Lighthouse pasan
- [ ] Privacy audit sin requests externos
- [ ] JSON-LD valida en Google Rich Results
- [ ] `npm run lint && npm run typecheck && npm run test && npm run test:e2e` verde
- [ ] Headers HTTP correctos
- [ ] Recorrido por teclado funcional
- [ ] Spec quality checklist marcado completo
