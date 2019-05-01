import React from 'react';
// import { Link } from 'gatsby';

import '../css';
import { Layout, SEO } from '../components';
import Home from './home';

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `portfolio`, `react`]} />
      <Home />
    </Layout>
  );
}

export default IndexPage;
