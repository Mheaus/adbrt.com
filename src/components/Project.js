import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectContainer = styled.div`
  background: #fafafa;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5rem 0;
  padding: 1rem 0.5rem;
  width: 100%;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.primary};
  opacity: 0.7;
`;

const Status = styled.span`
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
  margin: 0 1rem;
`;

const Description = styled.p`
  font-size: 0.75rem;
  margin: 0.5rem 0.25rem;
  opacity: 0.75;
`;

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
