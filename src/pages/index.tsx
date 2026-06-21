import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const cards = [
  {
    title: 'Primeros pasos',
    description: 'Configura el entorno local y ejecuta backend y frontend juntos.',
    to: '/docs/getting-started/local-development',
  },
  {
    title: 'Arquitectura',
    description: 'Contexto del sistema, flujos de datos y modelo multi-tenant.',
    to: '/docs/architecture/overview',
  },
  {
    title: 'Backend',
    description: 'API REST, bots de WhatsApp, IA y persistencia en Supabase.',
    to: '/docs/backend/overview',
  },
  {
    title: 'Frontend',
    description: 'Panel Angular con arquitectura hexagonal y Atomic Design.',
    to: '/docs/frontend/overview',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Empezar
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Inicio" description="Documentación de Prometheus / Selvo">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {cards.map(({title, description, to}) => (
                <div key={title} className={clsx('col col--6', styles.featureCol)}>
                  <Link to={to} className={styles.card}>
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
