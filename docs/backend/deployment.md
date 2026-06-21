---
sidebar_position: 4
title: Despliegue del backend
description: Pipelines GCP Cloud Run y Render para prometheus-service.
---

# Despliegue del backend

## Entornos

| Entorno | Plataforma | Workflow |
|---------|------------|----------|
| Desarrollo | Render | `.github/workflows/render-development.yml` |
| Producción | GCP Cloud Run | `.github/workflows/gcp-production.yml` |

## GCP Cloud Run (producción)

Pipeline manual (`workflow_dispatch`) en rama `master`:

- **CI** — install + validación syntax, sin deploy.
- **CI+CD** — validación + deploy Cloud Run + tag Git semver.

Secrets requeridos:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`

Variables de entorno (environment `production`):

- `GCP_PROJECT_ID`, `GCP_REGION`, `CLOUD_RUN_SERVICE`

El servicio Node escucha en `PORT` inyectado por Cloud Run. Configurar `trust proxy` ya está en `server.js`.

## Render (desarrollo)

Workflow en `.github/workflows/render-development.yml` para rama de desarrollo. Variables de entorno vía dashboard Render.

## Checklist pre-deploy

- [ ] Migraciones SQL aplicadas en el entorno destino
- [ ] `JWT_SECRET`, Supabase, OpenAI, Cloudinary, GCS, Resend configurados
- [ ] `ALLOWED_ORIGINS` incluye URL del frontend desplegado
- [ ] Cookie `secure` funciona (HTTPS en front y API)

## Post-deploy

1. Verificar `GET /api/auth/me` con login real.
2. Probar conexión bot (QR) en staging antes de prod.
3. Revisar logs Cloud Run / Render para errores Supabase o Baileys.

## Widget en sitios externos

Servir script desde `{API_URL}/widget/chatbot.js`. El dominio del sitio embebido no necesita estar en CORS para el script; las llamadas `POST /api/chat` sí están rate-limited por IP.

Ver [CI/CD](/docs/operations/ci-cd) para el panorama completo de pipelines.
