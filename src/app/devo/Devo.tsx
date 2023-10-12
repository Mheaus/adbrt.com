'use client';

import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import context from './context';
import { linkClasses } from './components/Link';
import Header from './components/Header';
import PlatformCard from './components/PlatformCard';
// import NightModeToggle from './components/NightModeToggle';

const Devo: React.FC = () => {
  const [state, setState] = React.useState({});
  const [isNightMode, setNightMode] = React.useState(false);

  const contextValue = React.useMemo(() => ({ state, setState, isNightMode, setNightMode }), [state]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <context.Provider value={contextValue}>
      <div
        className={clsx(
          isNightMode && 'bg-[#25292f]',
          'font-[-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji"] antialiased bg-gray-100 text-[#484b4f] flex flex-col justify-between h-screen overflow-hidden py-7 px-8',
        )}
      >
        <Header />
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[calc(100%-7.125rem)] my-7">
          <div style={{ gridArea: '1 / 1 / 3 / 1' }}>
            <PlatformCard platform="github" />
          </div>
          <PlatformCard platform="hackernews" />
          <PlatformCard platform="devto" />
        </div>

        <footer className="flex items-center justify-between font-light text-gray-600">
          <Link className={linkClasses} href="/">
            Go back to home
          </Link>

          {/* <NightModeToggle /> */}
        </footer>
      </div>
    </context.Provider>
  );
};

export default Devo;
