---
sidebar_position: 1
title: Servicios de dominio
description: Capa de lógica de negocio en prometheus-service.
---

# Servicios de dominio

La carpeta `services/` concentra la lógica reutilizable. Controllers delgados; servicios testables y filtrados por `adminId`.

## Mapa de servicios

| Servicio | Responsabilidad |
|----------|-----------------|
| `orderService` | CRUD pedidos, stats dashboard, exports |
| `clientService` | Clientes por teléfono |
| `conversationService` | Mensajes, historial IA |
| `aiService` | Completions, timers “cold”, cancelación |
| `planService` | Plan activo, `hasFeature` |
| `tokenService` | Tracking consumo IA |
| `notificationService` | CRUD notificaciones |
| `pauseService` | Pausa bot por teléfono |
| `eventService` | SSE clients, `emitEvent` |
| `analyticsService` | Métricas avanzadas |
| `localesService` | Sucursales / retiro |
| `stalePedidosService` | Job pedidos pendientes vencidos |
| `transcriptionService` | Audio → texto (si aplica) |
| `gcsCatalogService` / `gcsProductMediaService` | Google Cloud Storage |
| `logService` | Logs operativos |
| `sheetsService` | Config key-value (legacy name, backed by Supabase) |

## Patrón de uso

```javascript
// routes/apiRoutes.js
router.get('/orders', listOrders);  // controller

// controllers/orderController.js
export async function listOrders(req, res, next) {
  try {
    const data = await orderService.list(req.adminId, req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
```

## Eventos side-effect

Tras mutaciones importantes, servicios llaman:

```javascript
import { emitEvent } from './eventService.js';
emitEvent(adminId, 'order_updated', { orderId });
```

## Jobs en proceso

| Job | Archivo | Intervalo |
|-----|---------|-----------|
| Pedidos stale | `stalePedidosService.js` | Configurable al start |
| Mantenimiento IA | `aiService.js` | Timers internos |

Se detienen en `gracefulShutdown` de `server.js`.

## Integraciones externas

- **OpenAI** — `aiService` + `aiConfig`
- **Cloudinary** — uploads en controllers de productos
- **Resend** — solo en `authRoutes` para registro
- **Supabase** — todos los servicios vía cliente en `supabaseConfig`

## Extender un servicio

1. Añadir función exportada en `services/fooService.js` con `adminId` primer param.
2. Exponer ruta en `apiRoutes.js` + controller si hace falta validación HTTP.
3. Actualizar doc en [API overview](/docs/backend/api/overview).
4. Si afecta schema, crear migración SQL numerada.
