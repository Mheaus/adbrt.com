import React from 'react';
import { Link } from 'gatsby';

import { Layout, SEO } from '../components';

const Posts = () => (
  <Layout>
    <SEO title="Posts" />
    <Link to="/">go home</Link>
  </Layout>
);

export default Posts;
