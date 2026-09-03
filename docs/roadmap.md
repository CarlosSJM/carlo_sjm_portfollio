# Roadmap del Portfolio

> Hitos ordenados desde scaffold inicial hasta lanzamiento en produccion.
> Cada hito tiene criterios de salida verificables.

## Estado actual

**M0, M1, M2 completados. M3 en curso — `001-layout-header`, `002-hero-section`, `003-about-section`, `010-mobile-nav`, `004-skills-section`, `005-experience-section`, `011-about-photo`, `008-game-of-life` cerrados. Pendiente: Projects, Education, Contact.**

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
  - [x] Skills / Stack tecnologico — `004-skills-section`
  - [x] Experience / Timeline — `005-experience-section`
  - [ ] Projects / Portfolio grid — `006-projects-section`
  - [ ] Education — `007-education-section`
  - [x] Game of Life — `008-game-of-life`
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

### Nota: `004-skills-section` — Skills implementado, bug preexistente detectado (no bloqueante)

**Implementado**: `SkillsSection` (Server Component) + `SkillCard` (`'use client'`, `whileInView` scale+fade con stagger `delay: index * 0.05`) + `SkillsHeadingInView` (`'use client'`, fade del eyebrow/heading). Grid responsive `grid md:grid-cols-2 lg:grid-cols-3 gap-6`, 6 categorias desde `SKILLS_DATA` (`src/data/skills.ts`), iconos de `lucide-react` (`Layout`, `Settings`, `Server`, `Terminal`, `Database`, `Code2`).

**Bug preexistente detectado durante testing (fuera del alcance de esta feature)**: al escribir los tests de overflow horizontal para `#skills` (siguiendo la leccion de `010-mobile-nav`), se detecto un desbordamiento horizontal de 1-6px en el documento a nivel global en viewports estrechos (375px, 768px), causado por `GeometricDots` (Hero) y el grid de `About` — no por Skills. Los tests de `skills.spec.ts` se acotaron a `boundingBox()` de `#skills` en vez de `document.documentElement.scrollWidth` para no acoplar esta feature a un bug ajeno. **Pendiente**: crear un fix dedicado para el overflow de Hero/About (candidato a hotfix rapido, no requiere spec-kit completo).

**Tests**:
- Vitest (`tests/unit/skills.test.ts`): 6 categorias, orden correcto, campos no vacios
- Playwright (`tests/e2e/skills.spec.ts`): eyebrow/heading visibles, 6 titulos + skills conocidos visibles, iconos `aria-hidden`, sin overflow en `#skills` a 375/768/1280px, contenido visible tras scroll

**Verificacion manual**: confirmado visualmente en Chrome a ~1813px (grid 3 columnas, hover funcionando, sin overlaps). La verificacion a 375px no pudo repetirse visualmente en esta sesion por un fallo del `resize_window` de la extension (atascado en 150x564px pese a pedir otros tamanos) — se confio en los Playwright tests (que controlan el viewport via CDP, no afectados por ese bug) como evidencia suficiente.

**Criterio de salida**: todas las secciones renderizan correctamente con datos reales.

---

### Nota: `005-experience-section` — Experience implementado

**Implementado**: `ExperienceSection` (Server Component) + `TimelineItem` (`'use client'`, `whileInView` slide-in-left con stagger `delay: index * 0.1`) + `ExperienceHeadingInView` (`'use client'`, fade del eyebrow/heading). Timeline vertical con marker diamante + linea conectora (`aria-hidden`), 4 items desde `EXPERIENCE_DATA` (`src/data/experience.ts`) en orden reverso-cronologico (BravePay, ICARUS, Ust-Global, Datmean), coincide exactamente con `docs/content-brief.md` y el Figma source (incluyendo la lista de 11 tags de ICARUS, la mas larga).

**Regresion detectada y corregida**: al añadir Experience, el test `hero.spec.ts > renders role text` empezo a fallar — `getByText("FULL STACK DEVELOPER")` (case-insensitive) empezo a matchear tambien los roles "Full Stack Developer" de ICARUS y Datmean en Experience (violacion de modo estricto de Playwright). Mismo patron que el fix de "Segovia" en `003-about-section`. Fix: escopar el locator a `#hero`.

**Tests**:
- Vitest (`tests/unit/experience.test.ts`): 4 items, orden reverso-cronologico correcto, campos no vacios
- Playwright (`tests/e2e/experience.spec.ts`): eyebrow/heading visibles, 4 empresas + tags conocidos visibles, markers `aria-hidden`, sin overflow en `#experience` a 375/768/1280px (acotado a `boundingBox()`, mismo enfoque que `004-skills-section` para no acoplarse al bug preexistente de Hero/About), contenido visible tras scroll

**Verificacion manual**: confirmado visualmente en Chrome a ~1813px (timeline vertical con markers y linea conectora, 4 items completos, tags de ICARUS envolviendo correctamente con `flex-wrap` sin overflow — `boundingBox()` de `#experience` confirmado via JS: 1798px de ancho vs 1813px de viewport). Verificacion a 375px no repetida visualmente por el mismo bug de `resize_window` documentado en la nota de `004-skills-section` — se confio en Playwright (viewport via CDP) como evidencia.

**Criterio de salida**: todas las secciones renderizan correctamente con datos reales.

---

### Nota: `011-about-photo` — Foto real de perfil (reemplaza el placeholder)

**Implementado**: `ProfilePhoto` (Server Component, `next/image`) reemplaza `PhotoPlaceholder` (eliminado) en `AboutSection`. Reutiliza exactamente el mismo marco SVG Vesica Piscis y `clipPath: circle(40% at 50% 50%)`, solo cambia el contenido interior: un `<Image fill className="object-cover" priority>` en vez del `<div>` con texto "PROFILE IMAGE".

**Origen de la imagen**: foto proporcionada por el usuario fuera del repo (`~/Imágenes/carlos_sjm_dev.jpeg`, 1066×1600, retrato B&N). Recortada con ImageMagick (`magick ... -crop 1066x1066+0+70 -resize 900x900 -quality 87`) a un cuadrado 900×900 (~64KB) alineado para que la cara quede centrada en el tercio superior y se vean los hombros y el inicio de los brazos cruzados, segun encuadre pedido explicitamente por el usuario. El archivo original nunca se commitea — solo el resultado recortado/recomprimido en `public/images/carlos-sjm.jpg`.

**Datos**: `AboutData` (`src/types/index.ts`) extendido con `photoSrc: \`/${string}\`` y `photoAlt: string`; poblado en `src/data/about.ts` (`photoSrc: "/images/carlos-sjm.jpg"`, `photoAlt: "Carlos SJM, portrait"`).

**Tests**:
- Vitest (`tests/unit/about.test.ts`): `photoSrc` matchea `/^\/images\//`, `photoAlt` no vacio
- Playwright (`tests/e2e/about.spec.ts`): test "profile photo is visible with accessible label" (reemplaza el antiguo test del placeholder) — `getByRole("img", { name: "Carlos SJM, portrait" })` visible

**Verificacion manual**: confirmado en Chrome con dev server — cara y torso bien encuadrados dentro del marco circular, `alt` correcto verificado via `javascript_tool` (`img.alt === "Carlos SJM, portrait"`, imagen servida optimizada a 320×320 por `next/image`). El bug de `resize_window` (atascado, no aplica el resize real) persistio en esta sesion — como evidencia sustituta se generaron capturas reales con un script Playwright standalone a 375px y 1280px, confirmando sin overflow (`sectionWidth === viewportWidth` en ambos) y buen encuadre de la foto en los dos breakpoints.

**Criterio de salida**: foto real visible en producción del About section, sin placeholder pendiente (cierra el follow-up de foto real mencionado en sesiones previas).

---

### Nota: deploy temprano e informal en Vercel (adelantado a M6)

El usuario conecto el proyecto a Vercel (importacion del repo de GitHub via Dashboard, sin `vercel link`) para poder ver el resultado en vivo durante el desarrollo de M3, antes de llegar formalmente a M6. No sustituye el checklist de M6 (que sigue pendiente hasta cerrar M4/M5) — es solo una preview temprana.

**Deployment Protection**: por defecto Vercel exigia login para ver la web ("Vercel Authentication"). Se desactivo para que el sitio sea publico, y se activo por separado **"Protected Source Maps"** para que los `.map` del bundle no queden expuestos al desactivar la proteccion general. Detalle completo en [`docs/privacy/deployment-protection.md`](privacy/deployment-protection.md).

---

### Nota: `008-game-of-life` — Game of Life implementado (version completa, cierra tarea #21)

**Decision de alcance**: `docs/content-brief.md` habia reservado presets/velocidad/tamano de celda/contadores para una tarea futura (#21), pero el Figma export ya traia la version completa implementada. Decision del usuario: implementar la version completa ahora en vez de la recortada, cerrando la tarea #21 en el mismo pase.

**Implementado**: `GameOfLifeSection` (Server Component, eyebrow/heading/descripcion + `CircuitPattern` de fondo) + `GameOfLifeGridInView` (`'use client'`, `next/dynamic(..., { ssr: false })` + `whileInView` fade/slide-in, con skeleton `aria-hidden` mientras carga) + `GameOfLife` (`'use client'`, canvas 1200x500, controles Play/Pause/Reset/Randomize, presets Glider/Pulsar, sliders de velocidad y tamano de celda, contadores GENERATION/POPULATION).

**Logica de Conway extraida a `src/lib/gameOfLife.ts`**: puro, sin dependencias de React/canvas — `countNeighbors` (toroidal/wraparound), `nextGeneration` (las 4 reglas), `toggleCell`/`createEmptyGrid`/`createRandomGrid`/`applyPattern` (todas inmutables), `GLIDER_PATTERN`/`PULSAR_PATTERN`. Motivo: jsdom no soporta `canvas.getContext('2d')` (sin paquete `canvas`, por Minimal Dependencies), asi que la logica se testea 100% en Vitest y el dibujado se verifica en Playwright/navegador real. Ver `docs/testing/strategy.md`.

**Bugs encontrados y corregidos durante el porteo desde el Figma source**:
1. **Coordenadas de click incorrectas en cualquier viewport < 1200px**: el source calculaba la celda clickeada dividiendo `clientX/clientY - rect.left/top` directamente por `cellSize`, sin compensar que el canvas se renderiza a un tamano CSS distinto de su resolucion interna (1200x500 escalado via `w-full h-auto`). Esto rompia el click-to-toggle en practicamente cualquier pantalla no-desktop-ancha. Fix: escalar las coordenadas por `canvas.width / rect.width` y `canvas.height / rect.height` antes de dividir por `cellSize`. Verificado con un test de Playwright dedicado a 375px.
2. **Mutacion de estado no inmutable**: el toggle de celda del source hacia `const newGrid = [...grid]; newGrid[x][y] = ...`, que copia el array externo pero muta el mismo array de fila compartido. Fix: `toggleCell()` en la lib hace una copia inmutable completa.
3. **`noUncheckedIndexedAccess`**: el source asumia `grid[row][col]` siempre definido; el proyecto tiene ese flag de TS activo. Fix: acceso seguro via `grid[row]?.[col] ?? false` en toda la logica de la lib.
4. **`react-hooks/set-state-in-effect`**: el reset de grid al cambiar `cellSize`/`width`/`height` originalmente vivia en un `useEffect` llamando `setState` sincronicamente (cascading renders, flagueado por el linter). Fix: patron oficial de React "ajustar estado durante el render" — comparar una `gridKey` derivada contra su valor previo (en estado) y llamar `setState` en el cuerpo del render si cambio, en vez de en un efecto.

**Tests**:
- Vitest (`tests/unit/game-of-life.test.ts`, 20 tests): las 4 reglas de Conway (incluyendo un blinker completo), wraparound toroidal, inmutabilidad de `toggleCell`, dimensiones de `createEmptyGrid`/`createRandomGrid`, `applyPattern` centrado y con clipping en bordes
- Playwright (`tests/e2e/game-of-life.spec.ts`, 14 tests): click-to-toggle (incluyendo el caso de viewport estrecho que verifica el fix de escalado), Play/Pause avanzando generaciones, Reset/Randomize, presets Glider/Pulsar, sliders de velocidad/tamano de celda, sin overflow a 375/768/1280px

**Verificacion manual**: confirmado en Chrome con dev server — glider cargado y confirmado visualmente evolucionando (generacion 14, poblacion estable en 5 celdas tras varias generaciones, tal como se espera de un glider real), controles Play/Reset/Randomize/presets funcionando, layout de controles PLAYBACK/CONFIGURATION correcto. Verificacion visual a viewport movil no repetida por el mismo bug de `resize_window` (reporto 3440x1275 en vez de 390x844 pedido) — se confio en el test de Playwright dedicado al click en viewport estrecho (375px) como evidencia, que es el escenario critico del bug de coordenadas corregido.

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
