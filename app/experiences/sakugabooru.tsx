import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { HudLabel, HudPanel } from '~/components/hud';
import Icon from '~/components/icon';
import { useDebounce } from '~/hooks/use-debounce';
import type { SakugaPost } from '~/routes/api.sakugabooru';

const SUGGESTIONS = ['effects', 'smears', 'impact_frames', 'yutaka_nakamura', 'mecha', 'hair', 'fighting', 'running'];

type Result = { status: 'loading' } | { status: 'error'; message: string } | { status: 'done'; tag: string; posts: SakugaPost[] };

function Clip({ post, autoPlay }: { post: SakugaPost; autoPlay: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (playing) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing]);

  const isGif = post.ext === 'gif';

  return (
    <figure
      className="group relative m-0 aspect-video overflow-hidden bg-void ring-1 ring-white/10 transition hover:ring-cyan"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPlaying(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPlaying(autoPlay)}
      onClick={() => setPlaying((p) => !p)}
    >
      {isGif ? (
        <img src={playing ? post.file : post.preview} alt={post.tags} className="h-full w-full object-cover" />
      ) : (
        <video ref={video} src={post.file} poster={post.preview} muted loop playsInline preload="none" className="h-full w-full object-cover" />
      )}
      {!playing && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void/30 font-mono text-[10px] tracking-[0.3em] text-ice uppercase opacity-80">▶ Play</span>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-void/80 px-2 py-1 opacity-0 transition group-hover:opacity-100">
        <span className="truncate font-mono text-[10px] text-dim">{post.tags}</span>
        <a href={post.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="shrink-0 font-mono text-[10px] text-cyan no-underline hover:text-magenta">
          #{post.id} <Icon icon="ri:external-link-line" className="inline size-3" />
        </a>
      </figcaption>
    </figure>
  );
}

export default function Sakugabooru() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 450);
  const [result, setResult] = useState<Result>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    setResult({ status: 'loading' });
    fetch(`/api/sakugabooru?q=${encodeURIComponent(debounced)}`, { signal: controller.signal })
      .then(async (res) => {
        const body = await res.json();
        setResult(res.ok ? { status: 'done', tag: body.tag, posts: body.posts } : { status: 'error', message: body.error });
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) setResult({ status: 'error', message: err instanceof Error ? err.message : String(err) });
      });
    return () => controller.abort();
  }, [debounced]);

  return (
    <HudPanel label="作画ブール · Sakugabooru" code={result.status === 'done' ? `TAG ${result.tag}` : 'SEARCH'} className="flex max-h-full w-full max-w-4xl min-h-0 flex-col">
      <div className="flex flex-col gap-3 p-4">
        <label className="flex items-center gap-3 bg-void px-3 py-2 ring-1 ring-cyan/40 focus-within:ring-cyan">
          <span className="font-mono text-sm text-magenta">&gt;</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="effects, yutaka nakamura, mecha…"
            aria-label="Rechercher un tag ou un animateur sur Sakugabooru"
            className="w-full bg-transparent font-mono text-sm text-ice outline-none placeholder:text-dim focus-visible:outline-none"
          />
          {result.status === 'loading' && <span className="size-2 animate-blink bg-cyan" />}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s.replace(/_/g, ' '))}
              className={clsx(
                'cursor-pointer px-2 py-0.5 font-mono text-[10px] tracking-wider ring-1 transition',
                result.status === 'done' && result.tag === s ? 'text-void bg-cyan ring-cyan' : 'text-dim ring-white/10 hover:text-cyan hover:ring-cyan/50',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 overflow-y-auto px-4 pb-4">
        {result.status === 'error' && <p className="font-mono text-xs text-magenta">{result.message}</p>}
        {result.status === 'done' && !result.posts.length && <p className="font-mono text-xs text-dim">Aucun clip pour « {debounced} ». Essaie un autre tag.</p>}
        {result.status === 'done' && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {result.posts.map((post, i) => (
              <Clip key={post.id} post={post} autoPlay={i === 0} />
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-white/5 px-4 py-2">
        <HudLabel>
          Clips de{' '}
          <a href="https://www.sakugabooru.com/" target="_blank" rel="noopener noreferrer" className="text-cyan no-underline hover:text-magenta">
            sakugabooru.com
          </a>{' '}
          · survole pour lire · classés par score
        </HudLabel>
      </div>
    </HudPanel>
  );
}
