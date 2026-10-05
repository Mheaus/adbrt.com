import { canvasScene, densityCount, palette } from './canvas-scene';

// Anime keys often animate "on twos": one new drawing every two frames at 24 fps.
const DRAWING_SECONDS = 2 / 24;
// Two drawings keep the impact under three flashes per second (WCAG 2.3.1).
const IMPACT_DRAWINGS = 2;
const IMPACT_COOLDOWN_MS = 1000;
const FOCUS_Y = 0.42;

export default canvasScene((ctx, initialWidth, initialHeight) => {
  let lines = densityCount(initialWidth, initialHeight, 160, 220);
  let clock = DRAWING_SECONDS;
  let impact = 0;
  let lastImpact = -Infinity;
  let focus = { x: initialWidth / 2, y: initialHeight * FOCUS_Y };

  const drawLines = (w: number, h: number, ink: string, accent: string) => {
    const reach = Math.hypot(w, h);
    const inner = Math.min(w, h) * 0.26;
    for (let i = 0; i < lines; i += 1) {
      const angle = (i / lines) * Math.PI * 2 + Math.random() * 0.03;
      const start = inner + Math.random() * inner * 0.9;
      const spread = 0.002 + Math.random() * 0.01;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(focus.x + cos * start, focus.y + sin * start);
      ctx.lineTo(focus.x + Math.cos(angle - spread) * reach, focus.y + Math.sin(angle - spread) * reach);
      ctx.lineTo(focus.x + Math.cos(angle + spread) * reach, focus.y + Math.sin(angle + spread) * reach);
      ctx.closePath();
      ctx.fillStyle = Math.random() < 0.07 ? accent : ink;
      ctx.fill();
    }
  };

  return {
    resize(w, h) {
      lines = densityCount(w, h, 160, 220);
      clock = DRAWING_SECONDS;
    },
    press(x, y) {
      const now = performance.now();
      if (now - lastImpact < IMPACT_COOLDOWN_MS) return;
      lastImpact = now;
      impact = IMPACT_DRAWINGS;
      focus = { x, y };
      clock = DRAWING_SECONDS;
    },
    frame({ width: w, height: h, delta, pointer }) {
      clock += delta;
      if (clock < DRAWING_SECONDS) return;
      clock = 0;

      const target = pointer.active && !impact ? { x: w / 2 + (pointer.x - w / 2) * 0.15, y: h * FOCUS_Y + (pointer.y - h * FOCUS_Y) * 0.15 } : impact ? focus : { x: w / 2, y: h * FOCUS_Y };
      focus = { x: focus.x + (target.x - focus.x) * 0.3, y: focus.y + (target.y - focus.y) * 0.3 };

      if (impact > 0) {
        const inverted = impact % 2 === 0;
        ctx.fillStyle = inverted ? palette.ice : palette.magenta;
        ctx.fillRect(0, 0, w, h);
        drawLines(w, h, palette.void, inverted ? palette.magenta : palette.ice);
        impact -= 1;
        return;
      }

      ctx.fillStyle = palette.void;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.16;
      drawLines(w, h, palette.ice, palette.cyan);
      ctx.globalAlpha = 1;
    },
  };
});
