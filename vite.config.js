import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // The site is served from https://priyanshup.github.io/Portfolio/. Router
  // basename and public-file URLs (src/utils/asset.js) derive from this.
  base: '/Portfolio/',
})
