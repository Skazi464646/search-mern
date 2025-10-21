import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Conditionally import visualizer plugin
let visualizer: any;
try {
  visualizer = require('rollup-plugin-visualizer').visualizer;
} catch (e) {
  console.warn('rollup-plugin-visualizer not available, skipping bundle analysis');
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates bundle analysis report (if available)
    ...(visualizer ? [visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })] : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/app': path.resolve(__dirname, './src/app'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    // Enable source maps for better debugging
    sourcemap: true,
    // Configure chunk splitting for better optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for core libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor';
            }
            if (id.includes('zustand')) {
              return 'store';
            }
            if (id.includes('axios')) {
              return 'api';
            }
            // Other node_modules go to vendor
            return 'vendor';
          }
          
          // Feature-based code splitting
          if (id.includes('/features/search/')) {
            return 'search-feature';
          }
          if (id.includes('/features/results/')) {
            return 'results-feature';
          }
          
          // UI components chunk
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          
          // Layout components chunk  
          if (id.includes('/components/layout/')) {
            return 'layout-components';
          }
          
          // Feedback components chunk
          if (id.includes('/components/feedback/')) {
            return 'feedback-components';
          }
          
          // Shared utilities chunk
          if (id.includes('/shared/')) {
            return 'shared';
          }
        },
      },
    },
  },
})
