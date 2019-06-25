import styled from 'styled-components';

export const margin = {
  top: '1rem',
  right: '1rem',
  bottom: '1rem',
  left: '12rem',
};

const NavLayout = styled.div`
  height: calc(100% - ${margin.top} - ${margin.bottom});
  margin: ${margin.top} ${margin.right} ${margin.bottom} ${margin.left};
  width: calc(100% - ${margin.right} - ${margin.left});
`;

export default NavLayout;
