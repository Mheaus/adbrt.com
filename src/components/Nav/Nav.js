import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

const NavLinks = styled.nav`
  left: 1rem;
  position: absolute;
  top: 0;
`;

const Link = styled(GatsbyLink)`
  color: ${({ theme }) => theme.home.title.color};
  display: block;
  font-size: 1.25rem;
  font-weight: 400;
  margin: 1rem 0;
  padding: 0 0.25rem;
  position: relative;
  transition: all 0.25s;
  width: fit-content;

  &::before {
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: all 0.25s;
    width: 0;
    z-index: -1;
  }

  &:hover::before {
    background-color: ${({ theme }) => theme.home.title.backgroundColor};
    width: calc(100% + 0.125rem);
  }
`;

function Nav() {
  return (
    <NavLinks>
      <Link to="/">Accueil</Link>
      {/* <Link to="about">À propos</Link> */}
      {/* <Link to="projects">Projets</Link> */}
      {/* <Link to="posts">Blog</Link> */}
      {/* <Link to="uses">Uses</Link> */}
    </NavLinks>
  );
}

export default Nav;
