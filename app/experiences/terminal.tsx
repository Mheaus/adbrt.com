import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { HudPanel } from '~/components/hud';
import { projects, services, tech } from '~/data/sakuga';
import type { ExperienceProps } from '~/scenes/registry';
import { SCENE_IDS, isSceneId, scenePath } from '~/scenes/scene-ids';
import { setTransitionDirection } from '~/components/transition-link';

const PROMPT = 'mheaus@adbrt:~$';

const LINKS: Record<string, string> = {
  github: 'https://github.com/Mheaus',
  linkedin: 'https://www.linkedin.com/in/mathieuadbrt/',
  malt: 'https://www.malt.fr/profile/mathieuaudebert',
  twitter: 'https://twitter.com/MattAdbrt',
  sakuga: 'https://sakuga.dev',
  ...Object.fromEntries(projects.filter((p) => p.url.startsWith('http')).map((p) => [p.name.toLowerCase().replace(/\s+/g, '-'), p.url])),
};

const PAGES = ['accueil', 'sakuga', 'svafa', 'devo'];
const EXPERIENCES = SCENE_IDS.filter((id) => id !== 'standby');

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-cyan no-underline hover:text-magenta">
    {children}
  </a>
);

const Rows = ({ rows }: { rows: [string, ReactNode][] }) => (
  <div className="grid grid-cols-[auto_1fr] gap-x-6">
    {rows.map(([k, v]) => (
      <div key={k} className="contents">
        <span className="text-magenta">{k}</span>
        <span>{v}</span>
      </div>
    ))}
  </div>
);

interface Context extends ExperienceProps {
  args: string[];
  clear: () => void;
  history: string[];
  navigate: (to: string, options?: { viewTransition?: boolean }) => void;
}

const COMMANDS: Record<string, { help: string; run: (c: Context) => ReactNode }> = {
  help: {
    help: 'liste les commandes',
    run: () => <Rows rows={Object.entries(COMMANDS).map(([name, c]) => [name, c.help])} />,
  },
  whoami: {
    help: 'qui est derrière ce terminal',
    run: () => (
      <Rows
        rows={[
          ['nom', 'Mathieu Audebert'],
          ['rôle', 'Fullstack Developer · Founder of Sakuga Software'],
          ['base', 'Bordeaux, France · 44.84°N 0.58°W'],
          ['stack', 'React · TypeScript · Node · PostgreSQL'],
        ]}
      />
    ),
  },
  projects: {
    help: 'les projets du studio',
    run: () => <Rows rows={projects.map((p) => [p.name, <A href={p.url}>{p.description}</A>])} />,
  },
  services: {
    help: 'ce que Sakuga Software fait',
    run: () => <Rows rows={services.map((s) => [s.title, `${s.description} (${s.tools})`])} />,
  },
  stack: {
    help: 'les outils du quotidien',
    run: () => <p>{tech.map((t) => t.name).join(' · ')}</p>,
  },
  sakuga: {
    help: 'à propos du studio 作画',
    run: () => (
      <p>
        <span className="text-magenta">作画 Sakuga Software</span> — studio indépendant de développement web orienté design, basé à Bordeaux. Du prototype à la production.{' '}
        <A href="https://sakuga.dev">sakuga.dev</A>
      </p>
    ),
  },
  contact: {
    help: 'écrire ou se connecter',
    run: () => (
      <Rows
        rows={[
          ['mail', 'contact@sakuga.dev'],
          ['linkedin', <A href={LINKS.linkedin}>linkedin.com/in/mathieuadbrt</A>],
          ['malt', <A href={LINKS.malt}>malt.fr/profile/mathieuaudebert</A>],
          ['github', <A href={LINKS.github}>github.com/Mheaus</A>],
        ]}
      />
    ),
  },
  open: {
    help: `ouvre un lien : open <${Object.keys(LINKS).join('|')}>`,
    run: ({ args }) => {
      const url = LINKS[args[0]];
      if (!url)
        return (
          <p className="text-magenta">
            open : cible inconnue « {args[0] ?? ''} ». Cibles : {Object.keys(LINKS).join(', ')}
          </p>
        );
      window.open(url, '_blank', 'noopener');
      return <p>ouverture de {url}…</p>;
    },
  },
  play: {
    help: `lance une expérience : play <${SCENE_IDS.join('|')}>`,
    run: ({ args, navigate }) => {
      const id = args[0] ?? '';
      if (!isSceneId(id))
        return (
          <p className="text-magenta">
            play : expérience inconnue « {id} ». Choix : {SCENE_IDS.join(', ')}
          </p>
        );
      navigate(scenePath(id));
      return <p>→ {id}</p>;
    },
  },
  ls: {
    help: 'liste les pages et les expériences',
    run: () => (
      <Rows
        rows={[
          ['pages', PAGES.map((p) => `${p}/`).join('  ')],
          ['expériences', EXPERIENCES.join('  ')],
        ]}
      />
    ),
  },
  cd: {
    help: 'va sur une page ou une expérience : cd <page>',
    run: ({ args, navigate }) => {
      const page = (args[0] ?? '').replace(/\/$/, '');
      if (isSceneId(page) && page !== 'standby') {
        navigate(scenePath(page));
        return <p>→ /{page}</p>;
      }
      if (!PAGES.includes(page)) return <p className="text-magenta">cd : {page || '(vide)'} : page introuvable</p>;
      const target = page === 'accueil' ? '/' : `/${page}`;
      setTransitionDirection(target);
      navigate(target, { viewTransition: true });
      return <p>→ /{page}</p>;
    },
  },
  neofetch: {
    help: 'fiche système',
    run: () => (
      <div className="flex flex-wrap gap-6">
        <pre className="m-0 text-magenta">{' ██  ██\n ██████\n ██  ██\n ██████\n  作画'}</pre>
        <Rows
          rows={[
            ['os', 'adbrt.com v4 (cyberpunk)'],
            ['shell', 'react-router 7'],
            ['uptime', `${Math.floor(performance.now() / 1000)} s sur cette page`],
            ['theme', 'gunmetal · magenta · cyan'],
          ]}
        />
      </div>
    ),
  },
  history: {
    help: 'commandes déjà tapées',
    run: ({ history }) => <p>{history.length ? history.map((h, i) => `${i + 1}  ${h}`).join('\n') : '(vide)'}</p>,
  },
  date: { help: "date et heure d'ici", run: () => <p>{new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p> },
  echo: { help: 'répète', run: ({ args }) => <p>{args.join(' ')}</p> },
  sudo: { help: 'essaie', run: () => <p className="text-amber">Permission refusée : ce terminal appartient à Mheaus.</p> },
  shuffle: { help: 'expérience suivante', run: ({ onShuffle }) => (onShuffle(), null) },
  clear: { help: "efface l'écran", run: ({ clear }) => (clear(), null) },
  exit: { help: "retour à l'accueil", run: ({ onExit }) => (onExit(), null) },
};

type Line = { id: number; input?: string; output?: ReactNode };

const BOOT: Line[] = [{ id: 0, output: <p className="text-dim">MHEAUS://SYS · terminal 作画 · tape « help » pour la liste des commandes.</p> }];

export default function Terminal({ onShuffle, onExit }: ExperienceProps) {
  const navigate = useNavigate();
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const [name = '', ...args] = raw.trim().split(/\s+/);
    const id = nextId.current++;
    if (!name) return setLines((l) => [...l, { id, input: raw }]);
    const command = COMMANDS[name.toLowerCase()];
    let cleared = false;
    const output = command ? command.run({ args, onShuffle, onExit, navigate, history, clear: () => (cleared = true) }) : <p className="text-magenta">{name} : commande introuvable. Tape « help ».</p>;
    setHistory((h) => [...h, raw]);
    setLines((l) => (cleared ? [] : [...l, { id, input: raw, output }]));
  };

  const complete = () => {
    const [name, ...rest] = value.split(' ');
    if (rest.length === 0) {
      const match = Object.keys(COMMANDS).filter((c) => c.startsWith(name));
      if (match.length === 1) setValue(`${match[0]} `);
      return;
    }
    const pool = name === 'open' ? Object.keys(LINKS) : name === 'cd' ? [...PAGES, ...EXPERIENCES] : name === 'play' ? [...SCENE_IDS] : [];
    const match = pool.filter((p) => p.startsWith(rest.join(' ')));
    if (match.length === 1) setValue(`${name} ${match[0]}`);
  };

  return (
    <HudPanel label="端末 · Terminal" code="TTY1" className="absolute! inset-3 flex flex-col sm:inset-5">
      <div
        ref={scroller}
        onClick={() => input.current?.focus()}
        className="min-h-0 flex-1 cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-ice/90 [&_p]:m-0"
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-2">
            {line.input !== undefined && (
              <p>
                <span className="text-cyan">{PROMPT}</span> {line.input}
              </p>
            )}
            {line.output}
          </div>
        ))}
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue('');
            setCursor(-1);
          }}
        >
          <label htmlFor="terminal-input" className="shrink-0 text-cyan">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={input}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                complete();
              } else if (e.key === 'ArrowUp' && history.length) {
                e.preventDefault();
                const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
                setCursor(next);
                setValue(history[next]);
              } else if (e.key === 'ArrowDown' && cursor >= 0) {
                e.preventDefault();
                const next = cursor + 1;
                setCursor(next >= history.length ? -1 : next);
                setValue(next >= history.length ? '' : history[next]);
              } else if (e.key === 'l' && e.ctrlKey) {
                e.preventDefault();
                setLines([]);
              }
            }}
            className="min-w-0 flex-1 bg-transparent text-ice caret-magenta outline-none focus-visible:outline-none"
          />
        </form>
      </div>
    </HudPanel>
  );
}
