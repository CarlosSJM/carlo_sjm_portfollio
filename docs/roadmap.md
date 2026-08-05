# Roadmap del Portfolio

> Hitos ordenados desde scaffold inicial hasta lanzamiento en produccion.
> Cada hito tiene criterios de salida verificables.

## Estado actual

**M0, M1, M2 completados. M3 en curso — `001-layout-header`, `002-hero-section`, `003-about-section`, `010-mobile-nav` cerrados. Pendiente: Skills, Experience, Projects, Education, Game of Life, Contact.**

---

## M0 — Fundacion

**Objetivo**: Tener la base tecnica y de proceso lista para empezar a implementar features.

- [x] Scaffold Next.js 16 + TypeScript + Tailwind CSS v4
- [x] Estructura de documentacion en `/docs/` con INDEX
- [x] CLAUDE.md con convenciones y regla de documentacion viva
- [x] Spec-kit instalado (`uv tool install specify-cli`)
- [x] Constitution v1.0.0 con 8 principios
- [x] Templates de spec-kit (plan/spec/tasks) personalizados al stack
- [ ] Primer commit con todo lo anterior

**Criterio de salida**: `npm run build` pasa, repo commiteado, docs y spec-kit listos.

---

## M1 — Setup tecnico

**Objetivo**: Tooling de calidad y testing operativo antes de escribir features.

- [x] Instalar Vitest + scripts (`npm run test`, `npm run test:watch`)
- [x] Instalar Playwright + scripts (`npm run test:e2e`)
- [x] Config ESLint con reglas de constitution (`no-explicit-any`, etc.)
- [x] `tsconfig.json` con `strict: true` + `noUncheckedIndexedAccess` + `noImplicitOverride`
- [x] `next.config.ts` con security headers (Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, HSTS)
- [x] Crear directorios base: `src/types/`, `src/lib/`, `src/data/`, `tests/{unit,integration,e2e}/`
- [ ] `vercel link` + configurar env vars (`RESEND_API_KEY`, `CONTACT_EMAIL`) — movido a M6
- [x] Test "smoke" inicial en Vitest y Playwright (verifica que el setup funciona)

**Criterio de salida**: `npm run lint && npm run typecheck && npm run test && npm run test:e2e` pasa. ✅

---

## M2 — Recibir contenido y diseños

**Objetivo**: Tener todo el material necesario para construir el portfolio.

- [x] Mockups/diseños del portfolio (Figma Make export, dark mode)
- [x] Lista de tecnologias dominadas (6 categorias, ver content-brief.md)
- [x] Lista de proyectos a destacar (3 proyectos, ver content-brief.md)
- [x] Texto de bio/about (3 parrafos en EN)
- [ ] LinkedIn/GitHub URLs reales (tarea futura #23, no bloqueante — placeholders en M3)
- [x] Secciones definidas (8 secciones + footer, ver content-brief.md)
- [ ] Subdominio Vercel definitivo (TBD, M6/M7)
- [x] Brief de contenido en `docs/content-brief.md`

**Criterio de salida**: ✅ `docs/content-brief.md` consolidado y listo para `/speckit-specify`.

---

## M3 — Implementacion del UI

**Objetivo**: Construir todas las secciones del portfolio siguiendo spec-driven development.

- [ ] `/speckit-specify` para cada feature/seccion
- [ ] `/speckit-plan` y `/speckit-tasks` por feature
- [ ] `/speckit-implement` siguiendo el orden:
  - [x] Layout base (Header, Footer, Navigation) — `001-layout-header`
  - [x] Hero / Landing — `002-hero-section`
  - [x] About / Sobre mi — `003-about-section`
  - [x] **Navegacion movil (hamburger menu)** — `010-mobile-nav` *(ver nota abajo)*
  - [ ] Skills / Stack tecnologico — `004-skills-section`
  - [ ] Experience / Timeline — `005-experience-section`
  - [ ] Projects / Portfolio grid — `006-projects-section`
  - [ ] Education — `007-education-section`
  - [ ] Game of Life — `008-game-of-life`
  - [ ] Contact (UI sin backend aun) — `009-contact-section`
- [ ] Tema dark mode (light queda en M8)
- [ ] Tipografias con `next/font`

### Nota: `010-mobile-nav` — Menu hamburguesa para movil/tablet ✅ implementado

**Problema**: En pantallas < `md` (768 px) el nav de escritorio (`Header.tsx`) mostraba todos los enlaces en horizontal, lo que provocaba overflow y una experiencia visual muy mala.

**Solucion implementada**: `MobileNav.tsx` (`'use client'`) — hamburger icon que abre un drawer full-screen con `role="dialog" aria-modal="true"`.

**Detalles tecnicos**:
- Icono hamburguesa (`Menu` / `X` de `lucide-react`) visible solo en `< md`; nav de escritorio (`hidden md:flex`) visible solo en `md:`
- Drawer fijo — `bg-black/95 backdrop-blur-sm`, `z-50`, cierra al hacer click en un enlace, en el backdrop, o con `Escape`
- Trampa de foco manual (sin libreria) cicla `Tab`/`Shift+Tab` entre los elementos focusables del drawer
- `aria-expanded`, `aria-controls="mobile-nav-drawer"`, `aria-label="Open menu"` / `"Close menu"` en el boton
- `useReducedMotion` (motion/react) desactiva la transicion de opacidad si el usuario prefiere movimiento reducido
- `document.body.style.overflow = "hidden"` mientras el drawer esta abierto, restaurado al cerrar
- Foco vuelve al boton toggle al cerrar (Escape, click en enlace, o click fuera)
- Sin librerias nuevas — `<div role="dialog">` nativo + `lucide-react`/`motion` ya instalados

**Bugs encontrados y corregidos durante implementacion**:
1. El drawer usaba `flex-col items-center justify-center` con 7 enlaces; en viewports bajos (812px) el contenido desbordaba por arriba del viewport y `justify-center` + overflow no permite scroll hacia contenido que desborda en el eje de inicio (comportamiento estandar de Flexbox). Fix: `justify-start` + `overflow-y-auto py-24`, que centra visualmente en pantallas normales y permite scroll cuando hay overflow.
2. **(detectado en prueba manual con Chrome DevTools tras el merge de tests automatizados)** El drawer (`position: fixed`) se renderizaba mal posicionado — anclado a los 63px de alto del `<header>` en vez de a toda la ventana. Causa: `<header>` usa `backdrop-blur-md` (`backdrop-filter`), y por especificacion CSS cualquier ancestro con `backdrop-filter`/`filter`/`transform` se convierte en el *containing block* de sus descendientes `position: fixed`. Playwright no detecto esto porque los asserts de tamaño/posicion no comparaban contra el viewport completo. Fix: el drawer se renderiza via `createPortal(..., document.body)` en `MobileNav.tsx`, sacandolo del arbol del `<header>`.

**Tests**:
- Vitest (`tests/unit/mobile-nav.test.tsx`): toggle abre/cierra, `aria-expanded` correcto, Escape cierra, click en enlace cierra
- Playwright (`tests/e2e/mobile-nav.spec.ts`): viewport 375px vs 1280px, apertura/cierre, navegacion por hash, foco atrapado y restaurado — corre con `contextOptions: { reducedMotion: "reduce" }` para evitar flakiness por la transicion de Framer Motion

**Criterio de salida**: todas las secciones renderizan correctamente con datos reales.

---

## M4 — SEO + Privacy hardening

**Objetivo**: Cumplir todas las requisitos de los principios II (SEO) y III (Privacy) de la constitution.

- [ ] `app/sitemap.ts` con todas las rutas publicas
- [ ] `app/robots.ts` apuntando al sitemap
- [ ] JSON-LD `Person` + `WebSite` en root layout
- [ ] JSON-LD `ProfilePage` en about
- [ ] `generateMetadata` por pagina (title, description, canonical, OG, Twitter cards)
- [ ] OG images dinamicas con `next/og` (`ImageResponse`)
- [ ] Contact form completo:
  - [ ] Route Handler `app/api/contact/route.ts`
  - [ ] Cliente Resend en `src/lib/resend.ts`
  - [ ] Honeypot field
  - [ ] Rate limiting (5 emails/IP/hora)
  - [ ] Validacion server-side
- [ ] Headers de seguridad verificados con curl
- [ ] Auditar HTML resultante: zero email visible, zero CDNs externos

**Criterio de salida**: 
- Validador Rich Results de Google: pasa
- `curl -I` muestra headers correctos
- `view-source` no expone email ni recursos externos

---

## M5 — Testing completo

**Objetivo**: Cobertura de tests segun Constitution V.

- [ ] Vitest:
  - [ ] Tests de `generateMetadata` por pagina
  - [ ] Tests de JSON-LD schemas
  - [ ] Tests de validacion del contact form
  - [ ] Tests de integridad de `src/data/` (no broken links)
- [ ] Playwright:
  - [ ] Renderizado de todas las paginas
  - [ ] Navegacion entre secciones
  - [ ] Flujo completo del contact form (mock de Resend)
  - [ ] Accesibilidad: jerarquia de headings, alt text, aria-labels
- [ ] Lighthouse local (`npx lighthouse --view`):
  - [ ] Performance >= 95
  - [ ] SEO >= 95
  - [ ] Accessibility >= 90

**Criterio de salida**: `npm run test && npm run test:e2e` pasa, Lighthouse cumple targets.

---

## M6 — Deploy + verificacion

**Objetivo**: Validar todo en entorno real de Vercel antes de produccion.

- [ ] Deploy preview (`vercel deploy`)
- [ ] Smoke test del preview en navegador real
- [ ] Validar OG cards: opengraph.xyz, Twitter Card Validator
- [ ] Validar structured data: Google Rich Results Test
- [ ] Probar contact form end-to-end (envio real al alias)
- [ ] Configurar dominio (si custom) o confirmar `.vercel.app`
- [ ] Lighthouse CI sobre URL preview

**Criterio de salida**: preview en verde en todas las validaciones, contact form funciona.

---

## M7 — Lanzamiento a produccion

**Objetivo**: Promocionar a produccion y verificar que esta saludable.

- [ ] `vercel promote <preview-url>` (o `vercel --prod`)
- [ ] Enviar sitemap a Google Search Console
- [ ] Verificar Core Web Vitals reales en Speed Insights (primeras 24h)
- [ ] Monitorear runtime logs en Vercel Dashboard
- [ ] Compartir en LinkedIn / redes
- [ ] Actualizar README.md con URL de produccion

**Criterio de salida**: portfolio live, indexable, sin errores en logs, CWV en verde.

---

## M8 — Mejoras post-lanzamiento (futuro)

**Objetivo**: Iteraciones planificadas pero no bloqueantes para el lanzamiento.

- [ ] Light mode (tarea #4)
- [ ] i18n bilingue ES/EN (tarea #5)
- [ ] Blog (opcional, evaluar despues)
- [ ] Analytics deeper: custom events, Web Analytics dashboard
- [ ] A/B testing con Vercel Flags si se necesita

**Criterio de salida**: features adicionales sin afectar performance ni privacidad.

---

## Visualizacion

```
M0 (Fundacion) ──► M1 (Setup) ──► M2 (Contenido del usuario) ──► M3 (UI)
                                                                   │
                                                                   ▼
M8 (Post-launch) ◄── M7 (Produccion) ◄── M6 (Deploy + verify) ◄── M4 (SEO+Privacy)
                                                                   │
                                                                   ▼
                                                                  M5 (Testing)
```

## Reglas de avance

1. **No saltarse hitos**: cada uno desbloquea el siguiente
2. **Constitution check obligatorio** al cierre de M3, M4, M5, M6 y M7
3. **Documentacion viva**: cada hito completado actualiza los docs implicados
4. **Tests verdes**: M3+ requiere tests pasando antes de avanzar
