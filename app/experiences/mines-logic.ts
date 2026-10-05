const DENSITY = 0.17;
const FLOOD_LIMIT = 20_000;

export const key = (x: number, y: number) => `${x},${y}`;

/** Returns a stable pseudo-random value in [0, 1) for a cell, so the infinite board needs no storage. */
const hash = (x: number, y: number, seed: number) => {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

export type Game = {
  seed: number;
  safe: { x: number; y: number } | null;
  open: Set<string>;
  flags: Set<string>;
  exploded: { x: number; y: number } | null;
};

export const newGame = (): Game => ({ seed: (Math.random() * 2 ** 31) | 0, safe: null, open: new Set(), flags: new Set(), exploded: null });

export const isMine = (g: Game, x: number, y: number) => {
  if (g.safe && Math.abs(x - g.safe.x) <= 1 && Math.abs(y - g.safe.y) <= 1) return false;
  return hash(x, y, g.seed) < DENSITY;
};

export const NEIGHBOURS = [-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => [dx, dy])).filter(([dx, dy]) => dx || dy);

export const near = (g: Game, x: number, y: number) => NEIGHBOURS.filter(([dx, dy]) => isMine(g, x + dx, y + dy)).length;

/** A cell that the last action opened, with its distance in steps from the clicked cell. */
export type Opened = { x: number; y: number; distance: number };

export type RevealResult = { opened: Opened[]; chord: 'none' | 'done' | 'refused'; exploded: boolean };

/** Opens cells breadth first, so the distance of each cell is its order in the reveal wave. */
const flood = (g: Game, sx: number, sy: number, start: number, out: Opened[]) => {
  const queue: [number, number, number][] = [[sx, sy, start]];
  let budget = FLOOD_LIMIT;
  for (let i = 0; i < queue.length && budget > 0; i += 1, budget -= 1) {
    const [x, y, distance] = queue[i];
    const k = key(x, y);
    if (g.open.has(k) || g.flags.has(k)) continue;
    if (isMine(g, x, y)) {
      g.exploded = { x, y };
      return;
    }
    g.open.add(k);
    out.push({ x, y, distance });
    if (near(g, x, y) === 0) for (const [dx, dy] of NEIGHBOURS) queue.push([x + dx, y + dy, distance + 1]);
  }
};

export const reveal = (g: Game, x: number, y: number): RevealResult => {
  const opened: Opened[] = [];
  if (g.exploded) return { opened, chord: 'none', exploded: false };
  if (!g.safe) g.safe = { x, y };
  const k = key(x, y);
  if (g.flags.has(k)) return { opened, chord: 'none', exploded: false };
  if (!g.open.has(k)) {
    flood(g, x, y, 0, opened);
    return { opened, chord: 'none', exploded: !!g.exploded };
  }
  const count = near(g, x, y);
  if (!count) return { opened, chord: 'none', exploded: false };
  const flagged = NEIGHBOURS.filter(([dx, dy]) => g.flags.has(key(x + dx, y + dy))).length;
  if (flagged !== count) return { opened, chord: 'refused', exploded: false };
  for (const [dx, dy] of NEIGHBOURS) if (!g.exploded) flood(g, x + dx, y + dy, 1, opened);
  return { opened, chord: 'done', exploded: !!g.exploded };
};

/** Returns true if the cell now has a flag. */
export const toggleFlag = (g: Game, x: number, y: number) => {
  const k = key(x, y);
  if (g.exploded || g.open.has(k)) return false;
  if (g.flags.has(k)) {
    g.flags.delete(k);
    return false;
  }
  g.flags.add(k);
  return true;
};

/** Returns the closed, unflagged neighbours of an open number: the cells that a chord would open. */
export const chordTargets = (g: Game, x: number, y: number) => {
  if (!g.open.has(key(x, y)) || !near(g, x, y)) return [];
  return NEIGHBOURS.map(([dx, dy]) => key(x + dx, y + dy)).filter((k) => !g.open.has(k) && !g.flags.has(k));
};
