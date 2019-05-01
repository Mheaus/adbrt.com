import styled from 'styled-components';

export const LeftSideContainer = styled.aside`
  background: white;
  height: 100%;
  overflow: auto;
  padding: 0 0 4rem;
  transition: all 0.5s;
  width: 0;

  &.fade-appear-done {
    width: 45%;
  }

  & > * {
    padding: 0 1.25rem;
    transition: opacity 0.75s;
  }

  & ._display-welcome {
    position: absolute;
    z-index: 300;
    top: 0.75rem;
    left: 0;
    opacity: 0.4;
    text-transform: capitalize;
  }

  & ._display-welcome:hover {
    opacity: 0.7;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0.5rem 0 0.75rem;
  text-transform: capitalize;
  width: 100%;
`;

export const NewsListContainer = styled.div`
  margin-top: 1.5rem;
`;

export const TechListContainer = styled.div`
  margin: 3rem 0.25rem;
`;

export const TechList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  line-height: 1.75rem;
  margin: 0.75rem 0;
  padding-left: 0.5rem;
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
