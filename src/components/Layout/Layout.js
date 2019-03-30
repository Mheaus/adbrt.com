import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { useMedia } from '../../hooks';
import { LayoutContextProvider } from './context';

const mediaQueries = [{ name: 'large', width: '1024' }, { name: 'small', width: '680' }];

function Layout({ children }) {
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
    <LayoutContextProvider value={{ currentDeviceSize }}>
      {typeof children === 'function' ? children(data) : children}
    </LayoutContextProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
