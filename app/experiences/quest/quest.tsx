import { useEffect, useRef } from 'react';
import Crt from '../crt';
import TouchPad from '../touch-pad';
import { drawBlob, drawFire, drawGem, drawHeart, drawHero, drawHud, drawPuff, drawSage, drawScroll, drawSwordItem, drawTile, type Dir } from './draw';
import { CAVE, CAVE_MOUTH, COLS, GOAL, ROWS, START, TILE, WORLD, isSolid, screen, type ScreenMap } from './world';

const WIDTH = COLS * TILE;
const HUD = 24;
const HEIGHT = ROWS * TILE + HUD;
const SPEED = 64;
const ENEMY_SPEED = 30;
const ATTACK_SECONDS = 0.22;
const INVULN_SECONDS = 1;
const SLIDE_SECONDS = 0.5;
const MAX_HP = 6;
const SAGE_ROW_BOTTOM = 4 * TILE + 10;
const SWORD_SPOT = { x: 7.5 * TILE, y: 5 * TILE };
const CAVE_TEXT = ["C'EST DANGEREUX DE CODER SEUL !", 'PRENDS CA.'];

type Where = { x: number; y: number } | 'cave';
type Mode = 'title' | 'play' | 'slide' | 'over' | 'clear';

interface Enemy {
  x: number;
  y: number;
  dir: Dir;
  turn: number;
  hurt: number;
}

interface State {
  mode: Mode;
  where: Where;
  map: ScreenMap;
  prevMap: ScreenMap | null;
  slideDir: Dir;
  slide: number;
  hero: { x: number; y: number; dir: Dir; step: number; stepClock: number; attack: number; invuln: number; kx: number; ky: number };
  hp: number;
  gems: number;
  hasSword: boolean;
  enemies: Enemy[];
  drops: { x: number; y: number; kind: 'gem' | 'heart'; ttl: number }[];
  puffs: { x: number; y: number; age: number }[];
  typed: number;
  time: number;
}

const DIRS: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

function newState(): State {
  return {
    mode: 'title',
    where: { ...START },
    map: screen(START.x, START.y),
    prevMap: null,
    slideDir: 'up',
    slide: 0,
    hero: { x: 7.5 * TILE, y: 6 * TILE, dir: 'down', step: 0, stepClock: 0, attack: 0, invuln: 0, kx: 0, ky: 0 },
    hp: MAX_HP,
    gems: 0,
    hasSword: false,
    enemies: [],
    drops: [],
    puffs: [],
    typed: 0,
    time: 0,
  };
}

const tileAt = (map: ScreenMap, px: number, py: number) => map[Math.floor(py / TILE)]?.[Math.floor(px / TILE)];

/** Tests the feet of a 16×16 sprite, so the head can overlap a tree like on the NES. */
function blocked(map: ScreenMap, x: number, y: number, offMapSolid: boolean) {
  const corners = [
    [x + 3, y + 7],
    [x + 12, y + 7],
    [x + 3, y + 15],
    [x + 12, y + 15],
  ];
  return corners.some(([cx, cy]) => {
    const t = tileAt(map, cx, cy);
    if (t === undefined) return offMapSolid;
    return isSolid(t) || (offMapSolid && t === 'C');
  });
}

const overlap = (ax: number, ay: number, bx: number, by: number, size = 12) => Math.abs(ax - bx) < size && Math.abs(ay - by) < size;

function spawnEnemies(s: State) {
  s.enemies = [];
  if (s.where === 'cave' || (s.where.x === START.x && s.where.y === START.y)) return;
  const count = s.where.x === GOAL.x && s.where.y === GOAL.y ? 6 : 3 + Math.floor(Math.random() * 3);
  for (let tries = 0; s.enemies.length < count && tries < 200; tries += 1) {
    const x = (1 + Math.floor(Math.random() * (COLS - 2))) * TILE;
    const y = (1 + Math.floor(Math.random() * (ROWS - 2))) * TILE;
    if (tileAt(s.map, x + 8, y + 8) !== '.' || Math.hypot(x - s.hero.x, y - s.hero.y) < 64) continue;
    s.enemies.push({ x, y, dir: 'down', turn: 0, hurt: 0 });
  }
}

function travel(s: State, dir: Dir) {
  if (s.where === 'cave') return;
  const [dx, dy] = DIRS[dir];
  const nx = s.where.x + dx;
  const ny = s.where.y + dy;
  if (nx < 0 || ny < 0 || nx >= WORLD || ny >= WORLD) return;
  s.prevMap = s.map;
  s.where = { x: nx, y: ny };
  s.map = screen(nx, ny);
  s.slideDir = dir;
  s.slide = 0;
  s.mode = 'slide';
  s.enemies = [];
  s.drops = [];
  s.puffs = [];
  if (dir === 'left') s.hero.x = WIDTH - TILE;
  if (dir === 'right') s.hero.x = 0;
  if (dir === 'up') s.hero.y = (ROWS - 1) * TILE;
  if (dir === 'down') s.hero.y = 0;
}

function enterCave(s: State) {
  s.where = 'cave';
  s.map = CAVE;
  s.hero.x = 7.5 * TILE;
  s.hero.y = 9 * TILE;
  s.hero.dir = 'up';
  s.enemies = [];
  s.drops = [];
  s.typed = 0;
}

function leaveCave(s: State) {
  s.where = { ...START };
  s.map = screen(START.x, START.y);
  s.hero.x = CAVE_MOUTH.col * TILE;
  s.hero.y = (CAVE_MOUTH.row + 1) * TILE;
  s.hero.dir = 'down';
}

function update(s: State, dt: number, held: Dir[], attackPressed: boolean, startPressed: boolean) {
  s.time += dt;
  if (s.mode === 'title' || s.mode === 'over' || s.mode === 'clear') {
    if (startPressed || attackPressed) Object.assign(s, newState(), { mode: 'play' });
    return;
  }
  if (s.mode === 'slide') {
    s.slide += dt / SLIDE_SECONDS;
    if (s.slide >= 1) {
      s.mode = 'play';
      s.prevMap = null;
      spawnEnemies(s);
    }
    return;
  }

  const h = s.hero;
  const pos = s.where;
  const inCave = pos === 'cave';
  h.invuln = Math.max(0, h.invuln - dt);
  h.attack = Math.max(0, h.attack - dt);
  if (attackPressed && s.hasSword && h.attack === 0) h.attack = ATTACK_SECONDS;

  const want = held[held.length - 1];
  let mx = h.kx * dt;
  let my = h.ky * dt;
  h.kx *= 0.82;
  h.ky *= 0.82;
  if (want && h.attack === 0) {
    h.dir = want;
    mx += DIRS[want][0] * SPEED * dt;
    my += DIRS[want][1] * SPEED * dt;
    h.stepClock += dt;
    if (h.stepClock > 0.15) {
      h.stepClock = 0;
      h.step += 1;
    }
  }
  if (!blocked(s.map, h.x + mx, h.y, inCave && h.y < (ROWS - 1) * TILE)) h.x += mx;
  if (!blocked(s.map, h.x, h.y + my, inCave && h.y < (ROWS - 1) * TILE)) h.y += my;

  if (pos === 'cave') {
    h.x = Math.max(2 * TILE, Math.min(13 * TILE, h.x));
    h.y = Math.max(SAGE_ROW_BOTTOM, h.y);
    if (h.y > ROWS * TILE - 8) return leaveCave(s);
    s.typed += dt * 18;
    if (!s.hasSword && overlap(h.x, h.y, SWORD_SPOT.x, SWORD_SPOT.y)) s.hasSword = true;
    return;
  }

  if (h.x < -8) return travel(s, 'left');
  if (h.x > WIDTH - 8) return travel(s, 'right');
  if (h.y < -8) return travel(s, 'up');
  if (h.y > ROWS * TILE - 8) return travel(s, 'down');
  if (pos.x === START.x && pos.y === START.y && h.dir === 'up' && overlap(h.x, h.y, CAVE_MOUTH.col * TILE, CAVE_MOUTH.row * TILE, 10)) return enterCave(s);
  if (pos.x === GOAL.x && pos.y === GOAL.y && overlap(h.x, h.y, 7.5 * TILE, 5 * TILE)) {
    s.mode = 'clear';
    return;
  }

  const [ax, ay] = DIRS[h.dir];
  const swordX = h.x + ax * 14;
  const swordY = h.y + ay * 14;

  for (const e of s.enemies) {
    e.turn -= dt;
    e.hurt = Math.max(0, e.hurt - dt);
    if (e.turn <= 0) {
      e.dir = (['up', 'down', 'left', 'right'] as Dir[])[Math.floor(Math.random() * 4)];
      e.turn = 0.6 + Math.random();
    }
    const nx = e.x + DIRS[e.dir][0] * ENEMY_SPEED * dt;
    const ny = e.y + DIRS[e.dir][1] * ENEMY_SPEED * dt;
    if (blocked(s.map, nx, ny, true)) e.turn = 0;
    else {
      e.x = nx;
      e.y = ny;
    }
    if (h.attack > 0 && overlap(swordX, swordY, e.x, e.y, 14)) {
      e.hurt = -1;
      s.puffs.push({ x: e.x, y: e.y, age: 0 });
      const roll = Math.random();
      if (roll < 0.55) s.drops.push({ x: e.x, y: e.y, kind: 'gem', ttl: 8 });
      else if (roll < 0.7) s.drops.push({ x: e.x, y: e.y, kind: 'heart', ttl: 8 });
    } else if (h.invuln === 0 && overlap(h.x, h.y, e.x, e.y)) {
      s.hp -= 1;
      h.invuln = INVULN_SECONDS;
      const len = Math.hypot(h.x - e.x, h.y - e.y) || 1;
      h.kx = ((h.x - e.x) / len) * 220;
      h.ky = ((h.y - e.y) / len) * 220;
      if (s.hp <= 0) s.mode = 'over';
    }
  }
  s.enemies = s.enemies.filter((e) => e.hurt >= 0);

  s.drops = s.drops.filter((d) => {
    d.ttl -= dt;
    if (!overlap(h.x, h.y, d.x, d.y)) return d.ttl > 0;
    if (d.kind === 'gem') s.gems = Math.min(99, s.gems + 1);
    else s.hp = Math.min(MAX_HP, s.hp + 2);
    return false;
  });
  s.puffs = s.puffs.filter((p) => (p.age += dt) < 0.3);
}

function drawMap(ctx: CanvasRenderingContext2D, map: ScreenMap, ox: number, oy: number, time: number) {
  map.forEach((row, y) => row.forEach((t, x) => drawTile(ctx, t, ox + x * TILE, oy + y * TILE, time)));
}

function centerText(ctx: CanvasRenderingContext2D, lines: [string, string][], top: number) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  lines.forEach(([text, color], i) => {
    ctx.fillStyle = color;
    ctx.font = i === 0 ? 'bold 16px ui-monospace, Menlo, monospace' : 'bold 8px ui-monospace, Menlo, monospace';
    ctx.fillText(text, WIDTH / 2, top + (i === 0 ? 0 : 14 + i * 12));
  });
  ctx.textAlign = 'left';
}

function render(ctx: CanvasRenderingContext2D, s: State) {
  const place = s.where === 'cave' ? 'GROTTE' : `MAP ${s.where.x + 1}-${s.where.y + 1}`;
  drawHud(ctx, WIDTH, s.hp, MAX_HP, s.gems, s.hasSword, place);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, HUD, WIDTH, ROWS * TILE);
  ctx.clip();

  if (s.mode === 'slide' && s.prevMap) {
    const [dx, dy] = DIRS[s.slideDir];
    const k = Math.min(1, s.slide);
    drawMap(ctx, s.prevMap, -dx * k * WIDTH, HUD - dy * k * ROWS * TILE, s.time);
    drawMap(ctx, s.map, dx * (1 - k) * WIDTH, HUD + dy * (1 - k) * ROWS * TILE, s.time);
    ctx.restore();
    return;
  }

  drawMap(ctx, s.map, 0, HUD, s.time);
  ctx.translate(0, HUD);

  if (s.where === 'cave') {
    drawFire(ctx, 4 * TILE, 4 * TILE, s.time);
    drawFire(ctx, 11 * TILE, 4 * TILE, s.time);
    drawSage(ctx, 7.5 * TILE, 4 * TILE);
    if (!s.hasSword) drawSwordItem(ctx, SWORD_SPOT.x, SWORD_SPOT.y);
    const text = s.hasSword ? ['TU AS L’EPEE !', 'ESPACE POUR FRAPPER.'] : CAVE_TEXT;
    let budget = s.hasSword ? 99 : Math.floor(s.typed);
    ctx.font = 'bold 8px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    text.forEach((line, i) => {
      ctx.fillText(line.slice(0, Math.max(0, budget)), WIDTH / 2, 2.2 * TILE + i * 11);
      budget -= line.length;
    });
    ctx.textAlign = 'left';
  }
  if (s.where !== 'cave' && s.where.x === GOAL.x && s.where.y === GOAL.y) drawScroll(ctx, 7.5 * TILE, 5 * TILE, s.time);

  for (const d of s.drops) {
    if (d.ttl < 2 && Math.floor(s.time * 10) % 2) continue;
    if (d.kind === 'gem') drawGem(ctx, d.x, d.y, s.time);
    else drawHeart(ctx, d.x + 4, d.y + 4, 2);
  }
  for (const e of s.enemies) drawBlob(ctx, e.x, e.y, s.time, e.hurt > 0);
  for (const p of s.puffs) drawPuff(ctx, p.x, p.y, p.age / 0.3);
  const h = s.hero;
  if (!(h.invuln > 0 && Math.floor(s.time * 16) % 2)) drawHero(ctx, h.x, h.y, h.dir, h.step, h.attack > 0, s.hasSword);
  ctx.restore();

  if (s.mode === 'title') {
    ctx.fillStyle = 'rgb(0 0 0 / 0.72)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    centerText(
      ctx,
      [
        ['作画 QUEST', '#ff2a6d'],
        ['UNE AVENTURE 8-BIT', '#d1f7ff'],
        ['TROUVE LE ROULEAU 作画', '#05d9e8'],
        ['ENTREE OU ESPACE POUR JOUER', '#ffb000'],
      ],
      64,
    );
  }
  if (s.mode === 'over') {
    ctx.fillStyle = 'rgb(120 0 20 / 0.6)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    centerText(
      ctx,
      [
        ['GAME OVER', '#ffffff'],
        [`GEMMES : ${s.gems}`, '#05d9e8'],
        ['ENTREE POUR REJOUER', '#ffb000'],
      ],
      76,
    );
  }
  if (s.mode === 'clear') {
    ctx.fillStyle = 'rgb(0 0 0 / 0.75)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    centerText(
      ctx,
      [
        ['QUEST CLEAR', '#ffb000'],
        ['LE ROULEAU 作画 EST A TOI', '#d1f7ff'],
        [`GEMMES : ${s.gems}`, '#05d9e8'],
        ['ENTREE POUR REJOUER', '#ff2a6d'],
      ],
      64,
    );
  }
}

const KEY_DIRS: Record<string, Dir> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  z: 'up',
  w: 'up',
  s: 'down',
  q: 'left',
  a: 'left',
  d: 'right',
};
const ATTACK_KEYS = new Set([' ', 'j', 'k']);

export default function Quest() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const input = useRef({ held: [] as Dir[], attack: false, start: false });

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const state = newState();
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const i = input.current;
      update(state, dt, i.held, i.attack, i.start);
      i.attack = false;
      i.start = false;
      render(ctx, state);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const dir = KEY_DIRS[key];
      if (dir) {
        e.preventDefault();
        if (!input.current.held.includes(dir)) input.current.held.push(dir);
      } else if (ATTACK_KEYS.has(key)) {
        e.preventDefault();
        if (!e.repeat) input.current.attack = true;
      } else if (key === 'Enter') input.current.start = true;
    };
    const onUp = (e: KeyboardEvent) => {
      const dir = KEY_DIRS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) input.current.held = input.current.held.filter((d) => d !== dir);
    };
    const onBlur = () => (input.current.held = []);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const press = (action: string) => {
    if (action === 'attack') input.current.attack = true;
    else if (!input.current.held.includes(action as Dir)) input.current.held.push(action as Dir);
  };
  const release = (action: string) => (input.current.held = input.current.held.filter((d) => d !== action));

  return (
    <div className="flex min-h-0 flex-col items-center gap-3">
      <Crt>
        <canvas ref={canvas} width={WIDTH} height={HEIGHT} className="block h-auto w-[min(calc(100vw-5rem),calc(58vh*1.28),720px)] [image-rendering:pixelated]" />
      </Crt>
      <TouchPad
        buttons={[
          { label: '←', action: 'left' },
          { label: '↑', action: 'up' },
          { label: '↓', action: 'down' },
          { label: '→', action: 'right' },
          { label: 'B', action: 'attack' },
        ]}
        onPress={press}
        onRelease={release}
      />
    </div>
  );
}
