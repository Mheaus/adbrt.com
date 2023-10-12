import * as React from 'react';
import clsx from 'clsx';

import Fade from '@/components/Fade';

const Title = React.forwardRef((props: React.HTMLAttributes<HTMLHeadingElement>, ref: React.Ref<HTMLHeadingElement>) => (
  <h2 {...props} className={clsx('text-white text-4xl relative', props.className)} ref={ref}>
    {props.children}
  </h2>
));

Title.displayName = 'Title';

interface WelcomeProps {
  duration?: number;
}
const Welcome = (props: WelcomeProps) => {
  const { duration = 1500 } = props;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black">
      <Fade duration={duration} fadeOut>
        <Title>Welcome</Title>
      </Fade>
    </div>
  );
};

export default Welcome;
