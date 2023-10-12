import * as React from 'react';

import { Layout, SEO } from '../components';
import Devo from '../app/devo/page';

function DevoPage() {
  return (
    <Layout>
      <SEO title="devo" />
      <Devo />
    </Layout>
  );
}

export default DevoPage;
