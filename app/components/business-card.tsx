import { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Icon from './icon';
import { Corners, HudLabel } from './hud';
import clsx from 'clsx';

const socials = [
  { icon: 'ri:linkedin-box-fill', label: 'linkedin.com/in/mathieuadbrt', href: 'https://www.linkedin.com/in/mathieuadbrt/' },
  { icon: 'ri:github-fill', label: 'github.com/Mheaus', href: 'https://github.com/Mheaus' },
];

function CardFront() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg bg-gunmetal p-5 shadow-2xl backface-hidden ring-1 ring-white/10 sm:p-8">
      <Corners className="m-2 text-cyan/70" size="size-2.5" />
      <div className="hazard absolute inset-x-0 top-0 h-1.5 opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-magenta">マチュー・オードベール</p>
          <h2 className="mt-1 font-display text-lg font-bold tracking-wide text-ice uppercase sm:text-2xl">Mathieu Audebert</h2>
          <p className="mt-0.5 font-display text-xs font-semibold tracking-widest text-ice/70 uppercase sm:text-sm">Fullstack Developer</p>
        </div>
        <span className="font-sans text-2xl text-magenta sm:text-3xl" aria-hidden>
          作画
        </span>
      </div>
      <div className="flex flex-col gap-1.5 font-mono text-[11px] text-ice/80 sm:gap-2 sm:text-xs">
        <a href="mailto:contact@sakuga.dev" className="flex items-center gap-2 text-inherit no-underline hover:text-cyan">
          <Icon icon="ri:mail-line" className="size-3.5 shrink-0 text-cyan sm:size-4" />
          contact@sakuga.dev
        </a>
        <a href="https://adbrt.com" className="flex items-center gap-2 text-inherit no-underline hover:text-cyan">
          <Icon icon="ri:external-link-line" className="size-3.5 shrink-0 text-cyan sm:size-4" />
          adbrt.com
        </a>
        <span className="flex items-center gap-2">
          <Icon icon="ri:map-pin-2-line" className="size-3.5 shrink-0 text-cyan sm:size-4" />
          Bordeaux, France
        </span>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-between overflow-hidden rounded-lg bg-gunmetal px-5 py-4 shadow-2xl backface-hidden ring-1 ring-white/10 sm:px-8 sm:py-6"
      style={{ transform: 'rotateY(180deg)' }}
    >
      <Corners className="m-2 text-magenta/70" size="size-2.5" />
      <div className="flex flex-col gap-2 sm:gap-3">
        <HudLabel>Connect</HudLabel>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[9px] text-ice/80 no-underline transition hover:text-cyan sm:gap-3 sm:text-[10px]"
          >
            <Icon icon={s.icon} className="size-4 shrink-0 sm:size-5" />
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{s.label.split('/').pop()}</span>
          </a>
        ))}
        <HudLabel className="mt-1 text-magenta">Sakuga Software</HudLabel>
      </div>
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <div className="p-1.5 sm:p-2.5">
          <QRCodeSVG value="https://adbrt.com" size={70} bgColor="transparent" fgColor="#d1f7ff" level="M" className="sm:hidden" />
          <QRCodeSVG value="https://adbrt.com" size={100} bgColor="transparent" fgColor="#d1f7ff" level="M" className="hidden sm:block" />
        </div>
        <HudLabel>adbrt.com</HudLabel>
      </div>
    </div>
  );
}

interface BusinessCardProps {
  open: boolean;
  onClose: () => void;
}

export default function BusinessCard({ open, onClose }: BusinessCardProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setRotation({ x: 0, y: 0 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    // Prevent touch scrolling on the card area
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    el.addEventListener('touchmove', preventTouch, { passive: false });
    return () => el.removeEventListener('touchmove', preventTouch);
  }, [mounted]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotation((r) => ({ x: r.x - dy * 0.4, y: r.y + dx * 0.4 }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={clsx('fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300', visible ? 'opacity-100' : 'opacity-0')}
      onClick={onClose}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" />
      <div
        ref={containerRef}
        className={clsx('relative select-none transition-all duration-300 w-full max-w-100 touch-none', visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0')}
        style={{ perspective: '1200px' }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative aspect-5/3 w-full cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: dragging.current ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <CardFront />
          <CardBack />
        </div>
        <p className={clsx('mt-4 sm:mt-6 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-dim transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')}>
          Drag to rotate &middot; Click outside to close
        </p>
      </div>
    </div>
  );
}
