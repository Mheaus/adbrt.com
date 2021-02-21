import * as React from 'react';
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

interface WelcomeProps {
  duration?: number;
}

const Welcome: React.FC<WelcomeProps> = (props) => {
  const { duration = 1500 } = props;
  const TitleWhitFade = useFade(Title, duration, true);

  return (
    <WelcomeLayout>
      <TitleWhitFade>Welcome</TitleWhitFade>
    </WelcomeLayout>
  );
};

export default Welcome;
