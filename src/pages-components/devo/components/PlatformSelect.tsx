import * as React from 'react';
import { FaCaretDown, FaCheck } from 'react-icons/fa';
import styled, { ThemeContext } from 'styled-components';

import settings from '../settings';

const PlatformSelectContainer = styled.div`
  .wrapper {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    min-width: 180px;
  }

  .options {
    background: white;
    color: black;
    list-style-type: none;
    margin: 4px 0 0;
    padding: 0px;
    position: absolute;
    z-index: 9999;
  }

  .option-item {
    cursor: pointer;
    font-weight: 200;
    min-width: 200px;

    button {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: flex-start;
      padding: 8px 12px;
      width: 100%;
    }
  }

  .option-item.selected,
  .option-item:hover {
    background: #f5f7fa;
  }

  .select-icon {
    color: #ffffff82;
    display: none;
    margin-left: auto;
  }

  .select-title {
    display: inline-block;
    padding: 5px;
  }

  .hovered-wrapper,
  .wrapper:hover {
    border: 1px solid rgb(255, 255, 255, 0.25);
  }

  .hovered-wrapper .select-title,
  .wrapper:hover .select-title {
    padding: 4px;
  }

  .hovered-wrapper .select-icon,
  .wrapper:hover .select-icon {
    display: inline-block;
  }

  .select-title-wrapper {
    align-items: center;
    display: flex;
  }

  .platform-color-box {
    border-radius: 0.125rem;
    display: inline-block;
    height: 1rem;
    margin-right: 0.5rem;
    transition: box-shadow 0.1s;
    width: 1rem;
  }
  .option-item:hover .platform-color-box {
    box-shadow: 0 2px 8px 0 rgba(70, 73, 77, 0.16);
  }

  .platform-selected-icon {
    color: #576068;
    font-size: 12px;
    margin-left: auto;
  }

  /* Here comes night-mode styling. */
  .night-mode .options {
    background-color: #25292f;
    color: white;
  }

  .night-mode .option-item.selected,
  .night-mode .option-item:hover {
    background: #31363e;
  }

  .night-mode .platform-selected-icon {
    color: #949494;
  }

  .night-mode .hovered-wrapper,
  .night-mode .wrapper:hover {
    border: 1px solid rgba(130, 130, 130, 0.4);
  }
`;

interface PlatformSelectProps {
  onChange: (platformName: keyof typeof settings.platforms) => void;
  selectedPlatform: { name?: string; title?: string };
}

const PlatformSelect: React.FC<PlatformSelectProps> = (props) => {
  const { onChange, selectedPlatform } = props;
  const themeContext = React.useContext(ThemeContext);
  const [isDropdownVisible, setDropdownVisibility] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement>();

  function handleChange(platformName) {
    setDropdownVisibility(false);
    onChange(platformName);
  }

  function handleOutsideClick(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdownVisibility(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <PlatformSelectContainer ref={wrapperRef}>
      <button
        className={`round-borders wrapper${isDropdownVisible ? ' hovered-wrapper' : ''}`}
        onClick={() => setDropdownVisibility(!isDropdownVisible)}
        type="button"
      >
        <div className="select-title-wrapper">
          <span className="select-title">{selectedPlatform.title}</span>
          <span className="select-icon">
            <FaCaretDown />
          </span>
        </div>
      </button>
      {isDropdownVisible && (
        <ul className="options round-borders with-shadow">
          {Object.values(settings.platforms).map(({ title, name }) => (
            <li key={name} className={`option-item round-borders${name === selectedPlatform.name ? ' selected' : ''}`}>
              <button type="button" onClick={() => handleChange(name)}>
                <div
                  className="platform-color-box round-borders"
                  style={{ backgroundColor: themeContext[name].titleBackgroundColor }}
                />
                <span className="platform-title">{title}</span>
                {name === selectedPlatform.name && (
                  <span className="platform-selected-icon">
                    <FaCheck />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </PlatformSelectContainer>
  );
};

export default PlatformSelect;
