import React from 'react';
import styled from 'styled-components';

import { Layout, SEO } from '../components';

const CenterPageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const NotFoundPage = () => (
  <Layout>
    <CenterPageContainer>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </CenterPageContainer>
  </Layout>
);

export default NotFoundPage;
