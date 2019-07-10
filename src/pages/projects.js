import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout, SEO, Nav, NavLayout } from '../components';

const ProjectContainer = styled.div`
  color: ${({ theme }) => theme.white};
  max-width: 48rem;

  a {
    color: ${({ theme }) => theme.secondary};
  }

  p {
    margin: 1rem 0;
  }
`;

function Projects() {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/data/projects/" } }) {
        projects: edges {
          project: node {
            frontmatter {
              title
              date
              path
            }
            html
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Projects" />
      <Nav />
      <NavLayout>
        {allMarkdownRemark.projects.map(({ project }) => (
          <ProjectContainer dangerouslySetInnerHTML={{ __html: project.html }} />
        ))}
      </NavLayout>
    </Layout>
  );
}

export default Projects;
