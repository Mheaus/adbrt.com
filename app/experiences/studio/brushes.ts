export type BrushId = 'pen' | 'pencil' | 'marker' | 'airbrush' | 'ink' | 'eraser';

type Dab = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, angle: number, color: string) => void;

export type Brush = {
  id: BrushId;
  label: string;
  icon: string;
  key: string;
  /** Distance between two dabs, as a fraction of the brush size. */
  spacing: number;
  /** If true, the pen pressure changes the size of the dab. */
  pressureSize: boolean;
  dab: Dab;
};

const disc: Dab = (ctx, x, y, radius, _angle, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2);
  ctx.fill();
};

const grain: Dab = (ctx, x, y, radius, _angle, color) => {
  ctx.fillStyle = color;
  const dots = Math.max(3, Math.round(radius * radius * 0.9));
  for (let i = 0; i < dots; i += 1) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    ctx.globalAlpha = 0.35 + Math.random() * 0.4;
    ctx.fillRect(x + Math.cos(a) * r, y + Math.sin(a) * r, 1, 1);
  }
  ctx.globalAlpha = 1;
};

const soft: Dab = (ctx, x, y, radius, _angle, color) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, color);
  g.addColorStop(1, 'transparent');
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = g;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.globalAlpha = 1;
};

const nib: Dab = (ctx, x, y, radius, angle, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.5, radius), Math.max(0.5, radius * 0.28), Math.PI / 4 + angle * 0.15, 0, Math.PI * 2);
  ctx.fill();
};

export const BRUSHES: Brush[] = [
  { id: 'pen', label: 'Plume', icon: 'ri:pencil-line', key: 'b', spacing: 0.12, pressureSize: true, dab: disc },
  { id: 'pencil', label: 'Crayon', icon: 'ri:brush-line', key: 'n', spacing: 0.25, pressureSize: true, dab: grain },
  { id: 'marker', label: 'Marqueur', icon: 'ri:mark-pen-line', key: 'm', spacing: 0.1, pressureSize: false, dab: disc },
  { id: 'airbrush', label: 'Aérographe', icon: 'ri:blur-off-line', key: 'a', spacing: 0.15, pressureSize: false, dab: soft },
  { id: 'ink', label: 'Encre', icon: 'ri:quill-pen-line', key: 'i', spacing: 0.08, pressureSize: true, dab: nib },
  { id: 'eraser', label: 'Gomme', icon: 'ri:eraser-line', key: 'e', spacing: 0.12, pressureSize: false, dab: disc },
];

type Point = { x: number; y: number; pressure: number };

/** Stamps dabs at a regular distance along the pointer path, so fast moves leave no gaps. */
export class Stroke {
  private last: Point | null = null;
  private carry = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private brush: Brush,
    private size: number,
    private color: string,
  ) {}

  private radius(pressure: number) {
    const scale = this.brush.pressureSize ? 0.25 + 0.75 * pressure : 1;
    return (this.size / 2) * scale;
  }

  add(point: Point) {
    const last = this.last;
    this.last = point;
    if (!last) {
      this.brush.dab(this.ctx, point.x, point.y, this.radius(point.pressure), 0, this.color);
      return;
    }
    const dx = point.x - last.x;
    const dy = point.y - last.y;
    const distance = Math.hypot(dx, dy);
    const step = Math.max(0.5, this.size * this.brush.spacing);
    const angle = Math.atan2(dy, dx);
    let travelled = step - this.carry;
    while (travelled <= distance) {
      const k = travelled / distance;
      const pressure = last.pressure + (point.pressure - last.pressure) * k;
      this.brush.dab(this.ctx, last.x + dx * k, last.y + dy * k, this.radius(pressure), angle, this.color);
      travelled += step;
    }
    this.carry = distance - (travelled - step);
  }
}
