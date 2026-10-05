import { canvasScene, palette } from './canvas-scene';

const DRAWING_SECONDS = 2 / 24;
const STRANDS = 9;
const POINTS = 28;
const ONION_SKINS = [
  { offset: -2, color: palette.magenta, alpha: 0.25 },
  { offset: -1, color: palette.cyan, alpha: 0.3 },
];

type Stroke = { x: number; y: number }[];

/** Draws one key drawing: flame-like strands that rise from the bottom of the light table. */
function drawing(index: number, w: number, h: number): Stroke[] {
  const seed = (n: number) => {
    const s = Math.sin(index * 12.9898 + n * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
  const phase = index * 0.55;
  return Array.from({ length: STRANDS }, (_, s) => {
    const baseX = w * (0.18 + (s / (STRANDS - 1)) * 0.64);
    const height = h * (0.35 + seed(s) * 0.3);
    return Array.from({ length: POINTS }, (_, p) => {
      const k = p / (POINTS - 1);
      const sway = Math.sin(phase + s * 0.9 + k * 4) * w * 0.05 * k;
      return { x: baseX + sway + (seed(s * 31 + p) - 0.5) * 3, y: h * 0.96 - k * height };
    });
  });
}

function pencil(ctx: CanvasRenderingContext2D, strokes: Stroke[], color: string, alpha: number) {
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.4;
  ctx.lineJoin = 'round';
  for (const stroke of strokes) {
    ctx.beginPath();
    stroke.forEach((pt, i) => (i ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y)));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function sheet(ctx: CanvasRenderingContext2D, w: number, h: number, index: number) {
  ctx.fillStyle = palette.dim;
  for (const x of [w / 2 - 60, w / 2, w / 2 + 60]) {
    ctx.beginPath();
    ctx.arc(x, 22, x === w / 2 ? 7 : 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.font = '11px ui-monospace, Menlo, monospace';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.fillText(`原画 · CUT 001 · A-${String((index % 24) + 1).padStart(2, '0')} · 24 FPS ON TWOS`, w / 2, 40);
  ctx.textAlign = 'left';
}

export default canvasScene(() => {
  let clock = DRAWING_SECONDS;
  let index = 0;

  return {
    press() {
      index += 6;
      clock = DRAWING_SECONDS;
    },
    frame({ ctx, width: w, height: h, delta }) {
      clock += delta;
      if (clock < DRAWING_SECONDS) return;
      clock = 0;
      index += 1;

      ctx.fillStyle = palette.void;
      ctx.fillRect(0, 0, w, h);
      for (const skin of ONION_SKINS) pencil(ctx, drawing(index + skin.offset, w, h), skin.color, skin.alpha);
      pencil(ctx, drawing(index, w, h), palette.ice, 0.45);
      sheet(ctx, w, h, index);
    },
  };
});
