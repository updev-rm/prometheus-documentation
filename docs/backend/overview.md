---
sidebar_position: 1
title: Overview del backend
description: prometheus-service — API, bot WhatsApp e integraciones.
---

# Backend — prometheus-service

**prometheus-service** (`bot-wsp-sales` en `package.json`) es el núcleo server-side de Prometheus: API REST, autenticación, bot de WhatsApp, IA, jobs y assets estáticos del widget.

## Responsabilidades

| Área | Módulos |
|------|---------|
| HTTP API | `routes/`, `controllers/`, `middleware/` |
| Persistencia | `config/supabaseConfig.js`, SQL en `migrations/` |
| WhatsApp | `bot/whatsappBot.js` |
| IA | `services/aiService.js`, `config/aiConfig.js` |
| Negocio | `services/*` (orders, products, conversations, …) |
| Media | Cloudinary, GCS |
| Tiempo real | `services/eventService.js` (SSE) |

## Punto de entrada

`server.js` orquesta:

1. Conexión Supabase
2. `startAllBots()` para admins activos
3. `startStalePedidosChecker()` — pedidos pendientes vencidos
4. Express con helmet, CORS, cookies, rutas montadas
5. Graceful shutdown (SSE, bots, HTTP)

## Montaje de rutas

```text
/api/auth      → authRoutes
/api/public    → publicRoutes
/api/catalog   → catalogRoutes
/api           → apiRoutes (mayoría protegida con requireAuth)
/widget        → estáticos (chatbot.js)
```

## Stack

- **Runtime:** Node.js ESM (`"type": "module"`)
- **Framework:** Express 4
- **DB:** Supabase (PostgreSQL)
- **Bot:** @builderbot/bot + @builderbot/provider-baileys
- **Auth:** JWT en cookie + bcrypt
- **Seguridad:** helmet, express-rate-limit, CORS estricto

## Scripts útiles

```bash
pnpm run start:local    # desarrollo con .env.local
pnpm run create-admin   # crear admin CLI
pnpm run assign-plan    # asignar plan a admin
```

## Siguientes lecturas

- [Estructura de carpetas](/docs/backend/folder-structure)
- [Autenticación](/docs/backend/authentication)
- [API REST](/docs/backend/api/overview)
- [Esquema de BD](/docs/backend/database/schema)
