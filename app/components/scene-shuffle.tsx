import { useEffect } from 'react';
import Icon from './icon';
import { Corners, HudLabel } from './hud';
import { scenes } from '~/scenes/registry';

interface SceneShuffleProps {
  index: number;
  onShuffle: () => void;
}

export function SceneSmear({ run }: { run: number }) {
  if (!run) return null;
  return (
    <div key={run} aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div className="absolute inset-y-0 -left-1/4 w-[150%]" style={{ animation: 'smear 420ms cubic-bezier(.6,0,.2,1) forwards' }}>
        <div className="absolute inset-y-0 left-[38%] w-[9%] bg-magenta/80" />
        <div className="absolute inset-y-0 left-[48%] w-[3%] bg-cyan/80" />
        <div className="absolute inset-y-0 left-[52%] w-[1%] bg-ice/70" />
      </div>
    </div>
  );
}

export default function SceneShuffle({ index, onShuffle }: SceneShuffleProps) {
  const scene = scenes[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable]')) return;
      onShuffle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onShuffle]);

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={onShuffle}
        aria-label={`Changer de scène. Scène actuelle : ${scene.label}`}
        aria-keyshortcuts="S"
        className="group relative flex cursor-pointer items-center gap-3 bg-gunmetal/80 px-3 py-2 text-ice backdrop-blur-sm transition hover:bg-magenta hover:text-void"
      >
        <Corners className="text-cyan group-hover:text-void" size="size-2" />
        <Icon icon="ri:shuffle-line" className="size-5 transition-transform duration-300 group-hover:rotate-180 group-active:scale-90" />
        <span className="flex flex-col items-start leading-none">
          <span className="font-display text-sm font-bold tracking-widest uppercase">Shuffle</span>
          <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-dim uppercase group-hover:text-void/70">
            {String(index + 1).padStart(2, '0')}/{String(scenes.length).padStart(2, '0')} · {scene.kanji}
          </span>
        </span>
      </button>
      <p aria-live="polite" className="hidden text-right sm:block">
        <HudLabel>
          {scene.label} — {scene.hint}
        </HudLabel>
      </p>
    </div>
  );
}
