import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const REPO = 'updev-rm/prometheus-documentation';

const config: Config = {
  title: 'Prometheus Docs',
  tagline: 'Ventas automatizadas por WhatsApp con IA — guía técnica para desarrolladores',
  favicon: 'img/logo.svg',

  url: 'https://updev-rm.github.io',
  baseUrl: '/prometheus-documentation/',

  organizationName: 'updev-rm',
  projectName: 'prometheus-documentation',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `https://github.com/${REPO}/tree/master/`,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.svg',
    metadata: [
      {name: 'keywords', content: 'Prometheus, Selvo, WhatsApp, documentación, Angular, Node.js'},
      {name: 'description', content: 'Documentación técnica de la plataforma Prometheus / Selvo.'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Prometheus',
      hideOnScroll: true,
      logo: {
        alt: 'Prometheus',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentación',
        },
        {
          href: 'https://github.com/updev-rm/prometheus-service',
          label: 'Backend',
          position: 'right',
        },
        {
          href: 'https://github.com/updev-rm/prometheus-interface',
          label: 'Frontend',
          position: 'right',
        },
        {
          href: `https://github.com/${REPO}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Plataforma',
          items: [
            {label: 'Introducción', to: '/docs/intro'},
            {label: 'Arquitectura', to: '/docs/architecture/overview'},
            {label: 'Desarrollo local', to: '/docs/getting-started/local-development'},
          ],
        },
        {
          title: 'Repositorios',
          items: [
            {
              label: 'prometheus-service',
              href: 'https://github.com/updev-rm/prometheus-service',
            },
            {
              label: 'prometheus-interface',
              href: 'https://github.com/updev-rm/prometheus-interface',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'Documentación en GitHub',
              href: `https://github.com/${REPO}`,
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} UPDEV · Selvo / Prometheus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'sql', 'json'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
