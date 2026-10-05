export const palette = {
  void: '#1a1d22',
  gunmetal: '#23272e',
  dim: '#5b6371',
  ice: '#d1f7ff',
  magenta: '#ff2a6d',
  cyan: '#05d9e8',
  amber: '#ffb000',
} as const;

export interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

export interface SceneFrame {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  delta: number;
  pointer: Pointer;
}

export interface SceneInstance {
  resize?(width: number, height: number): void;
  frame(f: SceneFrame): void;
  press?(x: number, y: number): void;
}

export type SceneFactory = (ctx: CanvasRenderingContext2D, width: number, height: number) => SceneInstance;

export type MountScene = (canvas: HTMLCanvasElement) => () => void;

const MAX_DPR = 2;

/**
 * Connects a scene to a canvas and returns a cleanup function.
 * If the viewer prefers reduced motion, the scene draws one frame and stops.
 */
export function canvasScene(factory: SceneFactory): MountScene {
  return (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer: Pointer = { x: -9999, y: -9999, active: false };
    let width = 0;
    let height = 0;
    let scene: SceneInstance | null = null;
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (scene) scene.resize?.(width, height);
      else scene = factory(ctx, width, height);
      if (reducedMotion) draw(last);
    };

    const draw = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      scene?.frame({ ctx, width, height, time: now / 1000, delta, pointer });
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reducedMotion || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="dialog"]')) return;
      scene?.press?.(e.clientX, e.clientY);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    start();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  };
}

/** Returns a particle count that scales with the canvas area, so phones draw fewer particles. */
export function densityCount(width: number, height: number, perMegapixel: number, max: number) {
  return Math.min(max, Math.max(8, Math.round(((width * height) / 1_000_000) * perMegapixel)));
}
