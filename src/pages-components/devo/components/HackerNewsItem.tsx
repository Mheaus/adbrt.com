import * as React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  border-bottom: 1px solid #dfe3e8a8;
  font-size: 16px;
  padding: 8px 0;
  text-align: left;

  .row {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .meta-data a {
    margin: 0 2.5px;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: initial;
    text-decoration-line: underline;
    text-decoration-style: initial;
  }

  .title {
    overflow: hidden;
    white-space: nowrap;
  }

  .title-row {
    margin-bottom: 4px;
  }

  .title-row > div {
    max-width: 100%;
  }

  .site-string {
    color: rgb(130, 130, 130);
    float: right;
    font-size: 10.667px;
    margin-top: 3px;
    padding-left: 4px;
    white-space: nowrap;
  }

  .meta-data {
    color: rgb(130, 130, 130);
    font-size: 9.33333px;
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const baseLink = 'https://news.ycombinator.com/';

interface HackerNewsItemProps {
  siteString?: string;
  title: string;
  score?: string;
  user: { link?: string; name?: string };
  age: string;
  commentCount?: string;
  link: string;
  threadLink?: string;
}

const HackerNewsItem: React.FC<HackerNewsItemProps> = (props) => {
  const { siteString = null, title, score = null, user, age, commentCount = null, link, threadLink = '' } = props;

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
};

export default HackerNewsItem;
