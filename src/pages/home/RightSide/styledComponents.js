import styled from 'styled-components';

export const RightSideContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  float: right;
  height: 100%;
  justify-content: center;
  position: relative;
  transition: all 1s;
  min-width: 55%;
  width: 100%;
`;

export const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
  width: 100%;

  ._profile-picture {
    border-radius: 50%;
    box-shadow: 0.125rem 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.15);
    width: 10rem;
  }

  ._main-description {
    color: white;
    margin: 1.5em 1.5rem 0.5em;
    font-weight: 600;
    text-align: center;
    text-shadow: 0.02rem 0.02rem 0.5rem rgba(0, 0, 0, 0.15);
    width: 100%;
  }

  ._nice-to-meet {
    text-transform: uppercase;
    font-weight: bolder;
    color: #bbd1ea;
  }

  & > a {
    align-items: center;
    border-radius: 0.15rem;
    border: solid 0.13rem #bbd1ea;
    color: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;
    padding: 0.5em 1rem;
    position: relative;
    transition: color 0.5s;
    width: 12rem;

    img.ic-mail {
      margin: 0.25rem 0.125rem 0.25rem 0;
    }

    img.ic-drafts {
      display: none;
    }

    &:hover {
      img.ic-mail {
        display: none;
      }

      img.ic-drafts {
        display: block;
      }
    }
  }
`;

export const Location = styled.a`
  align-self: flex-end;
  bottom: 0.25rem;
  font-size: 1.25rem;
  left: 0.5rem;
  position: absolute;

  span {
    margin: 0 0 0 0.25rem;
  }
`;

export const SocialLinks = styled.div`
  bottom: 0.25rem;
  position: absolute;
  right: 0.25rem;
`;

export const SocialLink = styled.a`
  margin: 0 0.125rem;
  position: relative;

  &:nth-child(1) {
    animation-delay: 0.4s;
  }

  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:nth-child(4) {
    animation-delay: 0.7s;
  }

  &:nth-child(5) {
    animation-delay: 0.8s;
  }

  &:nth-child(6) {
    animation-delay: 0.9s;
  }

  span {
    background: rgba(0, 0, 0, 0.15);
    bottom: 0;
    max-width: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    right: 0;
    text-align: center;
    transition-delay: max-width 0.8s;
    transition: all 0.5s, max-width 0.3s;
    z-index: -1;
  }

  svg {
    height: 1.75rem !important;
    width: 1.75rem !important;
  }

  svg:hover + span {
    bottom: 2.25rem;
    max-width: 20rem;
    padding: 0.25rem 1rem;
  }
`;
