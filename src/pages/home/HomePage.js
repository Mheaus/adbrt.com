import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'gatsby';

import { Layout, SEO } from '../../components';
import About from './About';
import News from './News';
import Project from './Project';
import Tech from './Tech';
import {
  LeftSideContainer,
  Title,
  NewsListContainer,
  TechListContainer,
  TechList,
  ProjectsContainer,
} from './styledComponents';

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
          <CSSTransition appear classNames="fade" in timeout={0}>
            <LeftSideContainer>
              <div>
                <Title>about me</Title>
                <About />
              </div>
              <NewsListContainer>
                <Title>News</Title>
                <ul>
                  <News date="05/2018">
                    I now work at <a href="https://www.timeonegroup.com/">@TimeOneGroup</a> as a Junior Front Developper
                    mainly in React. I continue to keep an eye on all the new techs and awesome products emerging all
                    {"days and I'll soon display some realy cool projects and works on this profile page!"}
                  </News>
                </ul>
              </NewsListContainer>
              <TechListContainer>
                <Title>I&apos;m currently working with :</Title>
                <TechList>
                  <Tech name="React" />
                  <Tech name="Styled Components" />
                  <Tech name="GraphQL" />
                  <Tech name="Sketch" />
                  <Tech name="Chrome" />
                  <Tech name="Atom" />
                  <li>
                    <Link to="/uses">... and others</Link>
                  </li>
                </TechList>
              </TechListContainer>
              <ProjectsContainer>
                <Title>Projects</Title>
                <Project
                  name="Bookmarks Sharing System"
                  status="project-only"
                  description="I want to create a way to easely share a list of personal bookmarks in a website or anything."
                />
                <Project
                  name="Chrome Extension for Managing New Tabs Extensions"
                  status="project-only"
                  description="Today I've many new tabs extensions but I only use one. I want to choose / activate, organise or display multiple new tabs at a time."
                />
              </ProjectsContainer>
            </LeftSideContainer>
          </CSSTransition>
          <RightSide />
        </ContentContainer>
      )}
      {/* <BusinessCard /> */}
    </Layout>
  );
}

export default HomePage;
