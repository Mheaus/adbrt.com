import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Layout, SEO, Nav } from '../components';

const UsesContainer = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const ComingSoon = styled.h1`
  margin: 1.5rem 0;
`;

function Uses() {
  return (
    <Layout>
      <SEO title="uses" />
      <Nav />
      <UsesContainer>
        <ComingSoon>Coming soon !</ComingSoon>
        <Link to="/">go back</Link>
      </UsesContainer>
    </Layout>
  );
}

export default Uses;
