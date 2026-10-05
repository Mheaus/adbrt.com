import { TILE, type Tile } from './world';

export type Dir = 'up' | 'down' | 'left' | 'right';

const C = {
  ground: '#e4c08a',
  groundDot: '#c9a268',
  tree: '#1f9a4e',
  treeDark: '#0b5a2a',
  rock: '#a5592f',
  rockDark: '#6a3215',
  water: '#2a6bd8',
  waterLight: '#86b8ff',
  wall: '#4a3324',
  wallDark: '#2c1d14',
  floor: '#140d0b',
  tunic: '#3cc24a',
  tunicDark: '#1d7a2a',
  skin: '#f4c39b',
  hair: '#7a4a1e',
  shield: '#c9ccd6',
  steel: '#e8f2ff',
  blob: '#e83c4a',
  blobDark: '#9c1a2a',
  white: '#ffffff',
  black: '#000000',
  gem: '#05d9e8',
  gemDark: '#0a7f8c',
  heart: '#ff2a6d',
  robe: '#d8483a',
  fire: '#ff9a1f',
  fireCore: '#ffe14a',
  gold: '#ffb000',
} as const;

function px(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w = 1, h = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

export function drawTile(ctx: CanvasRenderingContext2D, tile: Tile, x: number, y: number, time: number) {
  switch (tile) {
    case '.':
      px(ctx, C.ground, x, y, TILE, TILE);
      px(ctx, C.groundDot, x + 3, y + 4, 2, 1);
      px(ctx, C.groundDot, x + 11, y + 11, 2, 1);
      return;
    case 'T':
      px(ctx, C.ground, x, y, TILE, TILE);
      px(ctx, C.treeDark, x + 1, y + 2, 14, 13);
      px(ctx, C.tree, x + 2, y + 1, 12, 11);
      px(ctx, C.tree, x + 1, y + 4, 14, 6);
      px(ctx, C.treeDark, x + 4, y + 4, 2, 2);
      px(ctx, C.treeDark, x + 9, y + 6, 2, 2);
      px(ctx, C.treeDark, x + 6, y + 9, 2, 2);
      return;
    case 'R':
      px(ctx, C.rockDark, x, y, TILE, TILE);
      px(ctx, C.rock, x + 1, y + 1, 14, 12);
      px(ctx, C.rockDark, x + 4, y + 4, 6, 1);
      px(ctx, C.rockDark, x + 9, y + 8, 4, 1);
      return;
    case 'W': {
      px(ctx, C.water, x, y, TILE, TILE);
      const wave = Math.floor(time * 3) % 2;
      px(ctx, C.waterLight, x + 2 + wave * 4, y + 4, 4, 1);
      px(ctx, C.waterLight, x + 8 - wave * 4, y + 11, 4, 1);
      return;
    }
    case 'C':
      px(ctx, C.rockDark, x, y, TILE, TILE);
      px(ctx, C.black, x + 2, y + 3, 12, 13);
      px(ctx, C.black, x + 4, y + 1, 8, 2);
      return;
    case 'X':
      px(ctx, C.wallDark, x, y, TILE, TILE);
      px(ctx, C.wall, x + 1, y + 1, 6, 6);
      px(ctx, C.wall, x + 9, y + 9, 6, 6);
      return;
    case 'D':
    case '_':
      px(ctx, C.floor, x, y, TILE, TILE);
      return;
  }
}

export function drawHero(ctx: CanvasRenderingContext2D, x: number, y: number, dir: Dir, step: number, attacking: boolean, hasSword: boolean) {
  const leg = step % 2;
  px(ctx, C.hair, x + 4, y + 1, 8, 3);
  px(ctx, C.tunicDark, x + 3, y, 10, 2);
  if (dir === 'up') px(ctx, C.hair, x + 4, y + 3, 8, 4);
  else px(ctx, C.skin, x + 4, y + 3, 8, 5);
  if (dir === 'down') {
    px(ctx, C.black, x + 5, y + 5, 1, 1);
    px(ctx, C.black, x + 10, y + 5, 1, 1);
  } else if (dir === 'left') px(ctx, C.black, x + 5, y + 5, 1, 1);
  else if (dir === 'right') px(ctx, C.black, x + 10, y + 5, 1, 1);
  px(ctx, C.tunic, x + 3, y + 8, 10, 5);
  px(ctx, C.hair, x + 3, y + 10, 10, 1);
  px(ctx, C.tunicDark, x + 4 + leg * 2, y + 13, 3, 3);
  px(ctx, C.tunicDark, x + 9 - leg * 2, y + 13, 3, 3);
  const shieldX = dir === 'left' ? x + 1 : dir === 'right' ? x + 12 : x + 11;
  if (dir !== 'up') px(ctx, C.shield, shieldX, y + 8, 3, 5);

  if (attacking && hasSword) {
    if (dir === 'up') px(ctx, C.steel, x + 7, y - 11, 2, 11);
    if (dir === 'down') px(ctx, C.steel, x + 7, y + 16, 2, 11);
    if (dir === 'left') px(ctx, C.steel, x - 11, y + 9, 11, 2);
    if (dir === 'right') px(ctx, C.steel, x + 16, y + 9, 11, 2);
  }
}

export function drawBlob(ctx: CanvasRenderingContext2D, x: number, y: number, time: number, hurt: boolean) {
  const squash = Math.floor(time * 4) % 2;
  const body = hurt ? C.white : C.blob;
  px(ctx, C.blobDark, x + 2, y + 6 + squash, 12, 9 - squash);
  px(ctx, body, x + 3, y + 4 + squash, 10, 10 - squash);
  px(ctx, C.white, x + 5, y + 7, 2, 2);
  px(ctx, C.white, x + 9, y + 7, 2, 2);
  px(ctx, C.black, x + 6, y + 8, 1, 1);
  px(ctx, C.black, x + 10, y + 8, 1, 1);
}

export function drawPuff(ctx: CanvasRenderingContext2D, x: number, y: number, k: number) {
  const r = 2 + k * 8;
  for (let i = 0; i < 4; i += 1) {
    const a = (Math.PI / 2) * i + Math.PI / 4;
    px(ctx, C.white, x + 8 + Math.cos(a) * r - 1, y + 8 + Math.sin(a) * r - 1, 3, 3);
  }
}

export function drawGem(ctx: CanvasRenderingContext2D, x: number, y: number, time: number) {
  const color = Math.floor(time * 4) % 2 ? C.gem : '#ff2a6d';
  px(ctx, C.gemDark, x + 6, y + 2, 4, 12);
  px(ctx, color, x + 5, y + 4, 6, 8);
  px(ctx, C.white, x + 6, y + 5, 1, 3);
}

export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, fill: 0 | 1 | 2) {
  const color = fill === 0 ? '#3a1520' : C.heart;
  px(ctx, color, x + 1, y + 1, 2, 2);
  px(ctx, color, x + 4, y + 1, 2, 2);
  px(ctx, color, x, y + 2, 7, 2);
  px(ctx, color, x + 1, y + 4, 5, 1);
  px(ctx, color, x + 2, y + 5, 3, 1);
  px(ctx, color, x + 3, y + 6, 1, 1);
  if (fill === 1) px(ctx, '#3a1520', x + 4, y + 1, 3, 6);
}

export function drawFire(ctx: CanvasRenderingContext2D, x: number, y: number, time: number) {
  const f = Math.floor(time * 8) % 2;
  px(ctx, C.fire, x + 4 - f, y + 4, 8, 10);
  px(ctx, C.fire, x + 6 + f, y + 1, 4, 4);
  px(ctx, C.fireCore, x + 6, y + 8, 4, 6);
}

export function drawSage(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, C.robe, x + 3, y + 5, 10, 11);
  px(ctx, C.skin, x + 5, y + 1, 6, 5);
  px(ctx, C.white, x + 5, y + 5, 6, 4);
  px(ctx, C.black, x + 6, y + 3, 1, 1);
  px(ctx, C.black, x + 9, y + 3, 1, 1);
}

export function drawSwordItem(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, C.steel, x + 7, y + 1, 2, 10);
  px(ctx, C.gold, x + 4, y + 11, 8, 2);
  px(ctx, C.hair, x + 7, y + 13, 2, 3);
}

export function drawScroll(ctx: CanvasRenderingContext2D, x: number, y: number, time: number) {
  const glow = Math.floor(time * 3) % 2;
  px(ctx, glow ? C.gold : C.fireCore, x + 2, y + 3, 12, 10);
  px(ctx, C.hair, x + 1, y + 2, 2, 12);
  px(ctx, C.hair, x + 13, y + 2, 2, 12);
  ctx.fillStyle = C.blobDark;
  ctx.font = 'bold 8px sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('作', x + 4, y + 11);
}

export function drawHud(ctx: CanvasRenderingContext2D, width: number, hp: number, maxHp: number, gems: number, hasSword: boolean, place: string) {
  px(ctx, C.black, 0, 0, width, 24);
  ctx.font = 'bold 8px ui-monospace, Menlo, monospace';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#d1f7ff';
  ctx.fillText(place, 4, 1);
  drawGem(ctx, 4, 9, 0);
  ctx.fillStyle = '#d1f7ff';
  ctx.fillText(`×${String(gems).padStart(2, '0')}`, 18, 14);
  ctx.strokeStyle = '#2a6bd8';
  ctx.strokeRect(84.5, 3.5, 17, 19);
  if (hasSword) drawSwordItem(ctx, 85, 5);
  ctx.fillStyle = '#ff2a6d';
  ctx.fillText('-LIFE-', 160, 4);
  for (let i = 0; i < maxHp / 2; i += 1) {
    const left = hp - i * 2;
    drawHeart(ctx, 160 + i * 9, 13, left >= 2 ? 2 : left === 1 ? 1 : 0);
  }
}
