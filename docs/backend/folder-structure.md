---
sidebar_position: 2
title: Estructura de carpetas
description: Organización del código en prometheus-service.
---

# Estructura de carpetas

```text
prometheus-service/
├── server.js              # Bootstrap Express + bots + shutdown
├── bot/
│   └── whatsappBot.js     # Sesiones Baileys, start/stop por admin
├── config/
│   ├── supabaseConfig.js
│   ├── aiConfig.js
│   └── cloudinaryConfig.js
├── constants/
│   └── planFeatures.js    # Feature flags por plan
├── controllers/           # Capa HTTP delgada
│   ├── productController.js
│   ├── orderController.js
│   ├── chatController.js
│   ├── localesController.js
│   └── ...
├── middleware/
│   └── auth.js            # requireAuth, JWT desde cookie
├── migrations/            # SQL numerado (0001_, 0002_, …)
├── routes/
│   ├── apiRoutes.js       # REST principal
│   ├── authRoutes.js
│   ├── catalogRoutes.js
│   └── publicRoutes.js
├── scripts/
│   ├── create-admin.js
│   └── assign-plan.js
├── services/              # Lógica de negocio
│   ├── orderService.js
│   ├── aiService.js
│   ├── conversationService.js
│   ├── planService.js
│   └── ...
└── widget/
    └── chatbot.js         # Script embebible
```

## Patrones aplicados

### Controller → Service

Los **controllers** parsean request, delegan en **services** y formatean response. No acceden a Supabase directamente salvo casos legacy en auth.

### Routes como registro

`apiRoutes.js` agrupa endpoints por dominio con comentarios de sección (`─── Products ───`). Rate limits y multer se definen junto a la ruta.

### Servicios por dominio

Un archivo por bounded context: `orderService`, `clientService`, `notificationService`, etc. Facilita testing y evita un “god service”.

### Migraciones incrementales

SQL en `migrations/` con prefijo numérico. Aplicar en orden en Supabase (manual o pipeline). Documentar cada migración en [Migraciones](/docs/backend/database/migrations).

### Config separada

Credenciales y clientes singleton (Supabase, OpenAI, Cloudinary) viven en `config/` — nunca hardcodeadas en services.

## Qué evitar

- Lógica de negocio pesada en `routes/` — mover a `services/`.
- Queries sin `admin_id` — riesgo de fuga entre tenants.
- Nuevas rutas sin `requireAuth` después del middleware global (excepto las explícitamente públicas al inicio del router).
