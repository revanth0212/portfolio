import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogMetadataPlugin } from './vite-plugin-blog-metadata.js';

// Replace 'your-username' with your actual GitHub username
// and 'repository-name' with your repository name
export default defineConfig({
  plugins: [react(), blogMetadataPlugin()],
  // Use base path '/' for local dev, '/portfolio/' for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
