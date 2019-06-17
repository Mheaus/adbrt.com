import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const ItemContainer = styled.div`
  font-size: 16px;
  padding: 16px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;

  .row {
    margin: 0;
  }

  .m-r-16 {
    margin-right: 1rem;
  }

  .title {
    margin-bottom: 4px;
    height: 30px;
    display: inline-block;
  }

  .description {
    font-size: 14px;
    color: ${({ theme }) => (theme.isNightMode ? '#999999' : '#586069')};
    margin-bottom: 8px;
    padding: 4px 0;
    width: 100%;
    overflow-wrap: break-word;
    display: inline-block;
  }

  .inline-block {
    display: inline-block;
  }

  .night-mode .repo-name a {
    color: #7aace4;
  }

  .text-grey {
    color: ${({ theme }) => (theme.isNightMode ? '#999999' : '#586069')};
  }

  .meta-row {
    font-size: 12px;
  }

  h3.repo-name {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    word-break: break-word;
  }

  .text-normal {
    font-weight: 400;
  }

  .repo-name a {
    color: #0366d6;
    text-decoration: none;
    text-decoration-line: none;
    text-decoration-style: initial;
    text-decoration-color: initial;
  }

  .row.meta-row {
    display: block;
  }

  .icon-with-text svg {
    margin-right: 4px;
    vertical-align: 20% !important;
  }

  .icon-with-text a {
    text-decoration: none;
    text-decoration-line: none;
    text-decoration-style: initial;
    text-decoration-color: initial;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-style: initial;
    text-decoration-color: initial;
  }

  .language-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: -10%;
  }

  .m-r-16 {
    margin-right: 16px;
  }
`;

const baseLink = 'https://github.com';

function GithubTrend({ language, repo, stars, forks, todayStars }) {
  return (
    <ItemContainer>
      <div className="row title">
        <h3 className="repo-name">
          <a href={`${baseLink}${repo.link}`}>
            <span className="text-normal"> {repo.owner} /</span> {repo.name}
          </a>
        </h3>
      </div>
      <div className="row description">{repo.description}</div>
      <div className="row meta-row text-grey">
        {language && (
          <span className="language m-r-16">
            <span className="language-color inline-block" style={{ backgroundColor: language.color }} />
            <span className="language-text">{language.is}</span>
          </span>
        )}
        {stars && (
          <div className="icon-with-text inline-block m-r-16 stars">
            <a href={`${baseLink}${stars.link}`}>
              <FontAwesomeIcon icon={faStar} />
              <span>{Number(stars.count).toLocaleString()}</span>
            </a>
          </div>
        )}
        {forks && (
          <div className="icon-with-text inline-block m-r-16 forks">
            <a href={`${baseLink}${forks.link}`}>
              <FontAwesomeIcon icon={faCodeBranch} />
              <span>{Number(forks.count).toLocaleString()}</span>
            </a>
          </div>
        )}
        <div className="icon-with-text inline-block pull-right stars-today">
          <FontAwesomeIcon icon={faStar} />
          <span>{Number(todayStars).toLocaleString()} stars today</span>
        </div>
      </div>
    </ItemContainer>
  );
}

GithubTrend.defaultProps = {
  language: null,
  stars: {},
  forks: {},
};

GithubTrend.propTypes = {
  language: PropTypes.shape({
    is: PropTypes.string,
    color: PropTypes.string,
  }),
  repo: PropTypes.shape({
    link: PropTypes.string,
    owner: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  stars: PropTypes.shape({
    link: PropTypes.string,
    count: PropTypes.number,
  }),
  forks: PropTypes.shape({
    count: PropTypes.number,
    link: PropTypes.string,
  }),
  todayStars: PropTypes.number.isRequired,
};

export default GithubTrend;
