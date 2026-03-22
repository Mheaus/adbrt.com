import { useState, useRef, useCallback, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Icon from './icon';
import clsx from 'clsx';

const socials = [
  { icon: 'ri:linkedin-box-fill', label: 'linkedin.com/in/mathieuadbrt', href: 'https://www.linkedin.com/in/mathieuadbrt/' },
  { icon: 'ri:github-fill', label: 'github.com/Mheaus', href: 'https://github.com/Mheaus' },
];

function CardFront() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-linear-to-br from-[#1a1215] to-[#0d0a0e] p-8 shadow-2xl backface-hidden border border-white/10">
      <div>
        <h2 className="text-2xl font-bold text-white">Mathieu Audebert</h2>
        <p className="mt-1 text-sm text-gray-400">Fullstack Developer</p>
      </div>
      <div className="flex flex-col gap-2 text-sm text-gray-300">
        <a href="mailto:contact@sakuga.dev" className="flex items-center gap-2 no-underline text-inherit hover:text-white">
          <Icon icon="ri:earth-line" className="h-4 w-4 text-gray-500" />
          contact@sakuga.dev
        </a>
        <a href="https://adbrt.com" className="flex items-center gap-2 no-underline text-inherit hover:text-white">
          <Icon icon="ri:external-link-line" className="h-4 w-4 text-gray-500" />
          adbrt.com
        </a>
        <span className="flex items-center gap-2">
          <Icon icon="ri:earth-line" className="h-4 w-4 text-gray-500" />
          Bordeaux, France
        </span>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-between rounded-2xl bg-linear-to-br from-[#0d0a0e] to-[#1a1215] px-8 py-6 shadow-2xl backface-hidden border border-white/10"
      style={{ transform: 'rotateY(180deg)' }}
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Connect</p>
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg text-[10px] text-gray-300 no-underline transition hover:text-white">
            <Icon icon={s.icon} className="h-5 w-5" />
            {s.label}
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-xl p-2.5">
          <QRCodeSVG value="https://adbrt.com" size={100} bgColor="transparent" fgColor="#fff" level="M" />
        </div>
        <span className="text-[10px] text-gray-600">adbrt.com</span>
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

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
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
      className={clsx('fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300', visible ? 'opacity-100' : 'opacity-0')}
      onClick={onClose}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={clsx('relative select-none transition-all duration-300', visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0')}
        style={{ perspective: '1200px' }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="relative h-60 w-100 cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: dragging.current ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <CardFront />
          <CardBack />
        </div>
        <p className={clsx('mt-6 text-center text-xs text-gray-500 transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')}>Drag to rotate &middot; Click outside to close</p>
      </div>
    </div>
  );
}
