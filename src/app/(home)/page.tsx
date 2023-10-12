import * as React from 'react';
import Image from 'next/image';
import { RiEarthLine, RiLinkedinBoxFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import RadialBackground from '@/components/RadialBackground';
import Nav from '@/components/Nav';
import { DURATION } from './DisplayWelcome';
// import DisplayWelcome, { DURATION } from './DisplayWelcome';
import Fade from '@/components/Fade';

const DisplayWelcome = dynamic(() => import('./DisplayWelcome'), { ssr: false });

export const metadata: Metadata = {
  title: 'Mathieu Audebert',
  description: 'Web Developper',
};

const Profile = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <a href="https://github.com/Mheaus" target="_blank" rel="noreferrer" className="w-40 max-h-44 flex items-center overflow-hidden transition-shadow rounded shadow hover:shadow-lg">
        <Image className="w-40" src="/assets/images/DSC05417.jpg" height={600} width={400} alt="profile Mathieu Audebert" />
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
        className="relative flex items-center justify-between gap-2 px-4 py-2 text-white transition border rounded border-cyan-100 hover:bg-sky-50 hover:text-slate-800 hover:shadow-lg"
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
  return (
    <DisplayWelcome>
      <Fade duration={DURATION}>
        <main className="h-full w-full">
          <RadialBackground>
            <Nav />

            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
              <Profile />
            </div>

            <Location />

            <Socials />
          </RadialBackground>
        </main>
      </Fade>
    </DisplayWelcome>
  );
}

export default HomePage;
