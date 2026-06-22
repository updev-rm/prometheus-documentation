---
sidebar_position: 2
title: Issues conocidos
description: Registro de pruebas, bugs y deuda técnica documentada.
---

# Issues conocidos

Registro vivo de hallazgos de QA. Actualizar en cada sprint o release.

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

_Añade aquí bugs y hallazgos de QA conforme se detecten._

## Cómo contribuir

1. Reproducir el bug en la rama `dev` si es posible.
2. Añadir entrada en este archivo vía PR a `prometheus-documentation`.
3. Crear issue en GitHub del repo afectado con link a esta doc.
4. Al resolver, marcar **Estado: resuelto** con commit/PR de referencia.

## Enlaces útiles

- [Estrategia de pruebas](/docs/qa/testing-strategy)
- [Desarrollo local](/docs/getting-started/local-development)
