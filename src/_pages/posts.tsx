import * as React from 'react';
import Link from 'next/link';

import { Layout, SEO, Nav } from '../components';

const Posts = () => (
  <Layout>
    <SEO title="Posts" />
    <Nav />
    <Link href="/">go home</Link>
  </Layout>
);

export default Posts;
