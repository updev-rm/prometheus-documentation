---
sidebar_position: 1
title: Overview de la API
description: Convenciones REST, prefijos y códigos de respuesta.
---

# API REST — Overview

Base URL: `{ORIGIN}/api`

Autenticación por defecto: cookie `auth_token` o header `Authorization: Bearer <token>` donde esté soportado.

## Prefijos

| Prefijo | Archivo | Descripción |
|---------|---------|-------------|
| `/api/auth/*` | `authRoutes.js` | Sesión |
| `/api/public/*` | `publicRoutes.js` | Datos públicos (planes) |
| `/api/catalog/*` | `catalogRoutes.js` | PDF catálogo |
| `/api/*` | `apiRoutes.js` | Recursos del panel |

## Convenciones

- **JSON** en request/response (`Content-Type: application/json`).
- **Errores:** `{ "error": "mensaje" }` con status 4xx/5xx.
- **IDs:** UUID v4 para entidades principales.
- **Paginación:** donde aplique, query params documentados por endpoint.
- **Uploads:** `multipart/form-data` con multer (productos, mensajes manuales).

## Rutas públicas (sin sesión)

| Método | Ruta | Límite |
|--------|------|--------|
| POST | `/api/chat` | 30/min |
| POST | `/api/landing-contact` | rate limit dedicado |
| GET | `/api/public/planes` | — |

## Tiempo real

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/events` | Server-Sent Events |

## Feature gating

Algunos endpoints verifican plan con `hasFeature(adminId, PLAN_FEATURES.*)` antes de ejecutar (export PDF, analytics avanzado, etc.). Respuesta típica: `403` con mensaje de plan.

## Documentación por dominio

- [Auth](/docs/backend/api/auth)
- [Productos y pedidos](/docs/backend/api/products-orders)
- [Conversaciones](/docs/backend/api/conversations)
- [Bot WhatsApp](/docs/backend/api/bot-whatsapp)

## Health

No hay endpoint `/health` dedicado en el código actual; el proceso escucha en `PORT` (default 3000). Para probes en Cloud Run se puede usar TCP o añadir ruta ligera en el futuro.
