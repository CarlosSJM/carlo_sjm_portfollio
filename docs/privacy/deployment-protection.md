# Deployment Protection en Vercel

## Contexto

El proyecto se desplego en Vercel con **Deployment Protection** activo por defecto ("Vercel Authentication"), lo que exigia login con cuenta de Vercel para ver la web publicada — inaceptable para un portfolio, que debe ser publico. Se desactivo para permitir acceso publico sin login.

Al desactivarlo, Vercel muestra un warning: *"Disabling will make sourcemaps publicly accessible, potentially exposing source code."*

## Configuracion actual

| Ajuste | Estado | Efecto |
|---|---|---|
| **Deployment Protection** (Vercel Authentication) | Desactivado | La web es publica, sin login para verla |
| **Protected Source Maps** | **Activado** | Los archivos `.map` (sourcemaps del bundle) devuelven `404` a cualquiera sin sesion de Vercel, aunque el resto del sitio sea publico |

Son dos ajustes independientes en el mismo panel (**Project Settings → Deployment Protection**): el primero controla quien ve la web, el segundo controla especificamente quien puede descargar los `.map` que revelarian el codigo fuente original (TS/JSX) a traves de las devtools del navegador.

## Por que esto encaja con el proyecto

- El sitio en si (HTML/CSS/JS minificado) es publico por diseno — es un portfolio, tiene que ser indexable y visible sin friccion
- Pero el codigo fuente legible (via sourcemaps) no aporta nada al visitante y si puede exponer detalles de implementacion innecesariamente — con Protected Source Maps activo, esa via queda cerrada
- No requiere plan de pago: Protected Source Maps esta disponible en todos los planes de Vercel, incluido Hobby

## Nota tecnica adicional

`next.config.ts` de este proyecto **no** define `productionBrowserSourceMaps: true` — el default de Next.js es `false`, es decir que probablemente el build ni siquiera genera `.map` publicos del bundle cliente hoy. Protected Source Maps es la capa de proteccion adicional (defensa en profundidad) por si en el futuro se activara esa opcion de Next.js o Vercel genera sourcemaps propios para su Observability.

## Referencias

- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection)
- [Restrict access to production source maps (Protected Source Maps)](https://vercel.com/docs/deployment-protection/protected-source-maps)
