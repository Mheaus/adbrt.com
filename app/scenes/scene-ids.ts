/** Each scene has its own page. Standby is the home page, so it has no path segment. */
export const SCENE_IDS = ['standby', 'rain', 'quest', 'blocks', 'cycles', 'sakugabooru', 'mines', 'studio', 'terminal'] as const;

export type SceneId = (typeof SCENE_IDS)[number];

export const isSceneId = (value: string): value is SceneId => (SCENE_IDS as readonly string[]).includes(value);

export const scenePath = (id: SceneId) => (id === 'standby' ? '/' : `/${id}`);
