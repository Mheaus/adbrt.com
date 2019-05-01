import React from 'react';
import PropTypes from 'prop-types';

import { ProjectContainer, Title, Status, Description } from './styledComponents';

function Project({ name, status, description }) {
  return (
    <ProjectContainer>
      <Title>
        {name}
        <Status>{status}</Status>
      </Title>
      <Description>{description}</Description>
    </ProjectContainer>
  );
}

Project.defaultProps = {
  name: '',
  status: '',
  description: '',
};

Project.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
};

export default Project;
