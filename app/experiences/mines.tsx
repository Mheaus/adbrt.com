import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { HudLabel, HudPanel } from '~/components/hud';

const LEVELS = {
  small: { cols: 9, rows: 9, mines: 10 },
  large: { cols: 16, rows: 16, mines: 40 },
} as const;

type Level = keyof typeof LEVELS;
type Status = 'ready' | 'playing' | 'won' | 'lost';

interface Cell {
  mine: boolean;
  open: boolean;
  flag: boolean;
  near: number;
}

const NUMBER_COLORS = ['', 'text-cyan', 'text-ice', 'text-magenta', 'text-amber', 'text-magenta', 'text-cyan', 'text-ice', 'text-amber'];
const LONG_PRESS_MS = 380;

function emptyBoard(cols: number, rows: number): Cell[] {
  return Array.from({ length: cols * rows }, () => ({ mine: false, open: false, flag: false, near: 0 }));
}

function neighbours(i: number, cols: number, rows: number) {
  const x = i % cols;
  const y = Math.floor(i / cols);
  const out: number[] = [];
  for (let dy = -1; dy <= 1; dy += 1)
    for (let dx = -1; dx <= 1; dx += 1) {
      const nx = x + dx;
      const ny = y + dy;
      if ((dx || dy) && nx >= 0 && ny >= 0 && nx < cols && ny < rows) out.push(ny * cols + nx);
    }
  return out;
}

/** Places the mines after the first click, so the first cell and its neighbours are always safe. */
function seed(board: Cell[], first: number, cols: number, rows: number, mines: number) {
  const safe = new Set([first, ...neighbours(first, cols, rows)]);
  const candidates = board.map((_, i) => i).filter((i) => !safe.has(i));
  for (let k = candidates.length - 1; k > 0; k -= 1) {
    const j = Math.floor(Math.random() * (k + 1));
    [candidates[k], candidates[j]] = [candidates[j], candidates[k]];
  }
  for (const i of candidates.slice(0, mines)) board[i].mine = true;
  board.forEach((cell, i) => (cell.near = neighbours(i, cols, rows).filter((n) => board[n].mine).length));
}

function flood(board: Cell[], start: number, cols: number, rows: number) {
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    const cell = board[i];
    if (cell.open || cell.flag) continue;
    cell.open = true;
    if (cell.near === 0 && !cell.mine) stack.push(...neighbours(i, cols, rows));
  }
}

export default function Mines() {
  const [level, setLevel] = useState<Level>('small');
  const { cols, rows, mines } = LEVELS[level];
  const [board, setBoard] = useState(() => emptyBoard(cols, rows));
  const [status, setStatus] = useState<Status>('ready');
  const [seconds, setSeconds] = useState(0);
  const press = useRef<{ timer: number; fired: boolean } | null>(null);

  const reset = useCallback(
    (next: Level = level) => {
      setLevel(next);
      setBoard(emptyBoard(LEVELS[next].cols, LEVELS[next].rows));
      setStatus('ready');
      setSeconds(0);
    },
    [level],
  );

  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => setSeconds((s) => Math.min(999, s + 1)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const settle = (next: Cell[]) => {
    if (next.some((c) => c.mine && c.open)) {
      next.forEach((c) => c.mine && (c.open = true));
      setStatus('lost');
    } else if (next.every((c) => c.mine || c.open)) {
      next.forEach((c) => c.mine && (c.flag = true));
      setStatus('won');
    }
    setBoard(next);
  };

  const reveal = (i: number) => {
    if (status === 'won' || status === 'lost') return;
    const next = board.map((c) => ({ ...c }));
    if (status === 'ready') {
      seed(next, i, cols, rows, mines);
      setStatus('playing');
    }
    const cell = next[i];
    if (cell.flag) return;
    if (cell.open && cell.near > 0) {
      const around = neighbours(i, cols, rows);
      if (around.filter((n) => next[n].flag).length === cell.near) around.forEach((n) => flood(next, n, cols, rows));
    } else {
      flood(next, i, cols, rows);
    }
    settle(next);
  };

  const toggleFlag = (i: number) => {
    if (status !== 'playing' || board[i].open) return;
    setBoard(board.map((c, k) => (k === i ? { ...c, flag: !c.flag } : c)));
  };

  const flags = board.filter((c) => c.flag).length;
  const face = status === 'lost' ? 'KIA' : status === 'won' ? 'CLEAR' : 'READY';

  return (
    <HudPanel label="地雷 · Mine field" code={`${cols}×${rows}`} className="max-w-full">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <HudLabel className="text-magenta">◆ {String(mines - flags).padStart(3, '0')}</HudLabel>
        <button
          type="button"
          onClick={() => reset()}
          className={clsx(
            'cursor-pointer px-3 py-1 font-display text-xs font-bold tracking-widest uppercase ring-1 transition',
            status === 'lost' ? 'text-magenta ring-magenta' : status === 'won' ? 'text-amber ring-amber' : 'text-cyan ring-cyan/60 hover:bg-cyan hover:text-void',
          )}
        >
          {face} · Reset
        </button>
        <HudLabel className="text-cyan tabular-nums">⏱ {String(seconds).padStart(3, '0')}</HudLabel>
      </div>
      <div className="overflow-auto px-4 pb-4">
        <div className="mx-auto grid w-fit gap-0.5 bg-void p-0.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} onContextMenu={(e) => e.preventDefault()}>
          {board.map((cell, i) => (
            <button
              key={i}
              type="button"
              aria-label={cell.open ? (cell.mine ? 'Mine' : `${cell.near} mines autour`) : cell.flag ? 'Drapeau' : 'Case fermée'}
              onClick={() => (press.current?.fired ? (press.current = null) : reveal(i))}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(i);
              }}
              onPointerDown={(e) => {
                if (e.pointerType !== 'touch') return;
                const state = { timer: 0, fired: false };
                state.timer = window.setTimeout(() => {
                  state.fired = true;
                  toggleFlag(i);
                }, LONG_PRESS_MS);
                press.current = state;
              }}
              onPointerUp={() => press.current && clearTimeout(press.current.timer)}
              onPointerLeave={() => press.current && clearTimeout(press.current.timer)}
              className={clsx(
                'flex size-7 cursor-pointer items-center justify-center font-mono text-sm font-bold select-none sm:size-8',
                cell.open ? (cell.mine ? 'bg-magenta text-void' : 'bg-void') : 'bg-plate shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] hover:bg-dim/60',
                cell.open && !cell.mine && NUMBER_COLORS[cell.near],
              )}
            >
              {cell.open ? cell.mine ? '✸' : cell.near || '' : cell.flag ? <span className="text-amber">▲</span> : ''}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 border-t border-white/5 px-4 py-2">
        {(Object.keys(LEVELS) as Level[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => reset(l)}
            className={clsx('cursor-pointer px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] uppercase transition', l === level ? 'text-cyan' : 'text-dim hover:text-ice')}
          >
            {LEVELS[l].cols}×{LEVELS[l].rows}
          </button>
        ))}
      </div>
    </HudPanel>
  );
}
