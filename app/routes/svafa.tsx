import { useEffect, useState } from 'react';
import { Link } from 'react-router';
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
    <div className="min-h-screen text-white">
      <Background />

      <nav className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="text-sm text-gray-400 no-underline hover:text-white">
          &larr; Retour
        </Link>
        <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 no-underline hover:text-white">
          Chrome Web Store &rarr;
        </a>
      </nav>

      <main className="mx-auto max-w-3xl px-8 pb-24">
        {/* Header */}
        <section className="py-16 text-center">
          <img src="/assets/images/svafa-icon.png" alt="Svafa icon" width={80} height={80} className="mx-auto mb-6 rounded-2xl" />
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">Svafa</h1>
          <p className="text-lg text-gray-400">Multi-Page Grid Viewer for Chrome</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-gray-400">
            Display multiple web pages in a customizable grid layout. Monitor dashboards, compare websites, or keep an eye on several pages at once.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-gray-900 no-underline transition hover:bg-gray-200"
            >
              <Icon icon="ri:cloud-line" className="h-4 w-4" />
              Install Extension
            </a>
            {/* <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-gray-300 no-underline transition hover:border-white/30 hover:text-white"
            >
              <Icon icon="ri:github-fill" className="h-4 w-4" />
              Source
            </a> */}
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="mb-8 text-2xl font-semibold">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Icon icon={f.icon} className="mb-3 h-5 w-5 text-blue-400" />
                <h3 className="mb-1 text-base font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <h2 className="mb-8 text-2xl font-semibold">How it works</h2>
          <ol className="space-y-4">
            {[
              'Open a new tab — Svafa replaces it with your custom grid.',
              'Click "Settings" to choose your layout (1x1 to 3x3).',
              'Add URLs to each cell. Protocol is optional.',
              'Your configuration is saved automatically across sessions.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-gray-300">{i + 1}</span>
                <p className="text-sm text-gray-300 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Tech */}
        <section className="py-12">
          <h2 className="mb-6 text-2xl font-semibold">Built with</h2>
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

        {/* CTA */}
        <section className="py-12 text-center">
          <p className="mb-2 text-sm text-gray-500">Open source &middot; MIT License</p>
          <div className="flex items-center justify-center gap-4">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 no-underline hover:text-white">
              Chrome Web Store
            </a>
            <span className="text-gray-700">&middot;</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 no-underline hover:text-white">
              GitHub
            </a>
            <span className="text-gray-700">&middot;</span>
            <Link to="/sakuga" className="text-sm text-gray-400 no-underline hover:text-white">
              Sakuga Software
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
