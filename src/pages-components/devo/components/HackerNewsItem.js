import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemContainer = styled.div`
  font-size: 16px;
  padding: 8px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;

  .row {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .meta-data a {
    margin: 0 2.5px;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-style: initial;
    text-decoration-color: initial;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
  }

  .title-row {
    margin-bottom: 4px;
  }

  .title-row > div {
    max-width: 100%;
  }

  .site-string {
    color: rgb(130, 130, 130);
    font-size: 10.667px;
    float: right;
    white-space: nowrap;
    margin-top: 3px;
    padding-left: 4px;
  }

  .meta-data {
    color: rgb(130, 130, 130);
    font-size: 9.33333px;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const baseLink = 'https://news.ycombinator.com/';

function HackerNewsItem({ siteString, title, score, user, age, commentCount, link, threadLink }) {
  return (
    <ItemContainer>
      <div className="row title-row">
        <div>
          {siteString && (
            <div className="site-string">
              <a href={`${baseLink}${siteString}`}> ({siteString}) </a>
            </div>
          )}
          <div className="title truncate">
            <a href={link.startsWith('http') ? link : `${baseLink}${link}`} title="item.title">
              {title}
            </a>
          </div>
        </div>
      </div>
      <div className="row meta-data">
        {score} by <a href={`${baseLink}${user.link}`}> {user.name}</a> | {age} |
        <a href={`${baseLink}${threadLink}`}> {commentCount}</a>
      </div>
    </ItemContainer>
  );
}

HackerNewsItem.defaultProps = {
  commentCount: null,
  score: null,
  siteString: null,
  threadLink: '',
};

HackerNewsItem.propTypes = {
  siteString: PropTypes.string,
  title: PropTypes.string.isRequired,
  score: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
  age: PropTypes.string.isRequired,
  commentCount: PropTypes.string,
  link: PropTypes.string.isRequired,
  threadLink: PropTypes.string,
};

export default HackerNewsItem;
