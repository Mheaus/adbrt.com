import React from 'react';
import styled from 'styled-components';

const RightSideContainer = styled.div`
  color: white;
  flex-grow: 1;
  float: right;
  height: 100%;
  width: 65%;

  & > .__creative-content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    transition: all 1s;
  }

  & .__creative-content-container .__info-main {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeUp ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: 1s;
    width: 100%;
  }

  .__info-main ._profile-picture {
    width: 10em;
    border-radius: 50%;
    box-shadow: 0.1rem 0.1rem 0.5em 0.13em rgba(0, 0, 0, 0.15);
  }

  .__info-main ._main-description {
    color: white;
    margin: 1.5em 1.5rem 0.5em;
    font-weight: 600;
    text-align: center;
    text-shadow: 0.02rem 0.02rem 0.5rem rgba(0, 0, 0, 0.15);
    width: 100%;
  }

  .__info-main ._nice-to-meet {
    text-transform: uppercase;
    font-weight: bolder;
    color: #bbd1ea;
  }

  .__info-main > a {
    position: relative;
    color: rgba(255, 255, 255, 0.85);
    margin: 2rem 0;
    padding: 0.5em 1em;
    border-radius: 0.15rem;
    border: solid 0.13rem #bbd1ea;
    transition: color 0.5s;
  }

  .__info-main > a img.ic-mail {
    margin: 0 0 -0.15rem 2rem;
  }

  .__info-main > a img.ic-drafts {
    display: none;
    position: absolute;
  }

  .__info-main > a:hover img.ic-drafts {
    display: inline-block;
  }

  & .__creative-content-container ._btn-display-card {
    text-transform: capitalize;
    position: absolute;
    top: 0;
    right: 0;
    text-shadow: 0.02rem 0.02rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  ._btn-display-card img {
    margin: 0 0.5em -0.2em;
  }

  ._btn-display-card:hover {
    transform: translateY(0.025rem);
  }

  & .__creative-content-container .__location {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 1.25rem;
    align-self: flex-end;
  }

  & .__creative-content-container .__social-links {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .__creative-content-container .__social-links a {
    position: relative;
  }

  .__creative-content-container .__social-links a:nth-child(1) {
    animation-delay: 0.4s;
  }

  .__creative-content-container .__social-links a:nth-child(2) {
    animation-delay: 0.5s;
  }

  .__creative-content-container .__social-links a:nth-child(3) {
    animation-delay: 0.6s;
  }

  .__creative-content-container .__social-links a:nth-child(4) {
    animation-delay: 0.7s;
  }

  .__creative-content-container .__social-links a:nth-child(5) {
    animation-delay: 0.8s;
  }

  .__creative-content-container .__social-links a:nth-child(6) {
    animation-delay: 0.9s;
  }

  .__creative-content-container .__social-links span {
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    max-width: 0;
    padding: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.15);
    transition: all 0.5s, max-width 0.3s;
    transition-delay: max-width 0.8s;
  }

  .__creative-content-container .__social-links a:hover span {
    top: -3.25rem;
    padding: 0.25rem 1rem;
    max-width: 20rem;
  }

  .__creative-content-container .__social-links svg {
    width: 2rem;
    height: 2rem;
  }
`;

function RightSide() {
  return (
    <RightSideContainer id="right-side" className="creative" role="main">
      <div className="__creative-content-container -hidden-md">
        <a href="#card" className="_btn-display-card">
          <img className="-fadeUp" src="image/ic_card.svg" alt="icon card" />
          <span className="-fadeUp">business card</span>
        </a>
        <div className="__info-main -fadeUp">
          <img className="_profile-picture" src="image/profile.png" alt="profile Mathieu Audebert" />
          <h1 className="_main-description">
            Mathieu Audebert.
            <br />
            Freelance Junior Web Developper / Designer (Adbrt Web).
          </h1>
          <p className="_nice-to-meet">Nice to meet you</p>
          <a href="mailto:mathieu.adbrt@gmail.com">
            <span>Contact me by</span>
            <img src="image/ic_mail.svg" className="ic-mail" alt="ic mail closed" />
            <img src="image/ic_drafts.svg" className="ic-drafts" alt="ic mail drafts" />
          </a>
        </div>
        <a
          href="https://www.google.fr/maps/place/Bordeaux/@44.8638281,-0.6563526,12z/data=!3m1!4b1!4m5!3m4!1s0xd5527e8f751ca81:0x796386037b397a89!8m2!3d44.837789!4d-0.57918"
          target="_blank"
          rel="noopener noreferrer"
          className="__location"
        >
          <i className="fa fa-globe -fadeUp" />
          <span className="-fadeUp">Bordeaux</span>
        </a>
        <div className="__social-links">
          <a href="mailto:mathieu.adbrt@gmail.com" className="mail -fadeUp">
            <span>mathieu.adbrt@gmail.com</span>
            <i className="fas fa-envelope-square" />
          </a>
          <a href="https://github.com/Mheaus" target="_blank" rel="noopener noreferrer" className="github -fadeUp">
            <span>github.com/Mheaus</span>
            <i className="fab fa-github-square" />
          </a>
          <a
            href="https://www.twitter.com/MattAdbrt"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter -fadeUp"
          >
            <span>twitter.com/MattAdbrt</span>
            <i className="fab fa-twitter-square" />
          </a>
          <a
            href="https://www.linkedin.com/in/mathieuAdbrt"
            rel="noopener noreferrer"
            target="_blank"
            className="linkedin -fadeUp"
          >
            <span>linkedin.com/in/mathieuAdbrt</span>
            <i className="fab fa-linkedin" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/mathAdbrt"
            className="facebook -fadeUp"
          >
            <span>fb.com/mathAdbrt</span>
            <i className="fab fa-facebook-square" />
          </a>
        </div>
      </div>
    </RightSideContainer>
  );
}

export default RightSide;
