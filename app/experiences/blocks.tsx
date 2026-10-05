import { useEffect, useRef, useState } from 'react';
import { HudLabel, HudPanel } from '~/components/hud';
import { palette } from '~/scenes/canvas-scene';
import TouchPad from './touch-pad';

const COLS = 10;
const ROWS = 20;
const CELL = 24;
const LINE_SCORES = [0, 100, 300, 500, 800];

const SHAPES = {
  I: {
    color: palette.cyan,
    cells: [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  },
  O: {
    color: palette.amber,
    cells: [
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  },
  T: {
    color: palette.magenta,
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },
  S: {
    color: '#6ff7a8',
    cells: [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
  },
  Z: {
    color: '#ff6a3d',
    cells: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  },
  J: {
    color: '#5b8cff',
    cells: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },
  L: {
    color: palette.ice,
    cells: [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },
} as const;

type Kind = keyof typeof SHAPES;
type Grid = (string | null)[][];

interface Piece {
  kind: Kind;
  cells: number[][];
  x: number;
  y: number;
}

interface Game {
  grid: Grid;
  piece: Piece;
  next: Kind;
  bag: Kind[];
  score: number;
  lines: number;
  over: boolean;
  fall: number;
}

/** The 7-bag gives each shape once per round of seven, so long droughts cannot happen. */
function drawFromBag(bag: Kind[]): Kind {
  if (!bag.length) bag.push(...(Object.keys(SHAPES) as Kind[]).sort(() => Math.random() - 0.5));
  return bag.pop()!;
}

function spawn(kind: Kind): Piece {
  return { kind, cells: SHAPES[kind].cells.map(([x, y]) => [x, y]), x: 3, y: 0 };
}

function newGame(): Game {
  const bag: Kind[] = [];
  return { grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)), piece: spawn(drawFromBag(bag)), next: drawFromBag(bag), bag, score: 0, lines: 0, over: false, fall: 0 };
}

function fits(grid: Grid, cells: number[][], x: number, y: number) {
  return cells.every(([cx, cy]) => {
    const gx = cx + x;
    const gy = cy + y;
    return gx >= 0 && gx < COLS && gy < ROWS && (gy < 0 || !grid[gy][gx]);
  });
}

function rotate(cells: number[][], kind: Kind) {
  if (kind === 'O') return cells;
  const size = kind === 'I' ? 4 : 3;
  return cells.map(([x, y]) => [size - 1 - y, x]);
}

const level = (g: Game) => Math.floor(g.lines / 10);
const fallSeconds = (g: Game) => Math.max(0.06, 0.8 - level(g) * 0.07);

function lock(g: Game) {
  for (const [cx, cy] of g.piece.cells) {
    const y = cy + g.piece.y;
    if (y < 0) {
      g.over = true;
      return;
    }
    g.grid[y][cx + g.piece.x] = SHAPES[g.piece.kind].color;
  }
  const kept = g.grid.filter((row) => row.some((c) => !c));
  const cleared = ROWS - kept.length;
  g.grid = [...Array.from({ length: cleared }, () => Array(COLS).fill(null)), ...kept];
  g.lines += cleared;
  g.score += LINE_SCORES[cleared] * (level(g) + 1);
  g.piece = spawn(g.next);
  g.next = drawFromBag(g.bag);
  if (!fits(g.grid, g.piece.cells, g.piece.x, g.piece.y)) g.over = true;
}

function gravity(g: Game) {
  if (fits(g.grid, g.piece.cells, g.piece.x, g.piece.y + 1)) g.piece.y += 1;
  else lock(g);
}

function act(g: Game, action: string) {
  if (g.over) {
    if (action === 'restart') Object.assign(g, newGame());
    return;
  }
  const p = g.piece;
  if (action === 'left' && fits(g.grid, p.cells, p.x - 1, p.y)) p.x -= 1;
  if (action === 'right' && fits(g.grid, p.cells, p.x + 1, p.y)) p.x += 1;
  if (action === 'down') {
    if (fits(g.grid, p.cells, p.x, p.y + 1)) {
      p.y += 1;
      g.score += 1;
    } else lock(g);
  }
  if (action === 'rotate') {
    const turned = rotate(p.cells, p.kind);
    const kick = [0, -1, 1, -2, 2].find((dx) => fits(g.grid, turned, p.x + dx, p.y));
    if (kick !== undefined) {
      p.cells = turned;
      p.x += kick;
    }
  }
  if (action === 'drop') {
    while (fits(g.grid, p.cells, p.x, p.y + 1)) {
      p.y += 1;
      g.score += 2;
    }
    lock(g);
  }
}

function block(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
  ctx.fillStyle = 'rgb(255 255 255 / 0.35)';
  ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, 3);
  ctx.globalAlpha = 1;
}

function render(ctx: CanvasRenderingContext2D, g: Game) {
  ctx.fillStyle = palette.void;
  ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
  ctx.strokeStyle = 'rgb(5 217 232 / 0.06)';
  for (let x = 1; x < COLS; x += 1) ctx.strokeRect(x * CELL, 0, 0, ROWS * CELL);
  g.grid.forEach((row, y) => row.forEach((c, x) => c && block(ctx, x, y, c)));
  const p = g.piece;
  let ghost = p.y;
  while (fits(g.grid, p.cells, p.x, ghost + 1)) ghost += 1;
  for (const [cx, cy] of p.cells) block(ctx, cx + p.x, cy + ghost, SHAPES[p.kind].color, 0.18);
  for (const [cx, cy] of p.cells) block(ctx, cx + p.x, cy + p.y, SHAPES[p.kind].color);
  if (g.over) {
    ctx.fillStyle = 'rgb(26 29 34 / 0.8)';
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.fillStyle = palette.magenta;
    ctx.font = "bold 22px 'Chakra Petch', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', (COLS * CELL) / 2, (ROWS * CELL) / 2 - 8);
    ctx.fillStyle = palette.ice;
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('ENTRÉE POUR REJOUER', (COLS * CELL) / 2, (ROWS * CELL) / 2 + 16);
    ctx.textAlign = 'left';
  }
}

const KEYS: Record<string, string> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowUp: 'rotate',
  x: 'rotate',
  ' ': 'drop',
  Enter: 'restart',
};

export default function Blocks() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(newGame());
  const [hud, setHud] = useState({ score: 0, lines: 0, level: 0, next: game.current.next });

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const g = game.current;
      if (!g.over && !document.hidden) {
        g.fall += (now - last) / 1000;
        if (g.fall >= fallSeconds(g)) {
          g.fall = 0;
          gravity(g);
        }
      }
      last = now;
      render(ctx, g);
      setHud((h) => (h.score === g.score && h.lines === g.lines && h.next === g.next ? h : { score: g.score, lines: g.lines, level: level(g), next: g.next }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => {
      const action = KEYS[e.key];
      if (!action) return;
      e.preventDefault();
      act(game.current, action);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const press = (action: string) => act(game.current, game.current.over ? 'restart' : action);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 pt-36 pb-24 sm:pt-4">
      <HudPanel label="落ち物 · Blocks" code={`LV ${String(hud.level).padStart(2, '0')}`}>
        <div className="flex gap-4 p-4">
          <canvas
            ref={canvas}
            width={COLS * CELL}
            height={ROWS * CELL}
            className="h-[min(calc(100dvh-20rem),calc((100vw-10rem)*2),800px)] sm:h-[min(calc(100dvh-14rem),calc((100vw-10rem)*2),800px)] w-auto [image-rendering:pixelated]"
          />
          <div className="flex w-20 flex-col gap-4 sm:w-24">
            <div>
              <HudLabel>Score</HudLabel>
              <p className="font-display text-xl font-bold text-magenta tabular-nums">{hud.score}</p>
            </div>
            <div>
              <HudLabel>Lignes</HudLabel>
              <p className="font-display text-xl font-bold text-cyan tabular-nums">{hud.lines}</p>
            </div>
            <div>
              <HudLabel>Suivant</HudLabel>
              <div className="relative mt-2 h-10 w-16">
                {SHAPES[hud.next].cells.map(([x, y]) => (
                  <span key={`${x}-${y}`} className="absolute size-3.5" style={{ left: x * 15, top: y * 15, background: SHAPES[hud.next].color }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </HudPanel>
      <TouchPad
        buttons={[
          { label: '←', action: 'left' },
          { label: '↻', action: 'rotate' },
          { label: '→', action: 'right' },
          { label: '↓', action: 'down' },
          { label: '⤓', action: 'drop' },
        ]}
        onPress={press}
      />
    </div>
  );
}
