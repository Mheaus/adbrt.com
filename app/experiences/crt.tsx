import type { ReactNode } from 'react';

/** Wraps a canvas in a period television: rounded glass, scanlines, vignette and a slow flicker. */
export default function Crt({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[28px] bg-[#111214] p-4 shadow-[0_20px_60px_rgb(0_0_0/0.6),inset_0_0_0_2px_rgb(255_255_255/0.06)] sm:p-6">
      <div className="relative overflow-hidden rounded-[18px] bg-black">
        <div className="[filter:saturate(1.25)_contrast(1.08)_brightness(1.05)]" style={{ animation: 'crt-flicker 6s steps(60) infinite' }}>
          {children}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.28)_0_1px,transparent_1px_3px)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgb(0_0_0/0.85)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgb(255_255_255/0.08),transparent_45%)]" />
      </div>
      <div className="mt-3 flex items-center justify-between px-2">
        <span className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase">Sakuga-Vision 14&quot;</span>
        <span className="size-1.5 rounded-full bg-magenta shadow-[0_0_6px_var(--color-magenta)]" />
      </div>
    </div>
  );
}
