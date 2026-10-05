import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { HudLabel } from '~/components/hud';
import { palette } from '~/scenes/canvas-scene';

const DENSITY = 0.17;
const DRAG_THRESHOLD = 6;
const LONG_PRESS_MS = 380;
const FLOOD_LIMIT = 20_000;
const NUMBER_COLORS = ['', palette.cyan, palette.ice, palette.magenta, palette.amber, palette.magenta, palette.cyan, palette.ice, palette.amber];

const key = (x: number, y: number) => `${x},${y}`;

/** Returns a stable pseudo-random value in [0, 1) for a cell, so the infinite board needs no storage. */
function hash(x: number, y: number, seed: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

interface Game {
  seed: number;
  safe: { x: number; y: number } | null;
  open: Set<string>;
  flags: Set<string>;
  exploded: string | null;
}

const newGame = (): Game => ({ seed: (Math.random() * 2 ** 31) | 0, safe: null, open: new Set(), flags: new Set(), exploded: null });

function isMine(g: Game, x: number, y: number) {
  if (g.safe && Math.abs(x - g.safe.x) <= 1 && Math.abs(y - g.safe.y) <= 1) return false;
  return hash(x, y, g.seed) < DENSITY;
}

const NEIGHBOURS = [-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => [dx, dy])).filter(([dx, dy]) => dx || dy);

function near(g: Game, x: number, y: number) {
  return NEIGHBOURS.filter(([dx, dy]) => isMine(g, x + dx, y + dy)).length;
}

function flood(g: Game, sx: number, sy: number) {
  const stack = [[sx, sy]];
  let budget = FLOOD_LIMIT;
  while (stack.length && budget-- > 0) {
    const [x, y] = stack.pop()!;
    const k = key(x, y);
    if (g.open.has(k) || g.flags.has(k)) continue;
    if (isMine(g, x, y)) {
      g.exploded = k;
      return;
    }
    g.open.add(k);
    if (near(g, x, y) === 0) for (const [dx, dy] of NEIGHBOURS) stack.push([x + dx, y + dy]);
  }
}

function reveal(g: Game, x: number, y: number) {
  if (g.exploded) return;
  if (!g.safe) g.safe = { x, y };
  const k = key(x, y);
  if (g.flags.has(k)) return;
  if (g.open.has(k)) {
    const count = near(g, x, y);
    const flagged = NEIGHBOURS.filter(([dx, dy]) => g.flags.has(key(x + dx, y + dy))).length;
    if (count > 0 && flagged === count) for (const [dx, dy] of NEIGHBOURS) flood(g, x + dx, y + dy);
    return;
  }
  flood(g, x, y);
}

function toggleFlag(g: Game, x: number, y: number) {
  const k = key(x, y);
  if (g.exploded || g.open.has(k)) return;
  if (g.flags.has(k)) g.flags.delete(k);
  else g.flags.add(k);
}

function draw(ctx: CanvasRenderingContext2D, g: Game, w: number, h: number, cam: { x: number; y: number }, cell: number) {
  ctx.fillStyle = palette.void;
  ctx.fillRect(0, 0, w, h);
  const x0 = Math.floor(cam.x / cell);
  const y0 = Math.floor(cam.y / cell);
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(cell * 0.5)}px ui-monospace, Menlo, monospace`;

  for (let j = 0; j < rows; j += 1)
    for (let i = 0; i < cols; i += 1) {
      const x = x0 + i;
      const y = y0 + j;
      const px = x * cell - cam.x;
      const py = y * cell - cam.y;
      const k = key(x, y);
      if (g.open.has(k)) {
        ctx.fillStyle = '#14171b';
        ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
        const n = near(g, x, y);
        if (n) {
          ctx.fillStyle = NUMBER_COLORS[n];
          ctx.fillText(String(n), px + cell / 2, py + cell / 2 + 1);
        }
        continue;
      }
      ctx.fillStyle = k === g.exploded ? palette.magenta : '#2b3038';
      ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
      ctx.fillStyle = 'rgb(255 255 255 / 0.06)';
      ctx.fillRect(px + 1, py + 1, cell - 2, 2);
      if (g.exploded && isMine(g, x, y)) {
        ctx.fillStyle = k === g.exploded ? palette.void : palette.magenta;
        ctx.fillText('✸', px + cell / 2, py + cell / 2 + 1);
      } else if (g.flags.has(k)) {
        ctx.fillStyle = palette.amber;
        ctx.fillText('▲', px + cell / 2, py + cell / 2 + 1);
      }
    }
}

interface Press {
  id: number;
  x: number;
  y: number;
  camX: number;
  camY: number;
  button: number;
  dragging: boolean;
  flagged: boolean;
  timer: number;
}

export default function Mines() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(newGame());
  const recenter = useRef<() => void>(() => {});
  const [stats, setStats] = useState({ open: 0, flags: 0, lost: false, x: 0, y: 0 });

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const cell = window.matchMedia('(pointer: coarse)').matches ? 34 : 30;
    const cam = { x: 0, y: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let press: Press | null = null;

    const paint = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const g = game.current;
        draw(ctx, g, w, h, cam, cell);
        setStats({ open: g.open.size, flags: g.flags.size, lost: !!g.exploded, x: Math.round((cam.x + w / 2) / cell), y: Math.round((cam.y + h / 2) / cell) });
      });
    };
    recenter.current = () => {
      cam.x = -w / 2;
      cam.y = -h / 2;
      paint();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const first = w === 0;
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) recenter.current();
      else paint();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    const cellAt = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      return [Math.floor((cx - r.left + cam.x) / cell), Math.floor((cy - r.top + cam.y) / cell)] as const;
    };

    const onDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      const current: Press = { id: e.pointerId, x: e.clientX, y: e.clientY, camX: cam.x, camY: cam.y, button: e.button, dragging: false, flagged: false, timer: 0 };
      if (e.pointerType === 'touch') {
        current.timer = window.setTimeout(() => {
          current.flagged = true;
          toggleFlag(game.current, ...cellAt(current.x, current.y));
          paint();
        }, LONG_PRESS_MS);
      }
      press = current;
    };
    const onMove = (e: PointerEvent) => {
      if (!press || e.pointerId !== press.id) return;
      const dx = e.clientX - press.x;
      const dy = e.clientY - press.y;
      if (!press.dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        press.dragging = true;
        clearTimeout(press.timer);
        el.style.cursor = 'grabbing';
      }
      if (!press.dragging) return;
      cam.x = press.camX - dx;
      cam.y = press.camY - dy;
      paint();
    };
    const onUp = (e: PointerEvent) => {
      if (!press || e.pointerId !== press.id) return;
      clearTimeout(press.timer);
      el.style.cursor = '';
      if (!press.dragging && !press.flagged) {
        const [x, y] = cellAt(e.clientX, e.clientY);
        if (press.button === 2) toggleFlag(game.current, x, y);
        else reveal(game.current, x, y);
        paint();
      }
      press = null;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cam.x += e.deltaX;
      cam.y += e.deltaY;
      paint();
    };
    const onContext = (e: Event) => e.preventDefault();

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('contextmenu', onContext);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('contextmenu', onContext);
    };
  }, []);

  const reset = () => {
    game.current = newGame();
    recenter.current();
  };

  return (
    <div className="absolute inset-0">
      <canvas ref={canvas} aria-label="Champ de mines infini" className="absolute inset-0 h-full w-full cursor-grab touch-none" />
      <div className="pointer-events-none absolute inset-x-0 top-36 flex justify-center sm:top-5">
        <div className="pointer-events-auto flex items-center gap-4 bg-gunmetal/90 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
          <HudLabel className="text-cyan tabular-nums">Cases {String(stats.open).padStart(4, '0')}</HudLabel>
          <HudLabel className="text-amber tabular-nums">▲ {stats.flags}</HudLabel>
          <button
            type="button"
            onClick={reset}
            className={clsx(
              'cursor-pointer px-3 py-1 font-display text-xs font-bold tracking-widest uppercase ring-1 transition',
              stats.lost ? 'text-magenta ring-magenta hover:bg-magenta hover:text-void' : 'text-cyan ring-cyan/60 hover:bg-cyan hover:text-void',
            )}
          >
            {stats.lost ? 'KIA · Rejouer' : 'Reset'}
          </button>
          <HudLabel className="hidden tabular-nums sm:inline">
            X {stats.x} · Y {stats.y}
          </HudLabel>
        </div>
      </div>
    </div>
  );
}
