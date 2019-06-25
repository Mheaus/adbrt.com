import { adjustHue, radialGradient } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

function RadialBackground(props) {
  const { children } = props;
  const [ueDegree, setUeDegree] = useState(0);

  useInterval(() => setUeDegree(ueDegree - 1), 100);

  return (
    <Container
      {...props}
      style={{
        ...radialGradient({
          shape: 'ellipse',
          extent: 'at top right',
          colorStops: [adjustHue(ueDegree, '#6478a9'), adjustHue(ueDegree, '#171d2b')],
        }),
      }}
    >
      {children}
    </Container>
  );
}

RadialBackground.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func, PropTypes.node]).isRequired,
};

export default RadialBackground;
