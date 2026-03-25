import { memo, useEffect, useRef, useState } from 'react';
import { Shader, ConcentricSpin, Plasma } from 'shaders/react';

interface ShaderProps {
  warp: number;
  density: number;
  spinIntensity: number;
}

const ShaderScene = memo(function ShaderScene() {
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);
  const [props, setProps] = useState<ShaderProps>({ warp: 0.45, density: 0.6, spinIntensity: 60 });

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      scrollRef.current += e.deltaY * 0.0003;
    };
    window.addEventListener('wheel', onWheel, { passive: true });

    let raf: number;
    let lastFlush = 0;

    const tick = (now: number) => {
      const prev = smoothRef.current;
      smoothRef.current += (scrollRef.current - prev) * 0.05;

      // Throttle React updates to ~15fps (every 66ms) instead of 60fps
      // The shader's own animation loop runs at full speed regardless
      if (now - lastFlush > 66 && Math.abs(smoothRef.current - prev) > 0.0001) {
        lastFlush = now;
        const s = smoothRef.current;
        setProps({
          warp: 0.45 + Math.sin(s) * 0.25,
          density: 0.6 + Math.sin(s * 0.7) * 0.3,
          spinIntensity: 60 + Math.sin(s * 1.2) * 30,
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Shader className="absolute inset-0">
      <Plasma balance={35} colorA="#b5473c" colorB="#06030a" colorSpace="oklab" contrast={0.7} density={props.density} intensity={2} speed={1.2} warp={props.warp} />
      <ConcentricSpin center={{ x: 0.5, y: 0.415 }} intensity={props.spinIntensity} rings={5} smoothness={0.06} speedRandomness={1} />
    </Shader>
  );
});

export default ShaderScene;
