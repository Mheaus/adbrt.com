import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FaExternalLinkAlt, FaSyncAlt } from 'react-icons/fa';

import Loader from './Loader';
import PlatformSelect from './PlatformSelect';
import context from '../context';
import settings from '../settings';

const CardContainer = styled.div`
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
  overflow: hidden;
  width: 100%;

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

const CardBody = styled.div`
  ${({ ref }: { ref?: any }) => `height: calc(100% - ${ref && ref.current ? ref.current.firstChild.clientHeight : '55'}px);`}
  padding: 0 16px;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.card.body.backgroundColor};
  color: ${({ theme }) => theme.card.body.color};
`;

const CardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  padding: 12px;
  text-align: left;
`;

interface PlatformCardProps {
  platform: string;
}

const PlarformCard: React.FC<PlatformCardProps> = (props) => {
  const { platform } = props;
  const [loading, setLoading] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState(settings.platforms[platform]);
  const { state, setState } = React.useContext(context);
  const themeContext = React.useContext(ThemeContext);

  const { dataUrl, gridArea, titleFontColor, icon: Icon, externalLink, component } = selectedPlatform;
  const containerRef = React.useRef(null);

  const updateData = async () => {
    setLoading(true);

    const response = await fetch(dataUrl);
    const result = await response.json();

    setState((prevState) => ({
      ...prevState,
      [selectedPlatform.name]: selectedPlatform.responseDataKey ? result[selectedPlatform.responseDataKey] : result,
    }));

    setLoading(false);
  };

  React.useEffect(() => {
    updateData();
  }, [selectedPlatform]);

  return (
    <CardContainer ref={containerRef} style={{ gridArea }}>
      <CardTitle
        style={{
          backgroundColor: themeContext[selectedPlatform.name].titleBackgroundColor || themeContext.card.header.backgroundColor,
          color: themeContext[selectedPlatform.name].titleFontColor || themeContext.card.header.fontColor,
        }}
      >
        <Icon className="w-8 h-8" />
        <PlatformSelect onChange={(platformName) => setSelectedPlatform(settings.platforms[platformName])} selectedPlatform={selectedPlatform} />
        <div className="pull-right external-icons">
          <div className="title-icon external-icon" style={{ color: titleFontColor }}>
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt />
            </a>
          </div>
          <div className="title-icon refresh-icon" style={{ color: titleFontColor }}>
            <FaSyncAlt onClick={updateData} />
          </div>
        </div>
      </CardTitle>
      {loading ? (
        <Loader color={themeContext[platform].loadingColor} />
      ) : (
        <CardBody>{state[selectedPlatform.name] && state[selectedPlatform.name].map((rowData) => (rowData ? React.createElement(component, { ...rowData, key: Math.random() }) : null))}</CardBody>
      )}
    </CardContainer>
  );
};

export default PlarformCard;
