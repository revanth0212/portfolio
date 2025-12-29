export const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    date: '2024-01-15',
    readTime: '5 min read',
    excerpt: 'Learn how to use React Hooks to write cleaner and more maintainable code.',
    content: `# Getting Started with React Hooks

React Hooks have revolutionized the way we write React components. They allow you to use state and other React features without writing a class.

## Why Hooks?

Before Hooks, you had to use class components for stateful logic. This led to complex components with duplicated logic between lifecycle methods.

## useState Hook

The \`useState\` hook lets you add state to functional components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
\`\`\`

## Custom Hooks

You can extract component logic into reusable custom hooks:

\`\`\`javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
\`\`\`

## Conclusion

React Hooks make it easier to reuse stateful logic between components and help organize your code better. Start using them in your projects today!`,
  },
  {
    id: 2,
    title: 'Building Modern Web Applications with Vite',
    date: '2024-01-10',
    readTime: '4 min read',
    excerpt: 'Discover why Vite is becoming the go-to build tool for modern web development.',
    content: `# Building Modern Web Applications with Vite

Vite is a next-generation frontend build tool that provides a faster and leaner development experience.

## What is Vite?

Vite (French for "fast") is a build tool that uses native ES modules in development and Rollup for production builds.

## Why Use Vite?

- **Instant Server Start**: No bundling in development
- **Lightning Fast HMR**: Hot Module Replacement that stays fast as your project grows
- **Rich Features**: Out-of-the-box support for TypeScript, JSX, CSS, and more
- **Optimized Build**: Pre-configigned Rollup build with code splitting

## Getting Started

Create a new Vite project:

\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Project Structure

\`\`\`
my-app/
├── index.html
├── package.json
└── src/
    ├── main.js
    ├── App.js
    └── style.css
\`\`\`

## Building for Production

Build your app for production with a single command:

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`dist\` directory.

## Conclusion

Vite offers a modern development experience that's fast and efficient. Give it a try in your next project!`,
  },
  {
    id: 3,
    title: 'Accessibility Best Practices for Web Developers',
    date: '2024-01-05',
    readTime: '6 min read',
    excerpt: 'Learn essential accessibility techniques to make your web apps usable by everyone.',
    content: `# Accessibility Best Practices for Web Developers

Web accessibility ensures that people with disabilities can use your website. It's not just nice to have—it's essential.

## Semantic HTML

Use semantic HTML elements to provide meaning to your content:

\`\`\`html
<!-- Good -->
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Bad -->
<div class="navigation">
  <div class="nav-item" onclick="goToHome()">Home</div>
</div>
\`\`\`

## ARIA Labels

Add ARIA labels for screen readers:

\`\`\`html
<button aria-label="Close dialog">×</button>
<img src="profile.jpg" alt="John's profile picture">
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

\`\`\`javascript
// Handle keyboard events
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};

<button
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  tabIndex={0}
>
  Action
</button>
\`\`\`

## Color Contrast

Maintain sufficient color contrast for text readability:

- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

## Focus Indicators

Make sure keyboard focus is visible:

\`\`\`css
:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}
\`\`\`

## Testing with Screen Readers

Test your site with screen readers like NVDA (Windows) or VoiceOver (Mac).

## Conclusion

Accessibility is a continuous process. Start with the basics and gradually improve your site's accessibility over time.`,
  },
  {
    id: 4,
    title: 'The MoE Cheat Sheet: Scaling LLMs Without Killing Your Compute Budget',
    date: '2024-12-29',
    readTime: '8 min read',
    excerpt: 'Learn how Mixture-of-Experts (MoE) architecture breaks the wall between model size and computational efficiency.',
    content: `# The MoE Cheat Sheet: Scaling LLMs Without Killing Your Compute Budget

In the world of Large Language Models, we've hit a wall: making models bigger usually makes them slower and more expensive. **Mixture-of-Experts (MoE)** is the architectural "cheat code" designed to break that wall, allowing us to build models with massive knowledge bases that run with the speed of much smaller ones.

## 🏗️ What is MoE?

Unlike a traditional "dense" model where every neuron fires for every word, an MoE model uses **Sparse Activation**. Think of it as a specialized task force rather than a single giant army.

### The Two Core Components:

1. **The Experts:** A collection of specialized sub-networks (usually Feed-Forward Networks). While a model might have 8 or 16 experts, they don't all work at once.
2. **The Router (Gating Network):** The "traffic controller." When an input comes in, the router decides which 1 or 2 experts are best equipped to handle that specific token.

> **Analogy:** If you ask a question about Python code, the Router ignores the "French Poetry" expert and the "Medical Journal" expert, sending your request straight to the "Software Engineering" expert.

## ⚡ MoE vs. Dense: The Performance Gap

To understand the power of MoE, look at **Mixtral 8x7B** compared to a dense model like **Llama 2 70B**.

| Feature | MoE (Mixtral 8x7B) | Dense (Llama 2 70B) |
| --- | --- | --- |
| **Total Parameters** | 46.7B | 70B |
| **Active Parameters** | 12.9B (only 2 experts) | 70B (all parameters) |
| **Inference Speed** | Blazing fast (up to 6x faster) | Slower, compute-heavy |
| **Efficiency** | High: High IQ / Low Compute | Standard: High IQ / High Compute |

By only "waking up" the parameters it needs, an MoE model provides the intelligence of a massive model with the latency of a mid-sized one.

## 🛑 If MoE is so good, why are we still building Dense models?

If you're a developer looking to deploy, MoE isn't a "free lunch." There are significant trade-offs that keep dense models relevant:

### 1. The VRAM Tax

While MoE only *uses* a few parameters at a time, it must **store all of them** in memory.

* A 13B active-parameter MoE might still require 50GB+ of VRAM because all the "sleeping" experts have to live on the GPU. This makes local hosting on consumer hardware difficult.

### 2. Training Instability

Training an MoE is a balancing act. If the Router gets "lazy," it might favor one expert over others, leading to **"Dead Experts"**—parts of your model that never learn anything. Developers have to use complex "auxiliary loss" functions to force the model to use its whole team.

### 3. Deployment Friction

In distributed environments, MoE can be a networking nightmare. If Expert A is on GPU 1 and Expert B is on GPU 2, the Router has to move data across the NVLink or network constantly, which can create **latency bottlenecks** that negate the speed of sparse computation.

## 🛠️ The Developer's Bottom Line

* **Choose MoE** if you are running a high-scale API where throughput and "intelligence-per-watt" are your primary metrics.
* **Stay Dense** if you are fine-tuning on small datasets, have limited VRAM, or need a predictable, simple deployment pipeline.

MoE is the bridge to trillion-parameter models, but for many "on-the-ground" dev tasks, a well-optimized dense model is still the reliable workhorse of the industry.`,
  },
];
