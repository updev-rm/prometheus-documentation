---
sidebar_position: 1
slug: /intro
title: Introducción
description: Qué es Prometheus / Selvo y cómo se organiza esta documentación.
---

# Introducción

**Prometheus** (producto comercial **Selvo**) es una plataforma de ventas automatizadas por WhatsApp con inteligencia artificial. Permite a negocios gestionar catálogo, pedidos, conversaciones y configuración del bot desde un panel web.

## Componentes del ecosistema

| Repositorio | Rol | Stack |
|-------------|-----|-------|
| [prometheus-service](https://github.com/updev-rm/prometheus-service) | API REST, bot WhatsApp, IA, jobs | Node.js, Express, Supabase, Baileys |
| [prometheus-interface](https://github.com/updev-rm/prometheus-interface) | Panel admin + landing pública | Angular 19, SASS |
| **prometheus-documentation** (este sitio) | Documentación centralizada | Docusaurus 3 |

Otros repos del monorepo (`prometheus-multiservice`, `video-generator`) quedan fuera del alcance inicial de esta documentación.

## Qué hace la plataforma

1. **Bot de WhatsApp** — Cada administrador conecta su número; el bot atiende clientes, toma pedidos y responde con IA contextualizada.
2. **Panel web** — Dashboard, productos, pedidos, conversaciones, ajustes y notificaciones en tiempo real (SSE).
3. **Multi-tenant** — Cada `administrador` tiene datos aislados: productos, clientes, pedidos y configuración propia.
4. **Planes y cuotas** — Features gated por plan (exportaciones, analytics, locales, etc.).

## Cómo está organizada esta documentación

Seguimos el marco **[Diátaxis](https://diataxis.fr/)** para separar tipos de contenido:

| Sección | Propósito | Cuándo leerla |
|---------|-----------|---------------|
| **Primeros pasos** | Tutorial — levantar el entorno | Primera vez en el proyecto |
| **Arquitectura** | Explicación — contexto y decisiones | Entender el sistema global |
| **Backend / Frontend** | Referencia + guías por servicio | Desarrollo diario |
| **Operaciones** | How-to — deploy, CI/CD, entornos | Publicar o depurar infra |
| **Calidad y pruebas** | How-to + registro de issues | QA y regresiones |

:::tip Convención de nombres
En código y rutas se usa **prometheus-service** y **prometheus-interface**. En UI y marketing aparece **Selvo**.
:::

## Próximo paso

→ [Requisitos previos](/docs/getting-started/prerequisites) y [desarrollo local](/docs/getting-started/local-development).
