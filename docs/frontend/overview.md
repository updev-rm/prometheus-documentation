---
sidebar_position: 1
title: Overview del frontend
description: prometheus-interface — panel Angular y landing Selvo.
---

# Frontend — prometheus-interface

SPA en **Angular 19** con componentes standalone, SASS y arquitectura hexagonal ligera.

## Responsabilidades

| Área | Rutas / módulos |
|------|-----------------|
| Landing pública | `/` — marketing, pricing, contacto |
| Auth | `/login`, `/register` |
| Panel admin | `/app/*` — dashboard, productos, pedidos, conversaciones, settings |
| Shell | Layout con sidebar, notificaciones, guards |

## Stack

- Angular 19 + TypeScript 5.7
- Chart.js (dashboard)
- PapaParse (import/export CSV)
- QRCode.js (bot WhatsApp)
- ESLint + Prettier

## Scripts

```bash
pnpm run start:local   # puerto 4205, config local
pnpm run start:dev     # config development
pnpm run build:prod    # producción
pnpm run test          # Karma/Jasmine
```

## Configuración API

`src/environments/environment.*.ts` define `apiUrl`. Helper `urlApi()` en `core/config/url.ts` construye `{apiUrl}/api/{segment}`.

## Estructura de alto nivel

```text
src/app/
├── core/           # guards, auth, servicios transversales
├── domain/         # modelos + ports
├── infrastructure/ # repositories HTTP
└── presentation/   # UI (Atomic Design)
```

## Páginas del panel

| Ruta | Componente |
|------|------------|
| `/app/dashboard` | `DashboardPageComponent` |
| `/app/products` | `ProductsPageComponent` |
| `/app/orders` | `OrdersPageComponent` |
| `/app/conversations` | `ConversationsPageComponent` |
| `/app/settings` | `SettingsPageComponent` |

## Convenciones UI

Documentadas en `.cursor/rules/frontend-conventions.mdc`:

- Código TS y CSS (BEM) en **inglés**
- Labels visibles al usuario pueden estar en **español**
- Atomic Design: `atoms` → `molecules` → `organisms` → `pages`

## Siguientes lecturas

- [Arquitectura](/docs/frontend/architecture)
- [Routing](/docs/frontend/routing)
- [Capa presentation](/docs/frontend/presentation-layer)
- [Desarrollo](/docs/frontend/development)
