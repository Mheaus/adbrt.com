import { useEffect, useRef, useState } from 'react';
import { Shader, ConcentricSpin, FilmGrain, Plasma, CursorRipples } from 'shaders/react';

export default function GradientBackground() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));

    const onWheel = (e: WheelEvent) => {
      scrollRef.current += e.deltaY * 0.0003;
    };
    window.addEventListener('wheel', onWheel, { passive: true });

    let raf: number;
    const tick = () => {
      smoothRef.current += (scrollRef.current - smoothRef.current) * 0.05;
      setScroll(smoothRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  const warp = 0.45 + Math.sin(scroll) * 0.25;
  const density = 0.6 + Math.sin(scroll * 0.7) * 0.3;
  const spinIntensity = 60 + Math.sin(scroll * 1.2) * 30;

  return (
    <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: visible ? 1 : 0 }}>
      <Shader className="absolute inset-0">
        <Plasma balance={35} colorA="#b5473c" colorB="#06030a" colorSpace="oklab" contrast={0.7} density={density} intensity={2} speed={1.2} warp={warp} />
        <CursorRipples />
        <ConcentricSpin center={{ x: 0.5, y: 0.415 }} intensity={spinIntensity} rings={5} smoothness={0.06} speedRandomness={1} />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
}
