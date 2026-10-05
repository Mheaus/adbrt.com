import * as React from 'react';
import clsx from 'clsx';
import { HudLabel } from '~/components/hud';
import { BRUSHES } from './brushes';
import { hsvaToHex, rgbToHsv, type Hsva } from './color';
import ColorPicker from './color-picker';
import { AnimationDoc } from './document';
import { canExportVideo, exportFrame, exportSheet, exportVideo } from './export';
import type { Onion, Paper } from './render';
import Stage, { type Tool } from './stage';
import Timeline, { ToolButton } from './timeline';

const RECENT_LIMIT = 12;

// Shuffle unmounts the studio. The drawing stays in memory, so it comes back on the next visit during the same page load.
let session: AnimationDoc | null = null;

type SliderProps = { label: string; value: number; min: number; max: number; unit?: string; onChange: (value: number) => void };

const Slider = ({ label, value, min, max, unit = '', onChange }: SliderProps) => (
  <label className="flex flex-col gap-1">
    <span className="flex justify-between">
      <HudLabel>{label}</HudLabel>
      <HudLabel className="text-cyan tabular-nums">
        {value}
        {unit}
      </HudLabel>
    </span>
    <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-cyan" />
  </label>
);

const Studio = () => {
  const [doc] = React.useState(() => (session ??= new AnimationDoc()));
  const [, setVersion] = React.useState(0);
  const refresh = React.useCallback(() => setVersion(doc.version), [doc]);
  const [tool, setTool] = React.useState<Tool>('pen');
  const [color, setColor] = React.useState<Hsva>({ h: 189, s: 0.18, v: 1, a: 1 });
  const [recent, setRecent] = React.useState<string[]>([]);
  const [size, setSize] = React.useState(6);
  const [opacity, setOpacity] = React.useState(100);
  const [smoothing, setSmoothing] = React.useState(40);
  const [paper, setPaper] = React.useState<Paper>('dark');
  const [onion, setOnion] = React.useState<Onion>({ before: 1, after: 1 });
  const [onionOn, setOnionOn] = React.useState(true);
  const [fps, setFps] = React.useState(12);
  const [playing, setPlaying] = React.useState(false);
  const [playIndex, setPlayIndex] = React.useState(0);
  const [exporting, setExporting] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!playing) return;
    setPlayIndex(doc.current);
    const id = window.setInterval(() => setPlayIndex((i) => (i + 1) % doc.frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [playing, fps, doc]);

  const run = React.useCallback(
    (fn: () => void) => {
      fn();
      refresh();
    },
    [refresh],
  );

  const frameAction = React.useCallback(
    (action: 'add' | 'duplicate' | 'remove' | 'left' | 'right') =>
      run(() => {
        if (action === 'add' || action === 'duplicate') doc.addFrame(action === 'duplicate');
        if (action === 'remove') doc.removeFrame();
        if (action === 'left' || action === 'right') doc.moveFrame(action === 'left' ? -1 : 1);
      }),
    [doc, run],
  );

  const onCommit = React.useCallback(() => {
    const hex = hsvaToHex(color);
    setRecent((list) => [hex, ...list.filter((c) => c !== hex)].slice(0, RECENT_LIMIT));
    refresh();
  }, [color, refresh]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, [role="slider"]')) return;
      const mod = e.metaKey || e.ctrlKey;
      const k = e.key.toLowerCase();
      if (mod && k === 'z') {
        e.preventDefault();
        run(() => (e.shiftKey ? doc.redo() : doc.undo()));
      } else if (mod && k === 'y') {
        e.preventDefault();
        run(() => doc.redo());
      } else if (mod) return;
      else if (k === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (k === '[') setSize((s) => Math.max(1, s - (s > 20 ? 4 : 1)));
      else if (k === ']') setSize((s) => Math.min(120, s + (s >= 20 ? 4 : 1)));
      else if (k === ',' || k === 'arrowleft') run(() => doc.select(doc.current - 1));
      else if (k === '.' || k === 'arrowright') run(() => doc.select(doc.current + 1));
      else if (k === 'o') setOnionOn((o) => !o);
      else if (k === 'f') frameAction('add');
      else if (k === 'd') frameAction('duplicate');
      else if (k === 'g') setTool('fill');
      else if (k === 'k') setTool('picker');
      else {
        const brush = BRUSHES.find((b) => b.key === k);
        if (brush) setTool(brush.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doc, run, frameAction]);

  const doExport = async (kind: string, job: () => Promise<void>) => {
    setExporting(kind);
    try {
      await job();
    } finally {
      setExporting(null);
    }
  };

  const shownFrame = playing ? playIndex % doc.frames.length : doc.current;

  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-2 pt-16 sm:p-3 sm:pt-20 lg:pt-3">
      <div className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row">
        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border border-white/10 bg-gunmetal/80 p-1 lg:flex-col lg:overflow-visible">
          <HudLabel className="hidden px-1 py-2 text-magenta lg:block">原画</HudLabel>
          {BRUSHES.map((b) => (
            <ToolButton key={b.id} icon={b.icon} label={`${b.label} (${b.key.toUpperCase()})`} active={tool === b.id} onClick={() => setTool(b.id)} />
          ))}
          <ToolButton icon="ri:paint-fill" label="Pot de peinture (G)" active={tool === 'fill'} onClick={() => setTool('fill')} />
          <ToolButton icon="ri:sip-line" label="Pipette (K ou Alt + clic)" active={tool === 'picker'} onClick={() => setTool('picker')} />
          <span className="mx-1 h-6 w-px bg-white/10 lg:mx-0 lg:my-1 lg:h-px lg:w-6" />
          <ToolButton icon="ri:arrow-go-back-line" label="Annuler (Ctrl+Z)" disabled={!doc.canUndo} onClick={() => run(() => doc.undo())} />
          <ToolButton icon="ri:arrow-go-forward-line" label="Rétablir (Ctrl+Shift+Z)" disabled={!doc.canRedo} onClick={() => run(() => doc.redo())} />
          <ToolButton icon="ri:delete-bin-line" label="Effacer la frame" onClick={() => run(() => doc.clearFrame())} />
        </div>

        <div className="relative min-h-0 min-w-0 flex-1 border border-white/10">
          <Stage
            doc={doc}
            tool={tool}
            color={color}
            size={size}
            opacity={opacity / 100}
            smoothing={smoothing / 100}
            paper={paper}
            onion={onionOn ? onion : null}
            shownFrame={shownFrame}
            playing={playing}
            onCommit={onCommit}
            onPick={(rgb) => {
              setColor(rgbToHsv(rgb, color.a));
              setTool('pen');
            }}
          />
        </div>

        <div className="flex max-h-48 shrink-0 flex-col gap-4 overflow-y-auto border border-white/10 bg-gunmetal/80 p-3 lg:pt-16 lg:max-h-none lg:w-60">
          <ColorPicker color={color} recent={recent} onChange={setColor} />
          <Slider label="Taille" value={size} min={1} max={120} unit="px" onChange={setSize} />
          <Slider label="Opacité" value={opacity} min={1} max={100} unit="%" onChange={setOpacity} />
          <Slider label="Lissage" value={smoothing} min={0} max={90} unit="%" onChange={setSmoothing} />
          <div className="flex flex-col gap-1.5">
            <HudLabel>Papier</HudLabel>
            <div className="flex gap-1">
              {(['dark', 'light'] as Paper[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPaper(p)}
                  className={clsx(
                    'flex-1 cursor-pointer py-1 font-mono text-[10px] tracking-[0.2em] uppercase ring-1 transition',
                    paper === p ? 'text-void bg-cyan ring-cyan' : 'text-ice/70 ring-white/10 hover:text-cyan',
                  )}
                >
                  {p === 'dark' ? 'Sombre' : 'Clair'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <HudLabel>Exporter</HudLabel>
            <div className="flex gap-1">
              <ToolButton icon="ri:image-line" label="Frame en PNG" disabled={!!exporting} onClick={() => doExport('png', () => exportFrame(doc, paper))} />
              <ToolButton icon="ri:grid-line" label="Planche de toutes les frames en PNG" disabled={!!exporting} onClick={() => doExport('sheet', () => exportSheet(doc, paper))} />
              {canExportVideo() && <ToolButton icon="ri:film-line" label="Animation en vidéo WebM" disabled={!!exporting} onClick={() => doExport('video', () => exportVideo(doc, paper, fps))} />}
            </div>
            {exporting === 'video' && <HudLabel className="animate-blink text-cyan">Enregistrement…</HudLabel>}
          </div>
        </div>
      </div>

      <Timeline
        doc={doc}
        shownFrame={shownFrame}
        paper={paper}
        playing={playing}
        fps={fps}
        onion={onion}
        onionOn={onionOn}
        onSelect={(i) => {
          setPlaying(false);
          run(() => doc.select(i));
        }}
        onAction={frameAction}
        onPlay={() => setPlaying((p) => !p)}
        onFps={setFps}
        onOnion={setOnion}
        onOnionToggle={() => setOnionOn((o) => !o)}
      />
    </div>
  );
};

export default Studio;
