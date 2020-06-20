import React from 'react';

import { Layout, SEO } from '../components';
import Devo from '../pages-components/devo';

function DevoPage() {
  return (
    <Layout>
      <SEO title="devo" />
      <Devo />
    </Layout>
  );
}

export default DevoPage;
