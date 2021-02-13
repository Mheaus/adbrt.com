import * as React from 'react';
import { hslToColorString, radialGradient } from 'polished';
import styled from 'styled-components';

import { useInterval } from '../hooks';

const Container = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.white};
  display: flex;
  float: right;
  height: 100%;
  justify-content: center;
  position: relative;
  transition: all 1s;
  min-width: 55%;
  width: 100%;
`;

interface HueState {
  degree: number;
  mode: 'INCREASE' | 'DECREASE';
}

const RadialBackground: React.FC = props => {
  const { children } = props;
  const [hueState, setHueState] = React.useState<HueState>({ degree: 128, mode: 'INCREASE' });

  useInterval(
    () =>
      setHueState(prevState => {
        if (prevState.degree === 300) return { degree: 299, mode: 'DECREASE' };
        if (prevState.degree === 128) return { degree: 129, mode: 'INCREASE' };

        return { ...prevState, degree: prevState.mode === 'INCREASE' ? prevState.degree + 1 : prevState.degree - 1 };
      }),
    250
  );

  return (
    <Container
      {...props}
      style={{
        ...radialGradient({
          shape: 'ellipse',
          extent: 'at top right',
          colorStops: [
            hslToColorString({ hue: hueState.degree, saturation: 0.75, lightness: 0.5 }),
            hslToColorString({ hue: hueState.degree + 96, saturation: 0.625, lightness: 0.375 }),
          ],
        }),
      }}
    >
      {children}
    </Container>
  );
};

export default RadialBackground;
