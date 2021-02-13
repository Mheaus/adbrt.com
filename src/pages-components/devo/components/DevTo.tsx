import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CommentsLink = styled.a`
  display: inline-block;

  & > svg {
    color: #60a0ff;
    vertical-align: 2.5px !important;
  }
`;

const DevToContainer = styled.div`
  .devto-item {
    font-size: 15px;
    padding: 8px 0;
    text-align: left;
    border-bottom: 1px solid #dfe3e8a8;
    color: #292929 !important;
  }

  .night-mode .devto-item {
    border-bottom: 1px solid #dfe3e82d;
  }

  .night-mode .devto-item,
  .night-mode .devto-item .title {
    color: inherit !important;
  }

  .devto-item {
    margin: 0;
  }

  .devto-item a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .devto-item a:hover .hover-underline,
  .devto-item .hover-underline:hover {
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-style: initial;
    text-decoration-color: initial;
  }

  .devto-item .title {
    white-space: nowrap;
    overflow: hidden;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    margin: 0;
    color: #292929;
    line-height: 28px;
  }

  .devto-item .site-string {
    color: rgb(130, 130, 130);
    font-size: 10.667px;
    float: right;
    white-space: nowrap;
    margin-top: 3px;
    padding-left: 4px;
  }

  .devto-item .flare-tag {
    border-radius: 4px;
    display: inline;
    font-size: 12px;
    font-weight: 500;
    margin-right: 5px;
    padding: 0 6px;
    vertical-align: 2px;
  }

  .devto-item a:hover .flare-tag {
    text-decoration: none;
  }

  .devto-item .tag-list {
    margin-top: 2px;
    font-size: 10px;
  }

  .devto-item .tag {
    margin-right: 8px;
    color: #757575;
    font-size: 12px;
  }

  .devto-item .metadata {
    color: rgba(0, 0, 0, 0.54) !important;
    font-size: 12px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .devto-item .box {
    color: rgb(153, 153, 153);
    border-radius: 3px;
    border: 1px solid #e8e8e8;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    outline: 0;
    overflow: hidden;
    white-space: nowrap;
    padding: 2px 6px;
  }

  .devto-item a.box:hover {
    background-color: #f2f2f2;
  }

  .night-mode .devto-item a.box:hover {
    background-color: #25292e;
  }

  .night-mode .devto-item .box {
    border: 1px solid #757575;
  }

  .night-mode .devto-item .metadata {
    color: #757575 !important;
  }

  .devto-item .metadata .likes {
    margin-right: 4px;
  }
  .devto-item .metadata .likes > svg {
    color: #ff6363;
    vertical-align: 2.5px !important;
  }

  .devto-item .metadata .comments > svg {
    color: #60a0ff;
    vertical-align: 2.5px !important;
  }

  .devto-item .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .devto-item .light-grey {
    color: #757575;
  }

  .devto-item .icon-with-text svg {
    margin-right: 6px;
    vertical-align: 20% !important;
  }

  .devto-item .icon-with-text a {
    text-decoration: none;
    text-decoration-line: none;
    text-decoration-style: initial;
    text-decoration-color: initial;
    color: inherit;
  }
`;

const Likes = styled.div`
  display: inline-block;
`;

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? ' day' : ' days');
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval === 1 ? ' hour' : ' hours');
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval === 1 ? 'minute' : ' minutes');
  }

  return `${Math.floor(seconds)} seconds`;
}

const baseUrl = `https://dev.to/`;

interface DevToProps {
  // eslint-disable-next-line camelcase
  comments_count: string;
  // eslint-disable-next-line camelcase
  positive_reactions_count: string;
  // eslint-disable-next-line camelcase
  published_at: string;
  // eslint-disable-next-line camelcase
  tag_list: string[];
  title: string;
  url: string;
  user: { name: string; username: string };
}

const DevTo: React.FC<DevToProps> = props => {
  const {
    comments_count: commentsCount,
    positive_reactions_count: positiveReactionsCount,
    published_at: publishedAt,
    tag_list: tagList,
    title,
    url,
    user,
  } = props;

  const relativeDate = timeSince(new Date(publishedAt));
  const publishDateShort = new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <DevToContainer>
      <div className="devto-item">
        <div className="title-row">
          <h2 className="title truncate">
            <a href={url} title={title}>
              <span className="hover-underline">{title}</span>
            </a>
          </h2>
        </div>
        {tagList && (
          <div className="tag-list">
            {tagList.map(tag => (
              <a className="tag hover-underline" key={tag} href={`${baseUrl}/t/${tag}`}>
                #{tag}
              </a>
            ))}
          </div>
        )}
        <div className="metadata">
          <div>
            <a className="hover-underline" href={`${baseUrl}${user.username}`}>
              {user.name}
            </a>
            ・{publishDateShort} ({relativeDate} ago)
          </div>
          <div className="pull-right">
            <Likes className="icon-with-text inline-block box likes">
              <FontAwesomeIcon icon={faHeart} />
              <span>{positiveReactionsCount}</span>
            </Likes>
            <CommentsLink href={`${url}#comments`} className="icon-with-text inline-block box comments">
              <FontAwesomeIcon icon={faComment} />
              <span>{commentsCount}</span>
            </CommentsLink>
          </div>
        </div>
      </div>
    </DevToContainer>
  );
};

export default DevTo;
