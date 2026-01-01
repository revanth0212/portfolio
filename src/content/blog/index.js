// Blog posts index - dynamically loads all markdown files from blog directory

// Simple frontmatter parser (browser-compatible)
function parseMarkdown(markdownContent) {
  // Split on the first --- to separate frontmatter from content
  const parts = markdownContent.split('---');

  // Remove the first empty string before the first ---
  const frontmatterStr = parts[1];
  const content = parts.slice(2).join('---').trim();

  // Parse frontmatter
  const frontmatter = {};
  const lines = frontmatterStr.trim().split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  // Parse tags if they exist (handles YAML array format)
  let tags = [];
  if (frontmatter.tags) {
    const tagStr = frontmatter.tags.trim();
    // Remove brackets if present
    const cleanStr = tagStr.replace(/^\[|\]$/g, '');
    // Split by comma and clean up each tag
    tags = cleanStr.split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(t => t);
  }

  return {
    id: frontmatter.id,
    title: frontmatter.title,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    excerpt: frontmatter.excerpt,
    content: content,
    tags: tags
  };
}

// Dynamically import all markdown files from the blog directory (lazy loaded)
const blogModules = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: false });

// Import the generated metadata file (created by vite-plugin-blog-metadata)
// This will be bundled at build time
import generatedMetadata from './.generated-metadata.json';

// Import the ID to filename mapping
import idToFileMap from './.id-to-file-map.json';

// Export metadata for listing (already sorted by the plugin)
export const blogPosts = generatedMetadata;

// Function to lazy load a specific post's content
export async function loadPostContent(postId) {
  const filename = idToFileMap[postId];
  if (!filename) {
    throw new Error(`No file found for post ID: ${postId}`);
  }
  const module = await blogModules[`./${filename}`]();
  return parseMarkdown(module);
}

// Get all unique tags from all posts
export const getAllTags = () => {
  const tags = new Set();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
