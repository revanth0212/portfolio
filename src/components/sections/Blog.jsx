import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.foreground};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    background-color: ${props => props.theme.secondary};
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BlogCard = styled.article`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.5rem;
`;

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin-bottom: 1rem;
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.6;
`;

const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.foreground};

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.accent};
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.accent};
    text-decoration: underline;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 5px;
    overflow-x: auto;
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.accent};
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: ${props => props.theme.muted};
    font-style: italic;
  }

  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    border-radius: 5px;
    margin: 1.5rem 0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.muted};
`;

const Blog = () => {
  const { currentTheme, theme } = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);

  if (blogPosts.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle theme={currentTheme}>Blog</SectionTitle>
        <EmptyState theme={currentTheme}>
          No blog posts yet. Check back soon!
        </EmptyState>
      </SectionContainer>
    );
  }

  if (selectedPost) {
    return (
      <SectionContainer>
        <BackButton
          theme={currentTheme}
          onClick={() => setSelectedPost(null)}
          aria-label="Back to blog list"
        >
          ← Back to Posts
        </BackButton>
        <PostContent theme={currentTheme}>
          <h1>{selectedPost.title}</h1>
          <PostMeta theme={currentTheme}>
            {selectedPost.date} • {selectedPost.readTime}
          </PostMeta>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {selectedPost.content}
          </ReactMarkdown>
        </PostContent>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Blog Posts</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1.5rem' }}>
        Thoughts, tutorials, and insights about software development
      </p>
      <BlogList>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            theme={currentTheme}
            onClick={() => setSelectedPost(post)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSelectedPost(post);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Read ${post.title}`}
          >
            <PostTitle theme={currentTheme}>{post.title}</PostTitle>
            <PostMeta theme={currentTheme}>
              {post.date} • {post.readTime}
            </PostMeta>
            <PostExcerpt theme={currentTheme}>{post.excerpt}</PostExcerpt>
          </BlogCard>
        ))}
      </BlogList>
    </SectionContainer>
  );
};

export default Blog;
