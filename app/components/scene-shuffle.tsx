import { useEffect } from 'react';
import Icon from './icon';
import type { Scene } from '~/scenes/registry';

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

interface SceneShuffleProps {
  scene: Scene;
  /** `animated` is false for the keyboard shortcut: a keyboard action must not wait for a transition. */
  onShuffle: (animated: boolean) => void;
}

export default function SceneShuffle({ scene, onShuffle }: SceneShuffleProps) {
  useEffect(() => {
    // Control+S works during the games too, so it must also stop the browser "Save page" dialog.
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 's' || !e.ctrlKey || e.metaKey || e.altKey) return;
      e.preventDefault();
      onShuffle(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onShuffle]);

  return (
    <button
      type="button"
      onClick={() => onShuffle(true)}
      aria-label={`Changer d'expérience. Actuelle : ${scene.label}`}
      aria-keyshortcuts="Control+S"
      title={`${scene.hint} · Ctrl+S`}
      className="chamfer group relative flex cursor-pointer items-center gap-2.5 bg-magenta/10 px-4 py-2.5 text-magenta ring-1 ring-magenta/60 ring-inset transition hover:bg-magenta hover:text-void hover:ring-magenta"
    >
      <Icon icon="ri:shuffle-line" className="size-5 transition-transform duration-300 group-hover:rotate-180 group-active:scale-90" />
      <span className="font-display text-sm font-semibold tracking-widest uppercase">Shuffle</span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-magenta/70 group-hover:text-void/70">{scene.kanji}</span>
    </button>
  );
}
