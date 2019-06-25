import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

import settings from '../settings';

const PlatformSelectContainer = styled.div`
  .wrapper {
    width: 100%;
    display: inline-block;
    cursor: pointer;
    min-width: 180px;
  }

  .options {
    margin: 0;
    padding: 0px;
    list-style-type: none;
    z-index: 9999;
    position: absolute;
    background: white;
    color: black;
    margin-top: 4px;
  }

  .option-item {
    cursor: pointer;
    font-weight: 200;
    min-width: 200px;

    button {
      display: flex;
      align-items: center;
      padding: 8px 12px 8px 12px;
      height: 100%;
      justify-content: flex-start;
      width: 100%;
    }
  }

  .option-item.selected,
  .option-item:hover {
    background: #f5f7fa;
  }

  .select-icon {
    display: none;
    color: #ffffff82;
    margin-left: auto;
  }

  .select-title {
    padding: 5px;
    display: inline-block;
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
    display: flex;
    align-items: center;
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

function PlatformSelect({ onChange, selectedPlatform }) {
  const themeContext = useContext(ThemeContext);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const wrapperRef = useRef();

  function handleChange(platformName) {
    setDropdownVisibility(false);
    onChange(platformName);
  }

  function handleOutsideClick(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdownVisibility(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <PlatformSelectContainer ref={wrapperRef}>
      <button
        className={`round-borders wrapper${isDropdownVisible ? ' hovered-wrapper' : ''}`}
        onClick={() => setDropdownVisibility(!isDropdownVisible)}
        v-outside="closeDropdown"
        type="button"
      >
        <div className="select-title-wrapper">
          <span className="select-title">{selectedPlatform.title}</span>
          <span className="select-icon">
            <FontAwesomeIcon icon={faCaretDown} />
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
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </PlatformSelectContainer>
  );
}

PlatformSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedPlatform: PropTypes.shape({}).isRequired,
};

export default PlatformSelect;
