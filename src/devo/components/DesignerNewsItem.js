import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const baseUrl = 'https://www.designernews.co/';

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

const DesignerNewsItemContainer = styled.div`
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

function DesignerNewsItem({
  id,
  hostname,
  url,
  created_at: createdAt,
  title,
  vote_count: voteCount,
  comment_count: commentCount,
}) {
  const threadLink = `${baseUrl}stories/${id}`;

  return (
    <DesignerNewsItemContainer>
      <div className="row title-row">
        <div>
          {hostname && (
            <div className="site-string">
              <a href={`https://${hostname}`}> ({hostname}) </a>
            </div>
          )}
          <div className="title truncate">
            <a href={url && url.startsWith('http') ? url : threadLink} title={title}>
              {title}
            </a>
          </div>
        </div>
      </div>
      <div className="row meta-data">
        {voteCount} points | {timeSince(new Date(createdAt))} ago |
        <a href={threadLink}> {commentCount > 0 ? `${commentCount} comments` : 'discuss'}</a>
      </div>
    </DesignerNewsItemContainer>
  );
}

DesignerNewsItem.defaultProps = {
  hostname: null,
};

DesignerNewsItem.propTypes = {
  id: PropTypes.string.isRequired,
  hostname: PropTypes.string,
  url: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vote_count: PropTypes.number.isRequired,
  comment_count: PropTypes.number.isRequired,
};

export default DesignerNewsItem;
