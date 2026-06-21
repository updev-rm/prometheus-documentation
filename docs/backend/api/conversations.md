---
sidebar_position: 4
title: API — Conversaciones
description: Historial de chat, contexto de cliente y mensajes manuales.
---

# API — Conversaciones

## Listado y detalle

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/conversations` | Últimos mensajes por teléfono |
| GET | `/api/conversations/:telefono` | Historial completo |
| GET | `/api/conversations/export` | Export Excel |
| GET | `/api/conversations/:telefono/export-pdf` | PDF conversación |

## Contexto de negocio

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/conversations/:telefono/client-info` | Datos del cliente |
| GET | `/api/conversations/:telefono/orders` | Pedidos del cliente |

Implementado en `conversationContextController.js`.

## Mensaje manual

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/manual-message` | Admin envía mensaje/archivo al cliente |

Body multipart opcional (`uploadAny`, 16 MB). Envía vía bot WhatsApp del admin.

## Pausar bot por teléfono

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/paused-phones` | Teléfonos en pausa |
| POST | `/api/pause/:phone` | Pausar IA/bot para un número |
| DELETE | `/api/pause/:phone` | Reanudar |

`pauseService.js` evita respuestas automáticas mientras el admin atiende manualmente.

## Modelo de datos

- Mensajes con rol `user` | `assistant` (`rol_mensaje` enum).
- Vinculados a `admin_id` + `telefono` cliente.
- `conversationService.js` persiste y consulta historial para IA.

## Frontend

Página **Conversaciones** (`conversations-page`) + `conversation-detail-panel` molecule para detalle lateral.
