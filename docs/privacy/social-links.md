# Redes Sociales con Maxima Privacidad

## Principios

1. **Zero third-party requests**: no cargar nada de CDNs externos
2. **Zero tracking**: no parametros UTM, no widgets embebidos
3. **Zero referrer leaks**: headers y atributos que previenen filtrar tu URL

## Implementacion

### SVGs locales
Todos los iconos de redes sociales se guardan como SVGs en `public/icons/` o como componentes inline. Nunca usar:
- Font Awesome CDN
- cdnjs
- unpkg
- Cualquier CDN externo que logee IPs de visitantes

### Atributos de link
```html
<a
  href="https://github.com/username"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub profile"
>
  <GitHubIcon />  <!-- SVG local -->
</a>
```

- `rel="noopener"`: previene acceso a `window.opener`
- `rel="noreferrer"`: previene enviar `Referer` header al destino
- `aria-label`: accesibilidad para screen readers

### Headers HTTP (next.config.ts)
```
Referrer-Policy: strict-origin-when-cross-origin
```
Esto aplica globalmente: ningun link externo recibe la URL completa de tu portfolio.

## Lo que NO hacer

- No usar Twitter/X embed widgets (cargan scripts de tracking)
- No usar LinkedIn badges (idem)
- No usar Facebook Like buttons (idem)
- No agregar `?ref=portfolio` ni UTM params a tus links
- No cargar imagenes de perfil desde las APIs de redes sociales
