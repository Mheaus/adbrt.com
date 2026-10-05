import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Corners({ className, size = 'size-3' }: { className?: string; size?: string }) {
  const corner = clsx('absolute border-current', size);
  return (
    <span aria-hidden className={clsx('pointer-events-none absolute inset-0', className)}>
      <span className={clsx(corner, 'top-0 left-0 border-t-2 border-l-2')} />
      <span className={clsx(corner, 'top-0 right-0 border-t-2 border-r-2')} />
      <span className={clsx(corner, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={clsx(corner, 'right-0 bottom-0 border-r-2 border-b-2')} />
    </span>
  );
}

export function HudLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx('font-mono text-[10px] tracking-[0.2em] uppercase text-dim', className)}>{children}</span>;
}

export function HudPanel({ children, className, label, code }: { children: ReactNode; className?: string; label?: string; code?: string }) {
  return (
    <div className={clsx('relative border border-white/10 bg-gunmetal/70 backdrop-blur-sm', className)}>
      <Corners className="-m-px text-cyan/70" size="size-2.5" />
      {(label || code) && (
        <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-2">
          <HudLabel>{label}</HudLabel>
          <HudLabel>{code}</HudLabel>
        </div>
      )}
      {children}
    </div>
  );
}
