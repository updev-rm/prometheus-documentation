import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Organización basada en Diátaxis:
 * - Tutorial / Getting Started → aprender haciendo
 * - How-to (operations, qa) → tareas concretas
 * - Reference (api, database) → consulta rápida
 * - Explanation (architecture) → contexto y decisiones
 *
 * Cada servicio (backend / frontend) tiene su propio bloque lateral.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Primeros pasos',
      collapsed: false,
      link: {type: 'generated-index', slug: '/category/primeros-pasos'},
      items: [
        'getting-started/prerequisites',
        'getting-started/local-development',
        'getting-started/environment-variables',
      ],
    },
    {
      type: 'category',
      label: 'Arquitectura',
      link: {type: 'generated-index', slug: '/category/arquitectura'},
      items: [
        'architecture/overview',
        'architecture/data-flow',
        'architecture/multi-tenancy',
      ],
    },
    {
      type: 'category',
      label: 'Backend — prometheus-service',
      link: {type: 'generated-index', slug: '/category/backend'},
      items: [
        'backend/overview',
        'backend/folder-structure',
        'backend/authentication',
        {
          type: 'category',
          label: 'API REST',
          link: {type: 'generated-index', slug: '/category/api-rest'},
          items: [
            'backend/api/overview',
            'backend/api/auth',
            'backend/api/products-orders',
            'backend/api/conversations',
            'backend/api/bot-whatsapp',
          ],
        },
        {
          type: 'category',
          label: 'Servicios',
          link: {type: 'generated-index', slug: '/category/servicios'},
          items: ['backend/services/overview'],
        },
        {
          type: 'category',
          label: 'Base de datos',
          link: {type: 'generated-index', slug: '/category/base-de-datos'},
          items: ['backend/database/schema', 'backend/database/migrations'],
        },
        'backend/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Frontend — prometheus-interface',
      link: {type: 'generated-index', slug: '/category/frontend'},
      items: [
        'frontend/overview',
        'frontend/architecture',
        'frontend/routing',
        'frontend/presentation-layer',
        'frontend/infrastructure-layer',
        'frontend/development',
      ],
    },
    {
      type: 'category',
      label: 'Operaciones',
      link: {type: 'generated-index', slug: '/category/operaciones'},
      items: ['operations/ci-cd', 'operations/environments'],
    },
    {
      type: 'category',
      label: 'Calidad y pruebas',
      link: {type: 'generated-index', slug: '/category/calidad'},
      items: ['qa/testing-strategy', 'qa/known-issues'],
    },
  ],
};

export default sidebars;
