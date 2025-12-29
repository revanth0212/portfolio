import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.2s ease;

  &:hover {
    gap: 0.75rem;
  }
`;

const Article = styled.article`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 3rem;
  box-shadow: ${props => props.theme.cardShadow};
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const ArticleMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.muted};
  font-size: 0.9rem;
`;

const ArticleContent = styled.div`
  color: ${props => props.theme.foreground};
  line-height: 1.8;
  font-size: 1.05rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.foreground};
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.foreground};
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.theme.foreground};
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.25rem;
  }

  ul, ol {
    margin-bottom: 1.25rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background-color: ${props => props.theme.secondary};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: ${props => props.theme.secondary};
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    border: 1px solid ${props => props.theme.border};

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.accent};
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    color: ${props => props.theme.muted};
    font-style: italic;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;

    th, td {
      padding: 0.75rem;
      border: 1px solid ${props => props.theme.border};
      text-align: left;
    }

    th {
      background-color: ${props => props.theme.secondary};
      font-weight: 600;
    }
  }

  strong {
    color: ${props => props.theme.accent};
    font-weight: 600;
  }
`;

const BlogPost = () => {
  const { currentTheme } = useTheme();
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Container>
      <BackButton to="/blog" theme={currentTheme}>
        ← Back to Blog
      </BackButton>

      <Article theme={currentTheme}>
        <ArticleHeader theme={currentTheme}>
          <ArticleTitle theme={currentTheme}>{post.title}</ArticleTitle>
          <ArticleMeta theme={currentTheme}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </ArticleMeta>
        </ArticleHeader>

        <ArticleContent theme={currentTheme}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </ArticleContent>
      </Article>
    </Container>
  );
};

export default BlogPost;
