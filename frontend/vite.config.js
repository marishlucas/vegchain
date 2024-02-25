import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

  ],
  build: {
    minify: 'none',
    terserOptions: {
      compress: {
        keep_fnames: /^.*/, // Use a regular expression to match all function names
      },
    },
  },
});
