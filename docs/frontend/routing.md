---
sidebar_position: 3
title: Routing
description: Rutas públicas, panel autenticado y lazy loading.
---

# Routing

Definición en `src/app/app.routes.ts`.

## Mapa de rutas

```text
/                 → LandingPageComponent        (público)
/login            → LoginComponent              (loginGuard)
/register         → RegisterComponent           (loginGuard)
/app              → ShellComponent              (authGuard)
  /app/dashboard
  /app/products
  /app/orders
  /app/conversations
  /app/settings
**                → redirect → app
```

## Guards

| Guard | Archivo | Comportamiento |
|-------|---------|----------------|
| `authGuard` | `core/guards/auth.guard.ts` | Sin sesión → redirect `/login` |
| `loginGuard` | `core/guards/login.guard.ts` | Con sesión → redirect `/app` |

## Lazy loading

Todas las rutas usan `loadComponent` + dynamic `import()` para code splitting:

```typescript
{
  path: 'dashboard',
  loadComponent: () =>
    import('./presentation/pages/dashboard/dashboard-page.component')
      .then(m => m.DashboardPageComponent),
}
```

## Shell y children

`ShellComponent` (`presentation/layout/`) renderiza sidebar + `<router-outlet>` para hijos `/app/*`.

Redirección por defecto: `/app` → `/app/dashboard`.

## Ruta comodín

`{ path: '**', redirectTo: 'app' }` — usuarios autenticados caen al panel; combinar con guards según evolución del producto.

## Logs (deshabilitado)

Ruta `/app/logs` comentada en `app.routes.ts`; componente existe pero no está en menú activo.

## Deep linking

SPA desplegada en Cloudflare Pages requiere `_redirects`:

```text
/* /index.html 200
```

Generado en pipeline GitLab (`ci/gitlab/cloudflare-development.yml`).
