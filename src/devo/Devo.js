import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import context from './context';
import theme, { nightModeTheme } from './theme';
import { Footer, Header, PlatformCard } from './components';

const App = styled.div`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #f5f7fa;
  color: #484b4f;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji';
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  padding: 1.75rem 2rem;

  &.night-mode {
    background-color: #25292f;
  }
`;

const GridPlatformContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: calc(100% - 7.125rem);
  margin: 1.75rem 0;

  & > div:nth-child(1) {
    grid-area: span 2 / 1;
  }
`;

function Devo() {
  const [state, setState] = useState({});
  const [isNightMode, setNightMode] = useState(false);

  return (
    <ThemeProvider theme={{ ...theme, ...(isNightMode ? nightModeTheme : {}), isNightMode }}>
      <context.Provider
        value={{
          state,
          setState,
          isNightMode,
          setNightMode,
        }}
      >
        <App className={isNightMode ? 'night-mode' : ''}>
          <Header />
          <GridPlatformContainer>
            <PlatformCard platform="github" />
            <PlatformCard platform="hackernews" />
            <PlatformCard platform="producthunt" />
          </GridPlatformContainer>
          <Footer />
        </App>
      </context.Provider>
    </ThemeProvider>
  );
}

export default Devo;
