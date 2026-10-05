export const TILE = 16;
export const COLS = 16;
export const ROWS = 11;
export const WORLD = 3;
export const START = { x: 1, y: 1 };
export const GOAL = { x: 2, y: 0 };

/**
 * Tile legend:
 * - `.` ground, `T` tree, `R` rock, `W` water
 * - `C` cave mouth, `X` cave wall, `D` cave door, `_` cave floor
 */
export type Tile = '.' | 'T' | 'R' | 'W' | 'C' | 'X' | 'D' | '_';
export type ScreenMap = Tile[][];

const SOLID = new Set<Tile>(['T', 'R', 'W', 'X']);
export const isSolid = (t: Tile | undefined) => t === undefined || SOLID.has(t);

const START_SCREEN = [
  'RRRRRR....RRRRRR',
  'RRRCRR....RRRRRR',
  'RR..........RRRR',
  'R.............RR',
  '................',
  '................',
  '................',
  'T..............T',
  'TT....TT......TT',
  'TTT...TT.....TTT',
  'TTTTTT....TTTTTT',
];

export const CAVE = [
  'XXXXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXXXX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XX____________XX',
  'XXXXXXXDDXXXXXXX',
].map((row) => row.split('') as Tile[]);

/** A small seeded random generator, so every visit builds the same screen. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const onPath = (x: number, y: number) => (y >= 4 && y <= 6) || (x >= 6 && x <= 9);

function generate(sx: number, sy: number): ScreenMap {
  const rand = mulberry32(sx * 97 + sy * 31 + 7);
  const border: Tile = sy === 0 ? 'R' : 'T';
  const obstacle: Tile = rand() < 0.5 ? 'T' : 'R';
  const grid: ScreenMap = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1 ? border : '.')));

  if (sx > 0) for (let y = 4; y <= 6; y += 1) grid[y][0] = '.';
  if (sx < WORLD - 1) for (let y = 4; y <= 6; y += 1) grid[y][COLS - 1] = '.';
  if (sy > 0) for (let x = 6; x <= 9; x += 1) grid[0][x] = '.';
  if (sy < WORLD - 1) for (let x = 6; x <= 9; x += 1) grid[ROWS - 1][x] = '.';

  if (rand() < 0.45) {
    const px = rand() < 0.5 ? 2 : 10;
    const py = rand() < 0.5 ? 1 : 7;
    for (let y = py; y < py + 3; y += 1) for (let x = px; x < px + 4; x += 1) if (!onPath(x, y)) grid[y][x] = 'W';
  }
  for (let k = 0; k < 9; k += 1) {
    const x = 2 + Math.floor(rand() * 12);
    const y = 2 + Math.floor(rand() * 7);
    const big = rand() < 0.35;
    for (const [dx, dy] of big
      ? [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ]
      : [[0, 0]]) {
      const tx = x + dx;
      const ty = y + dy;
      if (tx < COLS - 1 && ty < ROWS - 1 && !onPath(tx, ty) && grid[ty][tx] === '.') grid[ty][tx] = obstacle;
    }
  }
  return grid;
}

export function screen(sx: number, sy: number): ScreenMap {
  if (sx === START.x && sy === START.y) return START_SCREEN.map((row) => row.split('') as Tile[]);
  return generate(sx, sy);
}

export const CAVE_MOUTH = { col: 3, row: 1 };
