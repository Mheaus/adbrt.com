import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import context from '../context';

const FooterContainer = styled.footer`
  color: ${({ theme }) => theme.colors.fontGray};
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &.night-mode {
    background-color: #25292f;
  }

  .night-mode .grey-text {
    color: #949494;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
      text-decoration-line: underline;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
  }
`;

const DayNightToggleContainer = styled.div`
  float: right;
  display: flex;
  align-items: center;

  svg {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Switch = styled.label`
  display: inline-block;
  height: 18px;
  margin: 0 0.5rem;
  position: relative;
  width: 32px;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #535963;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

function Footer() {
  const { isNightMode, setNightMode } = useContext(context);

  return (
    <FooterContainer>
      <DayNightToggleContainer>
        <FontAwesomeIcon icon={faSun} />
        <Switch>
          <input type="checkbox" checked={isNightMode} onChange={() => setNightMode(!isNightMode)} />
          <span className="slider round" />
        </Switch>
        <FontAwesomeIcon
          icon={faMoon}
          style={{
            margin: 0,
          }}
        />
      </DayNightToggleContainer>
    </FooterContainer>
  );
}

export default Footer;
