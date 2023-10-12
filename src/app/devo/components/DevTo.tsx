'use client';

import * as React from 'react';
import { RiChat3Fill, RiHeartFill } from 'react-icons/ri';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import context from '../context';
import { DevToItem } from '@/types/devo';
import formatRelativeDate from '../formatRelativeDate';

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
    margin: auto 6px auto 0;
  }

  .devto-item .icon-with-text a {
    text-decoration: none;
    text-decoration-line: none;
    text-decoration-style: initial;
    text-decoration-color: initial;
    color: inherit;
  }
`;

const baseUrl = `https://dev.to/`;

const DevTo = (props: DevToItem) => {
  const { comments_count: commentsCount, positive_reactions_count: positiveReactionsCount, published_at: publishedAt, tag_list: tagList, title, url, user } = props;
  const { isNightMode } = React.useContext(context);

  const relativeDate = formatRelativeDate(new Date(publishedAt));
  const publishDateShort = new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <DevToContainer>
      <div className={`devto-item ${isNightMode ? 'night-mode' : ''}`}>
        <div className="title-row">
          <h2 className="truncate title">
            <a href={url} title={title}>
              <span className="hover-underline">{title}</span>
            </a>
          </h2>
        </div>
        {tagList && (
          <div className="tag-list">
            {tagList.map((tag) => (
              <a className="tag hover-underline" key={tag} href={`${baseUrl}/t/${tag}`}>
                #{tag}
              </a>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <div>
            <a className="hover-underline" href={`${baseUrl}${user.username}`}>
              {user.name}
            </a>
            ・{publishDateShort} ({relativeDate} ago)
          </div>

          <div className="flex gap-1 pull-right">
            <div className="flex items-center icon-with-text box likes">
              <RiHeartFill />
              <span>{positiveReactionsCount}</span>
            </div>

            <a href={`${url}#comments`} className="flex items-center icon-with-text box comments">
              <RiChat3Fill className="text-blue-400" />
              <span>{commentsCount}</span>
            </a>
          </div>
        </div>
      </div>
    </DevToContainer>
  );
};

export default DevTo;
