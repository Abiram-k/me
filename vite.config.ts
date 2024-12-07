import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // base: '/me/', 
  base:'/'
});

// npx gh-pages -d dist

// npm run build 