import React from 'react';
import { NavLinks, Link } from './styledComponents';

function Nav() {
  return (
    <NavLinks>
      <Link to="about">À propos</Link>
      <Link to="projects">Projets</Link>
      <Link to="posts">Blog</Link>
      <Link to="uses">Uses</Link>
    </NavLinks>
  );
}

export default Nav;
