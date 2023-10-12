'use client';

import * as React from 'react';

import Welcome from './Welcome';

export const DURATION = 1500;

const DisplayWelcome = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [displayWelcome, setDisplayWelcome] = React.useState(() => {
    const globalLocalStorage = global.localStorage || {
      getItem: () => {
        /* noop */
      },
    };

    return !globalLocalStorage.getItem('hide_welcome');
  });

  React.useEffect(() => {
    if (displayWelcome) {
      localStorage.setItem('hide_welcome', 'true');

      setTimeout(() => setDisplayWelcome(false), DURATION * 2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (displayWelcome) {
    return <Welcome duration={DURATION} />;
  }

  return children;
};

export default DisplayWelcome;
