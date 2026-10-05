import { context2d, createLayer, DOC_HEIGHT, DOC_WIDTH, type AnimationDoc } from './document';
import { flatten, type Paper } from './render';

const SHEET_COLUMNS = 6;
const VIDEO_LOOPS = 2;

const download = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const toBlob = (canvas: HTMLCanvasElement) => new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Export impossible'))), 'image/png'));

export const exportFrame = async (doc: AnimationDoc, paper: Paper) => download(await toBlob(flatten(doc, doc.current, paper)), `genga-frame-${doc.current + 1}.png`);

export const exportSheet = async (doc: AnimationDoc, paper: Paper) => {
  const columns = Math.min(SHEET_COLUMNS, doc.frames.length);
  const rows = Math.ceil(doc.frames.length / columns);
  const sheet = document.createElement('canvas');
  sheet.width = DOC_WIDTH * columns;
  sheet.height = DOC_HEIGHT * rows;
  const ctx = sheet.getContext('2d')!;
  doc.frames.forEach((_, i) => ctx.drawImage(flatten(doc, i, paper), (i % columns) * DOC_WIDTH, Math.floor(i / columns) * DOC_HEIGHT));
  download(await toBlob(sheet), `genga-planche-${doc.frames.length}f.png`);
};

export const canExportVideo = () => typeof MediaRecorder !== 'undefined' && 'captureStream' in HTMLCanvasElement.prototype;

/** Plays the animation twice into a hidden canvas and records it, because MediaRecorder only captures live drawing. */
export const exportVideo = (doc: AnimationDoc, paper: Paper, fps: number) =>
  new Promise<void>((resolve, reject) => {
    const canvas = createLayer();
    const ctx = context2d(canvas);
    const frames = doc.frames.map((_, i) => flatten(doc, i, paper));
    const type = ['video/webm;codecs=vp9', 'video/webm'].find((t) => MediaRecorder.isTypeSupported(t));
    if (!type) return reject(new Error('Ce navigateur ne sait pas enregistrer de vidéo WebM.'));
    const recorder = new MediaRecorder(canvas.captureStream(fps), { mimeType: type });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      download(new Blob(chunks, { type: 'video/webm' }), `genga-${frames.length}f-${fps}fps.webm`);
      resolve();
    };
    let tick = 0;
    ctx.drawImage(frames[0], 0, 0);
    recorder.start();
    const timer = window.setInterval(() => {
      tick += 1;
      if (tick >= frames.length * VIDEO_LOOPS) {
        clearInterval(timer);
        recorder.stop();
        return;
      }
      ctx.drawImage(frames[tick % frames.length], 0, 0);
    }, 1000 / fps);
  });
