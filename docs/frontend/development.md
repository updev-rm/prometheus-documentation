---
sidebar_position: 6
title: Desarrollo frontend
description: Configuraciones Angular, lint y despliegue Cloudflare.
---

# Desarrollo frontend

## Configuraciones Angular

| Config | Comando | Uso |
|--------|---------|-----|
| `local` | `start:local` / `build:local` | API localhost |
| `development` | `start:dev` / `build:dev` | Entorno dev remoto |
| `production` | `build:prod` | Optimizado |

Archivos: `angular.json` + `src/environments/environment.*.ts`.

Puerto dev fijo: **4205** (`--host 0.0.0.0` para LAN/Docker).

## Lint y formato

```bash
npx eslint src/
npx prettier --check src/
```

ESLint 10 + typescript-eslint 8. Prettier 3 para formato consistente.

## Estructura de un feature nuevo

1. Modelo en `domain/models/`.
2. Métodos en port + repository.
3. Page en `presentation/pages/{feature}/`.
4. Ruta en `app.routes.ts` bajo `/app`.
5. Entrada en `sidebar` si aplica.
6. Documentar en Docusaurus.

## SSE / tiempo real

Suscribirse a `/api/events` desde servicio singleton o page que necesite live updates (notificaciones, pedidos). Cerrar suscripción en `ngOnDestroy`.

## Despliegue

**Cloudflare Pages** vía GitLab CI (`ci/gitlab/cloudflare-development.yml`):

- Rama `dev`, modo manual web/api trigger.
- `pnpm install --frozen-lockfile`
- `pnpm run build:dev` o `build:prod`
- Artefacto: `dist/prometheus-interface/browser`
- `_redirects` para SPA

Variables en Cloudflare: `apiUrl` apuntando al backend del entorno.

## Testing

```bash
pnpm test   # Karma + Jasmine
```

Añadir specs solo cuando aporten valor (lógica no trivial, guards, mappers).

## Troubleshooting

| Problema | Solución |
|----------|----------|
| 401 en todas las peticiones | Verificar `withCredentials`, CORS backend, cookie |
| API wrong host | Revisar `environment.*.ts` y configuration en `angular.json` |
| CORS preflight fail | Añadir origen en `ALLOWED_ORIGINS` del backend |
| Blank page en prod | Confirmar `_redirects` en deploy Cloudflare |

Ver [Entornos](/docs/operations/environments) y [CI/CD](/docs/operations/ci-cd).
