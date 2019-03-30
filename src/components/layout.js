import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import '../css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <main>{typeof children === 'function' ? children(data) : children}</main>}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
