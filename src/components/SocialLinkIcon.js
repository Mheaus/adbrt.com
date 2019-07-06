import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const LinkContainer = styled.a`
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

const ChildrenContainer = styled.span`
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
`;

function SocialLinkIcon({ href, icon, children }) {
  return (
    <LinkContainer href={href} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} />
      <ChildrenContainer>{children}</ChildrenContainer>
    </LinkContainer>
  );
}

SocialLinkIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element, PropTypes.func]).isRequired,
};

export default SocialLinkIcon;
