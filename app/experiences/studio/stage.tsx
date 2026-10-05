import * as React from 'react';
import { BRUSHES, Stroke, type BrushId } from './brushes';
import { hsvToRgb, hsvaToCss, type Hsva, type Rgb } from './color';
import { context2d, createLayer, DOC_HEIGHT, DOC_WIDTH, floodFill, type AnimationDoc } from './document';
import { composeFrame, flatten, type Onion, type Paper } from './render';

export type Tool = BrushId | 'fill' | 'picker';

export type StageSettings = {
  tool: Tool;
  color: Hsva;
  size: number;
  opacity: number;
  smoothing: number;
  paper: Paper;
  onion: Onion | null;
  /** The frame to show. During playback it differs from the frame being edited. */
  shownFrame: number;
  playing: boolean;
};

type StageProps = StageSettings & {
  doc: AnimationDoc;
  onCommit: () => void;
  onPick: (color: Rgb) => void;
};

type View = { scale: number; x: number; y: number };

const Stage = ({ doc, onCommit, onPick, ...settings }: StageProps) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const latest = React.useRef({ settings, onCommit, onPick });
  latest.current = { settings, onCommit, onPick };
  const requestPaint = React.useRef(() => {});

  React.useEffect(() => requestPaint.current(), [settings, doc.version]);

  React.useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d')!;
    const buffer = createLayer();
    const bufferCtx = context2d(buffer);
    let view: View = { scale: 1, x: 0, y: 0 };
    let dpr = 1;
    let raf = 0;
    let cursor: { x: number; y: number } | null = null;
    let active: { id: number; stroke: Stroke; smooth: { x: number; y: number }; erase: boolean } | null = null;

    const paint = () => {
      const s = latest.current.settings;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#0c0e11';
      ctx.fillRect(0, 0, el.width, el.height);
      ctx.setTransform(dpr * view.scale, 0, 0, dpr * view.scale, dpr * view.x, dpr * view.y);
      const live = active ? { buffer, opacity: s.opacity * (active.erase ? 1 : s.color.a), erase: active.erase } : null;
      composeFrame(ctx, doc, s.shownFrame, s.paper, s.playing ? null : s.onion, live);
      if (cursor && !s.playing && s.tool !== 'fill' && s.tool !== 'picker') {
        ctx.strokeStyle = s.paper === 'dark' ? 'rgb(209 247 255 / 0.7)' : 'rgb(20 23 27 / 0.6)';
        ctx.lineWidth = 1 / view.scale;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, Math.max(1, s.size / 2), 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    requestPaint.current = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(el.clientWidth * dpr);
      el.height = Math.round(el.clientHeight * dpr);
      const scale = Math.min(el.clientWidth / DOC_WIDTH, el.clientHeight / DOC_HEIGHT);
      view = { scale, x: (el.clientWidth - DOC_WIDTH * scale) / 2, y: (el.clientHeight - DOC_HEIGHT * scale) / 2 };
      requestPaint.current();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    const toDoc = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: (e.clientX - r.left - view.x) / view.scale, y: (e.clientY - r.top - view.y) / view.scale };
    };
    const pressureOf = (e: PointerEvent) => (e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 1);
    const inside = (p: { x: number; y: number }) => p.x >= 0 && p.y >= 0 && p.x < DOC_WIDTH && p.y < DOC_HEIGHT;

    const onDown = (e: PointerEvent) => {
      const s = latest.current.settings;
      if (s.playing || e.button > 0) return;
      const p = toDoc(e);
      if (!inside(p)) return;
      if (s.tool === 'picker' || e.altKey) {
        const [r, g, b] = context2d(flatten(doc, doc.current, s.paper)).getImageData(Math.floor(p.x), Math.floor(p.y), 1, 1).data;
        latest.current.onPick({ r, g, b });
        return;
      }
      if (s.tool === 'fill') {
        const { r, g, b } = hsvToRgb(s.color);
        doc.beginPaint();
        floodFill(doc.frame, p.x, p.y, [r, g, b, Math.round(s.color.a * s.opacity * 255)]);
        doc.endPaint();
        latest.current.onCommit();
        return;
      }
      const brush = BRUSHES.find((b) => b.id === s.tool)!;
      el.setPointerCapture(e.pointerId);
      bufferCtx.clearRect(0, 0, DOC_WIDTH, DOC_HEIGHT);
      const stroke = new Stroke(bufferCtx, brush, s.size, hsvaToCss({ ...s.color, a: 1 }));
      stroke.add({ ...p, pressure: pressureOf(e) });
      active = { id: e.pointerId, stroke, smooth: p, erase: brush.id === 'eraser' };
      requestPaint.current();
    };

    const onMove = (e: PointerEvent) => {
      cursor = toDoc(e);
      if (active && e.pointerId === active.id) {
        const follow = 1 - latest.current.settings.smoothing;
        for (const ev of e.getCoalescedEvents?.() ?? [e]) {
          const p = toDoc(ev);
          active.smooth = { x: active.smooth.x + (p.x - active.smooth.x) * follow, y: active.smooth.y + (p.y - active.smooth.y) * follow };
          active.stroke.add({ ...active.smooth, pressure: pressureOf(ev) });
        }
      }
      requestPaint.current();
    };

    const onUp = (e: PointerEvent) => {
      if (!active || e.pointerId !== active.id) return;
      const s = latest.current.settings;
      active.stroke.add({ ...toDoc(e), pressure: pressureOf(e) });
      doc.beginPaint();
      const target = context2d(doc.frame);
      target.globalCompositeOperation = active.erase ? 'destination-out' : 'source-over';
      target.globalAlpha = s.opacity * (active.erase ? 1 : s.color.a);
      target.drawImage(buffer, 0, 0);
      target.globalAlpha = 1;
      target.globalCompositeOperation = 'source-over';
      doc.endPaint();
      active = null;
      latest.current.onCommit();
      requestPaint.current();
    };

    const onLeave = () => {
      cursor = null;
      requestPaint.current();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [doc]);

  const pointer = settings.tool === 'picker' ? 'cursor-copy' : settings.tool === 'fill' ? 'cursor-cell' : 'cursor-none';
  return <canvas ref={canvas} aria-label="Toile de dessin" className={`h-full w-full touch-none ${settings.playing ? 'cursor-default' : pointer}`} />;
};

export default Stage;
