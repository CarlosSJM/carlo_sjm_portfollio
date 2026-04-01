# Checklist SEO Pre-Deploy

## Critico (bloquea deploy)
- [ ] Cada pagina tiene `title` y `description` unicos via `generateMetadata`
- [ ] JSON-LD Person + WebSite en root layout
- [ ] `sitemap.ts` genera todas las URLs publicas
- [ ] `robots.ts` permite crawling y apunta al sitemap
- [ ] Semantic HTML: un h1 por pagina, jerarquia correcta
- [ ] `lang` en `<html>` tag
- [ ] Todas las imagenes tienen `alt` descriptivo

## Importante (impacta ranking)
- [ ] `next/image` con `priority` en hero/LCP image
- [ ] `next/font` cargando fuentes (zero CLS)
- [ ] OG image (1200x630) para cada pagina
- [ ] Twitter card meta tags
- [ ] Canonical URLs en todas las paginas
- [ ] Headers de seguridad en next.config.ts
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`

## Post-Deploy
- [ ] Verificar sitio en Google Search Console
- [ ] Enviar sitemap
- [ ] Lighthouse score > 95 en todas las categorias
- [ ] Validar structured data con Google Rich Results Test
- [ ] Verificar OG tags con https://www.opengraph.xyz/
- [ ] Core Web Vitals en verde (Speed Insights de Vercel)
