import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { RiEarthLine, RiLinkedinBoxFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri';

import { ProfileImageQuery } from '../../generated/schema';
import { Layout, Nav, RadialBackground, SEO, Welcome } from '../../components';
import { useFade } from '../../hooks';

const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
`;

const Profile = () => {
  const { profileImage } = useStaticQuery<ProfileImageQuery>(graphql`
    query ProfileImage {
      profileImage: imageSharp(fixed: { originalName: { eq: "profile.jpg" } }) {
        fixed(height: 160, width: 160, cropFocus: CENTER, quality: 100) {
          base64
          width
          height
          src
          srcSet
        }
      }
    }
  `);

  return (
    <div className="flex flex-col items-center gap-6">
      <a href="https://github.com/Mheaus" target="_blank" rel="noreferrer">
        <img className="w-40 transition-shadow rounded shadow hover:shadow-lg" src={profileImage?.fixed?.src || ''} alt="profile Mathieu Audebert" />
      </a>

      <div className="flex flex-col gap-2">
        <h1 className="w-full font-semibold text-center text-white text-shadow">
          Mathieu Audebert
          <br />
          Web Developper
        </h1>

        <p className="text-xs italic text-sky-100">Front-End, ReactJS, Graphql, Typescript ...</p>
      </div>

      <a
        className="relative flex items-center justify-between gap-2 px-4 py-2 text-white transition border rounded border-cyan-100 hover:bg-sky-50 hover:text-slate-800"
        href="https://www.linkedin.com/in/mathieuadbrt/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>Contactez moi par</span>
        <RiLinkedinBoxFill className="w-6 h-6" />
      </a>
    </div>
  );
};

const Location = () => (
  <a
    className="absolute flex items-center gap-2 text-xl text-white bottom-2 left-2"
    href="https://www.google.fr/maps/place/Bordeaux/@44.8638281,-0.6563526,12z/data=!3m1!4b1!4m5!3m4!1s0xd5527e8f751ca81:0x796386037b397a89!8m2!3d44.837789!4d-0.57918"
    target="_blank"
    rel="noopener noreferrer"
  >
    <RiEarthLine />
    <span>Bordeaux</span>
  </a>
);

const Socials = () => (
  <div className="absolute flex gap-2 text-white bottom-2 right-2">
    <a className="hover:opacity-50" href="https://github.com/Mheaus" target="_blank" rel="noopener noreferrer">
      <RiGithubFill className="w-8 h-8" />
    </a>
    <a className="hover:opacity-50" href="https://twitter.com/MattAdbrt" target="_blank" rel="noreferrer">
      <RiTwitterFill className="w-8 h-8" />
    </a>
  </div>
);

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
            <Profile />
          </MainContent>

          <Location />

          <Socials />
        </HomePageWithFade>
      )}
    </Layout>
  );
}

export default HomePage;
