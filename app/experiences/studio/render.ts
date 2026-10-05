import { createLayer, context2d, DOC_HEIGHT, DOC_WIDTH, type AnimationDoc } from './document';

export const PAPERS = {
  dark: '#14171b',
  light: '#f4f1ea',
} as const;

export type Paper = keyof typeof PAPERS;

export type Onion = { before: number; after: number };

// Animators trace with a red pencil for the previous drawing and a blue one for the next one.
const ONION_BEFORE = '#ff2a6d';
const ONION_AFTER = '#05d9e8';

const tintCache = new WeakMap<HTMLCanvasElement, { version: number; color: string; canvas: HTMLCanvasElement }>();

const tinted = (doc: AnimationDoc, frame: HTMLCanvasElement, color: string) => {
  const version = doc.frameVersion(frame);
  const hit = tintCache.get(frame);
  if (hit && hit.version === version && hit.color === color) return hit.canvas;
  const canvas = hit?.canvas ?? createLayer();
  const ctx = context2d(canvas);
  ctx.globalCompositeOperation = 'copy';
  ctx.drawImage(frame, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, DOC_WIDTH, DOC_HEIGHT);
  ctx.globalCompositeOperation = 'source-over';
  tintCache.set(frame, { version, color, canvas });
  return canvas;
};

export type Live = { buffer: HTMLCanvasElement; opacity: number; erase: boolean };

const eraseScratch = typeof document === 'undefined' ? null : createLayer();

/** Draws the paper, the onion skins, the frame and the stroke in progress, in document coordinates. */
export const composeFrame = (ctx: CanvasRenderingContext2D, doc: AnimationDoc, index: number, paper: Paper, onion: Onion | null, live: Live | null) => {
  ctx.fillStyle = PAPERS[paper];
  ctx.fillRect(0, 0, DOC_WIDTH, DOC_HEIGHT);

  if (onion) {
    const skins: [number, string][] = [];
    for (let k = onion.before; k >= 1; k -= 1) skins.push([index - k, ONION_BEFORE]);
    for (let k = onion.after; k >= 1; k -= 1) skins.push([index + k, ONION_AFTER]);
    for (const [i, color] of skins) {
      const frame = doc.frames[i];
      if (!frame) continue;
      const distance = Math.abs(i - index);
      ctx.globalAlpha = 0.4 / distance;
      ctx.drawImage(tinted(doc, frame, color), 0, 0);
    }
    ctx.globalAlpha = 1;
  }

  const frame = doc.frames[index];
  if (live?.erase && eraseScratch) {
    const scratch = context2d(eraseScratch);
    scratch.globalCompositeOperation = 'copy';
    scratch.drawImage(frame, 0, 0);
    scratch.globalCompositeOperation = 'destination-out';
    scratch.globalAlpha = live.opacity;
    scratch.drawImage(live.buffer, 0, 0);
    scratch.globalAlpha = 1;
    scratch.globalCompositeOperation = 'source-over';
    ctx.drawImage(eraseScratch, 0, 0);
    return;
  }
  ctx.drawImage(frame, 0, 0);
  if (live) {
    ctx.globalAlpha = live.opacity;
    ctx.drawImage(live.buffer, 0, 0);
    ctx.globalAlpha = 1;
  }
};

/** Flattens one frame on its paper, for export. */
export const flatten = (doc: AnimationDoc, index: number, paper: Paper) => {
  const canvas = createLayer();
  composeFrame(context2d(canvas), doc, index, paper, null, null);
  return canvas;
};
