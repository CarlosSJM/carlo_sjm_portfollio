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
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Email**: Resend API (formulario de contacto)
- **Deploy**: Vercel
- **Analytics**: @vercel/analytics + @vercel/speed-insights

## Comandos

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Build de produccion
npm run start        # Servir build local
npm run lint         # ESLint
npx tsc --noEmit     # Typecheck
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

## Documentacion viva

**Regla obligatoria**: cada vez que se haga un commit o se tome una decision tecnica, actualizar toda la documentacion implicada en `/docs/`. Esto incluye:
- Nuevas rutas o componentes -> actualizar `docs/architecture/folder-structure.md` y `docs/architecture/components.md`
- Cambios de dependencias o stack -> actualizar `docs/architecture/tech-decisions.md`
- Cambios de SEO -> actualizar `docs/seo/strategy.md` y `docs/seo/checklist.md`
- Cambios de privacidad -> actualizar `docs/privacy/`
- Cambios de deploy/env vars -> actualizar `docs/deploy/vercel.md`
- Si se agrega un doc nuevo -> actualizar `docs/INDEX.md`

La documentacion debe reflejar siempre el estado actual del proyecto.

## SEO Checklist

Ver `docs/seo/checklist.md` para la lista completa pre-deploy.
