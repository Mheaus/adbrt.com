import React from 'react';
import styled from 'styled-components';

import useDate from '../useDate';

const DateTimeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  display: flex;
  font-size: 2rem;
  font-weight: 100;
  justify-content: space-between;

  @media screen and (min-width: ${({ theme }) => theme.breackpoints.desktop}) {
    margin: initial;
  }
`;

function Header() {
  const { now, today } = useDate();

  return (
    <DateTimeWrapper>
      <div className="time inline-block">{now}</div>
      <div className="date inline-block pull-right">{today}</div>
    </DateTimeWrapper>
  );
}

export default Header;
