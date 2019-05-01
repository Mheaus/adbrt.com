import React from 'react';
import styled from 'styled-components';

import cardIcon from '../../../assets/icons/ic_card.svg';

export const ButtonDisplayCard = styled.button`
  position: absolute;
  right: 0.125rem;
  top: 0.25rem;

  img {
    margin: 0 0.5rem -0.25rem;
  }

  span {
    text-shadow: 0.025rem 0.025rem 0.5rem rgba(0, 0, 0, 0.25);
    text-transform: capitalize;
  }

  &:hover {
    transform: translateY(0.025rem);
  }
`;

function ButtonDisplay() {
  return (
    <ButtonDisplayCard>
      <img src={cardIcon} alt="icon card" />
      <span>business card</span>
    </ButtonDisplayCard>
  );
}

export default ButtonDisplay;
