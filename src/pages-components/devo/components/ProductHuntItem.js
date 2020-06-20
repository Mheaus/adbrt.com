import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faComment } from '@fortawesome/free-solid-svg-icons';

const ItemContainer = styled.div`
  font-size: 16px;
  padding: 16px 0;
  text-align: left;
  border-bottom: 1px solid #dfe3e8a8;

  .row {
    margin: 0;
  }

  .row .col-lg-2 {
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .thumbnail {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }

  .image-container {
    width: 80px;
    height: 80px;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-line: underline;
    text-decoration-style: initial;
    text-decoration-color: initial;
  }

  .title-row {
    font-size: 20px;
    font-weight: 300;
    line-height: 32px;
  }

  .description {
    align-items: center;
    color: rgb(153, 153, 153);
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 5px;
  }

  .small-info-box {
    color: rgb(153, 153, 153);
    background: #f8f8f8;
    border-radius: 3px;
    border: 1px solid #e8e8e8;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 4px;
    height: 24px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    outline: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .night-mode .small-info-box {
    color: rgb(153, 153, 153);
    background: #31363e;
  }

  .night-mode .link-box:hover {
    background-color: #25292e;
  }

  .ph-tag-wrapper,
  .ph-action-wrapper {
    display: flex;
    align-items: center;
  }

  .small-info-box a,
  .small-info-box span {
    line-height: 16px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    text-decoration: none !important;
    padding: 0 8px;
    font-weight: 400;
    font-size: 11px;
    text-align: left;
    text-decoration-color: rgb(153, 153, 153);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-transform: uppercase;
  }

  .link-box:hover {
    background-color: #ebebeb;
    cursor: pointer;
  }

  .small-info-box svg {
    margin: -4px 2px -2px 0px;
    font-size: 12px !important;
  }

  .white-background {
    background-color: white;
  }

  .vote-count {
    color: black;
  }

  .vote-count {
    color: black;
    background-color: white;
  }

  .action span {
    font-weight: 600 !important;
  }

  .remaining-topic-count {
    background-color: rgba(0, 0, 0, 0);
    color: rgb(153, 153, 153);
    font-size: 11px;
    font-weight: 400;
    height: auto;
    line-height: 16px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-left: 3.85px;
    text-align: left;
    text-decoration-color: rgb(153, 153, 153);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-size-adjust: 100%;
    text-transform: uppercase;
    white-space: nowrap;
    width: auto;
    -webkit-box-direction: normal;
    cursor: pointer;
  }
  .remaining-topic-count:hover {
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

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-info {
    flex: 1;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .between-lg {
    display: flex;
    justify-content: space-between;
  }
`;

const baseLink = 'https://www.producthunt.com';

function ProductHuntItem({
  name,
  tagline,
  topics,
  votes_count: votesCount,
  comments_count: commentsCount,
  slug,
  thumbnail,
}) {
  return (
    <ItemContainer>
      <div className="row" style={{ display: 'flex' }}>
        <div className="thumbnail">
          <div className="image-container">
            <img
              src={`${thumbnail.image_url}&h=80&w=80`}
              srcSet={`${thumbnail.image_url}&h=80&w=80&dpr=2 2x`}
              width="80"
              height="80"
              alt=""
            />
          </div>
        </div>
        <div className="product-info">
          <div className="row title-row">
            <a href={`${baseLink}/posts/${slug}`}> {name}</a>
          </div>
          <h3 className="row description">{tagline}</h3>
          <div className="row meta between-lg">
            <span className="ph-tag-wrapper">
              {topics.length !== 0 && (
                <span className="small-info-box link-box">
                  <a href={`${baseLink}/topics/${topics[0].slug}`}>{topics[0].name}</a>
                </span>
              )}
              {topics.length - 1 > 0 && (
                <span className="remaining-topic-count" title="remainingTopics">
                  +{topics.length - 1}
                </span>
              )}
            </span>
            <span className="ph-action-wrapper">
              <span className="small-info-box action vote-count white-background">
                <span>
                  <FontAwesomeIcon icon={faChevronUp} />
                  {votesCount}
                </span>
              </span>
              <span className="small-info-box action white-background">
                <span>
                  <FontAwesomeIcon icon={faComment} />
                  {commentsCount}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </ItemContainer>
  );
}

ProductHuntItem.propTypes = {
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string, name: PropTypes.string })).isRequired,
  votes_count: PropTypes.number.isRequired,
  comments_count: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    image_url: PropTypes.string,
  }).isRequired,
};

export default ProductHuntItem;
