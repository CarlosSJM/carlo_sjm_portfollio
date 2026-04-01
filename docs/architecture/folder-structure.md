# Estructura de Carpetas

```
carlo_sjm_portfollio/
├── docs/                          # Documentacion del proyecto
│   ├── INDEX.md                   # Indice maestro
│   ├── architecture/              # Docs de arquitectura
│   ├── seo/                       # Docs de SEO
│   ├── privacy/                   # Docs de privacidad
│   └── deploy/                    # Docs de deploy
│
├── public/                        # Assets estaticos (favicon, og-image, robots)
│   ├── icons/                     # SVGs de redes sociales (self-hosted)
│   └── images/                    # Imagenes optimizadas del portfolio
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (metadata global, fonts, analytics)
│   │   ├── page.tsx               # Homepage / Landing
│   │   ├── projects/
│   │   │   └── page.tsx           # Pagina de proyectos
│   │   ├── about/
│   │   │   └── page.tsx           # Sobre mi
│   │   ├── contact/
│   │   │   └── page.tsx           # Formulario de contacto
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts       # Serverless: envio de emails via Resend
│   │   ├── sitemap.ts             # Generacion automatica de sitemap
│   │   ├── robots.ts              # Configuracion de robots.txt
│   │   └── not-found.tsx          # Pagina 404 personalizada
│   │
│   ├── components/
│   │   ├── layout/                # Header, Footer, Navigation
│   │   ├── sections/              # Hero, ProjectCard, Skills, etc.
│   │   ├── contact/               # ContactForm, SocialLinks
│   │   └── ui/                    # Componentes base reutilizables
│   │
│   ├── lib/
│   │   ├── metadata.ts            # Helpers para generateMetadata
│   │   ├── schema.ts              # JSON-LD structured data (Person, WebSite)
│   │   └── resend.ts              # Cliente de Resend para emails
│   │
│   ├── data/
│   │   ├── projects.ts            # Datos de proyectos (titulo, desc, tech, links)
│   │   ├── skills.ts              # Stack tecnologico
│   │   └── social.ts              # Links de redes sociales
│   │
│   └── styles/
│       └── globals.css            # Tailwind base + custom styles
│
├── CLAUDE.md                      # Guia de contexto para Claude Code
├── next.config.ts                 # Config de Next.js (headers, redirects)
├── tailwind.config.ts             # Config de Tailwind CSS
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencias y scripts
└── .env.local                     # Variables de entorno locales (NO commitear)
```

## Principios de organizacion

1. **Colocation**: Cada ruta tiene su propio directorio con page.tsx
2. **Separacion de datos**: `src/data/` centraliza contenido editable sin tocar componentes
3. **Server-first**: Todo es Server Component por defecto. Solo marcar `'use client'` donde sea estrictamente necesario (formulario de contacto)
4. **Assets locales**: Iconos SVG en `public/icons/` — nunca CDNs externos
