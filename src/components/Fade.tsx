'use client';

import * as React from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  top: 4,
};

const transitionStyles = {
  entering: { opacity: 1, top: 0 },
  entered: { opacity: 1, top: 0 },
  exiting: { opacity: 0, top: 4 },
  exited: { opacity: 0, top: 4 },
};

interface FadeProps {
  children: React.ReactElement;
  duration: number;
  fadeOut?: boolean;
}
function Fade({ children, duration, fadeOut }: FadeProps) {
  const nodeRef = React.useRef(null);

  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (fadeOut) setTimeout(() => setVisible(false), duration);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={duration} appear mountOnEnter>
      {(state) =>
        React.cloneElement(children, {
          ref: nodeRef,
          suppressHydrationWarning: true,
          style: {
            ...defaultStyle,
            ...transitionStyles[state as keyof typeof transitionStyles],
          },
        })
      }
    </Transition>
  );
}

export default Fade;
