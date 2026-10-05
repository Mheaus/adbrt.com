import { useEffect, useRef, useState } from 'react';
import type { MountScene } from '~/scenes/canvas-scene';
import type { Scene } from '~/scenes/registry';

function CanvasLayer({ mount }: { mount: MountScene }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? mount(ref.current) : undefined), [mount]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

type Loaded = { id: string; mount: MountScene } | null;

function useSceneModule(scene: Scene): Loaded {
  const [loaded, setLoaded] = useState<Loaded>(null);

  useEffect(() => {
    let cancelled = false;
    if (scene.kind !== 'canvas') {
      setLoaded(null);
      return;
    }
    scene.load().then((m) => !cancelled && setLoaded({ id: scene.id, mount: m.default }));
    return () => {
      cancelled = true;
    };
  }, [scene]);

  return loaded;
}

/**
 * The standby layer is plain CSS and renders on the server, so the first paint needs no JavaScript.
 * Canvas scenes load on demand and fade in over it.
 */
export default function SceneBackground({ scene }: { scene: Scene }) {
  const loaded = useSceneModule(scene);
  const [visibleId, setVisibleId] = useState<string | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisibleId(loaded.id)));
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  const active = loaded && loaded.id === scene.id ? loaded : null;

  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="hud-grid absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute rounded-full border border-cyan/20" style={{ animation: 'placeholder-ping 4s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: `${i * 0.8}s` }} />
        ))}
      </div>
      {active && (
        <div key={active.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: visibleId === active.id ? 1 : 0 }}>
          <CanvasLayer mount={active.mount} />
        </div>
      )}
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
