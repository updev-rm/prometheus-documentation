---
sidebar_position: 2
title: Migraciones
description: Cómo gestionar cambios de schema en Supabase.
---

# Migraciones

Las migraciones viven en `prometheus-service/migrations/` con prefijo numérico de cuatro dígitos.

## Inventario actual

| Archivo | Tema |
|---------|------|
| `0001_initial_schema.sql` | Schema base, enums, tablas core |
| `0002_planes_y_cuotas_ia.sql` | Planes y cuotas IA |
| `0003_admin_self_registration.sql` | Registro self-service |
| `0003_planes_campos_ui.sql` | Campos UI de planes |
| `0004_configuracion_blacklist_jsonb.sql` | Blacklist en config |
| `0004_locales_pagos_delivery_notificaciones.sql` | Locales, pagos, notificaciones |
| `0005_configuracion_catalogo_pdf.sql` | Catálogo PDF |
| `0006_horario_atencion.sql` | Horarios de atención |
| `0007_pedido_recordatorio_nivel.sql` | Recordatorios pedidos |
| `0008_restaurar_stock_pedido_rpc.sql` | RPC restaurar stock |

:::note Duplicados 0003 / 0004
Existen dos archivos con el mismo prefijo en algunas versiones. Aplicar en orden cronológico acordado por el equipo y consolidar numeración en futuras migraciones.
:::

## Proceso recomendado

1. **Crear** `0009_descripcion_corta.sql` con cambios idempotentes cuando sea posible (`IF NOT EXISTS`).
2. **Probar** en proyecto Supabase de desarrollo.
3. **Aplicar** en staging → producción.
4. **Documentar** en este archivo la intención del cambio.
5. **Desplegar** backend que dependa del nuevo schema después de migrar.

## Buenas prácticas

- Una migración = un cambio lógico (facilita rollback conceptual).
- No editar migraciones ya aplicadas en prod; crear una nueva corrección.
- Incluir comentarios SQL para enums y columnas no obvias.
- Para datos backfill, usar transacciones y batches.

## Rollback

Supabase no auto-revierte. Mantener scripts `DOWN` opcionales en PRs críticos o restaurar desde backup PITR.

## Verificación local

Tras aplicar migraciones, smoke test:

```bash
pnpm run start:local
pnpm run create-admin   # si necesitas tenant de prueba
```

Validar endpoints afectados desde el panel o curl con cookie de sesión.
