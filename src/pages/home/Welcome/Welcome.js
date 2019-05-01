import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const WelcomeLayout = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  font-size: 4rem;
  position: relative;

  ${'' /* appear transition style */}
  opacity: 0;
  top: 1rem;
  transition: all 0.5s ease-in-out 0.5s;

  &.appear-enter-done {
    opacity: 1;
    top: 0;
  }
`;

function Welcome({ duration }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), duration);
  }, []);

  return (
    <WelcomeLayout>
      <CSSTransition appear in={visible} classNames="appear" timeout={0}>
        <Title>Welcome</Title>
      </CSSTransition>
    </WelcomeLayout>
  );
}

Welcome.defaultProps = {
  duration: 1500,
};

Welcome.propTypes = {
  duration: PropTypes.number,
};

export default Welcome;
