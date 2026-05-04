# Content Brief — M2

> Brief consolidado del contenido y decisiones de diseño extraidos de los mockups
> de Figma (`Portfolio Website Design-final-faltafoto/`). Sirve como input para
> `/speckit-specify` por seccion en M3.

## Identidad

- **Nombre**: Carlos SJM
- **Role**: Full Stack Developer
- **Tagline**: "From biology to code — building end-to-end digital experiences"
- **Ubicacion**: Madrid
- **Idioma del portfolio**: Ingles (i18n ES queda en M8)
- **Email destino del form**: `carlos.sjmartin12@gmail.com` (solo en `process.env.CONTACT_EMAIL` en Vercel, NUNCA en codigo/HTML)
- **LinkedIn**: TBD (placeholder en M3, actualizar cuando se proporcione)
- **GitHub**: TBD (placeholder en M3, actualizar cuando se proporcione)

## Decisiones M2 confirmadas

| # | Decision | Resultado |
|---|---|---|
| 1 | Framer Motion (`motion/react`) | SI, solo en client components especificos |
| 2 | Conway's Game of Life | SI, version sencilla en M3. Version avanzada como tarea futura (#21) |
| 3 | Geometrias SVG de fondo | SI (FibonacciSpiral, SpiralPetals, MetatronCube, GeometricDots, FlowerOfLife) |
| 4 | Card EMAIL en Contact | Opcion A: sustituir mailto por CTA "WRITE A MESSAGE" que scrollea al form |
| 5 | Foto de perfil | Placeholder SVG geometrico actual hasta que se proporcione foto real |
| 6 | Idioma | Ingles |
| 7 | Cursor crosshair global | SI, conservar |

## Tema visual

- **Modo**: Dark exclusivo (light mode queda en M8 — tarea #4)
- **Tipografias**: Space Grotesk (700) + JetBrains Mono (300/400/500) + Inter (300/400/500/600)
  - Cargar via `next/font/google` (NUNCA via @import googleapis)
- **Paleta**: `#000`, `#0a0a0a`, `#0d0d0d`, `#1a1a1a` con texto blanco y greys (`#A0A0A0`)
- **Acentos**: borders `white/10-30`, hover invierte fondo
- **Overlay**: film grain SVG turbulence z-50
- **Cursor**: `crosshair` global, `pointer` en buttons/links

## Secciones (orden y anclas)

| # | ID | Titulo H3 | Eyebrow (H2) |
|---|---|---|---|
| 1 | `hero` | "CARLOS SJM" (h1) | — |
| 2 | `about` | "From Nature to Code" | "ABOUT" |
| 3 | `skills` | "AREAS OF KNOWLEDGE" | "EXPERTISE" |
| 4 | `experience` | "EXPERIENCE" | "JOURNEY" |
| 5 | `projects` | "SELECTED PROJECTS" | "SHOWCASE" |
| 6 | `education` | "EDUCATION & CERTIFICATIONS" | "LEARNING" |
| 7 | `gameoflife` | "CONWAY'S GAME OF LIFE" | "INTERACTIVE" |
| 8 | `contact` | "LET'S BUILD SOMETHING" | — |
| – | footer | © 2026 CARLOS SJM | — |

## Contenido detallado

### 1. Hero

- H1: `CARLOS SJM`
- Role: `FULL STACK DEVELOPER`
- Tagline: `From biology to code — building end-to-end digital experiences`
- Ubicacion: `Segovia` (con icono `MapPin`)
- CTAs:
  - `VIEW PROJECTS` → ancla `#projects`
  - `CONTACT ME` → ancla `#contact`
- Scroll indicator (chevron animado) → `#about`
- Background: `GeometricDots` + `FibonacciSpiral` (opacity 0.35)

### 2. About

- Bio (3 parrafos):

> After years dedicated to research and the natural world, I fully committed to my other passion — web development. I build complete digital solutions, from database architecture to polished user interfaces.
>
> With a background in biology and years of experience across the full stack, I bring a unique analytical perspective to software development. I specialize in creating scalable applications that bridge the gap between complex backend systems and intuitive user experiences.
>
> Based in Segovia, I've worked with startups and enterprises across fintech, IoT, and enterprise solutions, always seeking the elegant solution that balances technical excellence with practical delivery.

- Foto: placeholder SVG (Vesica Piscis frame) hasta tener real
- Background: `SpiralPetals` (opacity 0.2) + grid SVG overlay

### 3. Skills (6 categorias)

| Categoria | Icono Lucide | Skills |
|---|---|---|
| Front-End | `Layout` | React, TypeScript, Angular, Ionic, Next.js, ES6 |
| Front Tools | `Settings` | Webpack, ESLint, Vite, Redux |
| Back-End | `Server` | Node.js, NestJS, PHP, Java, Groovy, Spring Boot |
| Back Tools | `Terminal` | Docker, VirtualBox, Jenkins, Kubernetes |
| Databases | `Database` | MySQL, SQL, MongoDB, PostgreSQL, Firebase |
| Scripts & Other | `Code2` | Python3, Bash, Google Tag Manager, Git, Linux |

### 4. Experience (timeline 4 items)

| Empresa | Role | Periodo | Stack | Descripcion |
|---|---|---|---|---|
| **BravePay** | Front-End Collaborator | Aug 2022 – Dec 2024 | Next.js, TypeScript, Crypto APIs | Developed the front-end for a cryptocurrency payment platform using Next.js, creating seamless payment flows and responsive interfaces for digital transactions. |
| **ICARUS** | Full Stack Developer | Jan 2021 – Oct 2023 | Angular, Ionic, React, Java Spring, Groovy, NestJS, Firebase, MongoDB, Docker, Jenkins, Kubernetes | Built end-to-end solutions using Angular, Ionic, and React for front-end, with Java Spring, Groovy, and NestJS on the back-end. Managed containerized deployments with Docker, Jenkins, and Kubernetes. |
| **Ust-Global** | Front-End Developer | Apr 2020 – Dec 2020 | React.js, TypeScript, Redux, Bootstrap, Node.js, Hapi, PostgreSQL | Developed React applications with TypeScript and Redux, integrated with Node.js APIs and PostgreSQL databases. Utilized Bootstrap for responsive design. |
| **Datmean** | Full Stack Developer | Jun 2018 – Mar 2020 | React.js, Redux, Material UI, PHP 7, MariaDB, Docker, ELK Stack, GTM | Created full-stack web applications using React with Redux and Material UI for the front-end, PHP 7 with MariaDB for the back-end, and Docker for containerization. Implemented analytics using ELK Stack and Google Tag Manager. |

### 5. Projects (3 cards)

| Titulo | Descripcion | Tags |
|---|---|---|
| Cryptocurrency Payment Platform | Next.js-based payment gateway for seamless crypto transactions with real-time exchange rates. | Next.js, TypeScript, Web3 |
| Enterprise IoT Dashboard | Angular-based monitoring system for industrial sensors with real-time data visualization. | Angular, NestJS, MongoDB |
| E-commerce Platform | Full-stack marketplace with React front-end and microservices architecture. | React, Spring Boot, Docker |

### 6. Education (4 cards)

| Titulo | Detalle | Descripcion |
|---|---|---|
| Full Stack Development Bootcamp | Upgrade-Hub · 2019 · 350 hours | Intensive program covering modern web development from front to back-end technologies. |
| OOP Certificate | Object-Oriented Programming | Java, HTML, CSS, JavaScript, MySQL |
| Licenciado en Biología | Universidad de Alcalá | Bachelor's degree in Biology — Research and analytical thinking foundation. |
| Additional Courses | (tags) | Docker, Kubernetes, TypeScript, React Advanced, Node.js, MongoDB |

### 7. Game of Life (interactive)

- Titulo: `CONWAY'S GAME OF LIFE`
- Subtitulo: `A zero-player game that demonstrates emergent complexity from simple rules. Watch patterns evolve, create your own, or explore classic configurations.`
- **Version M3 (sencilla)**: grid 2D click-to-toggle + play/pause/reset + step automatico
- **Version futura** (tarea #21): patrones predefinidos, control velocidad, contador generaciones, fullscreen, WebWorker

### 8. Contact

- H2: `LET'S BUILD SOMETHING`
- Texto: `Whether you have a project in mind or just want to connect, I'm always open to discussing new opportunities and collaborations.`
- 3 cards (decision 4 = opcion A):
  - **WRITE A MESSAGE** (icono `Mail`) → scroll a form abajo (no email visible)
  - **LINKEDIN** (icono `Linkedin`) → `https://linkedin.com/in/TU-USER` (placeholder, tarea #23)
  - **GITHUB** (icono `Github`) → `https://github.com/TU-USER` (placeholder, tarea #23)
- Form: name + email + message + submit `SEND MESSAGE`
  - Validacion server-side
  - Envio via Resend a `process.env.CONTACT_EMAIL`
  - Honeypot field
  - Rate limiting

### Footer

- `© 2026 CARLOS SJM`
- `DESIGNED WITH PRECISION · BUILT WITH PASSION`

## Componentes a portar (de la fuente Figma)

### Geometrias SVG (Server Components, sin cambios mayores)

- `FibonacciSpiral.tsx`
- `SpiralPetals.tsx`
- `MetatronCube.tsx`
- `GeometricDots.tsx`
- `FlowerOfLife.tsx`

### Componentes interactivos (necesitaran client wrapper)

- `SkillCard.tsx` — usa `motion`, simple
- `ProjectCard.tsx`
- `TimelineItem.tsx`
- `GameOfLife.tsx` — canvas, version sencilla en M3

### NO portar (Constitution VI — Minimal Dependencies)

- Todo el directorio `src/app/components/ui/` (50+ componentes shadcn no usados)
- `@mui/material`, `@emotion/*` (no se usan en App.tsx)
- `react-router`, `recharts`, `embla-carousel`, `vaul`, `react-dnd`, `react-slick`, etc.

## Dependencias nuevas a instalar para M3

```
motion              # framer-motion (renombrado a "motion")
lucide-react        # iconos (tree-shakeable)
resend              # contact form (M4)
```

Total: +3 deps runtime sobre las actuales (Constitution VI permite hasta 10).

## Cambios de diseño respecto al Figma original

Estos cambios son obligatorios por la Constitution:

1. **Email visible eliminado** — no `mailto:` en HTML (decision 4 opcion A)
2. **Google Fonts via `next/font`** en lugar de `@import` (Privacy + zero CLS)
3. **Server Components por defecto** — solo client donde necesario
4. **Form con server action / Route Handler + Resend** — no `alert("demo")`
5. **Class `opacity-8` invalida** → `opacity-[0.08]`
6. **Labels con `htmlFor` + inputs con `id`** — accesibilidad
7. **Lucide icons individuales** — solo importar los que usamos (~10)
8. **Game of Life dinamico** — `next/dynamic` con `ssr: false`
9. **No mockear `alert()`**, no console.logs

## Riesgos / atencion

- `motion` library añade ~50KB. Verificar que el bundle final sigue < 50KB gzip o reevaluar (Constitution VIII)
- Animaciones `whileInView` requieren `'use client'`. Hacer wrappers minimos para no convertir secciones enteras en client.
- Custom cursor crosshair puede afectar A11y — verificar con screen readers en M5
- Game of Life sin SSR significa loading state — diseñar skeleton

## Estado de M2

- [x] Diseños recibidos (Figma export)
- [x] Contenido extraido (skills, experience, projects, education, bio)
- [x] Decisiones de portacion confirmadas
- [x] Brief documentado
- [ ] Foto real (tarea #22, no bloqueante — placeholder)
- [ ] LinkedIn/GitHub URLs (tarea #23, no bloqueante — placeholders)

**Resultado: M2 cerrado. Listo para arrancar M3 con `/speckit-specify`.**
