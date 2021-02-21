import * as React from 'react';
import { faEnvelopeSquare, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { Layout, Nav, RadialBackground, SEO, SocialLinkIcon, Welcome } from '../components';
import { useFade } from '../hooks';
import mailIcon from '../assets/icons/ic_mail.svg';
import draftsIcon from '../assets/icons/ic_drafts.svg';

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

const CompanyLink = styled.a`
  color: ${({ theme }) => theme.white};
  display: block;
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
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  left: 0.75rem;
  position: absolute;

  span {
    margin: 0 0 0 0.25rem;
  }
`;

const SocialLinks = styled.div`
  bottom: 0.5rem;
  color: ${({ theme }) => theme.white};
  position: absolute;
  right: 0.5rem;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.lighterBlue};
  font-style: italic;
  margin: 0 0 0.5rem;
`;

function HomePage() {
  const [displayWelcome, setDisplayWelcome] = React.useState(() => {
    const globalLocalStorage = global.localStorage || {
      getItem: () => {
        /* noop */
      },
    };

    return !globalLocalStorage.getItem('hide_welcome');
  });
  const welcomeDuration = 1500;
  const { profileImage } = useStaticQuery(graphql`
    query {
      profileImage: imageSharp(fixed: { originalName: { eq: "profile.jpg" } }) {
        fixed(height: 160, width: 160, cropFocus: CENTER, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  `);

  React.useEffect(() => {
    if (displayWelcome) {
      localStorage.setItem('hide_welcome', 'true');

      setTimeout(() => setDisplayWelcome(false), welcomeDuration * 2);
    }
  }, []);

  const HomePageWithFade = useFade(RadialBackground, welcomeDuration);

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
              Full-Stack Web Developper
            </Title>
            <SubTitle>front-end, react, graphql, typescript ...</SubTitle>
            <CompanyLink href="https://www.go-aos.io/" target="_blank" noreferrer noopener>
              @go-aos
            </CompanyLink>
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
            <SocialLinkIcon href="mailto:mathieu.adbrt@gmail.com" icon={faEnvelopeSquare}>
              mathieu.adbrt@gmail.com
            </SocialLinkIcon>
            <SocialLinkIcon href="https://mheaus.github.io/" icon={faGithubSquare}>
              github.com/Mheaus
            </SocialLinkIcon>
            <SocialLinkIcon href="https://www.twitter.com/MattAdbrt" icon={faTwitterSquare}>
              twitter.com/MattAdbrt
            </SocialLinkIcon>
            <SocialLinkIcon href="https://www.linkedin.com/in/mathieuAdbrt" icon={faLinkedin}>
              linkedin.com/in/mathieuAdbrt
            </SocialLinkIcon>
          </SocialLinks>
        </HomePageWithFade>
      )}
    </Layout>
  );
}

export default HomePage;
