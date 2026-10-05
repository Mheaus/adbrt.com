export const DOC_WIDTH = 1280;
export const DOC_HEIGHT = 720;
const HISTORY_LIMIT = 40;

export const createLayer = () => {
  const canvas = document.createElement('canvas');
  canvas.width = DOC_WIDTH;
  canvas.height = DOC_HEIGHT;
  return canvas;
};

export const context2d = (canvas: HTMLCanvasElement) => canvas.getContext('2d', { willReadFrequently: true })!;

type Snapshot = {
  frames: HTMLCanvasElement[];
  current: number;
  pixels?: { canvas: HTMLCanvasElement; data: ImageData };
};

/**
 * Holds the animation frames and the undo history.
 * A history entry keeps references to the frame canvases, so a deleted frame comes back on undo.
 */
export class AnimationDoc {
  frames: HTMLCanvasElement[] = [createLayer()];
  current = 0;
  /** Increases after each change. The UI reads it to know when to redraw thumbnails. */
  version = 0;
  private versions = new WeakMap<HTMLCanvasElement, number>();
  private undoStack: Snapshot[] = [];
  private redoStack: Snapshot[] = [];

  get frame() {
    return this.frames[this.current];
  }

  frameVersion(canvas: HTMLCanvasElement) {
    return this.versions.get(canvas) ?? 0;
  }

  private touch(canvas?: HTMLCanvasElement) {
    this.version += 1;
    if (canvas) this.versions.set(canvas, this.version);
  }

  private snapshot(withPixels: boolean): Snapshot {
    const canvas = this.frame;
    return {
      frames: [...this.frames],
      current: this.current,
      pixels: withPixels ? { canvas, data: context2d(canvas).getImageData(0, 0, DOC_WIDTH, DOC_HEIGHT) } : undefined,
    };
  }

  private record(withPixels: boolean) {
    this.undoStack.push(this.snapshot(withPixels));
    if (this.undoStack.length > HISTORY_LIMIT) this.undoStack.shift();
    this.redoStack = [];
  }

  /** Call before a change to the pixels of the current frame. */
  beginPaint() {
    this.record(true);
  }

  endPaint() {
    this.touch(this.frame);
  }

  private restore(from: Snapshot[], to: Snapshot[]) {
    const entry = from.pop();
    if (!entry) return;
    const target = entry.pixels?.canvas;
    to.push({
      frames: [...this.frames],
      current: this.current,
      pixels: target ? { canvas: target, data: context2d(target).getImageData(0, 0, DOC_WIDTH, DOC_HEIGHT) } : undefined,
    });
    this.frames = entry.frames;
    this.current = Math.min(entry.current, this.frames.length - 1);
    if (entry.pixels) context2d(entry.pixels.canvas).putImageData(entry.pixels.data, 0, 0);
    this.touch(target);
  }

  undo() {
    this.restore(this.undoStack, this.redoStack);
  }

  redo() {
    this.restore(this.redoStack, this.undoStack);
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }

  addFrame(duplicate: boolean) {
    this.record(false);
    const layer = createLayer();
    if (duplicate) context2d(layer).drawImage(this.frame, 0, 0);
    this.frames.splice(this.current + 1, 0, layer);
    this.current += 1;
    this.touch(layer);
  }

  removeFrame() {
    if (this.frames.length === 1) return;
    this.record(false);
    this.frames.splice(this.current, 1);
    this.current = Math.min(this.current, this.frames.length - 1);
    this.touch();
  }

  moveFrame(offset: -1 | 1) {
    const target = this.current + offset;
    if (target < 0 || target >= this.frames.length) return;
    this.record(false);
    [this.frames[this.current], this.frames[target]] = [this.frames[target], this.frames[this.current]];
    this.current = target;
    this.touch();
  }

  select(index: number) {
    this.current = (index + this.frames.length) % this.frames.length;
    this.touch();
  }

  clearFrame() {
    this.beginPaint();
    context2d(this.frame).clearRect(0, 0, DOC_WIDTH, DOC_HEIGHT);
    this.endPaint();
  }
}

/** Fills the area around (x, y) that has the same color as (x, y), within a tolerance. */
export const floodFill = (canvas: HTMLCanvasElement, x: number, y: number, [r, g, b, a]: [number, number, number, number], tolerance = 48) => {
  const ctx = context2d(canvas);
  const image = ctx.getImageData(0, 0, DOC_WIDTH, DOC_HEIGHT);
  const data = image.data;
  const start = (Math.floor(y) * DOC_WIDTH + Math.floor(x)) * 4;
  const target = [data[start], data[start + 1], data[start + 2], data[start + 3]];
  if (target[0] === r && target[1] === g && target[2] === b && target[3] === a) return;
  const matches = (i: number) => Math.abs(data[i] - target[0]) + Math.abs(data[i + 1] - target[1]) + Math.abs(data[i + 2] - target[2]) + Math.abs(data[i + 3] - target[3]) <= tolerance;
  const seen = new Uint8Array(DOC_WIDTH * DOC_HEIGHT);
  const stack = [Math.floor(y) * DOC_WIDTH + Math.floor(x)];
  while (stack.length) {
    const p = stack.pop()!;
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * 4;
    if (!matches(i)) continue;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
    const px = p % DOC_WIDTH;
    if (px > 0) stack.push(p - 1);
    if (px < DOC_WIDTH - 1) stack.push(p + 1);
    if (p >= DOC_WIDTH) stack.push(p - DOC_WIDTH);
    if (p < DOC_WIDTH * (DOC_HEIGHT - 1)) stack.push(p + DOC_WIDTH);
  }
  ctx.putImageData(image, 0, 0);
};
