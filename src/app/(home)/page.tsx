import * as React from 'react';
import Image from 'next/image';
import { RiEarthLine, RiLinkedinBoxFill, RiGithubFill, RiTwitterFill, RiSlackLine } from 'react-icons/ri';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import profileImg from '/public/assets/images/DSC05417.jpeg';

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
        <Image className="w-40" src={profileImg} height={600} width={400} alt="profile Mathieu Audebert" placeholder="blur" />
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
    className="absolute flex items-center gap-2 text-xl text-white bottom-4 left-4"
    href="https://www.google.fr/maps/place/Bordeaux/@44.8638281,-0.6563526,12z/data=!3m1!4b1!4m5!3m4!1s0xd5527e8f751ca81:0x796386037b397a89!8m2!3d44.837789!4d-0.57918"
    target="_blank"
    rel="noopener noreferrer"
  >
    <RiEarthLine />
    <span>Bordeaux</span>
  </a>
);

const Socials = () => (
  <div className="absolute flex gap-2 text-white bottom-4 right-4">
    <a className="hover:opacity-50" href="https://www.malt.fr/profile/mathieuaudebert" target="_blank" rel="noopener noreferrer">
      <svg className="h-8 w-8" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32.1993 10.5357C29.3591 7.69551 26.3252 9.53378 24.4265 11.4325L6.49014 29.3694C4.59144 31.2679 2.60411 34.1526 5.59336 37.1414C8.58262 40.1313 11.4673 38.1436 13.3656 36.2449L31.3023 18.3084C33.201 16.4095 35.0393 13.3755 32.1993 10.5357Z"
          fill="currentColor"
        />
        <path
          d="M15.0631 9.80108L18.8611 13.5989L22.727 9.73299C22.9894 9.46992 23.2559 9.22579 23.524 8.99555C23.1192 6.95303 21.9537 5.1065 18.8593 5.1065C15.759 5.1065 14.595 6.96028 14.1923 9.00723C14.4818 9.25761 14.7706 9.5086 15.0631 9.80108Z"
          fill="currentColor"
        />
        <path
          d="M22.7248 38.0122L18.8613 34.1486L15.0653 37.9442C14.7771 38.2326 14.4902 38.4961 14.2046 38.7436C14.6399 40.8258 15.8718 42.733 18.8597 42.733C21.8554 42.733 23.0857 40.8156 23.5182 38.7267C23.2525 38.4981 22.9866 38.2739 22.7248 38.0122Z"
          fill="currentColor"
        />
        <path d="M13.4522 19.0079H6.13018C3.44549 19.0079 0 19.8537 0 23.8699C0 26.8666 1.91804 28.0971 4.00729 28.5294C4.25465 28.2438 13.4522 19.0079 13.4522 19.0079Z" fill="currentColor" />
        <path
          d="M33.7268 19.2029C33.4951 19.4724 24.2782 28.7317 24.2782 28.7317H31.4963C34.1812 28.7317 37.6265 28.0973 37.6265 23.8699C37.6265 20.7701 35.7733 19.6054 33.7268 19.2029Z"
          fill="currentColor"
        />
        <path
          d="M15.8513 16.6044L17.1594 15.2963L13.3638 11.5002C11.4649 9.60166 8.5806 7.61413 5.59135 10.6034C3.39937 12.7954 3.88623 14.9287 5.04889 16.6606C5.40301 16.6345 15.8513 16.6044 15.8513 16.6044Z"
          fill="currentColor"
        />
        <path
          d="M21.8697 31.1351L20.5582 32.4467L24.4244 36.3126C26.3231 38.2115 29.3571 40.0493 32.1969 37.2095C34.316 35.0903 33.8297 32.8644 32.6582 31.0814C32.2811 31.1086 21.8697 31.1351 21.8697 31.1351Z"
          fill="currentColor"
        />
      </svg>
    </a>
    <a className="hover:opacity-50" href="https://join.slack.com/t/sakugasoftware/shared_invite/zt-25hoc3bc6-suXA_2DGIWOhwcsgSIavCw" target="_blank" rel="noopener noreferrer">
      <RiSlackLine className="w-8 h-8" />
    </a>
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
        <main className="h-full w-full bg-gray-700">
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
