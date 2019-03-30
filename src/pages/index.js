import React from 'react';
// import { Link } from 'gatsby';

import { Layout, SEO, BusinessCard, LeftSide, RightSide } from '../components';
import '../css';

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `portfolio`, `react`]} />
      <LeftSide />
      <RightSide />
      <BusinessCard />
    </Layout>
  );
}

export default IndexPage;
