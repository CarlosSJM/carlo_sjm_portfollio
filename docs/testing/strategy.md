# Estrategia de Testing

Constitution V (Testing Discipline) define que tests son obligatorios. Este documento detalla **que** se testea con **que herramienta** y **donde** vive cada tipo de test.

## Stack

| Herramienta | Proposito |
|---|---|
| **Vitest** | Tests unitarios e integracion (logica, datos, utilidades, componentes sincronos) |
| **@testing-library/react** | Renderizado y queries semanticas en tests Vitest |
| **@testing-library/jest-dom** | Matchers extra (`toBeInTheDocument`, `toHaveTextContent`, etc.) |
| **jsdom** | DOM en Node.js para tests Vitest |
| **Playwright** | Tests end-to-end (navegacion real, formulario contacto, accesibilidad de paginas) |

## Estructura de archivos

```
tests/
├── setup.ts                # Setup global Vitest (importa jest-dom)
├── unit/                   # Vitest: logica pura, helpers, schemas, datos
│   └── *.test.ts(x)
├── integration/            # Vitest: componentes con dependencias, Route Handlers
│   └── *.test.ts(x)
└── e2e/                    # Playwright: navegacion, flujos completos
    └── *.spec.ts
```

## Que testear con que

### Vitest unitario (`tests/unit/`)

- **Helpers de `src/lib/`**: `metadata.ts`, `schema.ts` (JSON-LD generators)
- **Datos de `src/data/`**: integridad — no broken links, campos requeridos, types validos
- **Tipos**: assertions de tipo cuando sean criticos
- **Componentes sincronos** que renderizan datos estaticos (Skills, ProjectCard)

### Vitest integracion (`tests/integration/`)

- **Route Handlers** (`app/api/contact/route.ts`): validacion, status codes, llamadas a Resend mockeadas
- **Componentes con interaccion** que sean sincronos
- **`generateMetadata`**: verificar title, description, canonical, OG correctos por pagina

> **Limitacion**: Vitest no soporta async Server Components todavia. Para esos, usar Playwright.

### Playwright e2e (`tests/e2e/`)

- **Renderizado real de paginas** (homepage, projects, about, contact)
- **Navegacion** entre secciones
- **Flujo completo del contact form** (con Resend en modo test/mock)
- **Accesibilidad**: jerarquia de headings, alt text, aria-labels, contrast (con axe-playwright si se anade)
- **SEO renderizado**: meta tags, OG, structured data presentes en el HTML servido

## Comandos

```bash
npm run test           # Vitest run (CI mode, exit al terminar)
npm run test:watch     # Vitest watch mode (desarrollo)
npm run test:e2e       # Playwright (build + start + tests + report HTML)
```

`npm run test:e2e` ejecuta automaticamente `npm run build && npm run start` antes (configurado en `playwright.config.ts → webServer`).

## Convenciones

### Naming

- Vitest: `*.test.ts` o `*.test.tsx` (componentes)
- Playwright: `*.spec.ts`
- Un archivo por modulo o feature; nada de "mega test files"

### Estructura de un test

```ts
import { describe, it, expect } from 'vitest'

describe('Module name', () => {
  it('describes the behavior in plain language', () => {
    // arrange
    // act
    // assert
  })
})
```

### Mocks

- **Resend**: mockear `resend.emails.send` en tests de Route Handler
- **`fetch` externos**: mockear con `vi.fn()` o MSW si crece la complejidad
- **NO mockear** datos de `src/data/` — se testean tal cual

### Datos de prueba

- Fixtures en `tests/fixtures/` cuando se necesiten objetos compartidos
- Para datos triviales, inline en el test

## Que tests son obligatorios antes de commit a main (Constitution V)

| Componente del proyecto | Test minimo |
|---|---|
| Pagina nueva | Vitest: `generateMetadata` correcto. Playwright: renderiza y h1 correcto |
| Componente con datos | Vitest: render con props y queries semanticas |
| Funcion en `src/lib/` | Vitest: caso happy path + edge case |
| Dato nuevo en `src/data/` | Vitest: integridad (campos, types, no urls vacias) |
| Route Handler | Vitest integration: 200 OK, 400 invalido, mock Resend |
| JSON-LD schema | Vitest: estructura valida segun schema.org |
| Contact form | Playwright e2e: flujo completo con Resend mockeado |

## CI/CD

En GitHub Actions / Vercel CI:
1. `npm run lint` — ESLint zero warnings
2. `npm run typecheck` — TypeScript strict zero errores
3. `npm run test` — Vitest todos pasan
4. `npm run build` — Next.js build exitoso
5. `npm run test:e2e` — Playwright todos pasan

Cualquier fallo bloquea el merge.

## Reportes y debugging

- **Vitest**: salida en consola; `--reporter=verbose` para detalle
- **Playwright**: report HTML en `playwright-report/` tras cada run; `npx playwright show-report` para abrirlo
- **Playwright traces**: activos en retry (`trace: 'on-first-retry'`)

## Lo que NO testear

- Estilos visuales especificos (colores, paddings) — eso es trabajo de diseno, no de tests
- Implementacion interna de Next.js (router, fetch caching) — son detalles del framework
- Tipos triviales en TypeScript — el compilador ya los valida
