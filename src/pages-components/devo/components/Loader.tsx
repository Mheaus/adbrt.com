import * as React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  left: 50%;
  position: relative;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);

  div {
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    background-color: ${({ color }) => color};
    border-radius: 100%;
    display: inline-block;
    height: 18px;
    width: 18px;

    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

interface LoaderProps {
  color: string;
}

const Loader: React.FC<LoaderProps> = props => {
  const { color = '#333' } = props;

  return (
    <Spinner color={color}>
      <div />
      <div />
      <div />
    </Spinner>
  );
};

export default Loader;
