import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Layout, SEO } from '../../components';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Welcome from './Welcome';

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  width: 100%;
`;

function HomePage() {
  const [displayWelcome, setDisplayWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => setDisplayWelcome(false), 3000);
  }, []);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `portfolio`, `react`]} />
      {displayWelcome ? (
        <Welcome duration={1500} />
      ) : (
        <ContentContainer>
          <LeftSide />
          <RightSide />
        </ContentContainer>
      )}
      {/* <BusinessCard /> */}
    </Layout>
  );
}

export default HomePage;
