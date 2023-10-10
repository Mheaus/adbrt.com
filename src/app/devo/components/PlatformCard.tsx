import * as React from 'react';
import { ThemeContext } from 'styled-components';
import { FaExternalLinkAlt, FaSyncAlt } from 'react-icons/fa';

import Loader from './Loader';
import PlatformSelect from './PlatformSelect';
import context from '../context';
import settings from '../settings';

interface PlatformCardProps {
  style?: React.CSSProperties;
  platform: string;
}

const PlarformCard: React.FC<PlatformCardProps> = (props) => {
  const { style, platform } = props;
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
    <div ref={containerRef} style={{ gridArea, ...style }} className="flex flex-col w-full h-full overflow-hidden rounded-md shadow-md">
      <div
        className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-base text-left"
        style={{
          backgroundColor: themeContext[selectedPlatform.name].titleBackgroundColor || themeContext.card.header.backgroundColor,
          color: themeContext[selectedPlatform.name].titleFontColor || themeContext.card.header.fontColor,
        }}
      >
        <Icon className="w-8 h-8" />

        <PlatformSelect onChange={(platformName) => setSelectedPlatform(settings.platforms[platformName])} selectedPlatform={selectedPlatform} />

        <div className="flex items-center gap-4 ml-auto">
          <div className="hover:cursor-pointer" style={{ color: titleFontColor }}>
            <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-current no-underline">
              <FaExternalLinkAlt />
            </a>
          </div>

          <div className="hover:cursor-pointer" style={{ color: titleFontColor }}>
            <FaSyncAlt onClick={updateData} />
          </div>
        </div>
      </div>

      {loading ? (
        <Loader color={themeContext[platform].loadingColor} />
      ) : (
        <div className="flex-grow px-4 overflow-y-auto text-gray-700 bg-white">
          {state[selectedPlatform.name] && state[selectedPlatform.name].map((rowData) => (rowData ? React.createElement(component, { ...rowData, key: Math.random() }) : null))}
        </div>
      )}
    </div>
  );
};

export default PlarformCard;
