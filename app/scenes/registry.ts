import type { ComponentType } from 'react';
import type { MountScene } from './canvas-scene';

interface SceneInfo {
  id: string;
  label: string;
  kanji: string;
  hint: string;
}

export type Scene =
  | (SceneInfo & { kind: 'css' })
  | (SceneInfo & { kind: 'canvas'; load: () => Promise<{ default: MountScene }> })
  | (SceneInfo & { kind: 'react'; load: () => Promise<{ default: ComponentType }> });

export const scenes: Scene[] = [
  { id: 'clean', kind: 'css', label: 'Standby', kanji: '待機', hint: 'Grille de veille' },
  { id: 'rain', kind: 'canvas', label: 'Sakuga rain', kanji: '作画', hint: 'Bouge la souris dans la pluie', load: () => import('./rain') },
  { id: 'speedlines', kind: 'canvas', label: 'Speed lines', kanji: '集中線', hint: 'Clique pour une impact frame', load: () => import('./speedlines') },
  { id: 'itano', kind: 'canvas', label: 'Itano circus', kanji: '板野サーカス', hint: 'Les missiles suivent ta souris, clique pour tirer', load: () => import('./itano') },
  { id: 'genga', kind: 'canvas', label: 'Key animation', kanji: '原画', hint: 'Clique pour sauter des dessins', load: () => import('./genga') },
  { id: 'plasma', kind: 'react', label: 'Plasma', kanji: 'プラズマ', hint: 'Fais défiler pour déformer', load: () => import('~/components/gradient-shader-scene') },
];

export function pickOther(currentIndex: number) {
  const next = Math.floor(Math.random() * (scenes.length - 1));
  return next >= currentIndex ? next + 1 : next;
}
