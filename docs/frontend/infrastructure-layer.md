---
sidebar_position: 5
title: Capa de infraestructura
description: Repositorios HTTP y providers de inyección.
---

# Capa de infraestructura

Ubicación: `src/app/infrastructure/`

## Providers centralizados

`infrastructure.ts` exporta:

```typescript
export const InfrastructureProviders = [
  ...ApiProvider,
  ...AuthProvider,
  ...ExportProvider,
];
```

Registrados en `app.config.ts` (o bootstrap equivalente) para DI global.

## api.repository.ts

Implementa `ApiRepositoryPort`:

- Métodos tipados por recurso (productos, pedidos, conversaciones, settings, bot, …).
- Usa `HttpClient` con **`withCredentials: true`**.
- URLs vía `urlApi('segment')` — nunca hardcodear host.

Ejemplo de patrón:

```typescript
getOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(urlApi('orders'), { withCredentials: true });
}
```

## auth.repository.ts

Login, logout, register, `/auth/me`. Coordina con `AuthService` en core para persistir estado usuario.

## export.repository.ts

Descargas blob (Excel, PDF) con manejo de headers `Content-Disposition` donde aplique.

## Ports en domain/

Interfaces en `domain/services/*/ports/`:

```typescript
export abstract class ApiRepositoryPort {
  abstract getOrders(): Observable<Order[]>;
  // ...
}
```

Permite sustituir implementación en tests:

```typescript
{ provide: ApiRepositoryPort, useClass: ApiRepository }
// en test: useValue: mockApiRepository
```

## Manejo de errores

- Errores HTTP propagados a pages vía RxJS `catchError` o subscribe error callback.
- `AuthService` intercepta 401 globalmente si aplica (redirect login).

## Añadir un endpoint nuevo

1. Extender port en `domain/`.
2. Implementar método en repository.
3. Consumir desde page o servicio de aplicación.
4. Documentar en [API backend](/docs/backend/api/overview).

## Environments

Repository no lee environment directamente salvo vía `urlApi()` / `URL_API` — un solo punto de configuración de base URL.
