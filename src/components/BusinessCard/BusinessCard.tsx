import * as React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  z-index: 300;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 1s;

  #card > a {
    position: absolute;
    padding: 0.25rem 1rem;
    z-index: 200;
    color: white;
    background: rgba(255, 255, 255, 0.25);
    top: -3rem;
  }

  #card ._btn-fullscreen {
    margin: 0 4rem;
  }

  #card ._btn-close {
  }

  #card:not(.-flip) a {
    right: 0;
  }

  #card.-flip a {
    left: 0;
  }

  .card-container #card {
    position: relative;
    width: 40em;
    height: 20em;
    perspective: 5px;
    transform-style: preserve-3d;
    background-position: center;
    background-size: cover;
    backface-visibility: visible;
    transition: all 1s;
    animation: fadeIn ease-in;
    animation-duration: 0.5s;
  }

  #card.-flip .front {
    opacity: 0;
  }

  #card.-flip .back {
    opacity: 1;
  }

  #card > div {
    color: white;
    position: absolute;
    top: 0;
    height: 20em;
    width: 40em;
    display: grid;
    display: -ms-grid;
    backface-visibility: inherit;
    transition-delay: 0.45s;
    background-image: radial-gradient(circle at top left, #545562 0%, #242647 82%);
  }

  #card .front {
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }

  #card .frame {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    margin: 0.5rem 0.75rem;
    width: calc(100% - 1.5rem);
    height: calc(100% - 1rem);
    border: 0.13rem solid #bbd1ea;
  }

  #card .front ._logo {
    position: absolute;
    top: 0;
    left: 0;
    margin: 4rem;
    width: 18.5rem;
    z-index: 3;
  }

  #card .front ._background-logo {
    position: absolute;
    top: 0;
    right: -1rem;
    z-index: 2;
    height: 100%;
    width: auto;
  }

  #card .front span {
    z-index: 3;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0.75rem 1.5rem;
    color: #bbd1ea;
    text-transform: capitalize;
  }

  #card .back {
    opacity: 0;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }

  #card .back .frame {
    z-index: -1;
    opacity: 0.25;
  }

  #card .back img {
    height: 100%;
    box-shadow: 0.25rem 0.25rem 0.5rem 0.075rem rgba(0, 0, 0, 0.5);
    margin-right: 2rem;
  }

  #card .back .__social-info-container {
    color: #dae3e5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    text-align: right;
    text-transform: capitalize;
    max-width: 50%;
  }

  #card .back .__social-info-container h3 {
    color: #bbd1ea;
    font-size: 1.5rem;
    margin-top: 1rem;
    border-bottom: solid 0.13rem #bbd1ea;
    font-weight: normal;
  }

  #card .back .__social-info-container h3 span {
    font-weight: bolder;
  }

  #card .back .__social-info-container p {
    width: 100%;
  }

  #card .back .__social-info-container .__social-links {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-height: 6.375rem;
  }

  #card .back .__social-info-container .__social-links ._container {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
  }

  #card .back .__social-info-container .__social-links .mail {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
  }

  #card .back .__social-info-container .__social-links .facebook {
    -ms-grid-row: 1;
    -ms-grid-column: 2;
  }

  #card .back .__social-info-container .__social-links .twitter {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
  }

  #card .back .__social-info-container .__social-links .linkedin {
    -ms-grid-row: 2;
    -ms-grid-column: 2;
  }

  #card .back .__social-info-container .__social-links .github {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
  }

  #card .back .__social-info-container .__social-links .paypal {
    -ms-grid-row: 3;
    -ms-grid-column: 2;
  }

  #card .back .__social-info-container .__social-links a {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    margin: 0.75rem 0 0 1rem;
    padding-bottom: 0.05rem;
    transition: background-color 0.5s;
  }

  #card .back .__social-info-container .__social-links a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  #card .back .__social-info-container .__social-links a span {
    max-width: 60%;
    text-overflow: ellipse;
    margin: 0 0.5rem 0.25rem 0;
  }

  #card .back .__social-info-container .__social-links a svg {
    height: 2rem;
    width: 2rem;
  }

  /* animations */

  .-fadeUp {
    animation: fadeUp ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: 1s;
    opacity: 0;
  }

  @keyframes fadeIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  @keyframes fadeUp {
    0% {
      -webkit-transform: translateY(20px);
      transform: translateY(20px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

function BusinessCard() {
  return (
    <CardContainer className="card-container -display-n">
      <div id="card">
        <a href="#card" className="_btn-fullscreen">
          <i className="fa fa-expand" />
        </a>
        <a href="#index" className="_btn-close">
          <i className="fa fa-times" />
        </a>
        <div className="front">
          <div className="frame" />
          <img className="_logo" src="image/logo.png" alt="adbrtweb logo" />
          <span>web developpement / digital solutions</span>
          <svg className="_background-logo" width="1824" height="1440" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1969.127 1456.135c-5.333-17.916-19.59-49.213-42.64-93.927-13.97-28.425-32.33-65.34-55.041-110.834-62.692-123.047-109.879-209.851-141.51-260.494-23.256-36.494-74.696-127.162-154.318-272.007-76.434-139.32-118.18-214.755-125.371-226.27-26.901-41.414-113.675-192.226-260.446-452.609-99.542-177.568-177.566-316.398-234.126-416.51L.698 1277.553l95.658 193.845c123.112.794 241.669-.065 355.668-2.58 291.135-5.618 494.16-5.793 609.11-.39 66.486 3.19 151.468 3.74 255.03 1.694 148.79-1.924 229.912-2.737 243.48-2.267 84.869 6.55 164.005 10.11 237.312 10.849 101.968.716 159.412-6.836 172.156-22.544l.015-.025zM954.08-215.754c13.602 28.199 32.11 64.206 55.345 108.139l-832.5 1441.933c-20.945-33.303-39.217-69.716-54.783-109.113L954.09-215.772l-.01.018zm93.671 193.776c25.438 53.445 68.894 135.375 130.583 245.804 79.777 141.226 173.36 301.034 280.52 479.395 233.149 421.835 360.568 650.668 382.426 686.348l-791.45-6.55c-397.014-10.193-664.833-11.943-803.401-5.109L1047.739-21.975l.013-.003zm19.515 197.796c-.607-2.268-1.267-3.664-2.028-4.103-.44.761-.492 1.633-.17 2.833l2.198 1.27zm510.291 927.99c-14.734-24.185-48.699-84.454-102.11-180.816-50.795-93.016-78.604-143.132-83.575-150.652-18.08-27.955-75.81-128.652-173.44-302.234-67.478-118.326-119.856-210.85-157.132-277.57l-486.064 841.887-1.78 3.082-148.656 257.48c81.36-.062 160.235-.697 236.659-1.772 195.224-3.528 330.746-3.79 406.52-.59 44.993 1.972 101.957 2.528 170.842 1.75 98.61-1.243 152.984-1.639 162.926-1.414 55.681 4.467 108.428 6.698 158.23 6.904 68.056.474 106.343-4.131 114.87-14.021-4.661-12.747-16.253-37.497-34.87-74.088-19.996-37.389-40.788-73.399-62.423-107.95l.003.004zm-241.016-322.915c58.59 106.828 107.217 195.448 146.044 265.955l-515.678-5.174c-131.06-3.64-240.677-5.95-328.852-6.926l421.912-737.904c16.777 36.438 46.381 91.006 88.618 163.482 53.181 95.364 115.764 202.224 187.953 320.585l.003-.018zm-812.837 448.786l75.651-131.032c175.501-4.063 298.725-4.514 369.797-1.39 44.904 1.879 101.757 2.317 170.513 1.397 98.424-1.448 152.696-1.957 162.618-1.752 55.566 4.353 108.208 6.477 157.915 6.58 19.324 0 36.478-.17 51.605-.752 42.741 77.424 67.938 122.408 75.338 135.021l-527.174-3.459c-265.633-7.358-444.406-8.866-536.247-4.593l-.016-.02z"
              fill="#191A27"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="back">
          <div className="frame" />
          <img src="image/qr-code.png" alt="qr code" />
          <div className="__social-info-container">
            <h3>
              mathieu <span>audebert</span>
            </h3>
            <div>
              <p>
                front developper in <a href="https://www.timeonegroup.com/">TimeOne</a>
              </p>
              <p>freelance web developper / designer</p>
            </div>
            <div className="__social-links">
              <div className="_container">
                <a href="mailto:mathieu.adbrt@gmail.com" className="mail -fadeUp">
                  <span>mail</span>
                  <i className="fas fa-envelope-square" />
                </a>
                <a
                  href="https://www.twitter.com/MattAdbrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter -fadeUp"
                >
                  <span>twitter</span>
                  <i className="fab fa-twitter-square" />
                </a>
              </div>
              <div className="_container">
                <a
                  href="https://github.com/Mheaus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github -fadeUp"
                >
                  <span>github</span>
                  <i className="fab fa-github-square" />
                </a>
                <a
                  href="https://wsww.linkedin.com/in/mathieuAdbrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin -fadeUp"
                >
                  <span>linkedIn</span>
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default BusinessCard;
