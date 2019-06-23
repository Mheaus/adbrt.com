import React from 'react';
import styled, { css } from 'styled-components';

import { Layout, SEO, Nav } from '../../components';

const Link = styled.a`
  color: ${({ theme }) => theme.lighterBlue};
`;

const ContentContainer = styled.div(({ theme }) => {
  const margin = { top: '2rem', right: '1rem', bottom: '1rem', left: '12rem' };

  return css`
    color: ${theme.fontColorWhite};
    font-size: 1.125rem;
    margin: ${margin.top} ${margin.right} ${margin.bottom} ${margin.left};
    max-width: calc(100% - ${margin.right} - ${margin.left});
    width: 48rem;
  `;
});

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
