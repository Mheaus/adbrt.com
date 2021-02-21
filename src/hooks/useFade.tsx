import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

function useFade(Component, duration, fadeOut = false) {
  const ComponentWithTransition = styled(Component)`
    opacity: 0;
    top: 1rem;
    transition: all 0.5s ease-in-out 0.5s;

    &.appear-enter-done {
      opacity: 1;
      top: 0;
    }
  `;

  return function ComponentWithFade(props) {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
      if (fadeOut) {
        setTimeout(() => setVisible(false), duration);
      }
    }, []);

    return (
      <CSSTransition appear in={visible} classNames="appear" timeout={0}>
        <ComponentWithTransition {...props} />
      </CSSTransition>
    );
  };
}

export default useFade;
