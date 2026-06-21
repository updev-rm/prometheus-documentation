---
sidebar_position: 3
title: Autenticación
description: JWT, cookies httpOnly y flujos de login/registro.
---

# Autenticación

## Modelo de sesión

- **JWT** firmado con `JWT_SECRET`.
- Almacenado en cookie **`auth_token`** (httpOnly).
- El middleware `requireAuth` en `middleware/auth.js` extrae y valida el token; expone `req.adminId` y datos del admin.

Ventajas frente a localStorage:

- No accesible desde JavaScript → mitiga XSS.
- Envío automático en peticiones same-site / CORS con credentials.

## Endpoints (`/api/auth`)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/me` | Cookie opcional | Perfil + plan features si hay sesión |
| POST | `/login` | No | Email/password → cookie |
| POST | `/register/request-code` | No | Envía código email (Resend) |
| POST | `/register/confirm` | No | Verifica código, crea admin |
| POST | `/logout` | No | Limpia cookie |

## Rate limiting

- Login: 10 intentos / 15 min
- Registro request: 5 / 15 min
- Registro confirm: 15 / 15 min

## Registro

1. Normalización de email (`toLowerCase`, trim).
2. Código numérico con TTL (10 min), máx. 5 intentos.
3. Plan por defecto: `free`.
4. Creación de fila `configuracion` con defaults (nombre bot "Sofia", etc.).

## Protección de rutas API

En `apiRoutes.js`:

```javascript
// Rutas públicas primero
router.post('/chat', ...);
router.post('/landing-contact', ...);

// Resto del router
router.use(requireAuth);
```

`/api/catalog` y subrutas usan `requireAuth` en el propio `catalogRoutes.js`.

## Frontend

- `AuthService` gestiona login/logout y estado de sesión.
- `authGuard` protege rutas `/app/*`.
- `loginGuard` redirige usuarios ya autenticados fuera de login/register.
- Peticiones HTTP con `withCredentials: true`.

## Producción

- `app.set('trust proxy', 1)` para cookies `secure` detrás de Cloud Run / Render.
- `ALLOWED_ORIGINS` debe incluir el dominio exacto del frontend.
- Rotar `JWT_SECRET` implica invalidar todas las sesiones.

Ver también [API Auth](/docs/backend/api/auth).
