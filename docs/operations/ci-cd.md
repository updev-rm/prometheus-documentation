---
sidebar_position: 1
title: CI/CD
description: Pipelines de despliegue backend y frontend.
---

# CI/CD

## Resumen por repositorio

| Repo | CI | CD | Plataforma |
|------|----|----|------------|
| prometheus-service | GitHub Actions | Cloud Run (prod), Render (dev) | GCP, Render |
| prometheus-interface | GitLab CI | Cloudflare Pages | Cloudflare |
| prometheus-documentation | Por configurar | GitHub Pages (opcional) | GitHub |

## Backend — GCP producción

Archivo: `prometheus-service/.github/workflows/gcp-production.yml`

- **Trigger:** manual (`workflow_dispatch`) en `master`
- **Modos:** `CI` (solo validación) | `CI+CD` (deploy + tag semver)
- **Jobs:** build → deploy (condicional) → create-tag (condicional)

Incremento de versión configurable: major / minor / patch.

## Backend — Render desarrollo

Archivo: `prometheus-service/.github/workflows/render-development.yml`

Despliegue continuo o manual hacia instancia Render de desarrollo.

## Frontend — Cloudflare

Archivo: `prometheus-interface/ci/gitlab/cloudflare-development.yml`

Stages típicos:

1. **build:dev** — install + `pnpm run build:dev` + `_redirects`
2. **deploy:dev** — publicación a Cloudflare Pages (modo CI+CD)

Variable `DEPLOY_OPTION`: `CI` vs `CI+CD` (mismo patrón que backend).

Script auxiliar: `ci/gitlab/scripts/create-git-tag.sh` para versionado.

## Documentación — GitHub Pages

Para publicar este sitio:

```bash
cd prometheus-documentation
npm install
npm run build
# Deploy con gh-pages o GitHub Actions
```

Ajustar en `docusaurus.config.ts`:

```typescript
url: 'https://updev-rm.github.io',
baseUrl: '/prometheus-documentation/',
```

Workflow sugerido (`.github/workflows/docs.yml`):

```yaml
on:
  push:
    branches: [master]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Buenas prácticas

- **CI+CD manual** en prod evita deploys accidentales.
- **Tags semver** tras deploy OK para trazabilidad.
- **Frozen lockfile** (`pnpm install --frozen-lockfile`) en CI.
- Secrets nunca en logs; usar GitHub/GitLab environments.

## Checklist cross-repo

Al release coordinado backend + frontend:

1. Migraciones DB aplicadas.
2. Backend desplegado con nuevas env vars si las hay.
3. Frontend build con `apiUrl` del backend desplegado.
4. Smoke: login, list products, bot status, SSE.
