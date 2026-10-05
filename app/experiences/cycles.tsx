import * as React from 'react';
import { HudLabel } from '~/components/hud';
import { palette } from '~/scenes/canvas-scene';
import TouchPad from './touch-pad';

const STEP_MS = 55;
const FADE_MS = 600;
const FLOOD_CAP = 450;
const SWIPE_PX = 24;

type Dir = 'up' | 'down' | 'left' | 'right';
const VECTORS: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const TURNS: Record<Dir, Dir[]> = { up: ['up', 'left', 'right'], down: ['down', 'right', 'left'], left: ['left', 'down', 'up'], right: ['right', 'up', 'down'] };

type Point = { x: number; y: number };
type Rider = Point & { dir: Dir; color: string; alive: boolean; diedAt: number; bot: boolean; path: Point[] };
type Spark = Point & { vx: number; vy: number; life: number; color: string };
type Phase = 'title' | 'play' | 'won' | 'lost';

type Game = {
  cols: number;
  rows: number;
  grid: Int8Array;
  riders: Rider[];
  queue: Dir[];
  sparks: Spark[];
  phase: Phase;
  wins: number;
  losses: number;
};

/** The arena keeps the size of the screen at the start of a round. A resize scales the picture, not the grid. */
const newRound = (g: Game, cols: number, rows: number) => {
  g.cols = Math.max(30, cols);
  g.rows = Math.max(20, rows);
  g.grid = new Int8Array(g.cols * g.rows).fill(-1);
  const midX = Math.floor(g.cols / 2);
  const midY = Math.floor(g.rows / 2);
  const starts: Omit<Rider, 'alive' | 'diedAt' | 'path'>[] = [
    { x: Math.floor(g.cols * 0.15), y: midY, dir: 'right', color: palette.cyan, bot: false },
    { x: Math.floor(g.cols * 0.85), y: midY, dir: 'left', color: palette.magenta, bot: true },
    { x: midX, y: Math.floor(g.rows * 0.15), dir: 'down', color: palette.amber, bot: true },
    { x: midX, y: Math.floor(g.rows * 0.85), dir: 'up', color: '#6ff7a8', bot: true },
  ];
  g.riders = starts.map((r) => ({ ...r, alive: true, diedAt: 0, path: [{ x: r.x, y: r.y }] }));
  g.riders.forEach((r, i) => (g.grid[r.y * g.cols + r.x] = i));
  g.queue = [];
  g.sparks = [];
};

const inside = (g: Game, x: number, y: number) => x >= 0 && y >= 0 && x < g.cols && y < g.rows;
const free = (g: Game, x: number, y: number) => inside(g, x, y) && g.grid[y * g.cols + x] === -1;

/** Counts the free cells that a rider can reach from (x, y), up to a cap. Bots use it to avoid dead ends. */
const freeSpace = (g: Game, x: number, y: number) => {
  if (!free(g, x, y)) return 0;
  const seen = new Set([y * g.cols + x]);
  const stack = [[x, y]];
  while (stack.length && seen.size < FLOOD_CAP) {
    const [cx, cy] = stack.pop()!;
    for (const [dx, dy] of Object.values(VECTORS)) {
      const k = (cy + dy) * g.cols + cx + dx;
      if (free(g, cx + dx, cy + dy) && !seen.has(k)) {
        seen.add(k);
        stack.push([cx + dx, cy + dy]);
      }
    }
  }
  return seen.size;
};

const steer = (g: Game, bot: Rider) => {
  const player = g.riders[0];
  let best: { dir: Dir; score: number } | null = null;
  for (const dir of TURNS[bot.dir]) {
    const [dx, dy] = VECTORS[dir];
    const space = freeSpace(g, bot.x + dx, bot.y + dy);
    if (!space) continue;
    const aimX = player.x + VECTORS[player.dir][0] * 6;
    const aimY = player.y + VECTORS[player.dir][1] * 6;
    const chase = player.alive ? -Math.hypot(aimX - bot.x - dx, aimY - bot.y - dy) * 0.6 : 0;
    const score = space + chase + (dir === bot.dir ? 4 : 0) + Math.random() * 6;
    if (!best || score > best.score) best = { dir, score };
  }
  if (best) bot.dir = best.dir;
};

const derez = (g: Game, rider: Rider, now: number) => {
  rider.alive = false;
  rider.diedAt = now;
  for (let i = 0; i < 30; i += 1) {
    const a = Math.random() * Math.PI * 2;
    const v = 4 + Math.random() * 18;
    g.sparks.push({ x: rider.x + 0.5, y: rider.y + 0.5, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, color: rider.color });
  }
};

const step = (g: Game, now: number) => {
  const player = g.riders[0];
  while (g.queue.length) {
    const next = g.queue.shift()!;
    if (next !== player.dir && next !== OPPOSITE[player.dir]) {
      player.dir = next;
      break;
    }
  }
  g.riders.forEach((r) => r.alive && r.bot && steer(g, r));

  const targets = g.riders.map((r) => (r.alive ? { x: r.x + VECTORS[r.dir][0], y: r.y + VECTORS[r.dir][1] } : null));
  g.riders.forEach((r, i) => {
    const t = targets[i];
    if (!t) return;
    const headOn = targets.some((o, j) => j !== i && o && o.x === t.x && o.y === t.y);
    if (!free(g, t.x, t.y) || headOn) derez(g, r, now);
  });
  g.riders.forEach((r, i) => {
    const t = targets[i];
    if (!t || !r.alive) return;
    r.x = t.x;
    r.y = t.y;
    r.path.push(t);
    g.grid[t.y * g.cols + t.x] = i;
  });

  if (!player.alive) {
    g.phase = 'lost';
    g.losses += 1;
  } else if (g.riders.every((r) => !r.bot || !r.alive)) {
    g.phase = 'won';
    g.wins += 1;
  }
};

const clearTrail = (g: Game, index: number) => {
  for (let k = 0; k < g.grid.length; k += 1) if (g.grid[k] === index) g.grid[k] = -1;
  g.riders[index].path = [];
};

const draw = (ctx: CanvasRenderingContext2D, g: Game, w: number, h: number, now: number) => {
  const sx = w / g.cols;
  const sy = h / g.rows;
  const px = (x: number) => (x + 0.5) * sx;
  const py = (y: number) => (y + 0.5) * sy;

  ctx.fillStyle = '#0b0d10';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgb(5 217 232 / 0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= g.cols; x += 6) {
    ctx.moveTo(Math.round(x * sx) + 0.5, 0);
    ctx.lineTo(Math.round(x * sx) + 0.5, h);
  }
  for (let y = 0; y <= g.rows; y += 6) {
    ctx.moveTo(0, Math.round(y * sy) + 0.5);
    ctx.lineTo(w, Math.round(y * sy) + 0.5);
  }
  ctx.stroke();

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const r of g.riders) {
    if (r.path.length < 2) continue;
    const fade = r.alive ? 1 : Math.max(0, 1 - (now - r.diedAt) / FADE_MS);
    if (!fade) continue;
    ctx.beginPath();
    ctx.moveTo(px(r.path[0].x), py(r.path[0].y));
    for (const p of r.path) ctx.lineTo(px(p.x), py(p.y));
    ctx.strokeStyle = r.color;
    ctx.globalAlpha = fade * 0.35;
    ctx.lineWidth = sx * 0.9;
    ctx.shadowColor = r.color;
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = fade;
    ctx.lineWidth = Math.max(2, sx * 0.3);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  for (const r of g.riders) {
    if (!r.alive) continue;
    ctx.shadowColor = r.color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px(r.x), py(r.y), Math.max(3, sx * 0.45), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  for (const s of g.sparks) {
    ctx.globalAlpha = s.life;
    ctx.fillStyle = s.color;
    ctx.fillRect(s.x * sx, s.y * sy, 3, 3);
  }
  ctx.globalAlpha = 1;

  const banner = (title: string, color: string, sub: string) => {
    ctx.fillStyle = 'rgb(11 13 16 / 0.6)';
    ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.font = `bold ${Math.round(Math.min(64, w / 10))}px 'Chakra Petch', sans-serif`;
    ctx.fillText(title, w / 2, h / 2 - 10);
    ctx.fillStyle = palette.ice;
    ctx.font = '13px ui-monospace, Menlo, monospace';
    ctx.fillText(sub, w / 2, h / 2 + 26);
    ctx.textAlign = 'left';
  };
  if (g.phase === 'title') banner('NEON CYCLES', palette.cyan, 'ENTRÉE POUR LANCER LA MANCHE');
  if (g.phase === 'won') banner('VICTOIRE', palette.amber, 'ENTRÉE POUR LA MANCHE SUIVANTE');
  if (g.phase === 'lost') banner('DEREZZED', palette.magenta, 'ENTRÉE POUR REJOUER');
};

const KEYS: Record<string, Dir> = { arrowup: 'up', arrowdown: 'down', arrowleft: 'left', arrowright: 'right', w: 'up', z: 'up', s: 'down', a: 'left', q: 'left', d: 'right' };

const Cycles = () => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const game = React.useRef<Game>({ cols: 0, rows: 0, grid: new Int8Array(0), riders: [], queue: [], sparks: [], phase: 'title', wins: 0, losses: 0 });
  const startRef = React.useRef<() => void>(() => {});
  const [score, setScore] = React.useState({ wins: 0, losses: 0 });

  const turn = React.useCallback((dir: Dir) => {
    const g = game.current;
    if (g.phase === 'play' && g.queue.length < 2) g.queue.push(dir);
  }, []);

  React.useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const g = game.current;
    const cellPx = window.matchMedia('(pointer: coarse)').matches ? 9 : 11;
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (g.phase !== 'play') newRound(g, Math.floor(w / cellPx), Math.floor(h / cellPx));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    startRef.current = () => {
      if (g.phase === 'play') return;
      newRound(g, Math.floor(w / cellPx), Math.floor(h / cellPx));
      g.phase = 'play';
    };

    let raf = 0;
    let last = performance.now();
    let clock = 0;
    const loop = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      if (g.phase === 'play' && !document.hidden) {
        clock += dt;
        while (clock >= STEP_MS && g.phase === 'play') {
          clock -= STEP_MS;
          step(g, now);
        }
      }
      g.riders.forEach((r, i) => {
        if (r.alive || !r.diedAt || now - r.diedAt <= FADE_MS) return;
        clearTrail(g, i);
        r.diedAt = 0;
      });
      g.sparks = g.sparks.filter((s) => {
        s.x += (s.vx * dt) / 1000;
        s.y += (s.vy * dt) / 1000;
        s.life -= dt / 700;
        return s.life > 0;
      });
      if (g.cols) draw(ctx, g, w, h, now);
      setScore((sc) => (sc.wins === g.wins && sc.losses === g.losses ? sc : { wins: g.wins, losses: g.losses }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const dir = KEYS[e.key.toLowerCase()];
      if (dir) {
        e.preventDefault();
        turn(dir);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        startRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, [turn]);

  const swipe = React.useRef<Point | null>(null);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvas}
        aria-label="Arène de motos lumineuses"
        onPointerDown={(e) => {
          swipe.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          const from = swipe.current;
          if (!from) return;
          const dx = e.clientX - from.x;
          const dy = e.clientY - from.y;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_PX) return;
          turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
          swipe.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => (swipe.current = null)}
        className="absolute inset-0 h-full w-full touch-none"
      />
      <div className="pointer-events-none absolute inset-x-0 top-36 flex justify-center sm:top-5">
        <div className="flex items-center gap-4 bg-gunmetal/90 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
          <HudLabel className="text-magenta">光速 · Neon cycles</HudLabel>
          <HudLabel className="text-amber tabular-nums">Victoires {score.wins}</HudLabel>
          <HudLabel className="text-cyan tabular-nums">Défaites {score.losses}</HudLabel>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-24 flex justify-center">
        <TouchPad
          buttons={[
            { label: '←', action: 'left' },
            { label: '↑', action: 'up' },
            { label: '↓', action: 'down' },
            { label: '→', action: 'right' },
            { label: '⏎', action: 'start' },
          ]}
          onPress={(a) => (a === 'start' ? startRef.current() : turn(a as Dir))}
        />
      </div>
    </div>
  );
};

export default Cycles;
