---
sidebar_position: 5
title: API — Bot WhatsApp
description: Conexión, estado y control del bot por administrador.
---

# API — Bot WhatsApp

Cada administrador puede tener **una sesión WhatsApp** (Baileys) gestionada en `bot/whatsappBot.js`.

## Estado y conexión

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/bot-status` | Estado conexión (QR, connected, etc.) |
| POST | `/api/bot-connect` | Iniciar / reconectar bot |
| POST | `/api/bot-disconnect` | Cerrar sesión WA |

## Ciclo de vida

1. **Arranque servidor** — `startAllBots()` conecta admins con `activo = true`.
2. **Registro / admin nuevo** — `startBotForAdmin(id)` bajo demanda.
3. **QR** — El estado expuesto al front permite mostrar código de emparejamiento.
4. **Reconexión** — Timers en `whatsappBot.js`; limpieza en graceful shutdown.

## BuilderBot + Baileys

- Provider: `@builderbot/provider-baileys`
- Framework: `@builderbot/bot`
- Mensajes entrantes → pipeline IA → respuesta saliente.

## Pausas y override humano

Combinar con [API Conversaciones — pause](/docs/backend/api/conversations#pausar-bot-por-teléfono) cuando el admin toma control de un chat.

## Widget vs bot principal

- **Bot principal:** sesión del número del negocio (WhatsApp Business / personal vinculado).
- **Widget web:** `POST /api/chat` + `/widget/chatbot.js` para sitios externos; flujo separado en `chatController.js`.

## Operación en producción

- Un solo proceso Node aloja N sesiones Baileys (una por admin conectado).
- `closeBotConnectionsOnly()` en shutdown evita sesiones zombie.
- Logs relevantes prefijo `[Bot]` / `[Server]`.

## Locales y notificaciones relacionadas

Gestión de sucursales:

| Método | Ruta |
|--------|------|
| GET/POST | `/api/locales` |
| PUT/DELETE | `/api/locales/:id` |
| PUT | `/api/locales/:id/principal` |

Notificaciones panel:

| Método | Ruta |
|--------|------|
| GET | `/api/notifications` |
| GET | `/api/notifications/counts` |
| PUT | `/api/notifications/read-all` |
| PUT | `/api/notifications/:id/read|resolve|discard` |

Eventos push vía SSE al crear o actualizar notificaciones.
