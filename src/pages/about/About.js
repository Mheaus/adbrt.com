import React from 'react';
import { Layout, SEO } from '../components';
import { Link } from './styledComponents';

function About() {
  return (
    <Layout>
      <SEO title="About" />
      <p>I&apos;m a front-end developper.</p>
      <p>I began with ruby on rails and I&apos;m now using react and graphql.</p>
      <p>
        {'I currently work at '}
        <Link href="https://www.timeonegroup.com" target="_blank">
          @Timeone
        </Link>
        .
      </p>
    </Layout>
  );
}

export default About;
