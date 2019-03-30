import React from 'react';

function Welcome() {
  return (
    <div className="__welcome-screen -fadeUp-sm -display-n-sm">
      <div className="__container-content">
        <h2 className="_title">Hello! I&apos;m Matt</h2>
        <p className="_subtitle">Welcome on my Website</p>
        <div className="__container-buttons">
          <a href="#index" className="_hide-welcome">
            <span>profile </span>
            <div className="background" />
          </a>
          <a href="#profile-card" className="_btn-display-card">
            business card
            <div className="background" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
