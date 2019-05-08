import React from 'react';
import { Link } from 'gatsby';

import { Layout, SEO } from '../components';

const About = () => (
  <Layout>
    <SEO title="About" />
    <Link to="/">go home</Link>
  </Layout>
);

export default About;
