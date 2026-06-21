---
sidebar_position: 1
title: Requisitos previos
description: Herramientas y cuentas necesarias para trabajar en Prometheus.
---

# Requisitos previos

## Herramientas locales

| Herramienta | Versión mínima | Uso |
|-------------|----------------|-----|
| **Node.js** | 20+ (recomendado 24) | Backend y Docusaurus |
| **pnpm** | 9+ | Gestor de paquetes (backend) |
| **Angular CLI** | 19.x | Frontend (`ng`) |
| **Git** | 2.x | Control de versiones |

El backend incluye `.nvmrc` y `mise.toml` con Node **24.14.0** y pnpm **11.3.0**.

## Servicios externos

Para desarrollo completo necesitarás acceso a:

- **Supabase** — PostgreSQL + auth auxiliar; es la base de datos principal.
- **OpenAI** (u otro proveedor configurado) — Respuestas del bot y análisis de estilo.
- **Cloudinary** — Media de productos (imágenes/videos).
- **Google Cloud Storage** — Catálogo PDF y assets de catálogo.
- **Resend** — Emails de verificación en registro.

En entorno local puedes arrancar el backend con variables mínimas; algunas features (bot WA, emails, GCS) requieren credenciales reales.

## Repositorios

Clona los tres repos hermanos bajo la misma carpeta padre:

```bash
git clone git@github.com:updev-rm/prometheus-service.git
git clone git@github.com:updev-rm/prometheus-interface.git
git clone git@github.com:updev-rm/prometheus-documentation.git
```

## Conocimientos útiles

- JavaScript ES modules (backend).
- TypeScript y Angular standalone components (frontend).
- SQL básico y migraciones numeradas en `prometheus-service/migrations/`.
- REST + cookies httpOnly + SSE.
