import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout, SEO, Nav, NavLayout } from '../components';

const PostsContainer = styled.div`
  color: ${({ theme }) => theme.white};
`;

function Blog() {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/data/blog/" } }) {
        posts: edges {
          post: node {
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
      <SEO title="Blog" />
      <Nav />
      <NavLayout>
        {allMarkdownRemark.posts.map(({ post }) => (
          <PostsContainer dangerouslySetInnerHTML={{ __html: post.html }} />
        ))}
      </NavLayout>
    </Layout>
  );
}

export default Blog;
