import * as React from 'react';
import NextLink, { type LinkProps } from 'next/link';

const Link = (props: LinkProps & { children: React.ReactNode }) => (
  <NextLink {...props} className="block relative transition-all duration-250 w-fit-content text-lg font-normal text-white hover:text-gray-800 group z-10 px-1">
    <div className="block absolute top-0 left-0 w-0 h-full -z-10 transition-all duration-250 group-hover:bg-white  group-hover:w-[calc(100%+1rem)]"></div>
    {props.children}
  </NextLink>
);

function Nav() {
  return (
    <nav className="absolute top-4 left-4 flex flex-col gap-2 items-start">
      <Link href="/">Accueil</Link>
      <Link href="devo">Devo</Link>
      {/* <Link to="about">À propos</Link> */}
      {/* <Link to="projects">Projets</Link> */}
      {/* <Link to="posts">Blog</Link> */}
      {/* <Link to="uses">Uses</Link> */}
    </nav>
  );
}

export default Nav;
