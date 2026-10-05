import * as React from 'react';
import clsx from 'clsx';
import Icon from '~/components/icon';
import { HudLabel } from '~/components/hud';
import { DOC_HEIGHT, DOC_WIDTH, type AnimationDoc } from './document';
import { PAPERS, type Onion, type Paper } from './render';

const THUMB_WIDTH = 96;
const THUMB_HEIGHT = Math.round((THUMB_WIDTH * DOC_HEIGHT) / DOC_WIDTH);

type ThumbProps = { frame: HTMLCanvasElement; version: number; paper: Paper };

const Thumb = ({ frame, version, paper }: ThumbProps) => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = PAPERS[paper];
    ctx.fillRect(0, 0, THUMB_WIDTH, THUMB_HEIGHT);
    ctx.drawImage(frame, 0, 0, THUMB_WIDTH, THUMB_HEIGHT);
  }, [frame, version, paper]);
  return <canvas ref={ref} width={THUMB_WIDTH} height={THUMB_HEIGHT} className="block h-[54px] w-24" />;
};

type ToolButtonProps = { icon: string; label: string; onClick: () => void; active?: boolean; disabled?: boolean };

export const ToolButton = ({ icon, label, onClick, active, disabled }: ToolButtonProps) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      'flex size-9 shrink-0 cursor-pointer items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-30',
      active ? 'bg-cyan text-void' : 'text-ice/80 hover:bg-white/10 hover:text-cyan',
    )}
  >
    <Icon icon={icon} className="size-5" />
  </button>
);

type StepperProps = { label: string; value: number; min: number; max: number; onChange: (value: number) => void; suffix?: string };

const Stepper = ({ label, value, min, max, onChange, suffix = '' }: StepperProps) => (
  <div className="flex items-center gap-1.5">
    <HudLabel>{label}</HudLabel>
    <button type="button" aria-label={`${label} moins`} onClick={() => onChange(Math.max(min, value - 1))} className="cursor-pointer px-1 font-mono text-sm text-ice/70 hover:text-cyan">
      −
    </button>
    <span className="w-8 text-center font-mono text-xs text-cyan tabular-nums">
      {value}
      {suffix}
    </span>
    <button type="button" aria-label={`${label} plus`} onClick={() => onChange(Math.min(max, value + 1))} className="cursor-pointer px-1 font-mono text-sm text-ice/70 hover:text-cyan">
      +
    </button>
  </div>
);

type TimelineProps = {
  doc: AnimationDoc;
  shownFrame: number;
  paper: Paper;
  playing: boolean;
  fps: number;
  onion: Onion;
  onionOn: boolean;
  onSelect: (index: number) => void;
  onAction: (action: 'add' | 'duplicate' | 'remove' | 'left' | 'right') => void;
  onPlay: () => void;
  onFps: (fps: number) => void;
  onOnion: (onion: Onion) => void;
  onOnionToggle: () => void;
};

const Timeline = ({ doc, shownFrame, paper, playing, fps, onion, onionOn, onSelect, onAction, onPlay, onFps, onOnion, onOnionToggle }: TimelineProps) => {
  const strip = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-frame="${shownFrame}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [shownFrame]);

  return (
    <div className="flex flex-col gap-2 border border-white/10 bg-gunmetal/80 p-2 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="flex items-center">
          <ToolButton icon={playing ? 'ri:pause-fill' : 'ri:play-fill'} label={playing ? 'Pause (Espace)' : 'Lecture (Espace)'} onClick={onPlay} active={playing} />
          <ToolButton icon="ri:add-line" label="Nouvelle frame (F)" onClick={() => onAction('add')} disabled={playing} />
          <ToolButton icon="ri:file-copy-line" label="Dupliquer la frame (D)" onClick={() => onAction('duplicate')} disabled={playing} />
          <ToolButton icon="ri:skip-back-line" label="Déplacer à gauche" onClick={() => onAction('left')} disabled={playing || doc.current === 0} />
          <ToolButton icon="ri:skip-forward-line" label="Déplacer à droite" onClick={() => onAction('right')} disabled={playing || doc.current === doc.frames.length - 1} />
          <ToolButton icon="ri:delete-bin-line" label="Supprimer la frame" onClick={() => onAction('remove')} disabled={playing || doc.frames.length === 1} />
        </div>
        <Stepper label="FPS" value={fps} min={1} max={24} onChange={onFps} />
        <div className="flex items-center gap-2">
          <ToolButton icon="ri:stack-line" label="Pelure d'oignon (O)" onClick={onOnionToggle} active={onionOn} />
          <Stepper label="Avant" value={onion.before} min={0} max={3} onChange={(before) => onOnion({ ...onion, before })} />
          <Stepper label="Après" value={onion.after} min={0} max={3} onChange={(after) => onOnion({ ...onion, after })} />
        </div>
        <HudLabel className="ml-auto tabular-nums">
          Frame {shownFrame + 1} / {doc.frames.length}
        </HudLabel>
      </div>
      <div ref={strip} className="flex gap-1.5 overflow-x-auto pb-1">
        {doc.frames.map((frame, i) => (
          <button
            key={i}
            data-frame={i}
            type="button"
            aria-label={`Frame ${i + 1}`}
            aria-current={i === shownFrame}
            onClick={() => onSelect(i)}
            className={clsx('relative shrink-0 cursor-pointer ring-1 transition', i === shownFrame ? 'ring-2 ring-cyan' : 'ring-white/15 hover:ring-white/40')}
          >
            <Thumb frame={frame} version={doc.frameVersion(frame)} paper={paper} />
            <span className="absolute bottom-0.5 left-1 font-mono text-[9px] text-dim">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
