import React from 'react';

import Welcome from '../Welcome';

function RightSide() {
  return (
    <section id="right-side" className="creative" role="main">
      <Welcome />
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
    </section>
  );
}

export default RightSide;
