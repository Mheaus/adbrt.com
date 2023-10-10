'use client';

import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { Footer, Header, PlatformCard } from './components';
import theme, { nightModeTheme } from './theme';
import context from './context';
import clsx from 'clsx';

const Devo: React.FC = () => {
  const [state, setState] = React.useState({});
  const [isNightMode, setNightMode] = React.useState(false);

  const contextValue = React.useMemo(() => ({ state, setState, isNightMode, setNightMode }), [state, setState]);

  return (
    <ThemeProvider theme={{ ...theme, ...(isNightMode ? nightModeTheme : {}), isNightMode }}>
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
          <Footer />
        </div>
      </context.Provider>
    </ThemeProvider>
  );
};

export default Devo;
