import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

import mailIcon from '../../assets/icons/ic_mail.svg';
import draftsIcon from '../../assets/icons/ic_drafts.svg';
import { Layout, Nav, SEO } from '../../components';
import { useFade } from '../../hooks';
import {
  RightSideContainer,
  MainContent,
  ProfilePicture,
  Title,
  SubTitle,
  ButtonContactMe,
  Location,
  SocialLinks,
  SocialLink,
} from './styledComponents';
import Welcome from './Welcome';

function HomePage() {
  const [displayWelcome, setDisplayWelcome] = useState(() => !localStorage.getItem('hide_welcome'));
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
