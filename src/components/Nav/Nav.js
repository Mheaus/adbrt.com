import React from 'react';
import { NavLinks, Link } from './styledComponents';

function Nav() {
  return (
    <NavLinks>
      <Link to="about">About</Link>
      <Link to="projects">Projects</Link>
      <Link to="posts">Blog</Link>
      <Link to="uses">Uses</Link>
    </NavLinks>
  );
}

export default Nav;
