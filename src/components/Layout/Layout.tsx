import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import '../../css';
import { LayoutContextProvider } from './context';
import { useMedia } from '../../hooks';
import theme from '../../theme';

const mediaQueries = [
  { name: 'large', width: '1024' },
  { name: 'small', width: '680' },
] as const;

const Layout: React.FC = ({ children }) => {
  const currentDeviceSize = useMedia(mediaQueries);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <LayoutContextProvider value={{ currentDeviceSize }}>
        {typeof children === 'function' ? children(data) : children}
      </LayoutContextProvider>
    </ThemeProvider>
  );
};

export default Layout;
