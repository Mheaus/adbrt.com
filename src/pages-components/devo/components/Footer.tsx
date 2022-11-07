import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { FaMoon, FaSun } from 'react-icons/fa';
import context from '../context';

const FooterContainer = styled.footer`
  color: ${({ theme }) => theme.colors.fontGray};
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const Slider = styled.div`
  background-color: #535963;
  border-radius: 34px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;

  &::before {
    background-color: white;
    border-radius: 50%;
    bottom: 2px;
    content: '';
    height: 14px;
    left: 2px;
    position: absolute;
    transition: 0.4s;
    width: 14px;
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
`;

const Footer = () => {
  const { isNightMode, setNightMode } = React.useContext(context);

  return (
    <FooterContainer>
      <Link to="/">Go back to home</Link>
      <DayNightToggleContainer>
        <FaSun />
        <Switch>
          <input type="checkbox" checked={isNightMode} onChange={() => setNightMode((prevState) => !prevState)} />
          <Slider className="slider" />
        </Switch>
        <FaMoon className="m-0" />
      </DayNightToggleContainer>
    </FooterContainer>
  );
};

export default Footer;
