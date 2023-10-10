import * as React from 'react';
import { Transition } from 'react-transition-group';

function useFade(Component: React.FC<{ className?: string }>, duration: number, fadeOut = false) {
  return function ComponentWithFade(props: React.HTMLAttributes<HTMLElement>) {
    const nodeRef = React.useRef(null);

    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
      if (fadeOut) setTimeout(() => setVisible(false), 10000);
    }, []);

    return (
      <Transition
        {...props}
        appear
        show={visible}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0 top-4"
        enterTo="opacity-1 top-0"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        nodeRef={nodeRef}
      >
        <Component ref={nodeRef} />
      </Transition>
    );
  };
}

export default useFade;
