# Formulario de Contacto Privado

## Arquitectura

```
Visitante                    Vercel Serverless            Resend API           Tu inbox
   |                              |                          |                    |
   |-- POST /api/contact -------->|                          |                    |
   |   {name, email, message}     |                          |                    |
   |                              |-- resend.emails.send() ->|                    |
   |                              |   to: CONTACT_EMAIL      |-- email delivery ->|
   |                              |   (env var)              |                    |
   |<---- 200 OK ----------------|                          |                    |
```

## Capas de privacidad

### Capa 1: Server-side only
- El email destino (`CONTACT_EMAIL`) solo existe como env var en Vercel
- Nunca aparece en codigo fuente, HTML, headers, ni respuestas de API
- El cliente solo envia POST con {name, email, message}

### Capa 2: Alias de email (opcional pero recomendado)
- Crear alias en addy.io (ej: `portfolio@tudominio.anonaddy.com`)
- Usar el alias como `CONTACT_EMAIL` en Vercel
- El alias reenvía a tu email real
- Ni siquiera Resend conoce tu email real
- Si el alias se filtra, lo desactivas y creas otro

### Capa 3: Anti-spam
- **Honeypot field**: campo oculto que bots llenan, humanos no
- **Rate limiting**: maximo 5 emails por IP por hora
- **Validacion server-side**: sanitizar inputs, validar formato de email

## Variables de entorno (Vercel Dashboard)

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=portfolio@alias.anonaddy.com
```

Estas variables NUNCA se commitean al repo. Se configuran en Vercel Dashboard > Settings > Environment Variables.

## Remitente

Usar dominio custom con Resend: `noreply@tudominio.com`
Esto evita que el visitante vea tu email real en el campo "To" del email.
