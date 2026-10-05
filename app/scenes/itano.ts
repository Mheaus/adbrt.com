import { canvasScene, densityCount, palette } from './canvas-scene';

const TRAIL = 26;
const SPEED = 520;
const TURN = 4.2;
const HIT_RADIUS = 36;

interface Missile {
  x: number;
  y: number;
  angle: number;
  wobble: number;
  trail: { x: number; y: number }[];
  hot: boolean;
}

interface Burst {
  x: number;
  y: number;
  age: number;
}

function launchFromEdge(w: number, h: number): Missile {
  const side = (Math.random() * 4) | 0;
  const x = side === 0 ? -20 : side === 1 ? w + 20 : Math.random() * w;
  const y = side === 2 ? -20 : side === 3 ? h + 20 : Math.random() * h;
  return launch(x, y, Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.6);
}

function launch(x: number, y: number, angle: number): Missile {
  return { x, y, angle, wobble: Math.random() * Math.PI * 2, trail: [], hot: Math.random() < 0.25 };
}

export default canvasScene((ctx, initialWidth, initialHeight) => {
  let target = densityCount(initialWidth, initialHeight, 14, 22);
  let missiles = Array.from({ length: target }, () => launchFromEdge(initialWidth, initialHeight));
  let bursts: Burst[] = [];
  let orbit = 0;

  return {
    resize(w, h) {
      target = densityCount(w, h, 14, 22);
    },
    press(x, y) {
      for (let i = 0; i < 12; i += 1) missiles.push(launch(x, y, (i / 12) * Math.PI * 2));
    },
    frame({ width: w, height: h, delta, time, pointer }) {
      orbit += delta;
      const goal = pointer.active ? { x: pointer.x, y: pointer.y } : { x: w / 2 + Math.cos(orbit * 0.7) * w * 0.25, y: h * 0.45 + Math.sin(orbit * 1.1) * h * 0.2 };

      ctx.fillStyle = palette.void;
      ctx.fillRect(0, 0, w, h);

      missiles = missiles.filter((m) => {
        const desired = Math.atan2(goal.y - m.y, goal.x - m.x);
        let turn = desired - m.angle;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        m.angle += Math.max(-TURN * delta, Math.min(TURN * delta, turn)) + Math.sin(time * 6 + m.wobble) * 0.04;
        m.x += Math.cos(m.angle) * SPEED * delta;
        m.y += Math.sin(m.angle) * SPEED * delta;
        m.trail.push({ x: m.x, y: m.y });
        if (m.trail.length > TRAIL) m.trail.shift();

        if (Math.hypot(goal.x - m.x, goal.y - m.y) < HIT_RADIUS) {
          bursts.push({ x: m.x, y: m.y, age: 0 });
          return false;
        }
        return true;
      });
      while (missiles.length < target) missiles.push(launchFromEdge(w, h));

      ctx.lineCap = 'round';
      for (const m of missiles) {
        for (let i = 1; i < m.trail.length; i += 1) {
          const k = i / m.trail.length;
          ctx.strokeStyle = m.hot ? palette.magenta : palette.cyan;
          ctx.globalAlpha = k * 0.5;
          ctx.lineWidth = 1 + (1 - k) * 5;
          ctx.beginPath();
          ctx.moveTo(m.trail[i - 1].x, m.trail[i - 1].y);
          ctx.lineTo(m.trail[i].x, m.trail[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = palette.ice;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      bursts = bursts.filter((b) => {
        b.age += delta;
        const k = b.age / 0.45;
        if (k >= 1) return false;
        ctx.strokeStyle = palette.amber;
        ctx.globalAlpha = 1 - k;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 6 + k * 40, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });
      ctx.globalAlpha = 1;
    },
  };
});
