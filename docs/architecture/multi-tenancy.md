---
sidebar_position: 3
title: Multi-tenancy
description: Aislamiento de datos por administrador en Prometheus.
---

# Multi-tenancy

Prometheus es **multi-tenant a nivel de fila**: un solo despliegue sirve a muchos negocios (administradores), cada uno con datos aislados por `admin_id`.

## Entidad raíz: administrador

Tabla `administradores`:

- Un registro = un negocio + un bot WhatsApp potencial.
- Campos clave: `email`, `password_hash`, `whatsapp_numero`, `activo`.
- Al login, `req.adminId` (UUID) identifica el tenant en toda la request.

## Tablas con aislamiento

Todas incluyen `admin_id` (directo o vía FK):

| Dominio | Tablas |
|---------|--------|
| Configuración | `configuracion` (1:1 con admin) |
| Catálogo | `productos` |
| Clientes | `clientes` (UNIQUE `admin_id + telefono`) |
| Ventas | `pedidos`, `items_pedido` |
| Conversaciones | `mensajes`, contexto IA |
| Planes | `planes`, asignaciones por admin |
| Locales | `locales` (sucursales / puntos de retiro) |
| Notificaciones | `notificaciones` |

## Reglas en código

1. **Nunca confiar en `admin_id` del body** — Siempre usar `req.adminId` del JWT.
2. **Queries con filtro** — Servicios reciben `adminId` como primer argumento.
3. **Bots aislados** — `whatsappBot.js` mapea sesión Baileys → admin; mensajes solo procesan productos/pedidos de ese admin.
4. **Planes** — `planService.hasFeature(adminId, feature)` limita funcionalidad por tenant.

## Registro de nuevos tenants

Flujo en `authRoutes.js`:

1. `POST /api/auth/register/request-code` — Email + contraseña; código vía Resend.
2. `POST /api/auth/register/confirm` — Crea fila en `administradores`, config por defecto, plan `free`.
3. Opcionalmente `startBotForAdmin` al completar registro.

Script CLI `scripts/create-admin.js` para entornos de desarrollo sin email.

## Escalado y límites

- **Proceso único** — Todos los bots comparten el mismo Node process; admins inactivos no deberían mantener sesión WA abierta.
- **Cuotas IA** — `tokenService` rastrea uso por admin según plan.
- **Rate limits** — Por IP en rutas públicas (login, chat, landing contact).

## Implicaciones para el frontend

Tras login, el panel no envía `admin_id`; el backend lo infiere de la sesión. El frontend solo muestra features devueltas en `/api/auth/me` (plan features).
