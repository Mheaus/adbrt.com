import React from 'react';

import Devo from '../devo';
import { Layout, SEO } from '../components';

function DevoPage() {
  return (
    <Layout>
      <SEO title="devo" />
      <Devo />
    </Layout>
  );
}

export default DevoPage;
