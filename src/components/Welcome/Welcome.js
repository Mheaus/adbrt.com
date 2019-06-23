import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useFade } from '../../hooks';

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
  color: ${({ theme }) => theme.white};
  font-size: 4rem;
  position: relative;
`;

function Welcome({ duration }) {
  const TitleWhitFade = useFade(Title, duration, true);

  return (
    <WelcomeLayout>
      <TitleWhitFade>Welcome</TitleWhitFade>
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
