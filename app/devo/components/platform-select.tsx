import * as React from 'react';
import clsx from 'clsx';
import Icon from '~/components/icon';

import settings, { type Platform, type PlatformName } from '../settings';

interface PlatformSelectProps {
  onChange: (platformName: PlatformName) => void;
  selectedPlatform: Platform;
}

export default function PlatformSelect({ onChange, selectedPlatform }: PlatformSelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-center justify-between gap-8 rounded border border-transparent px-1 transition hover:border-gray-400 group">
        <span>{selectedPlatform.title}</span>
        <Icon icon="ri:arrow-down-s-fill" className="opacity-0 transition group-hover:opacity-100" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 flex flex-col overflow-hidden rounded bg-white shadow-md">
          {Object.values(settings.platforms).map(({ title, name, color }) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                onChange(name as PlatformName);
                setOpen(false);
              }}
              className={clsx('flex cursor-pointer items-center gap-4 px-3 py-2 text-gray-800 hover:bg-slate-100', selectedPlatform.name === name && 'bg-slate-100')}
            >
              <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: color }} />
              <span className="whitespace-nowrap text-base font-light">{title}</span>
              {selectedPlatform.name === name && <Icon icon="ri:check-line" className="text-sm text-gray-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
