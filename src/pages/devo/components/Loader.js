import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Spinner = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  div {
    width: 18px;
    height: 18px;
    background-color: ${({ color }) => color};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;

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

function Loader({ color }) {
  return (
    <Spinner color={color}>
      <div />
      <div />
      <div />
    </Spinner>
  );
}

Loader.defaultProps = {
  color: '#333',
};

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
