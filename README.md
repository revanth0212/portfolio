# Terminal-Style Portfolio Website

A lightweight, terminal-style portfolio website built with React, featuring keyboard navigation, theme support, and a command-line interface aesthetic.

## Features

- **Terminal UI Aesthetic**: Monospace fonts, ASCII art, and command-line interface styling
- **Theme System**: Light theme (default) and dark theme with smooth transitions
- **Full Keyboard Navigation**:
  - `Ctrl+K` or `/`: Focus command input
  - `Ctrl+T`: Toggle theme
  - `Escape`: Clear input / Close modal
  - `↑/↓`: Navigate command history
  - `Tab`: Auto-complete commands
  - `?`: Show help modal
- **Command System**: Navigate using terminal commands (about, blog, projects, skills, contact)
- **Blog System**: Markdown blog posts with syntax highlighting
- **Responsive Design**: Works on all devices and screen sizes
- **Accessible**: WCAG AA compliant with proper focus management and ARIA labels

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Styled Components
- **Routing**: React Router v6
- **Markdown**: React Markdown with Prism.js syntax highlighting
- **Keyboard Navigation**: react-hotkeys-hook
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Local Development

The development server will start at `http://localhost:3000`.

### Build

The production build will be created in the `dist` directory.

## Project Structure

```
personal-portfolio/
├── public/
│   └── terminal-icon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── HelpModal.jsx
│   │   │   └── TerminalInput.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/
│   │       ├── About.jsx
│   │       ├── Blog.jsx
│   │       ├── Projects.jsx
│   │       ├── Skills.jsx
│   │       └── Contact.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── blogPosts.js
│   │   └── projects.js
│   ├── styles/
│   │   ├── themes.js
│   │   └── globalStyles.js
│   ├── utils/
│   │   └── keyboardNavigation.js
│   ├── App.jsx
│   └── main.jsx
├── content/
│   ├── blog/
│   └── projects/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Personal Information

Update the following files with your information:

1. **Contact Section**: `src/components/sections/Contact.jsx`
   - Email address
   - Location
   - Social media links

2. **Projects**: `src/data/projects.js`
   - Add your projects
   - Update GitHub URLs
   - Add live demo URLs

3. **Blog Posts**: `src/data/blogPosts.js`
   - Add your blog posts
   - Include Markdown content

4. **Skills**: `src/components/sections/Skills.jsx`
   - Update skill categories
   - Adjust proficiency levels

5. **About Section**: `src/components/sections/About.jsx`
   - Personalize your introduction

### Theme Customization

Edit `src/styles/themes.js` to customize colors:

```javascript
export const lightTheme = {
  background: '#ffffff',
  foreground: '#333333',
  accent: '#0066cc',
  // ... more colors
};

export const darkTheme = {
  background: '#0a0a0a',
  foreground: '#00ff00',
  accent: '#00ffff',
  // ... more colors
};
```

### GitHub Pages Configuration

1. Update `vite.config.js` with your repository name:

```javascript
export default defineConfig({
  base: '/your-repo-name/', // Update this
  // ... rest of config
});
```

2. Update `index.html` meta tags with your information.

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions
3. Push to `main` branch to trigger deployment

The GitHub Actions workflow will automatically build and deploy your site.

### Manual Deployment

```bash
npm run build
npm run deploy
```

## Adding Blog Posts

1. Add a new entry to `src/data/blogPosts.js`:

```javascript
{
  id: 4,
  title: 'Your Post Title',
  date: '2024-01-20',
  readTime: '5 min read',
  excerpt: 'Brief description of your post...',
  content: `# Your Post Content in Markdown`
}
```

2. The blog supports Markdown with syntax highlighting:

\`\`\`javascript
// Code blocks with syntax highlighting
const greeting = 'Hello, World!';
\`\`\`

## Commands

The portfolio supports these terminal commands:

- `about` - Navigate to About section
- `blog` - Navigate to Blog section
- `projects` - Navigate to Projects section
- `skills` - Navigate to Skills section
- `contact` - Navigate to Contact section
- `home` - Return to home
- `theme` - Toggle between light and dark theme
- `clear` - Clear terminal output
- `help` - Show help modal

## Performance

- Code splitting with React.lazy
- Optimized bundle size with Vite
- Lazy loading for images
- Efficient re-renders with React.memo

## Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- Skip navigation link
- Focus indicators
- WCAG AA contrast ratios
- Screen reader compatible

## License

This project is open source and available under the MIT License.

## Credits

Built with React, Vite, and Styled Components.
