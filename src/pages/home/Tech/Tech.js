import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { TechListItem } from './styledComponents';

function Tech({ name }) {
  return (
    <TechListItem>
      <FontAwesomeIcon icon={faCaretRight} />
      <span>{name}</span>
    </TechListItem>
  );
}

Tech.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tech;
