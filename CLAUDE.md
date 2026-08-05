# Portfolio Carlos SJM

Portfolio personal para mostrar habilidades como desarrollador fullstack.

## Estado actual

- **Tecnologias/proyectos**: pendiente de recibir del usuario
- **Diseno**: pendiente de recibir mockups/diseños del usuario
- **Tema**: el diseño que proporcione el usuario sera el default. Light/dark mode planificado (light mode es tarea futura)
- **Secciones**: se definiran segun los diseños proporcionados
- **Dominio**: `nombrequepongamos.vercel.app` (nombre por definir)
- **Idioma**: bilingue ES/EN (i18n es tarea futura, inicialmente un solo idioma segun diseños)

## Stack

- **Framework**: Next.js 16.2.2 (App Router, Turbopack, SSG)
- **Language**: TypeScript (strict + noUncheckedIndexedAccess + noImplicitOverride)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest (unit/integration) + Playwright (e2e)
- **Email**: Resend API (formulario de contacto)
- **Deploy**: Vercel
- **Analytics**: @vercel/analytics + @vercel/speed-insights

## Comandos

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Build de produccion
npm run start        # Servir build local
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest (run once)
npm run test:watch   # Vitest (watch mode)
npm run test:e2e     # Playwright (build + start + test)
```

## Arquitectura

- Toda la documentacion tecnica esta en `/docs/INDEX.md`
- App Router: rutas en `src/app/`
- Datos editables centralizados en `src/data/`
- Componentes en `src/components/{layout,sections,contact,ui}/`
- Logica compartida en `src/lib/`

## Convenciones

- **Server Components por defecto**. Solo usar `'use client'` cuando sea estrictamente necesario
- **Minimas dependencias**. No instalar lo que Next.js ya provee
- **Assets locales**. SVGs de redes sociales en `public/icons/`, nunca CDNs externos
- **Privacidad**: el email real nunca aparece en codigo. Solo en env vars de Vercel
- **SEO**: cada pagina necesita `generateMetadata` con title, description, canonical, OG
- **Accesibilidad**: semantic HTML, alt en imagenes, aria-labels, un h1 por pagina

## Variables de entorno

```
RESEND_API_KEY=       # API key de Resend (solo server-side)
CONTACT_EMAIL=        # Email destino del formulario (alias de addy.io)
```

Nunca commitear `.env.local`. Configurar en Vercel Dashboard.

## Verificacion manual pre-entrega

**Regla obligatoria**: antes de dar por terminada cualquier feature o fix (aunque Vitest y Playwright esten en verde), Claude debe levantar `npm run dev` y probar la funcionalidad manualmente en el navegador via Claude-in-Chrome — recorrer el golden path y los edge cases relevantes (incluyendo breakpoints responsive si aplica). Los tests automatizados verifican comportamiento especificado, no que la feature se vea/funcione bien en la practica.

Motivo: en `010-mobile-nav` los 44 tests de Playwright pasaban en verde, pero el drawer se renderizaba mal posicionado en el navegador real — el `Header` con `backdrop-blur` convertia el `<header>` en el *containing block* de sus descendientes `position: fixed`, algo que los asserts automatizados no detectaron porque no comparaban el tamaño del drawer contra el viewport completo.

Tras la verificacion de Claude, el usuario debe revisar y aprobar la feature el mismo antes de mergear.

## Documentacion viva

**Regla obligatoria**: tras completar **cualquier task individual de spec-kit, cualquier phase, cualquier commit, o cualquier decision tecnica**, hacer un pase de revision documental antes de avanzar. Actualizar todo lo implicado:

- Nuevas rutas o componentes -> `docs/architecture/folder-structure.md` y `docs/architecture/components.md`
- Cambios de dependencias o stack -> `docs/architecture/tech-decisions.md`
- Cambios de SEO -> `docs/seo/strategy.md` y `docs/seo/checklist.md`
- Cambios de privacidad -> `docs/privacy/`
- Cambios de testing -> `docs/testing/strategy.md`
- Cambios de deploy/env vars -> `docs/deploy/vercel.md`
- Avance en el roadmap -> marcar items en `docs/roadmap.md`
- Tasks completadas en spec-kit -> marcar checkboxes en `specs/<feature>/tasks.md`
- Si se agrega un doc nuevo -> `docs/INDEX.md`

La documentacion debe reflejar siempre el estado actual del proyecto. Si tras la revision no hay nada que actualizar, declararlo explicitamente.

## SEO Checklist

Ver `docs/seo/checklist.md` para la lista completa pre-deploy.
