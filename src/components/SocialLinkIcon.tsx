import * as React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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

interface SocialLinkIconProps {
  href: string;
  icon: FontAwesomeIconProps['icon'];
}

const SocialLinkIcon: React.FC<SocialLinkIconProps> = props => {
  const { href, icon, children } = props;

  return (
    <LinkContainer href={href} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} />
      <ChildrenContainer>{children}</ChildrenContainer>
    </LinkContainer>
  );
};

export default SocialLinkIcon;
