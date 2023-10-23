import * as React from 'react';
import { FaCaretDown, FaCheck } from 'react-icons/fa';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

import settings, { Platform, PlatformName } from '../settings';

interface PlatformSelectProps {
  onChange: (platformName: PlatformName) => void; // eslint-disable-line no-unused-vars
  selectedPlatform: Platform;
}

const PlatformSelect: React.FC<PlatformSelectProps> = (props) => {
  const { onChange, selectedPlatform } = props;

  return (
    <div className="relative">
      <Listbox onChange={(value) => onChange(value)} value={selectedPlatform.name}>
        <Listbox.Button className="transition rounded group border border-transparent hover:border-gray-400 px-1 flex justify-between items-center gap-8">
          <span>{selectedPlatform.title}</span>

          <FaCaretDown className="transition group-hover:opacity-100 opacity-0" />
        </Listbox.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute rounded overflow-hidden flex flex-col top-full mt-2 left-0 bg-white shadow-md">
            {Object.values(settings.platforms).map(({ title, name, color }) => (
              <Listbox.Option
                key={name}
                value={name}
                className={({ active, selected }) => clsx('flex cursor-pointer items-center py-2 px-3 text-gray-800 gap-4', (active || selected) && 'bg-slate-100')}
              >
                {({ selected }) => (
                  <>
                    <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="font-light text-md whitespace-nowrap">{title}</span>
                    {selected && <FaCheck className="text-sm text-gray-600" />}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default PlatformSelect;
