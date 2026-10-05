import type { ComponentType } from 'react';
import type { MountScene } from './canvas-scene';

export interface ExperienceProps {
  onShuffle: () => void;
  onExit: () => void;
}

interface SceneInfo {
  id: string;
  label: string;
  kanji: string;
  hint: string;
}

/**
 * - A background scene draws behind the profile.
 * - An experience replaces the profile in the center of the page and owns the keyboard.
 * - A fullscreen experience also hides the navigation and the corner links.
 */
export type Scene =
  | (SceneInfo & { kind: 'css' })
  | (SceneInfo & { kind: 'canvas'; load: () => Promise<{ default: MountScene }> })
  | (SceneInfo & { kind: 'experience'; fullscreen?: boolean; load: () => Promise<{ default: ComponentType<ExperienceProps> }> });

export const scenes: Scene[] = [
  { id: 'standby', kind: 'css', label: 'Standby', kanji: '待機', hint: 'Grille de veille' },
  { id: 'rain', kind: 'canvas', label: 'Sakuga rain', kanji: '作画', hint: 'Bouge la souris dans la pluie', load: () => import('./rain') },
  { id: 'quest', kind: 'experience', label: '8-bit quest', kanji: '冒険', hint: 'Flèches ou ZQSD pour bouger, Espace pour frapper', load: () => import('~/experiences/quest/quest') },
  { id: 'blocks', kind: 'experience', fullscreen: true, label: 'Blocks', kanji: '落ち物', hint: '← → bouger, ↑ tourner, ↓ descendre, Espace lâcher', load: () => import('~/experiences/blocks') },
  { id: 'sakugabooru', kind: 'experience', label: 'Sakugabooru', kanji: '作画ブール', hint: 'Cherche un tag ou un animateur', load: () => import('~/experiences/sakugabooru') },
  {
    id: 'mines',
    kind: 'experience',
    fullscreen: true,
    label: 'Mines',
    kanji: '地雷',
    hint: 'Clic pour creuser, clic droit pour un drapeau, glisse pour explorer',
    load: () => import('~/experiences/mines'),
  },
  { id: 'terminal', kind: 'experience', fullscreen: true, label: 'Terminal', kanji: '端末', hint: 'Tape help', load: () => import('~/experiences/terminal') },
];

export function pickOther(currentIndex: number) {
  const next = Math.floor(Math.random() * (scenes.length - 1));
  return next >= currentIndex ? next + 1 : next;
}
