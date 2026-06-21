---
sidebar_position: 2
title: API — Autenticación
description: Endpoints de sesión en /api/auth.
---

# API — Autenticación

Base: `/api/auth`

## GET /me

Devuelve datos del admin autenticado y features del plan activo.

**Auth:** cookie opcional (401 si token inválido).

**Respuesta ejemplo:**

```json
{
  "id": "uuid",
  "email": "admin@example.com",
  "nombre": "Mi negocio",
  "plan": "pro",
  "features": ["export_pdf", "analytics"]
}
```

## POST /login

**Body:**

```json
{
  "email": "admin@example.com",
  "password": "secret"
}
```

**Éxito:** `200` + Set-Cookie `auth_token` + body con datos básicos del admin.

**Errores:** `401` credenciales inválidas, `429` rate limit.

## POST /register/request-code

Inicia registro; envía código por email.

**Body:**

```json
{
  "email": "nuevo@example.com",
  "password": "min8chars",
  "nombre": "Opcional"
}
```

## POST /register/confirm

**Body:**

```json
{
  "email": "nuevo@example.com",
  "code": "123456"
}
```

**Éxito:** admin creado, cookie de sesión, configuración inicial.

## POST /logout

Elimina cookie de sesión. No requiere body.

---

Ver [Autenticación](/docs/backend/authentication) para detalle de cookies, JWT y guards del frontend.
