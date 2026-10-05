import * as React from 'react';
import clsx from 'clsx';
import { HudLabel } from '~/components/hud';
import { palette } from '~/scenes/canvas-scene';
import { animating, draw, newEffects, TIMING, type Effects } from './mines-draw';
import { chordTargets, key, newGame, reveal, toggleFlag, type Game } from './mines-logic';

const DRAG_THRESHOLD = 6;
const LONG_PRESS_MS = 380;

type Press = {
  id: number;
  x: number;
  y: number;
  camX: number;
  camY: number;
  button: number;
  dragging: boolean;
  flagged: boolean;
  timer: number;
};

const Mines = () => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const game = React.useRef<Game>(newGame());
  const recenter = React.useRef<() => void>(() => {});
  const [stats, setStats] = React.useState({ open: 0, flags: 0, lost: false, x: 0, y: 0 });

  React.useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const fx: Effects = newEffects(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const cell = coarse ? 34 : 30;
    const cam = { x: 0, y: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let press: Press | null = null;

    const frame = () => {
      const g = game.current;
      const now = performance.now();
      draw(ctx, g, fx, w, h, cam, cell, now);
      const next = { open: g.open.size, flags: g.flags.size, lost: !!g.exploded, x: Math.round((cam.x + w / 2) / cell), y: Math.round((cam.y + h / 2) / cell) };
      setStats((prev) => (Object.keys(next).every((k) => prev[k as keyof typeof prev] === next[k as keyof typeof next]) ? prev : next));
      raf = animating(fx, now) ? requestAnimationFrame(frame) : 0;
    };
    const paint = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    recenter.current = () => {
      cam.x = -w / 2;
      cam.y = -h / 2;
      Object.assign(fx, newEffects(fx.reducedMotion));
      paint();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const first = w === 0;
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) recenter.current();
      else paint();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    const cellAt = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      return [Math.floor((cx - r.left + cam.x) / cell), Math.floor((cy - r.top + cam.y) / cell)] as const;
    };
    const center = (x: number, y: number) => ({ x: x * cell + cell / 2, y: y * cell + cell / 2 });
    const ripple = (x: number, y: number, color: string) => !fx.reducedMotion && fx.ripples.push({ ...center(x, y), start: performance.now(), color });

    const flag = (x: number, y: number) => {
      if (toggleFlag(game.current, x, y)) fx.flags.set(key(x, y), performance.now());
      ripple(x, y, palette.amber);
      paint();
    };

    const dig = (x: number, y: number) => {
      const g = game.current;
      const now = performance.now();
      const targets = chordTargets(g, x, y);
      const result = reveal(g, x, y);
      for (const cellOpened of result.opened) {
        const delay = fx.reducedMotion ? 0 : Math.min(cellOpened.distance * TIMING.revealStepMs, TIMING.revealMaxDelayMs);
        fx.reveal.set(key(cellOpened.x, cellOpened.y), now + delay);
      }
      if (result.chord === 'refused') for (const k of [...targets, key(x, y)]) fx.deny.set(k, now);
      if (result.exploded) {
        fx.explodedAt = now;
        ripple(g.exploded!.x, g.exploded!.y, palette.magenta);
      } else if (result.opened.length) ripple(x, y, palette.cyan);
      paint();
    };

    const pressCells = (x: number, y: number) => {
      const g = game.current;
      const k = key(x, y);
      fx.pressed = new Set(g.exploded || g.flags.has(k) ? [] : g.open.has(k) ? chordTargets(g, x, y) : [k]);
    };

    const onDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      const current: Press = { id: e.pointerId, x: e.clientX, y: e.clientY, camX: cam.x, camY: cam.y, button: e.button, dragging: false, flagged: false, timer: 0 };
      const [x, y] = cellAt(e.clientX, e.clientY);
      if (e.button === 0) pressCells(x, y);
      if (e.pointerType === 'touch') {
        current.timer = window.setTimeout(() => {
          current.flagged = true;
          fx.pressed.clear();
          flag(x, y);
        }, LONG_PRESS_MS);
      }
      press = current;
      paint();
    };
    const onMove = (e: PointerEvent) => {
      if (!press || e.pointerId !== press.id) {
        if (e.pointerType === 'mouse') {
          const [x, y] = cellAt(e.clientX, e.clientY);
          const hover = key(x, y);
          if (hover !== fx.hover) {
            fx.hover = hover;
            paint();
          }
        }
        return;
      }
      const dx = e.clientX - press.x;
      const dy = e.clientY - press.y;
      if (!press.dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        press.dragging = true;
        clearTimeout(press.timer);
        fx.pressed.clear();
        el.style.cursor = 'grabbing';
      }
      if (!press.dragging) return;
      cam.x = press.camX - dx;
      cam.y = press.camY - dy;
      paint();
    };
    const onUp = (e: PointerEvent) => {
      if (!press || e.pointerId !== press.id) return;
      clearTimeout(press.timer);
      el.style.cursor = '';
      fx.pressed.clear();
      if (!press.dragging && !press.flagged) {
        const [x, y] = cellAt(e.clientX, e.clientY);
        if (press.button === 2) flag(x, y);
        else if (press.button === 0) dig(x, y);
      }
      press = null;
      paint();
    };
    const onLeave = () => {
      fx.hover = null;
      paint();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cam.x += e.deltaX;
      cam.y += e.deltaY;
      paint();
    };
    const onContext = (e: Event) => e.preventDefault();

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('contextmenu', onContext);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('contextmenu', onContext);
    };
  }, []);

  const reset = () => {
    game.current = newGame();
    recenter.current();
  };

  return (
    <div className="absolute inset-0">
      <canvas ref={canvas} aria-label="Champ de mines infini" className="absolute inset-0 h-full w-full cursor-pointer touch-none" />
      <div className="pointer-events-none absolute inset-x-0 top-36 flex justify-center sm:top-5">
        <div className="pointer-events-auto flex items-center gap-4 bg-gunmetal/90 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
          <HudLabel className="text-cyan tabular-nums">Cases {String(stats.open).padStart(4, '0')}</HudLabel>
          <HudLabel className="text-amber tabular-nums">▲ {stats.flags}</HudLabel>
          <button
            type="button"
            onClick={reset}
            className={clsx(
              'cursor-pointer px-3 py-1 font-display text-xs font-bold tracking-widest uppercase ring-1 transition active:scale-[0.97]',
              stats.lost ? 'text-magenta ring-magenta hover:bg-magenta hover:text-void' : 'text-cyan ring-cyan/60 hover:bg-cyan hover:text-void',
            )}
          >
            {stats.lost ? 'KIA · Rejouer' : 'Reset'}
          </button>
          <HudLabel className="hidden tabular-nums sm:inline">
            X {stats.x} · Y {stats.y}
          </HudLabel>
        </div>
      </div>
    </div>
  );
};

export default Mines;
