import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts, getAllTags } from '../../data/blogPosts';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.muted};
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.foreground};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.accent}20;
  }

  &::placeholder {
    color: ${props => props.theme.muted};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.65rem 0.85rem;
  }
`;

const TagFilter = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin-right: 0.5rem;
`;

const TagButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.foreground};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  ${props => props.active && `
    background-color: ${props.theme.accent};
    color: #fff;
    border-color: ${props.theme.accent};
  `}

  ${props => props.isExpand && `
    background-color: ${props.theme.secondary};
    border-style: dashed;
    font-weight: 500;
  `}

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BlogCard = styled.article`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.muted};
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.accent};
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
`;

const ReadMoreLink = styled(Link)`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    gap: 0.75rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border};

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
`;

const PaginationButton = styled.button`
  background: ${props => props.active ? props.theme.accent : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.foreground};
  border: 1px solid ${props => props.active ? props.theme.accent : props.theme.border};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    min-width: 36px;
  }
`;

const PaginationInfo = styled.span`
  color: ${props => props.theme.muted};
  font-size: 0.875rem;
  margin: 0 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    display: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.muted};
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const Blog = () => {
  const { currentTheme } = useTheme();
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const allTags = getAllTags();
  const TAGS_LIMIT = 5;
  const POSTS_PER_PAGE = 5;

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by tag (only if not searching)
    if (selectedTag && !searchQuery.trim()) {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    return posts;
  }, [selectedTag, searchQuery]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedTag, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Clear tag filter when user starts typing
    if (e.target.value && selectedTag) {
      setSelectedTag(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (blogPosts.length === 0) {
    return (
      <Container>
        <Header>
          <Title theme={currentTheme}>Blog</Title>
        </Header>
        <EmptyState theme={currentTheme}>
          No blog posts yet. Check back soon!
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title theme={currentTheme}>Blog</Title>
        <Subtitle theme={currentTheme}>
          Thoughts, tutorials, and insights from my journey
        </Subtitle>
      </Header>

      <SearchContainer>
        <form onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Search posts by title, content, or tags..."
            value={searchQuery}
            onChange={handleSearchChange}
            theme={currentTheme}
            aria-label="Search blog posts"
          />
        </form>
      </SearchContainer>

      <TagFilter>
        <FilterLabel theme={currentTheme}>Filter:</FilterLabel>
        <TagButton
          theme={currentTheme}
          active={!selectedTag}
          onClick={() => setSelectedTag(null)}
        >
          All
        </TagButton>
        {(tagsExpanded ? allTags : allTags.slice(0, TAGS_LIMIT)).map(tag => (
          <TagButton
            key={tag}
            theme={currentTheme}
            active={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
        {allTags.length > TAGS_LIMIT && (
          <TagButton
            theme={currentTheme}
            isExpand={true}
            onClick={() => setTagsExpanded(!tagsExpanded)}
            active={false}
          >
            {tagsExpanded ? 'Show less' : `+${allTags.length - TAGS_LIMIT} more`}
          </TagButton>
        )}
      </TagFilter>

      {filteredPosts.length === 0 ? (
        <EmptyState theme={currentTheme}>
          {searchQuery || selectedTag
            ? `No posts found matching "${searchQuery || selectedTag}"`
            : 'No blog posts yet. Check back soon!'}
        </EmptyState>
      ) : (
        <>
          <BlogList>
            {paginatedPosts.map((post) => (
            <BlogCard key={post.id} theme={currentTheme}>
              <BlogTitle theme={currentTheme}>{post.title}</BlogTitle>
              <BlogMeta theme={currentTheme}>
                <span>[{post.id}]</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </BlogMeta>
              {post.tags && post.tags.length > 0 && (
                <PostTags>
                  {post.tags.map(tag => (
                    <Tag key={tag} theme={currentTheme}>{tag}</Tag>
                  ))}
                </PostTags>
              )}
              <BlogExcerpt theme={currentTheme}>
                {post.excerpt}
              </BlogExcerpt>
              <ReadMoreLink
                to={`/blog/${post.id}`}
                theme={currentTheme}
              >
                Read more →
              </ReadMoreLink>
            </BlogCard>
          ))}
          </BlogList>

          {totalPages > 1 && (
            <Pagination theme={currentTheme}>
              <PaginationButton
                theme={currentTheme}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ←
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationButton
                      key={page}
                      theme={currentTheme}
                      active={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationButton>
                  );
                }
                // Show ellipsis for skipped pages
                if (
                  (page === currentPage - 2 && page > 1) ||
                  (page === currentPage + 2 && page < totalPages)
                ) {
                  return <span key={page} style={{ color: currentTheme.muted }}>...</span>;
                }
                return null;
              })}

              <PaginationButton
                theme={currentTheme}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                →
              </PaginationButton>

              <PaginationInfo theme={currentTheme}>
                Page {currentPage} of {totalPages}
              </PaginationInfo>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default Blog;
