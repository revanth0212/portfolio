

# System Prompt: Terminal-Style GitHub Pages Portfolio with React

## Project Overview
Create a lightweight, terminal-style portfolio website hosted on GitHub Pages that showcases blog posts, code samples, and interactive elements. The portfolio should prioritize performance, accessibility, and ease of maintenance while providing a unique command-line interface aesthetic with full keyboard navigation and theme support.

## Technical Stack Requirements

### Core Technologies
- **Framework**: React 18+ (create-react-app or Vite for lighter build)
- **Hosting**: GitHub Pages (free tier)
- **Styling**: CSS-in-JS (styled-components) or CSS modules with terminal aesthetics
- **Markdown**: Use React-Markdown for blog post rendering
- **Code Highlighting**: Prism.js or react-syntax-highlighter
- **Deployment**: GitHub Actions for automated deployment
- **State Management**: React Context for theme management

### Dependencies to Include
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-markdown": "^8.0.5",
    "styled-components": "^5.3.6",
    "prismjs": "^1.29.0",
    "framer-motion": "^9.0.0",
    "react-hotkeys-hook": "^4.3.7"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/styled-components": "^5.1.26",
    "gh-pages": "^5.0.0"
  }
}
```

## Design Requirements

### Terminal UI Aesthetics
- Monospace font (Fira Code, JetBrains Mono, or Source Code Pro)
- Default light background with dark text (light theme)
- Dark background with green/amber/cyan text (dark theme)
- ASCII art elements for headers and section dividers
- Command prompt style navigation
- Text-based progress indicators and loaders
- Retro scanline effects (subtle)
- Cursor blinking animation for interactive elements

### Theme System
- **Light Theme**: White/light gray background with dark text
- **Dark Theme**: Black/dark gray background with green/amber/cyan text
- Theme toggle button in header (keyboard accessible)
- Store theme preference in localStorage
- Smooth transitions between themes
- Ensure accessibility contrast ratios in both themes

### Keyboard Navigation System
- Tab navigation for all interactive elements
- Keyboard shortcuts for common actions:
  - `Ctrl+K` or `/`: Focus command input
  - `Ctrl+T`: Toggle theme
  - `Escape`: Clear command input or return to home
  - `Arrow Up/Down`: Navigate command history
  - `Tab`: Auto-complete commands and paths
  - `Enter`: Execute command
  - `?`: Show help modal with all shortcuts
- Visual focus indicators for keyboard navigation
- Skip navigation link for screen readers
- Command history functionality

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ user@portfolio:~$  [🌙/☀️]  [?]                            │
│ ─────────────────────────────────────────────────────────── │
│ > about                                                    │
│ > blog                                                     │
│ > projects                                                 │
│ > skills                                                   │
│ > contact                                                  │
│ ─────────────────────────────────────────────────────────── │
│ [Current content area with terminal-style formatting]      │
│ ─────────────────────────────────────────────────────────── │
│ user@portfolio:~$ _                                        │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimization

### Bundle Size Reduction
- Implement code splitting for React components
- Use dynamic imports for heavy components
- Optimize images (use WebP format when possible)
- Implement lazy loading for images and non-critical components
- Minimize third-party dependencies
- Use React.memo for expensive components

### Caching Strategy
- Implement service worker for offline functionality
- Set appropriate cache headers for static assets
- Use GitHub Pages' built-in caching effectively

## Content Structure

### Directory Layout
```
portfolio/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ThemeToggle.js
│   │   │   ├── HelpModal.js
│   │   │   └── KeyboardShortcuts.js
│   │   ├── layout/
│   │   └── sections/
│   ├── context/
│   │   └── ThemeContext.js
│   ├── data/
│   │   ├── blogPosts.json
│   │   └── projects.json
│   ├── styles/
│   │   ├── themes.js
│   │   └── globalStyles.js
│   ├── pages/
│   ├── utils/
│   │   └── keyboardNavigation.js
│   ├── App.js
│   └── index.js
├── content/
│   ├── blog/
│   │   ├── post-1.md
│   │   └── post-2.md
│   └── projects/
├── package.json
└── README.md
```

## Theme Implementation

### Theme Context Setup
```javascript
// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Theme Definitions
```javascript
// src/styles/themes.js
export const lightTheme = {
  background: '#ffffff',
  foreground: '#333333',
  accent: '#0066cc',
  secondary: '#f5f5f5',
  border: '#e0e0e0',
  terminal: '#f8f8f2',
  terminalText: '#272822',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};

export const darkTheme = {
  background: '#0a0a0a',
  foreground: '#00ff00',
  accent: '#00ffff',
  secondary: '#1a1a1a',
  border: '#333333',
  terminal: '#000000',
  terminalText: '#00ff00',
  success: '#00ff00',
  error: '#ff0000',
  warning: '#ffff00',
  info: '#00ffff',
};
```

## Keyboard Navigation Implementation

### Navigation Hook
```javascript
// src/utils/keyboardNavigation.js
import { useCallback, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const useKeyboardNavigation = (commands, executeCommand) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus command input
  useHotkeys('ctrl+k, /', () => {
    inputRef.current?.focus();
  }, { preventDefault: true });

  // Toggle theme
  useHotkeys('ctrl+t', () => {
    // This will be handled by the theme toggle component
  }, { preventDefault: true });

  // Clear input
  useHotkeys('escape', () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setHistoryIndex(-1);
    }
  });

  // Navigate history
  const navigateHistory = useCallback((direction) => {
    if (direction === 'up' && historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      inputRef.current.value = history[history.length - 1 - newIndex];
    } else if (direction === 'down' && historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      inputRef.current.value = history[history.length - 1 - newIndex];
    } else if (direction === 'down' && historyIndex === 0) {
      setHistoryIndex(-1);
      inputRef.current.value = '';
    }
  }, [history, historyIndex]);

  useHotkeys('up', () => navigateHistory('up'), { preventDefault: true });
  useHotkeys('down', () => navigateHistory('down'), { preventDefault: true });

  // Show help
  useHotkeys('?', () => {
    // This will trigger the help modal
  }, { preventDefault: true });

  const addToHistory = useCallback((command) => {
    setHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  }, []);

  return {
    inputRef,
    addToHistory
  };
};
```

### Interactive Component with Keyboard Navigation
```javascript
// src/components/InteractiveDemo.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useKeyboardNavigation } from '../utils/keyboardNavigation';

const TerminalContainer = styled.div`
  background-color: ${props => props.theme.terminal};
  color: ${props => props.theme.terminalText};
  font-family: 'Fira Code', monospace;
  padding: 20px;
  border-radius: 5px;
  min-height: 300px;
  transition: all 0.3s ease;
`;

const TerminalLine = styled.div`
  margin-bottom: 5px;
  &:focus {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  outline: none;
  width: 100%;
`;

const InteractiveDemo = ({ commands }) => {
  const { theme } = useTheme();
  const [history, setHistory] = useState(['$ Welcome to interactive terminal demo', '$ Type "help" for available commands']);
  const [currentInput, setCurrentInput] = useState('');
  const { inputRef, addToHistory } = useKeyboardNavigation(commands, processCommand);
  
  const processCommand = (cmd) => {
    if (cmd === 'help') {
      return ['Available commands:', '  - about: Display information about this demo', '  - clear: Clear terminal', '  - theme: Toggle between light and dark theme'];
    } else if (cmd === 'about') {
      return ['This is an interactive terminal demo built with React'];
    } else if (cmd === 'clear') {
      return [];
    } else if (cmd === 'theme') {
      // This will trigger the theme toggle
      return ['Theme toggled'];
    } else {
      return [`Command not found: ${cmd}`];
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim()) {
      addToHistory(currentInput);
      const output = processCommand(currentInput);
      setHistory([...history, `$ ${currentInput}`, ...output]);
      setCurrentInput('');
    }
  };
  
  return (
    <TerminalContainer theme={theme}>
      {history.map((line, index) => (
        <TerminalLine key={index} theme={theme}>{line}</TerminalLine>
      ))}
      <form onSubmit={handleSubmit}>
        <TerminalLine theme={theme}>
          $ <Input 
            ref={inputRef}
            value={currentInput} 
            onChange={(e) => setCurrentInput(e.target.value)}
            autoFocus
            aria-label="Terminal command input"
          />
        </TerminalLine>
      </form>
    </TerminalContainer>
  );
};

export default InteractiveDemo;
```

## Theme Toggle Component

```javascript
// src/components/common/ThemeToggle.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    background-color: ${props => props.theme.secondary};
    outline: none;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  useHotkeys('ctrl+t', toggleTheme, { preventDefault: true });
  
  return (
    <ToggleButton 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title="Toggle theme (Ctrl+T)"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};

export default ThemeToggle;
```

## Help Modal Component

```javascript
// src/components/common/HelpModal.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
`;

const ShortcutTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const ShortcutRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ShortcutKey = styled.td`
  padding: 0.5rem 0;
  font-weight: bold;
  color: ${props => props.theme.accent};
  width: 30%;
`;

const ShortcutDesc = styled.td`
  padding: 0.5rem 0;
`;

const CloseButton = styled.button`
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-family: inherit;
  
  &:hover, &:focus {
    opacity: 0.9;
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.foreground};
  }
`;

const HelpModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  
  useHotkeys('escape', onClose, { enableOnTags: ['INPUT'], preventDefault: true });
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent theme={theme} onClick={e => e.stopPropagation()}>
        <h2>Keyboard Shortcuts</h2>
        <ShortcutTable>
          <tbody>
            <ShortcutRow>
              <ShortcutKey theme={theme}>Ctrl + K</ShortcutKey>
              <ShortcutDesc theme={theme}>Focus command input</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>/</ShortcutKey>
              <ShortcutDesc theme={theme}>Focus command input</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>Ctrl + T</ShortcutKey>
              <ShortcutDesc theme={theme}>Toggle theme</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>↑ / ↓</ShortcutKey>
              <ShortcutDesc theme={theme}>Navigate command history</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>Tab</ShortcutKey>
              <ShortcutDesc theme={theme}>Auto-complete commands</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>Esc</ShortcutKey>
              <ShortcutDesc theme={theme}>Clear input / Close modal</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={theme}>?</ShortcutKey>
              <ShortcutDesc theme={theme}>Show this help modal</ShortcutDesc>
            </ShortcutRow>
          </tbody>
        </ShortcutTable>
        <CloseButton theme={theme} onClick={onClose}>
          Close (Esc)
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HelpModal;
```

## SEO and Accessibility

### SEO Implementation
- Use React Helmet for meta tags
- Implement structured data for blog posts
- Create sitemap.xml for better crawling
- Ensure semantic HTML5 structure
- Add Open Graph and Twitter Card meta tags

### Accessibility Guidelines
- Ensure keyboard navigation works throughout the site
- Provide sufficient color contrast in both light and dark themes
- Add ARIA labels for interactive elements
- Implement skip navigation for screen readers
- Test with screen readers and keyboard-only navigation
- Ensure focus management is clear and logical
- Provide visual focus indicators for keyboard navigation

## GitHub Pages Deployment

### Build Configuration
```javascript
// package.json scripts
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "test": "react-scripts test"
}
```

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Maintenance and Updates

### Content Management
- Store blog posts as Markdown files in the repository
- Create simple scripts to generate blog post indexes
- Implement draft status for posts in development
- Add a content validation script to check for broken links

### Update Process
1. Create new branch for content changes
2. Add or update Markdown files in content directory
3. Update data files if needed
4. Test locally with `npm start`
5. Test keyboard navigation and theme switching
6. Submit pull request
7. Merge to main branch triggers automatic deployment

## Final Implementation Instructions

1. Initialize a React project using Vite for smaller bundle size
2. Set up GitHub repository with GitHub Pages enabled
3. Implement the theme context and theme definitions
4. Create the terminal-style UI components with theme support
5. Implement keyboard navigation system with hotkeys
6. Create the basic page structure (About, Blog, Projects, Contact)
7. Implement the blog post rendering from Markdown files
8. Add interactive demo components for future use
9. Set up GitHub Actions for automated deployment
10. Optimize for performance and SEO
11. Test thoroughly across devices and browsers
12. Test keyboard navigation and accessibility features
13. Document content update process in README

This portfolio should be lightweight, performant, and maintainable while providing a unique terminal-style experience with full keyboard navigation and theme support. The default light theme ensures good readability, while the dark theme provides the classic terminal aesthetic.