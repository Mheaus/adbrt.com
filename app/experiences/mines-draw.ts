import { palette } from '~/scenes/canvas-scene';
import { isMine, key, near, type Game } from './mines-logic';

const NUMBER_COLORS = ['', palette.cyan, palette.ice, palette.magenta, palette.amber, palette.magenta, palette.cyan, palette.ice, palette.amber];
const CLOSED = '#2b3038';
const OPEN = '#14171b';

export const TIMING = {
  revealStepMs: 16,
  revealMaxDelayMs: 700,
  revealMs: 220,
  flagMs: 200,
  denyMs: 320,
  rippleMs: 380,
  mineWaveStepMs: 28,
  shakeMs: 350,
};

export type Ripple = { x: number; y: number; start: number; color: string };

export type Effects = {
  reveal: Map<string, number>;
  flags: Map<string, number>;
  deny: Map<string, number>;
  ripples: Ripple[];
  explodedAt: number;
  pressed: Set<string>;
  hover: string | null;
  reducedMotion: boolean;
};

export const newEffects = (reducedMotion: boolean): Effects => ({ reveal: new Map(), flags: new Map(), deny: new Map(), ripples: [], explodedAt: 0, pressed: new Set(), hover: null, reducedMotion });

const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Returns true while an effect still changes the picture, so the caller keeps the animation loop running. */
export const animating = (fx: Effects, now: number) => {
  if (fx.reducedMotion) return false;
  const busy = (map: Map<string, number>, ms: number) => {
    let any = false;
    for (const [k, start] of map) {
      if (now - start > ms) map.delete(k);
      else any = true;
    }
    return any;
  };
  fx.ripples = fx.ripples.filter((r) => now - r.start < TIMING.rippleMs);
  const reveal = busy(fx.reveal, TIMING.revealMs);
  const flags = busy(fx.flags, TIMING.flagMs);
  const deny = busy(fx.deny, TIMING.denyMs);
  const wave = fx.explodedAt > 0 && now - fx.explodedAt < 2000;
  return reveal || flags || deny || wave || fx.ripples.length > 0;
};

type Camera = { x: number; y: number };

export const draw = (ctx: CanvasRenderingContext2D, g: Game, fx: Effects, w: number, h: number, cam: Camera, cell: number, now: number) => {
  ctx.save();
  ctx.fillStyle = palette.void;
  ctx.fillRect(0, 0, w, h);
  const shake = fx.reducedMotion ? 0 : clamp01(1 - (now - fx.explodedAt) / TIMING.shakeMs) * 6;
  if (fx.explodedAt && shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

  const x0 = Math.floor(cam.x / cell);
  const y0 = Math.floor(cam.y / cell);
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const font = (scale: number) => `bold ${Math.round(cell * 0.5 * scale)}px ui-monospace, Menlo, monospace`;
  ctx.font = font(1);

  const closedTile = (px: number, py: number, k: string, scale = 1, alpha = 1) => {
    const inset = 1 + ((1 - scale) * cell) / 2;
    const pressed = fx.pressed.has(k);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = pressed ? '#1d2127' : fx.hover === k ? '#353b45' : CLOSED;
    ctx.fillRect(px + inset, py + inset, cell - inset * 2, cell - inset * 2);
    if (!pressed) {
      ctx.fillStyle = 'rgb(255 255 255 / 0.06)';
      ctx.fillRect(px + inset, py + inset, cell - inset * 2, 2);
    }
    ctx.globalAlpha = 1;
  };

  for (let j = 0; j < rows; j += 1)
    for (let i = 0; i < cols; i += 1) {
      const x = x0 + i;
      const y = y0 + j;
      const px = x * cell - cam.x;
      const py = y * cell - cam.y;
      const k = key(x, y);

      if (g.open.has(k)) {
        const start = fx.reveal.get(k);
        if (start !== undefined && now < start) {
          closedTile(px, py, k);
          continue;
        }
        const t = start === undefined ? 1 : clamp01((now - start) / TIMING.revealMs);
        ctx.fillStyle = OPEN;
        ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
        const n = near(g, x, y);
        if (n) {
          const pop = start === undefined ? 1 : easeOutBack(t);
          ctx.globalAlpha = t;
          ctx.fillStyle = NUMBER_COLORS[n];
          ctx.font = font(pop);
          ctx.fillText(String(n), px + cell / 2, py + cell / 2 + 1);
          ctx.font = font(1);
          ctx.globalAlpha = 1;
        }
        if (t < 1) {
          closedTile(px, py, k, 1 - t, 1 - t);
          ctx.strokeStyle = `rgb(5 217 232 / ${0.7 * (1 - t)})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px + 1.5, py + 1.5, cell - 3, cell - 3);
        }
      } else {
        const exploded = g.exploded && g.exploded.x === x && g.exploded.y === y;
        if (exploded) {
          ctx.fillStyle = palette.magenta;
          ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
        } else closedTile(px, py, k);

        if (g.exploded && isMine(g, x, y)) {
          const delay = Math.hypot(x - g.exploded.x, y - g.exploded.y) * TIMING.mineWaveStepMs;
          const t = fx.reducedMotion ? 1 : clamp01((now - fx.explodedAt - delay) / 180);
          if (t > 0) {
            ctx.globalAlpha = t;
            ctx.fillStyle = exploded ? palette.void : palette.magenta;
            ctx.font = font(easeOutBack(t));
            ctx.fillText('✸', px + cell / 2, py + cell / 2 + 1);
            ctx.font = font(1);
            ctx.globalAlpha = 1;
          }
        } else if (g.flags.has(k)) {
          const start = fx.flags.get(k);
          const t = start === undefined ? 1 : clamp01((now - start) / TIMING.flagMs);
          ctx.fillStyle = palette.amber;
          const settle = 1 - (1 - t) ** 3;
          ctx.font = font(1 + 0.6 * (1 - settle));
          ctx.fillText('▲', px + cell / 2, py + cell / 2 + 1 - (1 - settle) * 6);
          ctx.font = font(1);
        }
      }

      const denied = fx.deny.get(k);
      if (denied !== undefined) {
        const t = clamp01((now - denied) / TIMING.denyMs);
        ctx.strokeStyle = `rgb(255 42 109 / ${(1 - t) * (Math.sin(t * Math.PI * 4) * 0.5 + 0.5)})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 2, py + 2, cell - 4, cell - 4);
      }
    }

  for (const r of fx.ripples) {
    const t = clamp01((now - r.start) / TIMING.rippleMs);
    ctx.strokeStyle = r.color;
    ctx.globalAlpha = 1 - t;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(r.x - cam.x, r.y - cam.y, cell * (0.4 + t * 1.4), 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};
