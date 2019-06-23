import { faEnvelopeSquare, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import mailIcon from '../assets/icons/ic_mail.svg';
import draftsIcon from '../assets/icons/ic_drafts.svg';
import { Layout, Nav, SEO, Welcome } from '../components';
import { useFade } from '../hooks';

const RightSideContainer = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.white};
  display: flex;
  float: right;
  height: 100%;
  justify-content: center;
  position: relative;
  transition: all 1s;
  min-width: 55%;
  width: 100%;
`;

const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
`;

const ProfilePicture = styled(Img)`
  border-radius: 50%;
  box-shadow: 0.125rem 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.15);
  width: 10rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.white};
  margin: 1.5em 1.5rem 0.5em;
  font-weight: 600;
  text-align: center;
  text-shadow: 0.02rem 0.02rem 0.5rem rgba(0, 0, 0, 0.15);
  width: 100%;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.lighterBlue};
  text-transform: uppercase;
  font-weight: bolder;
`;

const ButtonContactMe = styled.a`
  align-items: center;
  border-radius: 0.15rem;
  border: solid 0.13rem ${({ theme }) => theme.lighterBlue};
  color: ${({ theme }) => theme.fontColorWhite};
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.5s;
  width: 12.5rem;

  img.ic-mail {
    margin: 0.25rem 0.125rem 0.25rem 0;
  }

  img.ic-drafts {
    display: none;
  }

  &:hover {
    img.ic-mail {
      display: none;
    }

    img.ic-drafts {
      display: block;
    }
  }
`;

const Location = styled.a`
  align-self: flex-end;
  bottom: 0.5rem;
  font-size: 1.25rem;
  left: 0.75rem;
  position: absolute;

  span {
    margin: 0 0 0 0.25rem;
  }
`;

const SocialLinks = styled.div`
  bottom: 0.5rem;
  position: absolute;
  right: 0.5rem;
`;

const SocialLink = styled.a`
  margin: 0 0.125rem;
  position: relative;

  &:nth-child(1) {
    animation-delay: 0.4s;
  }

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.7s;
  }

  &:nth-child(5) {
    animation-delay: 0.8s;
  }

  &:nth-child(6) {
    animation-delay: 0.9s;
  }

  span {
    background: rgba(0, 0, 0, 0.15);
    bottom: 0;
    max-width: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    right: 0;
    text-align: center;
    transition-delay: max-width 0.8s;
    transition: all 0.5s, max-width 0.3s;
    z-index: -1;
  }

  svg {
    height: 1.75rem !important;
    width: 1.75rem !important;
  }

  svg:hover + span {
    bottom: 2.25rem;
    max-width: 20rem;
    padding: 0.25rem 1rem;
  }
`;

function HomePage() {
  const [displayWelcome, setDisplayWelcome] = useState(() => {
    const globalLocalStorage = global.localStorage || { getItem: () => {} };

    return !globalLocalStorage.getItem('hide_welcome');
  });
  const welcomeDuration = 1500;
  const { profileImage } = useStaticQuery(graphql`
    query {
      profileImage: imageSharp(fixed: { originalName: { eq: "profile.jpg" } }) {
        fixed(height: 160, width: 160, cropFocus: CENTER) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  `);

  useEffect(() => {
    if (displayWelcome) {
      localStorage.setItem('hide_welcome', true);

      setTimeout(() => setDisplayWelcome(false), welcomeDuration * 2);
    }
  }, []);

  const HomePageWithFade = useFade(RightSideContainer, welcomeDuration);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `portfolio`, `react`]} />
      {displayWelcome ? (
        <Welcome duration={welcomeDuration} />
      ) : (
        <HomePageWithFade role="main">
          <Nav />
          <MainContent>
            <ProfilePicture {...profileImage} alt="profile Mathieu Audebert" />
            <Title>
              Mathieu Audebert
              <br />
              Front-End Developper
            </Title>
            <SubTitle>@timeonegroup</SubTitle>
            <ButtonContactMe href="mailto:mathieu.adbrt@gmail.com">
              <span>Contactez moi par</span>
              <img src={mailIcon} className="ic-mail" alt="ic mail closed" />
              <img src={draftsIcon} className="ic-drafts" alt="ic mail drafts" />
            </ButtonContactMe>
          </MainContent>
          <Location
            href="https://www.google.fr/maps/place/Bordeaux/@44.8638281,-0.6563526,12z/data=!3m1!4b1!4m5!3m4!1s0xd5527e8f751ca81:0x796386037b397a89!8m2!3d44.837789!4d-0.57918"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGlobeEurope} />
            <span>Bordeaux</span>
          </Location>
          <SocialLinks>
            <SocialLink href="mailto:mathieu.adbrt@gmail.com" className="mail">
              <FontAwesomeIcon icon={faEnvelopeSquare} />
              <span>mathieu.adbrt@gmail.com</span>
            </SocialLink>
            <SocialLink href="https://mheaus.github.io/" target="_blank" rel="noopener noreferrer" className="github">
              <FontAwesomeIcon icon={faGithubSquare} />
              <span>github.com/Mheaus</span>
            </SocialLink>
            <SocialLink
              href="https://www.twitter.com/MattAdbrt"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
              <span>twitter.com/MattAdbrt</span>
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/mathieuAdbrt"
              rel="noopener noreferrer"
              target="_blank"
              className="linkedin"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span>linkedin.com/in/mathieuAdbrt</span>
            </SocialLink>
          </SocialLinks>
        </HomePageWithFade>
      )}
    </Layout>
  );
}

export default HomePage;
