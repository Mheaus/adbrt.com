import React from 'react';
import { Link } from 'gatsby';

import { Layout, SEO, Nav } from '../../components';

const Projects = () => (
  <Layout>
    <SEO title="Projects" />
    <Nav />
    <Link to="/">go home</Link>
  </Layout>
);

export default Projects;
