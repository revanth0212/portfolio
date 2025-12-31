import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts, getAllTags } from '../../data/blogPosts';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  color: ${props => props.theme.foreground};
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
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
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.4rem;
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
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: 'Fira Code', monospace;
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
    padding: 0.25rem 0.6rem;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BlogCard = styled(Link)`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  text-decoration: none;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin-bottom: 1rem;
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.accent};
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-size: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  font-family: 'Fira Code', monospace;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.6;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
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
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: 'Fira Code', monospace;
  transition: all 0.2s ease;
  min-width: 36px;

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
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    min-width: 32px;
  }
`;

const PaginationInfo = styled.span`
  color: ${props => props.theme.muted};
  font-size: 0.8rem;
  margin: 0 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    display: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.muted};
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
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

    // Filter by tag
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
      <SectionContainer>
        <SectionTitle theme={currentTheme}>Blog</SectionTitle>
        <EmptyState theme={currentTheme}>
          No blog posts yet. Check back soon!
        </EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Blog Posts</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1.5rem' }}>
        Thoughts, tutorials, and insights about software development
      </p>

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
            <BlogCard
              key={post.id}
              to={`/blog/${post.id}`}
              theme={currentTheme}
              aria-label={`Read ${post.title}`}
            >
              <PostTitle theme={currentTheme}>{post.title}</PostTitle>
              <PostMeta theme={currentTheme}>
                [{post.id}] • {post.date} • {post.readTime}
              </PostMeta>
              {post.tags && post.tags.length > 0 && (
                <PostTags>
                  {post.tags.map(tag => (
                    <Tag key={tag} theme={currentTheme}>{tag}</Tag>
                  ))}
                </PostTags>
              )}
              <PostExcerpt theme={currentTheme}>{post.excerpt}</PostExcerpt>
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
    </SectionContainer>
  );
};

export default Blog;
