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

// Blog post metadata (lightweight - loaded eagerly)
const blogMetadata = [
  {
    id: "rdma-over-thunderbolt",
    title: "RDMA over Thunderbolt 5: Building Distributed AI Clusters with Mac Mini",
    date: "2025-12-30",
    readTime: "10 min read",
    excerpt: "Exploring how Thunderbolt 5's 80 Gbps bandwidth enables RDMA-like performance for distributed ML workloads using Apple's new ibv-backend.",
    tags: ["Distributed Systems", "MLX", "RDMA", "Apple Silicon", "Thunderbolt"],
    content: null // Will be lazy-loaded
  },
  {
    id: "large-reasoning-models",
    title: "Thinking Models: The Evolution from 'Autofill' to 'Architect'",
    date: "2025-12-29",
    readTime: "8 min read",
    excerpt: "Exploring the shift from standard LLMs to reasoning models that use Chain of Thought and System 2 thinking for complex problem-solving.",
    tags: ["AI", "Machine Learning", "LLM", "Reasoning Models", "Chain of Thought"],
    content: null
  },
  {
    id: "mlx-finetuning",
    title: "Fine-Tuning LLMs with MLX: A Practical Guide",
    date: "2025-12-28",
    readTime: "12 min read",
    excerpt: "Learn how to fine-tune large language models on Apple Silicon using MLX, from setup to deployment.",
    tags: ["MLX", "Fine-tuning", "LLM", "Apple Silicon", "Python"],
    content: null
  },
  {
    id: "moe-cheat-sheet",
    title: "Mixture of Experts Cheat Sheet",
    date: "2025-12-27",
    readTime: "6 min read",
    excerpt: "A quick reference guide for Mixture of Experts models, covering architecture, training, and inference.",
    tags: ["AI", "Machine Learning", "MoE", "LLM", "Python"],
    content: null
  },
  {
    id: "python-sandboxing",
    title: "Python Sandboxing: Techniques and Best Practices",
    date: "2025-12-26",
    readTime: "9 min read",
    excerpt: "Explore various sandboxing techniques for Python code execution, from containers to restricted interpreters.",
    tags: ["Python", "Security", "Sandboxing", "Containers"],
    content: null
  },
  {
    id: "types-of-ai-models",
    title: "Types of AI Models: A Comprehensive Overview",
    date: "2025-12-25",
    readTime: "7 min read",
    excerpt: "Understanding the different types of AI models, from traditional ML to modern deep learning architectures.",
    tags: ["AI", "Machine Learning", "Deep Learning"],
    content: null
  },
  {
    id: "unsloth-finetuning",
    title: "Unsloth Fine-Tuning: Optimizing LLM Training",
    date: "2025-12-24",
    readTime: "11 min read",
    excerpt: "How to use Unsloth to accelerate fine-tuning of LLaMA models with optimized memory and compute efficiency.",
    tags: ["Fine-tuning", "LLaMA", "Unsloth", "Python", "LLM"],
    content: null
  }
];

// Sort by date (newest first)
blogMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

// Export metadata for listing
export const blogPosts = blogMetadata;

// Function to lazy load a specific post's content
export async function loadPostContent(postId) {
  const module = await blogModules[`./${postId}.md`]();
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
