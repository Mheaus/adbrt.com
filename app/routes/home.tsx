import { data, useNavigate, useParams } from 'react-router';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { TransitionLink } from '~/components/transition-link';
import Nav from '~/components/nav';
import ProgressiveImage from '~/components/progressive-image';
import Icon from '~/components/icon';
import MaltIcon from '~/components/malt-icon';
import BusinessCard from '~/components/business-card';
import SceneBackground from '~/components/scene-background';
import SceneShuffle, { SceneSmear } from '~/components/scene-shuffle';
import { Corners, HudLabel } from '~/components/hud';
import { pickOther, scenes, type Scene } from '~/scenes/registry';
import { isSceneId, scenePath } from '~/scenes/scene-ids';
import type { Route } from './+types/home';

const DESCRIPTION = 'Développeur fullstack à Bordeaux, fondateur de Sakuga Software.';

const sceneIndexOf = (slug: string | undefined) => Math.max(0, slug ? scenes.findIndex((s) => s.id === slug) : 0);

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.experience;
  if (slug && (!isSceneId(slug) || slug === 'standby')) throw data(null, { status: 404 });
  return null;
}

export function meta({ params }: Route.MetaArgs) {
  const scene = scenes[sceneIndexOf(params.experience)];
  const title = scene.id === 'standby' ? 'Mathieu Audebert' : `${scene.label} ${scene.kanji} — Mathieu Audebert`;
  return [{ title }, { name: 'description', content: scene.id === 'standby' ? DESCRIPTION : `${scene.hint}. ${DESCRIPTION}` }];
}

function Profile({ shuffle }: { shuffle: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <HudLabel>Pilot // Mheaus</HudLabel>
          <HudLabel className="flex items-center gap-1.5 text-cyan">
            <span className="size-1.5 animate-blink rounded-full bg-cyan" />
            Online
          </HudLabel>
        </div>
        <a href="https://github.com/Mheaus" target="_blank" rel="noreferrer" className="group relative block h-42 w-64 sm:h-84 sm:w-lg">
          <Corners className="-m-2 text-cyan transition-colors group-hover:text-magenta" />
          <ProgressiveImage src="/assets/images/profile.jpg" width={1000} height={667} alt="profile Mathieu Audebert" className="h-full w-full rounded" priority />
        </a>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-magenta">マチュー・オードベール</p>
        <h1 className="text-glow font-display text-3xl font-bold tracking-wide text-ice uppercase sm:text-5xl">Mathieu Audebert</h1>
        <p className="font-display text-base font-semibold tracking-wider text-ice/80 uppercase sm:text-lg">
          Fullstack Developer · Founder of{' '}
          <TransitionLink to="/sakuga" className="text-magenta no-underline transition hover:text-cyan" style={{ viewTransitionName: 'sakuga-title' }}>
            Sakuga Software
          </TransitionLink>
        </p>
        <p className="font-mono text-xs text-dim">React · TypeScript · Node · PostgreSQL</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          className="chamfer group relative flex items-center gap-3 bg-cyan/10 px-5 py-2.5 font-display text-sm font-semibold tracking-widest text-cyan uppercase no-underline ring-1 ring-cyan/60 ring-inset transition hover:bg-magenta hover:text-void hover:ring-magenta"
          href="https://www.linkedin.com/in/mathieuadbrt/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>Contactez-moi</span>
          <Icon icon="ri:linkedin-box-fill" className="size-5" />
        </a>
        {shuffle}
      </div>
    </div>
  );
}

function Experience({ scene, onShuffle, onExit }: { scene: Extract<Scene, { kind: 'experience' }>; onShuffle: () => void; onExit: () => void }) {
  const fullscreen = scene.layout === 'fill' || scene.layout === 'immersive';
  const Component = useMemo(() => lazy(scene.load), [scene]);
  const ref = useRef<HTMLDivElement>(null);
  // If the shuffle button keeps the focus, Space and Enter shuffle again during a game.
  useEffect(() => {
    if (ref.current && !ref.current.contains(document.activeElement)) ref.current.focus({ preventScroll: true });
  }, []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={
        fullscreen ? 'pointer-events-auto absolute inset-0 outline-none' : 'pointer-events-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center gap-3 px-4 outline-none'
      }
    >
      <HudLabel className={fullscreen ? 'hidden' : 'hidden text-center sm:block'}>
        {scene.kanji} · {scene.label} — {scene.hint}
      </HudLabel>
      <Suspense fallback={<HudLabel className="animate-blink text-cyan">Loading…</HudLabel>}>
        <Component onShuffle={onShuffle} onExit={onExit} />
      </Suspense>
    </div>
  );
}

function Location() {
  return (
    <a
      className="absolute bottom-3 left-3 flex flex-col gap-0.5 text-ice no-underline transition hover:text-cyan sm:bottom-5 sm:left-5"
      href="https://www.google.fr/maps/place/Bordeaux/@44.8638281,-0.6563526,12z/data=!3m1!4b1!4m5!3m4!1s0xd5527e8f751ca81:0x796386037b397a89!8m2!3d44.837789!4d-0.57918"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex items-center gap-2 font-display text-base font-semibold tracking-widest uppercase sm:text-lg">
        <Icon icon="ri:map-pin-2-line" className="text-magenta" />
        Bordeaux
      </span>
      <HudLabel>44.84°N · 0.58°W</HudLabel>
    </a>
  );
}

const socialClass = 'text-ice transition hover:text-magenta';

function Socials({ onCardOpen }: { onCardOpen: () => void }) {
  return (
    <div className="absolute right-3 bottom-3 flex items-center gap-3 sm:right-5 sm:bottom-5">
      <button type="button" onClick={onCardOpen} className={`${socialClass} cursor-pointer`} aria-label="Carte de visite">
        <Icon icon="lucide:id-card" className="size-6 sm:size-7" />
      </button>
      <a className={socialClass} href="https://www.malt.fr/profile/mathieuaudebert" target="_blank" rel="noopener noreferrer" aria-label="Malt">
        <MaltIcon className="size-6 sm:size-7" />
      </a>
      <a className={socialClass} href="https://github.com/Mheaus" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Icon icon="ri:github-fill" className="size-6 sm:size-7" />
      </a>
      <a className={socialClass} href="https://twitter.com/MattAdbrt" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <Icon icon="ri:twitter-fill" className="size-6 sm:size-7" />
      </a>
    </div>
  );
}

function OrgMark() {
  return (
    <TransitionLink
      to="/sakuga"
      className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-dim no-underline transition [writing-mode:vertical-rl] hover:text-magenta sm:right-5 md:flex"
    >
      <span className="font-sans text-base tracking-[0.2em] text-magenta">作画</span>
      SAKUGA SOFTWARE
    </TransitionLink>
  );
}

export default function HomePage() {
  const [cardOpen, setCardOpen] = useState(false);
  const [smear, setSmear] = useState(0);
  const navigate = useNavigate();
  const sceneIndex = sceneIndexOf(useParams().experience);
  // Experiences use browser APIs and random state. They render after hydration, so the prerendered HTML stays stable.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const showScene = useCallback((index: number) => navigate(scenePath(scenes[index].id), { preventScrollReset: true }), [navigate]);
  const shuffle = useCallback(
    (animated: boolean) => {
      if (animated) setSmear((n) => n + 1);
      showScene(pickOther(sceneIndex));
    },
    [showScene, sceneIndex],
  );
  const shuffleFromGame = useCallback(() => shuffle(false), [shuffle]);
  const exit = useCallback(() => showScene(0), [showScene]);

  const scene = scenes[sceneIndex];
  const experience = scene.kind === 'experience' ? scene : null;
  const layout = experience ? (experience.layout ?? 'center') : null;
  const immersive = layout === 'immersive';
  const shuffleButton = <SceneShuffle scene={scene} onShuffle={shuffle} />;
  const experienceView = experience && hydrated ? <Experience key={experience.id} scene={experience} onShuffle={shuffleFromGame} onExit={exit} /> : null;

  return (
    <main className="fixed inset-0 overflow-hidden bg-void">
      <SceneBackground scene={scene} />
      {layout === 'fill' && <div className="absolute inset-0">{experienceView}</div>}
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {!immersive && <Nav />}
        {experience && <div className="absolute top-3 right-3 z-30 sm:top-5 sm:right-5">{shuffleButton}</div>}
        {immersive ? (
          experienceView
        ) : layout === 'center' ? (
          <div className="flex min-h-0 flex-1 flex-col items-center pt-36 pb-24 sm:pt-6 sm:pb-6">{experienceView}</div>
        ) : layout === 'fill' ? null : (
          <div className="flex flex-1 items-center justify-center">
            <Profile shuffle={shuffleButton} />
          </div>
        )}
        {!immersive && (
          <>
            <OrgMark />
            <Location />
            <Socials onCardOpen={() => setCardOpen(true)} />
          </>
        )}
      </div>
      <SceneSmear run={smear} />
      <BusinessCard open={cardOpen} onClose={() => setCardOpen(false)} />
    </main>
  );
}
