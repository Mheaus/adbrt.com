import * as React from 'react';
import { FaCodeBranch, FaStar } from 'react-icons/fa';
import styled from 'styled-components';

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
    margin: auto 4px auto 0;
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

interface GithubTrendProps {
  language?: { is?: string; color?: string };
  repo: { description?: string; link?: string; owner?: string; name?: string };
  stars?: { link?: string; count?: number };
  forks?: { count?: number; link?: string };
  todayStars: number;
}

const GithubTrend: React.FC<GithubTrendProps> = (props) => {
  const { language = null, repo, stars = {}, forks = {}, todayStars } = props;

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
            <span className="inline-block language-color" style={{ backgroundColor: language.color }} />
            <span className="language-text">{language.is}</span>
          </span>
        )}
        {stars && (
          <div className="inline-block icon-with-text m-r-16 stars">
            <a href={`${baseLink}${stars.link}`}>
              <FaStar />
              <span>{Number(stars.count).toLocaleString()}</span>
            </a>
          </div>
        )}
        {forks && (
          <div className="inline-block icon-with-text m-r-16 forks">
            <a href={`${baseLink}${forks.link}`}>
              <FaCodeBranch />
              <span>{Number(forks.count).toLocaleString()}</span>
            </a>
          </div>
        )}
        <div className="inline-block icon-with-text pull-right stars-today">
          <FaStar />
          <span>{Number(todayStars).toLocaleString()} stars today</span>
        </div>
      </div>
    </ItemContainer>
  );
};

export default GithubTrend;
