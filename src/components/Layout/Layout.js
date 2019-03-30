import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { LayoutContextProvider } from './context';

const mediaQueries = [{ name: 'large', width: '1024' }, { name: 'small', width: '680' }];

class Layout extends React.PureComponent {
  state = { currentDeviceSize: mediaQueries[0] };

  matchedMediaQueries = [];

  componentDidMount() {
    this.matchedMediaQueries = mediaQueries.map(
      ({ width }) => typeof window !== 'undefined' && window.matchMedia(`(min-width: ${width}px)`)
    );

    this.matchedMediaQueries.forEach(mediaQuery =>
      mediaQuery.addEventListener('change', () => this.handleDeviceWidthChange())
    );
  }

  componentWillUnmount() {
    this.matchedMediaQueries.forEach(mediaQuery =>
      mediaQuery.removeEventListener('change', this.handleDeviceWidthChange)
    );
  }

  handleDeviceWidthChange = () => {
    const index = this.matchedMediaQueries.findIndex(({ matches }) => matches);

    if (typeof mediaQueries[index] !== 'undefined') {
      this.setState({ currentDeviceSize: mediaQueries[index] });
    } else {
      this.setState({ currentDeviceSize: mediaQueries[mediaQueries.length - 1] });
    }
  };

  render() {
    const { children } = this.props;
    const { currentDeviceSize } = this.state;

    return (
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
        render={data => (
          <LayoutContextProvider value={{ currentDeviceSize }}>
            {typeof children === 'function' ? children(data) : children}
          </LayoutContextProvider>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
