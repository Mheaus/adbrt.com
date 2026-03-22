import { useEffect, useRef, useState } from 'react';
import { Shader, ConcentricSpin, FilmGrain, Plasma } from 'shaders/react';

export default function GradientBackground() {
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
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

  // Scroll drives warp, density, and concentric spin intensity
  const warp = 0.45 + Math.sin(scroll) * 0.25;
  const density = 0.6 + Math.sin(scroll * 0.7) * 0.3;
  const spinIntensity = 60 + Math.sin(scroll * 1.2) * 30;

  return (
    <Shader className="absolute inset-0">
      <Plasma
        balance={35}
        colorA="#b5473c"
        colorB="#06030a"
        colorSpace="oklab"
        contrast={0.7}
        density={density}
        intensity={2}
        speed={1.2}
        warp={warp}
      />
      <ConcentricSpin
        center={{ x: 0.5, y: 1 }}
        intensity={spinIntensity}
        rings={5}
        smoothness={0.06}
        speedRandomness={1}
      />
      <FilmGrain strength={0.05} />
    </Shader>
  );
}
