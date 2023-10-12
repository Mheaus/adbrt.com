'use client';

import * as React from 'react';
import styled from 'styled-components';
import type { DesignerNewsItem } from '@/types/devo';
import formatRelativeDate from '../formatRelativeDate';

const baseUrl = 'https://www.designernews.co/';

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

const DesignerNewsItem = (props: DesignerNewsItem) => {
  const { id, hostname = null, url, created_at: createdAt, title, vote_count: voteCount, comment_count: commentCount } = props;
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
          <div className="truncate title">
            <a href={url && url.startsWith('http') ? url : threadLink} title={title}>
              {title}
            </a>
          </div>
        </div>
      </div>
      <div className="row meta-data">
        {voteCount} points | {formatRelativeDate(new Date(createdAt))} ago |<a href={threadLink}> {commentCount > 0 ? `${commentCount} comments` : 'discuss'}</a>
      </div>
    </DesignerNewsItemContainer>
  );
};

export default DesignerNewsItem;
