import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import context from '../context';
import settings from '../settings';
import Loader from './Loader';
import PlatformSelect from './PlatformSelect';

const CardContainer = styled.div`
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
  overflow: hidden;
  width: 100%;

  .card-title {
    align-items: center;
    display: flex;
    font-size: 16px;
    padding: 12px;
    text-align: left;
  }

  .card-body {
    ${({ forwardedRef }) =>
      `height: calc(100% - ${forwardedRef.current ? forwardedRef.current.firstChild.clientHeight : '55'}px);`}
    padding: 0 16px;
    overflow-y: auto;

    background-color: ${({ theme }) => theme.card.body.backgroundColor};
    color: ${({ theme }) => theme.card.body.color};
  }

  .card-title-text {
    font-weight: 600;
  }

  svg {
    margin: -0.5rem 0.5rem -0.25rem 0;
  }

  .custom-icon {
    height: 2rem;
    width: 2rem;
    margin: -0.25rem 0.5rem -0.25rem 0 !important;
  }

  svg,
  .title-icon,
  .card-title-text,
  .refresh-icon {
    display: inline-block !important;
    vertical-align: middle !important;
  }

  .refresh-icon:hover,
  .external-icon:hover {
    cursor: pointer;
    color: #ffffff !important;
  }

  .pull-right {
    margin-left: auto;
  }

  .title-icon a {
    text-decoration: none;
    color: inherit;
  }
  .title-icon svg {
    transform: translateY(-8%);
  }
`;

function PlarformCard({ platform }) {
  const [loading, setLoading] = useState();
  const [selectedPlatform, setSelectedPlatform] = useState(settings.platforms[platform]);
  const { state, setState } = useContext(context);
  const themeContext = useContext(ThemeContext);
  const { dataUrl, gridArea, titleFontColor, icon, externalLink, component } = selectedPlatform;
  const containerRef = useRef();

  async function updateData() {
    setLoading(true);

    const response = await fetch(dataUrl);
    const result = await response.json();

    setState(prevState => ({
      ...prevState,
      [selectedPlatform.name]: result[selectedPlatform.responseDataKey || 'data'],
    }));

    setLoading(false);
  }

  useEffect(() => {
    updateData();
  }, [selectedPlatform]);

  return (
    <CardContainer ref={containerRef} style={{ gridArea }}>
      <div
        className="card-title"
        style={{
          backgroundColor:
            themeContext[selectedPlatform.name].titleBackgroundColor || themeContext.card.header.backgroundColor,
          color: themeContext[selectedPlatform.name].titleFontColor || themeContext.card.header.fontColor,
        }}
      >
        <FontAwesomeIcon icon={icon} style={{ height: '2rem', width: '2rem' }} />
        <PlatformSelect
          onChange={platformName => setSelectedPlatform(settings.platforms[platformName])}
          selectedPlatform={selectedPlatform}
        />
        <div className="pull-right external-icons">
          <div className="title-icon external-icon" style={{ color: titleFontColor }}>
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="title-icon refresh-icon" style={{ color: titleFontColor }}>
            <FontAwesomeIcon icon={faSyncAlt} onClick={updateData} />
          </div>
        </div>
      </div>
      {loading ? (
        <Loader color={themeContext[platform].loadingColor} />
      ) : (
        <div className="card-body">
          {state[selectedPlatform.name] &&
            state[selectedPlatform.name].map(rowData =>
              rowData ? React.createElement(component, { ...rowData, key: Math.random() }) : null
            )}
        </div>
      )}
    </CardContainer>
  );
}

PlarformCard.propTypes = {
  platform: PropTypes.string.isRequired,
};

export default PlarformCard;
