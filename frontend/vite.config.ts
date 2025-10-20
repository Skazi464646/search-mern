import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates bundle analysis report
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    // Enable source maps for better debugging
    sourcemap: true,
    // Configure chunk splitting for better optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunk for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate chunk for state management
          store: ['zustand'],
          // Separate chunk for API utilities
          api: ['axios'],
        },
      },
    },
  },
})
