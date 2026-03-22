import { Link } from 'react-router';
import Icon from '~/components/icon';
import { Shader, SineWave, SolidColor, Pixelate, Plasma } from 'shaders/react';

export function meta() {
  return [{ title: 'Sakuga Software — Studio de dev web' }, { name: 'description', content: 'Studio indépendant de développement web orienté design, basé à Bordeaux. Du prototype à la production.' }];
}

const services = [
  {
    title: 'Interfaces & Expérience',
    description: 'Design systems, animations complexes et micro-interactions pour une identité forte.',
    tools: 'Figma, React, Motion',
    icon: 'ri:layout-line' as const,
  },
  {
    title: 'Fonctionnalités Produit',
    description: 'Développement de fonctionnalités métier, dashboards et outils sur mesure.',
    tools: 'ReCharts, Three.js, Bun',
    icon: 'ri:code-s-slash-line' as const,
  },
  { title: 'Systèmes & Intégrations', description: 'APIs, bases de données et architecture back-end robuste.', tools: 'PostgreSQL, Drizzle, Hono', icon: 'ri:database-2-line' as const },
  { title: 'Déploiement & Infra', description: 'Mise en production, CI/CD, gestion serveurs et domaines.', tools: 'Scaleway, GitHub, Docker', icon: 'ri:cloud-line' as const },
];

const projects = [
  { name: 'Plai', url: 'https://plai.fr', description: 'Plateforme de streaming musical', tags: ['App', 'Streaming', 'Microservices'] },
  { name: 'Suricarte', url: 'https://suricarte.com', description: 'Gestion de distributeurs automatiques', tags: ['Stock', 'Dashboard', 'API'] },
  { name: 'Jexplore', url: 'https://jexplore.co', description: 'Solution CMS VR', tags: ['Video', 'Dashboard', 'Three.js'] },
  { name: 'Detective Box', url: 'https://detectivebox.com', description: 'Escape game en ligne', tags: ['Divertissement', 'E-Commerce', 'API'] },
];

const tech = [
  { name: 'React', url: 'https://react.dev' },
  { name: 'React Router 7', url: 'https://reactrouter.com' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
  { name: 'Three.js', url: 'https://threejs.org' },
  { name: 'PostgreSQL', url: 'https://www.postgresql.org' },
  { name: 'Drizzle ORM', url: 'https://orm.drizzle.team' },
  { name: 'Docker', url: 'https://www.docker.com' },
  { name: 'Node.js', url: 'https://nodejs.org' },
  { name: 'Bun', url: 'https://bun.sh' },
  { name: 'Hono', url: 'https://hono.dev' },
  { name: 'Better Auth', url: 'https://www.better-auth.com' },
  { name: 'HeroUI', url: 'https://www.heroui.com' },
  { name: 'Expo', url: 'https://expo.dev' },
];

const Background = () => (
  <Shader className="absolute inset-0 -z-10 opacity-50">
    <SolidColor color="#09060f" />
    <Pixelate
      gap={{
        type: 'map',
        curve: 0.35,
        source: 'idmmbhthud5inxgebqc',
        channel: 'alphaInverted',
        inputMax: 1,
        inputMin: 0,
        outputMax: 1,
        outputMin: 0.16,
      }}
      roundness={0.2}
      scale={74}
    >
      <Plasma balance={57} colorA="#ff0000" contrast={1.6} density={3.3} intensity={1.8} />
    </Pixelate>
    <SineWave id="idmmbhthud5inxgebqc" amplitude={0.1} angle={44} position={{ x: 0.66, y: 0.54 }} softness={1} thickness={0.9} visible={false} />
  </Shader>
);

function ServiceCard({ title, description, tools, icon }: (typeof services)[number]) {
  return (
    <a
      href="https://sakuga.dev/#services"
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-white/10 bg-white/5 p-6 no-underline backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
    >
      <Icon icon={icon} className="mb-3 h-6 w-6 text-rose-400" />
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-3 text-sm text-gray-300">{description}</p>
      <p className="text-xs text-gray-500">{tools}</p>
    </a>
  );
}

function ProjectCard({ name, url, description, tags }: (typeof projects)[number]) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-white/10 bg-white/5 p-5 no-underline backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">{name}</h3>
        <Icon icon="ri:external-link-line" className="h-3.5 w-3.5 text-gray-500" />
      </div>
      <p className="mb-3 text-sm text-gray-400">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-gray-300">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function SakugaPage() {
  return (
    <div className="min-h-screen text-white relative ">
      <Background />

      <nav className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="text-sm text-gray-400 no-underline hover:text-white">
          &larr; Retour
        </Link>
        <a href="https://sakuga.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 no-underline hover:text-white">
          sakuga.dev &rarr;
        </a>
      </nav>

      <main className="mx-auto max-w-4xl px-8 pb-24">
        {/* Header */}
        <section className="py-16 text-center">
          <p className="mb-4 text-sm font-medium tracking-widest text-rose-400 uppercase">Fondateur</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Sakuga Software</h1>
          <p className="mx-auto max-w-lg text-lg text-gray-400">Studio indépendant de développement web orienté design. Interfaces, fonctionnalités, systèmes, déploiement — du prototype à la prod.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="mailto:contact@sakuga.dev" className="rounded-full bg-white/10 px-5 py-2 text-sm text-white no-underline transition hover:bg-white/20">
              contact@sakuga.dev
            </a>
            <a href="https://github.com/sakuga-software" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Icon icon="ri:github-fill" className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/sakuga-software" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Icon icon="ri:linkedin-box-fill" className="h-5 w-5" />
            </a>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Icon icon="ri:earth-line" className="h-4 w-4" />
              Bordeaux
            </span>
          </div>
        </section>

        {/* Services */}
        <section className="py-12">
          <h2 className="mb-8 text-2xl font-semibold">Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="py-12">
          <h2 className="mb-8 text-2xl font-semibold">Projets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12">
          <h2 className="mb-6 text-2xl font-semibold">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 no-underline transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {t.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
