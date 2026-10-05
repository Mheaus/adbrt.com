import { useState, useEffect, lazy, Suspense } from 'react';
import { TransitionLink } from '~/components/transition-link';
import Icon from '~/components/icon';
import { projects, services, tech } from '~/data/sakuga';

export function meta() {
  return [{ title: 'Sakuga Software — Studio de dev web' }, { name: 'description', content: 'Studio indépendant de développement web orienté design, basé à Bordeaux. Du prototype à la production.' }];
}

const SakugaShaderScene = lazy(() => import('~/components/sakuga-shader-scene'));

const Background = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);
  if (!mounted) return null;
  return (
    <div className="absolute inset-0 -z-10 transition-opacity duration-1000" style={{ opacity: visible ? 0.5 : 0 }}>
      <Suspense fallback={null}>
        <SakugaShaderScene />
      </Suspense>
    </div>
  );
};

function ServiceCard({ title, description, tools, icon }: (typeof services)[number]) {
  return (
    <a
      href="https://sakuga.dev/#services"
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-white/10 bg-gunmetal/70 p-6 no-underline backdrop-blur-sm transition hover:border-cyan/60 hover:bg-gunmetal"
    >
      <Icon icon={icon} className="mb-3 h-6 w-6 text-magenta" />
      <h3 className="mb-2 font-display text-lg font-semibold tracking-wide text-ice">{title}</h3>
      <p className="mb-3 text-sm text-ice/80">{description}</p>
      <p className="text-xs text-dim">{tools}</p>
    </a>
  );
}

function ProjectCard({ name, url, description, tags }: (typeof projects)[number]) {
  const isInternal = url.startsWith('/');
  const linkProps = isInternal ? {} : { target: '_blank' as const, rel: 'noopener noreferrer' };
  const Comp = isInternal ? TransitionLink : 'a';
  const urlProp = isInternal ? { to: url } : { href: url };

  return (
    <Comp {...(urlProp as any)} {...linkProps} className="block border border-white/10 bg-gunmetal/70 p-5 no-underline backdrop-blur-sm transition hover:border-cyan/60 hover:bg-gunmetal">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold tracking-wide text-ice">{name}</h3>
        {!isInternal && <Icon icon="ri:external-link-line" className="h-3.5 w-3.5 text-dim" />}
      </div>
      <p className="mb-3 text-sm text-ice/60">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-ice/70 uppercase">
            {tag}
          </span>
        ))}
      </div>
    </Comp>
  );
}

export default function SakugaPage() {
  return (
    <div className="relative isolate min-h-screen text-ice">
      <div aria-hidden className="hud-grid fixed inset-0 -z-20" />
      <Background />

      <nav className="flex items-center justify-between px-8 py-6">
        <TransitionLink to="/" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
          &larr; Retour
        </TransitionLink>
        <a href="https://sakuga.dev" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
          sakuga.dev &rarr;
        </a>
      </nav>

      <main className="mx-auto max-w-4xl px-8 pb-24">
        {/* Header */}
        <section className="py-16 text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.4em] text-magenta uppercase">作画 · Fondateur</p>
          <h1 className="text-glow mb-4 font-display text-4xl font-bold tracking-wide uppercase sm:text-6xl" style={{ viewTransitionName: 'sakuga-title' }}>
            Sakuga Software
          </h1>
          <p className="mx-auto max-w-lg text-lg text-ice/60">Studio indépendant de développement web orienté design. Interfaces, fonctionnalités, systèmes, déploiement — du prototype à la prod.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="mailto:contact@sakuga.dev"
              className="chamfer bg-cyan/10 px-5 py-2 font-mono text-sm text-cyan no-underline ring-1 ring-cyan/60 ring-inset transition hover:bg-magenta hover:text-void hover:ring-magenta"
            >
              contact@sakuga.dev
            </a>
            <a href="https://github.com/sakuga-software" target="_blank" rel="noopener noreferrer" className="text-ice/60 hover:text-cyan">
              <Icon icon="ri:github-fill" className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/sakuga-software" target="_blank" rel="noopener noreferrer" className="text-ice/60 hover:text-cyan">
              <Icon icon="ri:linkedin-box-fill" className="h-5 w-5" />
            </a>
            <span className="flex items-center gap-1.5 text-sm text-dim">
              <Icon icon="ri:earth-line" className="h-4 w-4" />
              Bordeaux
            </span>
          </div>
        </section>

        {/* Services */}
        <section className="py-12">
          <h2 className="mb-8 font-display text-2xl font-bold tracking-widest uppercase">Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="py-12">
          <h2 className="mb-8 font-display text-2xl font-bold tracking-widest uppercase">Projets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12">
          <h2 className="mb-6 font-display text-2xl font-bold tracking-widest uppercase">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 bg-gunmetal/60 px-3 py-1 font-mono text-xs text-ice/80 no-underline transition hover:border-cyan/60 hover:text-cyan"
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
