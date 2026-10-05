import { canvasScene, palette } from './canvas-scene';

const GLYPHS = '作画作画サクガソフトウェアアニメ原画動画撮影0123456789ｱｲｳｴｵｶｷｸｹｺ';
const SIZE = 18;
const STEP_SECONDS = 0.06;
const REPEL_RADIUS = 140;

interface Column {
  x: number;
  y: number;
  speed: number;
  hot: boolean;
}

export default canvasScene((ctx, width, height) => {
  let columns: Column[] = [];
  let clock = 0;

  const build = (w: number, h: number) => {
    columns = Array.from({ length: Math.ceil(w / SIZE) }, (_, i) => ({
      x: i * SIZE,
      y: Math.random() * -h,
      speed: 0.6 + Math.random() * 0.8,
      hot: Math.random() < 0.08,
    })).filter((_, i) => i % 2 === 0 || Math.random() < 0.4);
    ctx.fillStyle = palette.void;
    ctx.fillRect(0, 0, w, h);
  };
  build(width, height);

  return {
    resize: build,
    frame({ width: w, height: h, delta, pointer }) {
      clock += delta;
      if (clock < STEP_SECONDS) return;
      clock = 0;

      ctx.fillStyle = 'rgb(26 29 34 / 0.24)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${SIZE - 2}px ui-monospace, 'Hiragino Sans', 'Yu Gothic', monospace`;
      ctx.textBaseline = 'top';

      for (const col of columns) {
        let x = col.x;
        const dx = x - pointer.x;
        const dy = col.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (pointer.active && dist < REPEL_RADIUS) x += (dx / (dist || 1)) * (REPEL_RADIUS - dist) * 0.6;

        const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillStyle = col.hot ? palette.magenta : palette.ice;
        ctx.globalAlpha = 0.55;
        ctx.fillText(glyph, x, col.y);
        ctx.fillStyle = col.hot ? palette.magenta : palette.cyan;
        ctx.globalAlpha = 0.18;
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, col.y - SIZE);
        ctx.globalAlpha = 1;

        col.y += SIZE * col.speed;
        if (col.y > h + SIZE * 4 && Math.random() > 0.96) {
          col.y = -SIZE * (Math.random() * 20);
          col.speed = 0.6 + Math.random() * 0.8;
          col.hot = Math.random() < 0.08;
        }
      }
    },
  };
});
