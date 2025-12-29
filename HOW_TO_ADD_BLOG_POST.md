# How to Add a New Blog Post

Adding a new blog post is now super simple! Just follow these steps:

## Step 1: Create Your Markdown File

Create a new `.md` file in `src/content/blog/`. For example: `my-new-post.md`

## Step 2: Add Frontmatter Metadata

At the top of your file, add metadata between `---` markers:

```markdown
---
title: "Your Post Title"
date: "2024-01-20"
readTime: "5 min read"
excerpt: "A brief description of your post"
---
```

## Step 3: Write Your Content

Write your blog post in regular markdown below the frontmatter:

```markdown
---
title: "My Awesome Post"
date: "2024-01-20"
readTime: "5 min read"
excerpt: "This is what makes my post awesome"
---

# My Awesome Post

Write your content here using **markdown**!

## Subheading

You can use code blocks:

```javascript
const awesome = true;
```

And lists, links, images, etc.
```

## Step 4: Add to Blog Index

Open `src/content/blog/index.js` and add your new post:

**Before:**
```javascript
import post1Markdown from './getting-started-react-hooks.md?raw';
import post2Markdown from './building-modern-web-vite.md?raw';
import post3Markdown from './accessibility-best-practices.md?raw';
import post4Markdown from './moe-cheat-sheet.md?raw';

export const blogPosts = [
  parseMarkdown(post1Markdown, 1),
  parseMarkdown(post2Markdown, 2),
  parseMarkdown(post3Markdown, 3),
  parseMarkdown(post4Markdown, 4)
];
```

**After:**
```javascript
import post1Markdown from './getting-started-react-hooks.md?raw';
import post2Markdown from './building-modern-web-vite.md?raw';
import post3Markdown from './accessibility-best-practices.md?raw';
import post4Markdown from './moe-cheat-sheet.md?raw';
import post5Markdown from './my-new-post.md?raw';  // ← Add this

export const blogPosts = [
  parseMarkdown(post1Markdown, 1),
  parseMarkdown(post2Markdown, 2),
  parseMarkdown(post3Markdown, 3),
  parseMarkdown(post4Markdown, 4),
  parseMarkdown(post5Markdown, 5)  // ← Add this
];
```

## Step 5: That's It!

The blog post will automatically:
- ✅ Appear in the blog list
- ✅ Be accessible via `/blog/5`
- ✅ Render with proper markdown formatting
- ✅ Support syntax highlighting for code blocks
- ✅ Work in both Terminal and Normal views

## Example: Complete Template

Copy this template to get started:

```markdown
---
title: "Your Post Title Here"
date: "2024-12-29"
readTime: "X min read"
excerpt: "A compelling one-sentence description"
---

# Your Post Title

Your introduction paragraph here.

## Main Section

Write your content with all the usual markdown features:

- **Bold** and *italic* text
- [Links](https://example.com)
- Lists
- Code blocks with syntax highlighting

```javascript
function hello() {
  console.log("Hello, World!");
}
```

## Conclusion

Wrap up your thoughts here.
```

## Tips

1. **Date Format**: Use YYYY-MM-DD format (e.g., "2024-01-20")
2. **Read Time**: Estimate how long it takes to read (e.g., "5 min read")
3. **Excerpt**: Keep it short - one sentence that hooks the reader
4. **Images**: Use regular markdown image syntax: `![Alt text](path/to/image.jpg)`
5. **Code Blocks**: Specify language for syntax highlighting: \`\`\`javascript

## Automatic Features

The system automatically handles:
- ✨ Markdown parsing
- ✨ Frontmatter extraction
- ✨ Syntax highlighting for code blocks
- ✨ Responsive layout
- ✨ Dark/Light theme support
- ✨ Navigation (both views)
- ✨ SEO-friendly structure

No need to touch any React components - just write your markdown!
