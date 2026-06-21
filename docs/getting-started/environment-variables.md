---
sidebar_position: 3
title: Variables de entorno
description: Referencia de variables de entorno del backend y frontend.
---

# Variables de entorno

## Backend — prometheus-service

El backend carga variables desde `--env-file` (` .env.local`, `.env.dev`, etc.). **No commitear** archivos `.env*` con secretos.

### Servidor y seguridad

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto HTTP (default `3000`) |
| `ALLOWED_ORIGINS` | Orígenes CORS permitidos, separados por coma |
| `JWT_SECRET` | Firma de tokens de sesión |
| `NODE_ENV` | `development` / `production` |

### Supabase

| Variable | Descripción |
|----------|-------------|
| `SUPABASE_URL` | URL del proyecto |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service role (solo backend) |

### IA

| Variable | Descripción |
|----------|-------------|
| `OPENAI_API_KEY` | API key OpenAI |
| Variables en `config/aiConfig.js` | Modelo, límites, prompts base |

### Almacenamiento y media

| Variable | Descripción |
|----------|-------------|
| Cloudinary (`config/cloudinaryConfig.js`) | Upload de imágenes/videos de productos |
| GCS | Catálogo PDF (`services/gcsCatalogService.js`) |

### Email (registro)

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | Envío de códigos de verificación |

### Producción

En **GCP Cloud Run** y **Render** las variables se configuran en el panel del servicio o via secrets del pipeline (ver [CI/CD](/docs/operations/ci-cd)).

:::caution
Usa claves distintas por entorno. La service role de Supabase nunca debe exponerse al frontend.
:::

## Frontend — prometheus-interface

Angular usa archivos en `src/environments/`:

| Archivo | Uso |
|---------|-----|
| `environment.local.ts` | Desarrollo local → API en localhost |
| `environment.development.ts` | Entorno dev desplegado |
| `environment.production.ts` | Producción |

Campo principal:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000', // base sin /api
};
```

La utilidad `urlApi()` en `core/config/url.ts` construye rutas bajo `{apiUrl}/api/...`.

## Documentación

Este sitio Docusaurus no requiere variables de entorno para desarrollo local. Para deploy en GitHub Pages, ajusta `url` y `baseUrl` en `docusaurus.config.ts`.
