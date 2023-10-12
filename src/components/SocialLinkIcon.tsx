import * as React from 'react';

interface SocialLinkIconProps {
  href: string;
}

const SocialLinkIcon = (props: React.PropsWithChildren<SocialLinkIconProps>) => {
  const { href, children } = props;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <span className="absolute bottom-0 right-0 -z-10 bg-opacity-20 bg-black overflow-hidden p-0 text-center transition-all duration-500 max-w-0 delay-700">{children}</span>
    </a>
  );
};

export default SocialLinkIcon;
