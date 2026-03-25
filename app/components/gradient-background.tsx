import { useEffect, useState, lazy, Suspense } from 'react';

const ShaderScene = lazy(() => import('./gradient-shader-scene'));

export default function GradientBackground() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: visible ? 1 : 0 }}>
      <Suspense fallback={null}>
        <ShaderScene />
      </Suspense>
    </div>
  );
}
