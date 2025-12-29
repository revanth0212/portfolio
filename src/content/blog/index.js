// Blog posts index - imports all markdown blog posts
import post1Markdown from './getting-started-react-hooks.md?raw';
import post2Markdown from './building-modern-web-vite.md?raw';
import post3Markdown from './accessibility-best-practices.md?raw';
import post4Markdown from './moe-cheat-sheet.md?raw';

// Simple frontmatter parser (browser-compatible)
function parseMarkdown(markdownContent, id) {
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

  return {
    id,
    title: frontmatter.title,
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    excerpt: frontmatter.excerpt,
    content: content
  };
}

// Parse all blog posts
export const blogPosts = [
  parseMarkdown(post1Markdown, 1),
  parseMarkdown(post2Markdown, 2),
  parseMarkdown(post3Markdown, 3),
  parseMarkdown(post4Markdown, 4)
];
