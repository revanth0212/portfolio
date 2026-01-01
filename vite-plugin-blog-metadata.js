import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vite plugin to automatically generate blog metadata from markdown files
 * at build time by scanning the blog directory and parsing frontmatter
 */
export function blogMetadataPlugin() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const blogDir = path.resolve(__dirname, 'src/content/blog');
  const outputFile = path.resolve(__dirname, 'src/content/blog/.generated-metadata.json');

  // Function to generate metadata
  function generateMetadata() {
    const metadata = [];
    const idToFileMap = {};

    // Read all markdown files from blog directory
    const files = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md') && !file.startsWith('.'));

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Parse frontmatter
      const parsed = parseFrontmatter(content);
      if (parsed) {
        const id = parsed.id || file.replace('.md', '');
        metadata.push({
          id: id,
          title: parsed.title,
          date: parsed.date,
          readTime: parsed.readTime,
          excerpt: parsed.excerpt,
          tags: parsed.tags || [],
          content: null // Content will be lazy-loaded
        });
        // Map ID to filename for lazy loading
        idToFileMap[id] = file;
      }
    }

    // Sort by date (newest first)
    metadata.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Write metadata to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));

    // Write ID to filename mapping
    const mappingFile = path.join(path.dirname(outputFile), '.id-to-file-map.json');
    fs.writeFileSync(mappingFile, JSON.stringify(idToFileMap, null, 2));

    console.log(`\n✅ Generated blog metadata for ${metadata.length} posts\n`);
  }

  return {
    name: 'blog-metadata-generator',

    // Generate metadata at build time
    buildStart() {
      generateMetadata();
    },

    // Also generate metadata in dev mode
    configureServer(server) {
      // Watch the blog directory for changes
      server.watcher.add(blogDir);

      server.watcher.on('change', (filePath) => {
        if (filePath.endsWith('.md')) {
          // Regenerate metadata when a markdown file changes
          generateMetadata();
        }
      });

      // Initial generation when server starts
      generateMetadata();
    }
  };
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const parts = content.split('---');

  if (parts.length < 3) {
    console.warn('Invalid frontmatter format');
    return null;
  }

  const frontmatterStr = parts[1];
  // const markdownContent = parts.slice(2).join('---').trim();

  // Parse frontmatter
  const frontmatter = {};
  const lines = frontmatterStr.trim().split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');

      frontmatter[key] = value;
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
    tags: tags
  };
}
