import React from 'react';
import { Link } from 'gatsby';

import { Layout, SEO, Nav } from '../components';

const Posts = () => (
  <Layout>
    <SEO title="Posts" />
    <Nav />
    <Link to="/">go home</Link>
  </Layout>
);

export default Posts;
