import * as React from 'react';
import clsx from 'clsx';
import { HudLabel } from '~/components/hud';
import { hexToRgb, hsvaToCss, hsvaToHex, rgbToHsv, type Hsva } from './color';

const SWATCHES = ['#d1f7ff', '#05d9e8', '#ff2a6d', '#ffb000', '#6ff7a8', '#5b8cff', '#ffffff', '#9aa3ad', '#5b6371', '#23272e', '#14171b', '#000000'];
const CHECKER = 'repeating-conic-gradient(#3a3f47 0% 25%, #23272e 0% 50%) 50% / 10px 10px';

type DragAreaProps = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onMove: (x: number, y: number) => void;
  onKey: (dx: number, dy: number) => void;
  children?: React.ReactNode;
};

/** Reports the pointer position inside the area as fractions in [0, 1], while the button stays down. */
const DragArea = ({ label, className, style, onMove, onKey, children }: DragAreaProps) => {
  const report = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onMove(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  };
  return (
    <div
      role="slider"
      aria-label={label}
      tabIndex={0}
      className={clsx('relative cursor-crosshair touch-none', className)}
      style={style}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        report(e);
      }}
      onPointerMove={(e) => e.buttons && report(e)}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 0.1 : 0.02;
        const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        if (!moves[e.key]) return;
        e.preventDefault();
        onKey(...moves[e.key]);
      }}
    >
      {children}
    </div>
  );
};

type ColorPickerProps = {
  color: Hsva;
  recent: string[];
  onChange: (color: Hsva) => void;
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

const ColorPicker = ({ color, recent, onChange }: ColorPickerProps) => {
  const hex = hsvaToHex(color);
  const [draft, setDraft] = React.useState(hex);
  React.useEffect(() => setDraft(hex), [hex]);
  const pickHex = (value: string) => {
    const rgb = hexToRgb(value);
    if (rgb) onChange(rgbToHsv(rgb, color.a));
  };

  return (
    <div className="flex flex-col gap-3">
      <DragArea
        label="Saturation et luminosité"
        className="aspect-square w-full rounded-sm"
        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${color.h} 100% 50%))` }}
        onMove={(x, y) => onChange({ ...color, s: x, v: 1 - y })}
        onKey={(dx, dy) => onChange({ ...color, s: clamp(color.s + dx), v: clamp(color.v - dy) })}
      >
        <span
          className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white shadow-[0_0_0_1px_black]"
          style={{ left: `${color.s * 100}%`, top: `${(1 - color.v) * 100}%` }}
        />
      </DragArea>
      <DragArea
        label="Teinte"
        className="h-3 w-full rounded-sm"
        style={{ background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}
        onMove={(x) => onChange({ ...color, h: x * 360 })}
        onKey={(dx) => onChange({ ...color, h: (color.h + dx * 360 + 360) % 360 })}
      >
        <span className="pointer-events-none absolute inset-y-[-3px] w-1.5 -translate-x-1/2 rounded-sm bg-white shadow-[0_0_0_1px_black]" style={{ left: `${(color.h / 360) * 100}%` }} />
      </DragArea>
      <DragArea
        label="Opacité de la couleur"
        className="h-3 w-full rounded-sm"
        style={{ background: CHECKER }}
        onMove={(x) => onChange({ ...color, a: x })}
        onKey={(dx) => onChange({ ...color, a: clamp(color.a + dx) })}
      >
        <span className="absolute inset-0 rounded-sm" style={{ background: `linear-gradient(to right, transparent, ${hex})` }} />
        <span className="pointer-events-none absolute inset-y-[-3px] w-1.5 -translate-x-1/2 rounded-sm bg-white shadow-[0_0_0_1px_black]" style={{ left: `${color.a * 100}%` }} />
      </DragArea>
      <div className="flex items-center gap-2">
        <span className="size-8 shrink-0 rounded-sm ring-1 ring-white/20" style={{ background: CHECKER }}>
          <span className="block size-full rounded-sm" style={{ background: hsvaToCss(color) }} />
        </span>
        <input
          aria-label="Couleur en hexadécimal"
          value={draft}
          spellCheck={false}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => pickHex(draft)}
          onKeyDown={(e) => e.key === 'Enter' && pickHex(draft)}
          className="w-full bg-void px-2 py-1 font-mono text-xs text-ice uppercase ring-1 ring-white/10 outline-none focus:ring-cyan"
        />
        <HudLabel className="shrink-0 tabular-nums">{Math.round(color.a * 100)}%</HudLabel>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {SWATCHES.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`Couleur ${s}`}
            onClick={() => pickHex(s)}
            className="aspect-square cursor-pointer rounded-sm ring-1 ring-white/15 hover:ring-cyan"
            style={{ background: s }}
          />
        ))}
      </div>
      {recent.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <HudLabel>Récentes</HudLabel>
          <div className="grid grid-cols-6 gap-1.5">
            {recent.map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`Couleur récente ${s}`}
                onClick={() => pickHex(s)}
                className="aspect-square cursor-pointer rounded-sm ring-1 ring-white/15 hover:ring-cyan"
                style={{ background: s }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
