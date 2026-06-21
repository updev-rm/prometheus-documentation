---
sidebar_position: 2
title: Issues conocidos
description: Registro de pruebas, bugs y deuda técnica documentada.
---

# Issues conocidos

Registro vivo de hallazgos de QA. Actualizar en cada sprint o release.

:::info Origen
Este documento sustituye el vault Obsidian **Pruebas y errores**. El archivo legacy en `Pruebas y errores/Pruebas y errores encontrados.md` se mantiene como referencia histórica.
:::

## Plantilla de entrada

```markdown
### [Título breve] — YYYY-MM-DD

- **Severidad:** crítica | alta | media | baja
- **Entorno:** local | dev | prod
- **Repo:** prometheus-service | prometheus-interface | ambos
- **Pasos:**
  1. ...
- **Esperado:** ...
- **Actual:** ...
- **Estado:** abierto | en progreso | resuelto
- **Notas:** ...
```

---

## Registro

### Documentación inicial — 2025-06-21

- **Severidad:** baja
- **Entorno:** n/a
- **Repo:** prometheus-documentation
- **Notas:** Sitio Docusaurus creado. Pendiente poblar con issues reales del equipo y migrar entradas desde Obsidian.

---

## Cómo contribuir

1. Reproducir el bug en la rama `dev` si es posible.
2. Añadir entrada en este archivo vía PR a `prometheus-documentation`.
3. Crear issue en GitHub del repo afectado con link a esta doc.
4. Al resolver, marcar **Estado: resuelto** con commit/PR de referencia.

## Enlaces útiles

- [Estrategia de pruebas](/docs/qa/testing-strategy)
- [Desarrollo local](/docs/getting-started/local-development)
