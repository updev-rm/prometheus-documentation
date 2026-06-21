---
sidebar_position: 4
title: Capa de presentación
description: Atomic Design, BEM y componentes reutilizables.
---

# Capa de presentación

Ubicación: `src/app/presentation/`

## Atomic Design

| Nivel | Carpeta | Ejemplos |
|-------|---------|----------|
| **Atoms** | `atoms/` | `status-select`, `language-select` |
| **Molecules** | `molecules/` | `modal`, `file-picker`, `conversation-detail-panel` |
| **Organisms** | `organisms/` | `sidebar`, `notifications-inbox` |
| **Pages** | `pages/` | `orders-page`, `dashboard-page`, `landing/` |
| **Layout** | `layout/` | `shell.component` |
| **Shared** | `shared/` | `ui-host` (toasts, confirm) |

## BEM en SASS

Formato: `block__element--modifier`

```html
<!-- ✅ Correcto -->
<div class="orders-table__id">...</div>
<span class="badge badge--green">Pagado</span>

<!-- ❌ Evitar -->
<div class="id-cell green-badge">...</div>
```

- Block con contexto: `sidebar__link--active`, no solo `link--active`.
- Máximo un nivel de `__` por nombre lógico.

## Pages del panel

Cada page:

1. Inyecta repository/port del dominio.
2. Gestiona estado local (signals o propiedades clásicas).
3. Delega UI repetible a molecules/organisms.
4. Usa `ui-host` para toasts y confirmaciones.

## Landing

Subárbol propio bajo `pages/landing/`:

- **Organisms:** hero, pricing, FAQ, contact, dashboard mock, etc.
- **Data:** `data/landing-bundles.registry.ts`
- **i18n:** `i18n/en.json` (extensible a más locales)

Separación intencional: estilos neon/marketing no contaminan el panel admin.

## ui-host

Componente shared que hospeda overlays globales (toast, confirm dialog). Servicios en `core/` disparan UI sin acoplar cada page.

## Crear un componente nuevo

1. Elegir nivel atómico correcto (¿reutilizable? → atom/molecule).
2. Standalone: `imports: [...]` explícitos.
3. SASS con BEM en inglés.
4. Selector prefijo `app-` (`app-status-select`).
5. TS en inglés; labels UI pueden ser español.

## Accesibilidad y UX

- Formularios con labels asociados.
- Estados loading/error en pages que llaman API.
- Modales con focus trap vía `modal` molecule.

Ver reglas completas en el repo interface: `.cursor/rules/frontend-conventions.mdc`.
