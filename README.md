# Prometheus Documentation

Documentación centralizada de la plataforma **Prometheus / Selvo**, construida con [Docusaurus 3](https://docusaurus.io/).

Cubre:

- [prometheus-service](https://github.com/updev-rm/prometheus-service) — API REST, bot WhatsApp, IA
- [prometheus-interface](https://github.com/updev-rm/prometheus-interface) — Panel Angular + landing

## Arquitectura de la documentación

Organizada según **[Diátaxis](https://diataxis.fr/)**:

| Sección | Tipo | Contenido |
|---------|------|-----------|
| Primeros pasos | Tutorial | Setup local, variables de entorno |
| Arquitectura | Explicación | Contexto C4, flujos, multi-tenancy |
| Backend / Frontend | Referencia | API, servicios, capas Angular |
| Operaciones | How-to | CI/CD, entornos |
| Calidad | How-to | Pruebas, registro de bugs |

## Requisitos

- Node.js 22.13+ (recomendado 24 — ver `mise.toml`)
- pnpm 9+ (recomendado 11.3.0)

## Desarrollo local

```bash
pnpm install
pnpm start
```

Abre [http://localhost:3000](http://localhost:3000). Si el puerto está ocupado por prometheus-service:

```bash
pnpm start -- --port 3001
```

## Build

```bash
pnpm run build
pnpm run serve   # preview del sitio estático
```

Salida en `build/`.

## Estructura del repo

```text
docs/                 # Contenido Markdown
sidebars.ts           # Navegación lateral
docusaurus.config.ts  # Configuración del sitio
src/pages/            # Homepage custom
static/               # Assets estáticos
```

## Publicar en GitHub Pages

**Sitio en vivo:** https://updev-rm.github.io/prometheus-documentation/

Deploy automático vía GitHub Actions (`.github/workflows/docs.yml`) en cada push a `master`.

Primera vez: **Settings → Pages → Source: GitHub Actions**.

```bash
pnpm run build   # preview local en build/
```

## Contribuir

1. Editar o añadir archivos en `docs/`.
2. Registrar la página en `sidebars.ts` si es una sección nueva.
3. Usar front matter YAML (`title`, `description`, `sidebar_position`).
4. Diagramas con [Mermaid](https://mermaid.js.org/) (habilitado en config).
