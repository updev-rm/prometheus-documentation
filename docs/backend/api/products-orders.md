---
sidebar_position: 3
title: API — Productos y pedidos
description: Endpoints de catálogo, pedidos y dashboard stats.
---

# API — Productos y pedidos

Requiere autenticación (`requireAuth`) salvo donde se indique.

## Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista productos del admin |
| GET | `/api/products/:id/edit-preview` | Preview antes de editar |
| POST | `/api/products` | Crear (multipart: imagen/video) |
| PUT | `/api/products/:id` | Actualizar |
| DELETE | `/api/products/:id` | Eliminar / desactivar |
| GET | `/api/products/export` | Export Excel |
| GET | `/api/products/export-pdf` | Export PDF (plan) |

**Upload:** imágenes y videos, máx. 10 MB (`multer` en `apiRoutes.js`).

## Pedidos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/orders` | Lista pedidos |
| PUT | `/api/orders/:id/status` | Cambiar estado (`estado_pedido`) |
| PUT | `/api/orders/:id/cancel` | Cancelar + lógica stock |
| GET | `/api/orders/export` | Export Excel |
| GET | `/api/orders/export-pdf` | Export PDF |

Estados (`estado_pedido`): `pendiente`, `pagado`, `enviado`, `entregado`, `cancelado`.

## Dashboard

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/dashboard-stats` | KPIs resumidos |
| GET | `/api/analytics` | Analytics extendido (plan) |

## Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/clients` | Lista clientes del admin |

## Configuración (settings)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/settings` | Config bot + negocio |
| POST | `/api/settings` | Actualizar configuración |
| GET | `/api/preview-prompt` | Vista previa system prompt |
| POST | `/api/analyze-style` | Aprendizaje de estilo (IA) |

## Logs

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/logs` | Logs del sistema por admin |

## Uso IA / tokens

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/token-stats` | Consumo tokens |
| GET | `/api/usage-summary` | Resumen cuotas plan |

Implementación en `productController.js`, `orderController.js`, `orderService.js`, `sheetsService.js` (config legacy name).
