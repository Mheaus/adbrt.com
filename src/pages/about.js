import React from 'react';
import styled from 'styled-components';

import { Layout, SEO, Nav, NavLayout } from '../components';

const Link = styled.a`
  color: ${({ theme }) => theme.lighterBlue};
`;

const ContentContainer = styled(NavLayout)`
  color: ${({ theme }) => theme.fontColorWhite};
  font-size: 1.125rem;
  width: 48rem;
`;

function About() {
  return (
    <Layout>
      <SEO title="About" />
      <Nav />
      <ContentContainer>
        <p>Bonjour, je m&apos;appelle Mathieu Audebert et je suis développeur front-end.</p>
        <p>
          J&apos;ai commencé en 2017 au Wagon Bordeaux en utilisant du ruby on Rails mais maintenant je développe
          presque uniquement en javascript avec reactjs, graphql et node.
        </p>
        <p>
          {"Aujourd'hui je travaille chez "}
          <Link href="https://www.timeonegroup.com" target="_blank">
            @Timeone
          </Link>
          .
        </p>
      </ContentContainer>
    </Layout>
  );
}

export default About;
