# Mapa de Componentes

## Layout (`src/components/layout/`)

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `Header` | Server | Navegacion principal, logo |
| `Footer` | Server | Copyright, links secundarios |
| `Navigation` | Server | Menu de navegacion responsive |

## Secciones (`src/components/sections/`)

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `Hero` | Server | Presentacion principal, CTA |
| `ProjectCard` | Server | Tarjeta individual de proyecto |
| `ProjectGrid` | Server | Grid de proyectos |
| `SkillsSection` | Server | Stack tecnologico visual |
| `AboutSection` | Server | Informacion personal/profesional |

## Contacto (`src/components/contact/`)

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `ContactForm` | **Client** | Formulario con validacion y envio |
| `SocialLinks` | Server | Links a redes sociales con SVGs locales |

## UI Base (`src/components/ui/`)

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `Button` | Server | Boton reutilizable |
| `Badge` | Server | Etiqueta de tecnologia |
| `Card` | Server | Contenedor con estilo |

## Principio clave

**Solo `ContactForm` necesita `'use client'`** (manejo de estado del formulario). Todo lo demas es Server Component para minimizar JS enviado al navegador.
