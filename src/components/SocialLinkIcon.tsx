import * as React from 'react';
// import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// const LinkContainer = styled.a`
//   margin: 0 0.125rem;
//   position: relative;

//   &:nth-child(1) {
//     animation-delay: 0.4s;
//   }

//   &:nth-child(2) {
//     animation-delay: 0.5s;
//   }

//   &:nth-child(3) {
//     animation-delay: 0.6s;
//   }

//   &:nth-child(4) {
//     animation-delay: 0.7s;
//   }

//   &:nth-child(5) {
//     animation-delay: 0.8s;
//   }

//   &:nth-child(6) {
//     animation-delay: 0.9s;
//   }

//   svg {
//     height: 1.75rem !important;
//     width: 1.75rem !important;
//   }

//   svg:hover + span {
//     bottom: 2.25rem;
//     max-width: 20rem;
//     padding: 0.25rem 1rem;
//   }
// `;

interface SocialLinkIconProps {
  href: string;
  // icon: FontAwesomeIconProps['icon'];
}

const SocialLinkIcon: React.FC<SocialLinkIconProps> = (props) => {
  const { href, icon, children } = props;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {/* <FontAwesomeIcon icon={icon} /> */}
      <span className="absolute bottom-0 right-0 -z-10 bg-opacity-20 bg-black overflow-hidden p-0 text-center transition-all duration-500 max-w-0 delay-700">{children}</span>
    </a>
  );
};

export default SocialLinkIcon;
