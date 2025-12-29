# Project Structure

This portfolio follows a clean separation of concerns with content, configuration, and views properly organized.

## Directory Structure

```
src/
├── config/              # Configuration files (site settings, personal info, social links)
│   ├── personal.js      # Personal information (name, role, education, etc.)
│   ├── social.js        # Social media links and contact information
│   └── site.js          # Site-wide configuration (titles, prompts, theme names)
│
├── content/             # Content files (separated from code)
│   └── blog/           # Blog posts as individual JSON files
│       ├── index.js                    # Blog posts aggregator
│       ├── getting-started-react-hooks.json
│       ├── building-modern-web-vite.json
│       ├── accessibility-best-practices.json
│       └── moe-cheat-sheet.json
│
├── components/          # React components (views)
│   ├── common/         # Shared components (both views)
│   │   ├── ThemeToggle.jsx
│   │   ├── ViewToggle.jsx
│   │   ├── HelpModal.jsx
│   │   └── TerminalInput.jsx
│   │
│   ├── layout/         # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   │
│   ├── classic/        # Classic view components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   │
│   └── sections/       # Terminal view components
│       ├── About.jsx
│       ├── Projects.jsx
│       ├── Blog.jsx
│       ├── BlogPost.jsx
│       ├── Skills.jsx
│       └── Contact.jsx
│
├── context/            # State management (logic)
│   ├── ThemeContext.jsx
│   └── ViewContext.jsx
│
├── data/              # Structured data (re-exports from content)
│   ├── blogPosts.js   # Re-exports from content/blog
│   └── projects.js    # Project data
│
├── styles/            # Styling
│   ├── themes.js      # Theme definitions
│   └── globalStyles.js
│
└── utils/             # Utility functions
    └── keyboardNavigation.js
```

## Key Principles

### 1. **Configuration** (`src/config/`)
- **personal.js**: All personal information (name, title, company, education, etc.)
- **social.js**: Social media links and contact information
- **site.js**: Site-wide configuration like titles, prompts, theme names

**Usage**: Import directly into components
```javascript
import { personal } from '../../config/personal';
import { social, contactInfo } from '../../config/social';
import { siteConfig } from '../../config/site';
```

### 2. **Content** (`src/content/`)
- Blog posts stored as separate JSON files
- Easy to add/edit/remove posts without touching component code
- Can be easily converted to markdown files later if needed

**Adding a new blog post**:
1. Create a new JSON file in `src/content/blog/`
2. Add it to the `index.js` aggregator
3. No need to touch any component code!

### 3. **Views** (`src/components/`)
- **Terminal view**: `components/sections/` - Developer-focused terminal UI
- **Classic view**: `components/classic/` - Clean, minimalist UI
- **Shared**: `components/common/` - Components used by both views
- **Layout**: `components/layout/` - Header, Footer, etc.

### 4. **Logic** (`src/context/`)
- State management separated from views
- ThemeContext: Theme switching logic
- ViewContext: View mode switching logic

## Benefits

1. **Easy Maintenance**: Update personal info in ONE place (`config/personal.js`)
2. **Content Management**: Add/edit blog posts as simple JSON files
3. **Clean Components**: Views are purely presentational, consume config/data
4. **Scalability**: Easy to add new content types or config options
5. **Reusability**: Config can be used anywhere, content is modular

## Example: Updating Your Information

**Before** (scattered across components):
```javascript
// Had to update multiple files
<Header title="Revanth" />
<Contact email="revanth0212@gmail.com" />
<About name="Revanth Kumar Annavarapu" />
```

**After** (single source of truth):
```javascript
// Just update config/personal.js
export const personal = {
  name: {
    full: 'Revanth Kumar Annavarapu',
    display: 'Revanth'
  },
  // ... all other info
};
```

## Adding New Content

### New Blog Post:
1. Create `src/content/blog/my-new-post.json`
2. Add to `src/content/blog/index.js`
3. Done!

### New Config:
1. Create file in `src/config/`
2. Export your configuration
3. Import in components as needed
