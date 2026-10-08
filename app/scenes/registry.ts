import type { ComponentType } from 'react';
import type { MountScene } from './canvas-scene';
import type { SceneId } from './scene-ids';

export interface ExperienceProps {
  onShuffle: () => void;
  onExit: () => void;
}

interface SceneInfo {
  id: SceneId;
  label: string;
  kanji: string;
  hint: string;
}

/**
 * - A background scene draws behind the profile.
 * - An experience replaces the profile in the center of the page and owns the keyboard.
 * - `layout` sets the space of an experience:
 *   - `center` (default) replaces the profile only.
 *   - `fill` covers the page, and the navigation and corner links stay on top.
 *   - `immersive` covers the page and hides the navigation and corner links.
 */
export type Scene =
  | (SceneInfo & { kind: 'css' })
  | (SceneInfo & { kind: 'canvas'; load: () => Promise<{ default: MountScene }> })
  | (SceneInfo & { kind: 'experience'; layout?: 'center' | 'fill' | 'immersive'; load: () => Promise<{ default: ComponentType<ExperienceProps> }> });

export const scenes: Scene[] = [
  { id: 'standby', kind: 'css', label: 'Standby', kanji: '待機', hint: 'Grille de veille' },
  { id: 'rain', kind: 'canvas', label: 'Sakuga rain', kanji: '作画', hint: 'Bouge la souris dans la pluie', load: () => import('./rain') },
  {
    id: 'quest',
    kind: 'experience',
    label: 'Quest of Ariland',
    kanji: '冒険',
    hint: 'Clique dans le jeu, Entrée pour démarrer, flèches ou ZQSD pour bouger, Espace pour frapper',
    load: () => import('~/experiences/quest/quest'),
  },
  { id: 'blocks', kind: 'experience', layout: 'fill', label: 'Blocks', kanji: '落ち物', hint: '← → bouger, ↑ tourner, ↓ descendre, Espace lâcher', load: () => import('~/experiences/blocks') },
  { id: 'cycles', kind: 'experience', layout: 'fill', label: 'Neon cycles', kanji: '光速', hint: 'Flèches ou ZQSD pour tourner, enferme les autres motos', load: () => import('~/experiences/cycles') },
  { id: 'sakugabooru', kind: 'experience', label: 'Sakugabooru', kanji: '作画ブール', hint: 'Cherche un tag ou un animateur', load: () => import('~/experiences/sakugabooru') },
  {
    id: 'mines',
    kind: 'experience',
    layout: 'fill',
    label: 'Mines',
    kanji: '地雷',
    hint: 'Clic pour creuser, clic droit pour un drapeau, glisse pour explorer',
    load: () => import('~/experiences/mines'),
  },
  {
    id: 'studio',
    kind: 'experience',
    layout: 'immersive',
    label: 'Genga studio',
    kanji: '原画',
    hint: "Dessine, ajoute des frames, lis l'animation",
    load: () => import('~/experiences/studio/studio'),
  },
  { id: 'terminal', kind: 'experience', layout: 'immersive', label: 'Terminal', kanji: '端末', hint: 'Tape help', load: () => import('~/experiences/terminal') },
];

let bag: number[] = [];

/**
 * Picks the next scene from a shuffled bag: every scene comes once before the bag refills.
 * The current scene never comes twice in a row, also across two bags.
 */
export function pickOther(currentIndex: number) {
  bag = bag.filter((i) => i !== currentIndex);
  if (!bag.length) {
    bag = scenes.map((_, i) => i).filter((i) => i !== currentIndex);
    for (let k = bag.length - 1; k > 0; k -= 1) {
      const j = Math.floor(Math.random() * (k + 1));
      [bag[k], bag[j]] = [bag[j], bag[k]];
    }
  }
  return bag.pop()!;
}
