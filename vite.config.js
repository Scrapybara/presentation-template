import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildPlugin } from './build-script.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',
  base: './',
  
  plugins: [
    buildPlugin(),
  ],
  
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  
  server: {
    port: 8000,
    host: 'localhost',
    open: false,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  
  optimizeDeps: {
    include: ['highlight.js', 'marked'],
  },
});