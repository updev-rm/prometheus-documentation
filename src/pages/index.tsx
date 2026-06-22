import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const cards = [
  {
    title: 'Primeros pasos',
    description: 'Entorno local, variables y orden de arranque de backend y frontend.',
    to: '/docs/getting-started/local-development',
    icon: '🚀',
    tag: 'Tutorial',
  },
  {
    title: 'Arquitectura',
    description: 'Contexto del sistema, flujos de datos y modelo multi-tenant.',
    to: '/docs/architecture/overview',
    icon: '🏗️',
    tag: 'Explicación',
  },
  {
    title: 'Backend',
    description: 'API REST, bots de WhatsApp, IA y persistencia en Supabase.',
    to: '/docs/backend/overview',
    icon: '⚙️',
    tag: 'prometheus-service',
  },
  {
    title: 'Frontend',
    description: 'Panel Angular con arquitectura hexagonal y Atomic Design.',
    to: '/docs/frontend/overview',
    icon: '🖥️',
    tag: 'prometheus-interface',
  },
];

const stats = [
  {value: '2', label: 'Repositorios core'},
  {value: 'WA + IA', label: 'Canal principal'},
  {value: 'Multi-tenant', label: 'Por administrador'},
];

const repos = [
  {
    name: 'prometheus-service',
    description: 'Node.js · Express · Supabase · Baileys',
    href: 'https://github.com/updev-rm/prometheus-service',
  },
  {
    name: 'prometheus-interface',
    description: 'Angular 19 · Hexagonal · Atomic Design',
    href: 'https://github.com/updev-rm/prometheus-interface',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.heroGrid} aria-hidden />
      <div className="container">
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Plataforma Selvo</span>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroActions}>
            <Link className={clsx('button button--primary button--lg', styles.heroBtnPrimary)} to="/docs/intro">
              Empezar
            </Link>
            <Link className={clsx('button button--lg', styles.heroBtnSecondary)} to="/docs/architecture/overview">
              Ver arquitectura
            </Link>
          </div>
          <div className={styles.stats}>
            {stats.map(({value, label}) => (
              <div key={label} className={styles.stat}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Inicio" description="Documentación técnica de Prometheus / Selvo">
      <HomepageHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">Explora la documentación</Heading>
              <p>Organizada por capas: primeros pasos, arquitectura, backend, frontend y operaciones.</p>
            </div>
            <div className="row">
              {cards.map(({title, description, to, icon, tag}) => (
                <div key={title} className={clsx('col col--6 col--4-tablet', styles.featureCol)}>
                  <Link to={to} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardIcon} aria-hidden>{icon}</span>
                      <span className={styles.cardTag}>{tag}</span>
                    </div>
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                    <span className={styles.cardLink}>Leer más →</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(styles.section, styles.reposSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">Repositorios</Heading>
              <p>Código fuente de la plataforma en GitHub.</p>
            </div>
            <div className={styles.repos}>
              {repos.map(({name, description, href}) => (
                <a key={name} href={href} className={styles.repoCard} target="_blank" rel="noopener noreferrer">
                  <div>
                    <strong>{name}</strong>
                    <p>{description}</p>
                  </div>
                  <span className={styles.repoArrow} aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
