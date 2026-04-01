# Decisiones Tecnicas

## Framework: Next.js 16 (App Router, Turbopack)

**Por que Next.js y no React SPA:**
- SSG nativo: paginas pre-renderizadas como HTML estatico, servidas desde CDN edge
- SEO superior: HTML completo disponible para Googlebot sin JS rendering
- Route Handlers: API serverless incluidas (`app/api/`) para el formulario de contacto
- `generateMetadata`: meta tags y OG por pagina de forma nativa
- `sitemap.ts` / `robots.ts`: generacion automatica sin libs externas
- Optimizado para Vercel: zero-config deploy, edge caching, image optimization

## Lenguaje: TypeScript

- Type safety en todo el proyecto
- Mejor DX con autocompletado y deteccion de errores
- Estandar de la industria para proyectos profesionales

## Styling: Tailwind CSS

- Purge automatico: solo se incluye el CSS usado (bundle minimo)
- No runtime CSS-in-JS: zero impacto en INP/LCP
- Utility-first: rapido para prototipar y mantener
- Soporte nativo en Next.js

## Emails: Resend API

- Free tier: 100 emails/dia, 3000/mes (sobra para portfolio)
- API moderna y simple
- Soporte para dominios custom (el email del remitente puede ser noreply@tudominio.com)
- El email real del destinatario solo existe en env vars del servidor

## Deploy: Vercel

- Deploy automatico desde git push
- CDN global con edge caching
- Serverless functions para API de contacto
- Analytics y Speed Insights incluidos
- SSL automatico

## Dependencias actuales

```json
{
  "dependencies": {
    "next": "16.2.2",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## Pendientes de instalar

- `resend` — cuando se implemente el formulario de contacto

Principio: dependencias minimas. No instalar nada que Next.js ya provea.
