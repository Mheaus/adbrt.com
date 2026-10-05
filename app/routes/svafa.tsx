import { useEffect, useState } from 'react';
import { TransitionLink } from '~/components/transition-link';
import { FallingLines, LinearGradient, Shader, SolidColor, TiltShift } from 'shaders/react';
import Icon from '~/components/icon';

export function meta() {
  return [
    { title: 'Svafa — Multi-Page Grid Viewer' },
    { name: 'description', content: 'Chrome extension to display multiple web pages in a customizable grid layout. Monitor dashboards, compare sites, keep an eye on several pages at once.' },
  ];
}

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/svafa-multi-page-grid-vie/kdfcicmfcophpiopdkgfjpemopebbjmn';
const GITHUB_URL = 'https://github.com/sakuga-software/svafa';

const features = [
  { title: 'Customizable Grid', description: 'Choose from multiple presets, from 1x1 up to 3x3.', icon: 'ri:layout-line' },
  { title: 'Persistent Config', description: 'URLs and layout saved across browser sessions.', icon: 'ri:database-2-line' },
  { title: 'New Tab Override', description: 'Replaces your new tab with your custom grid.', icon: 'ri:star-fill' },
  { title: 'Enhanced Compatibility', description: 'Bypass iframe restrictions to display blocked sites.', icon: 'ri:cloud-line' },
];

const tech = [
  { name: 'WXT', url: 'https://wxt.dev' },
  { name: 'React 19', url: 'https://react.dev' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind CSS v4', url: 'https://tailwindcss.com' },
  { name: 'HeroUI', url: 'https://www.heroui.com' },
  { name: 'Chrome Storage API', url: 'https://developer.chrome.com/docs/extensions/reference/api/storage' },
];

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
      <Shader className="fixed inset-0">
        <SolidColor color="#0b2102" />
        <FallingLines id="idmmijuosi5e6y2didn" angle={186} colorB="#cccccc00" colorSpace="hsl" density={13} speed={0.1} speedVariance={0.15} strokeWidth={0.34} trailLength={0.95} visible={false} />
        <LinearGradient colorA="#88df46" colorB="#98da83" colorSpace="oklab" edges="mirror" end={{ x: 1, y: 0 }} maskSource="idmmijuosi5e6y2didn" start={{ x: 0, y: 1 }} />
        <TiltShift falloff={0.9} intensity={100} width={0} />
      </Shader>
    </div>
  );
};

export default function SvafaPage() {
  return (
    <div className="relative isolate min-h-screen text-ice">
      <div aria-hidden className="hud-grid fixed inset-0 -z-20" />
      <Background />

      <nav className="flex items-center justify-between px-8 py-6">
        <TransitionLink to="/" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
          &larr; Retour
        </TransitionLink>
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
          Chrome Web Store &rarr;
        </a>
      </nav>

      <main className="mx-auto max-w-3xl px-8 pb-24">
        {/* Header */}
        <section className="py-16 text-center">
          <img src="/assets/images/svafa-icon.png" alt="Svafa icon" width={80} height={80} className="mx-auto mb-6 rounded-xl ring-1 ring-cyan/40" />
          <h1 className="text-glow mb-3 font-display text-4xl font-bold tracking-wide uppercase sm:text-6xl">Svafa</h1>
          <p className="text-lg text-ice/60">Multi-Page Grid Viewer for Chrome</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-ice/60">
            Display multiple web pages in a customizable grid layout. Monitor dashboards, compare websites, or keep an eye on several pages at once.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="chamfer inline-flex items-center gap-2 bg-magenta px-6 py-2.5 font-display text-sm font-semibold tracking-widest text-void uppercase no-underline transition hover:bg-cyan"
            >
              <Icon icon="ri:cloud-line" className="h-4 w-4" />
              Install Extension
            </a>
            {/* <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-ice/80 no-underline transition hover:border-white/30 hover:text-cyan"
            >
              <Icon icon="ri:github-fill" className="h-4 w-4" />
              Source
            </a> */}
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="mb-8 font-display text-2xl font-bold tracking-widest uppercase">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="border border-white/10 bg-gunmetal/70 p-5 backdrop-blur-sm">
                <Icon icon={f.icon} className="mb-3 h-5 w-5 text-cyan" />
                <h3 className="mb-1 font-display text-base font-semibold tracking-wide text-ice">{f.title}</h3>
                <p className="text-sm text-ice/60">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <h2 className="mb-8 font-display text-2xl font-bold tracking-widest uppercase">How it works</h2>
          <ol className="space-y-4">
            {[
              'Open a new tab — Svafa replaces it with your custom grid.',
              'Click "Settings" to choose your layout (1x1 to 3x3).',
              'Add URLs to each cell. Protocol is optional.',
              'Your configuration is saved automatically across sessions.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-cyan/10 font-mono text-xs text-cyan ring-1 ring-cyan/40 ring-inset">{i + 1}</span>
                <p className="text-sm text-ice/80 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Tech */}
        <section className="py-12">
          <h2 className="mb-6 font-display text-2xl font-bold tracking-widest uppercase">Built with</h2>
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

        {/* CTA */}
        <section className="py-12 text-center">
          <p className="mb-2 text-sm text-dim">Open source &middot; MIT License</p>
          <div className="flex items-center justify-center gap-4">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
              Chrome Web Store
            </a>
            <span className="text-dim">&middot;</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
              GitHub
            </a>
            <span className="text-dim">&middot;</span>
            <TransitionLink to="/sakuga" className="font-mono text-xs tracking-[0.2em] text-dim uppercase no-underline transition hover:text-cyan">
              Sakuga Software
            </TransitionLink>
          </div>
        </section>
      </main>
    </div>
  );
}
