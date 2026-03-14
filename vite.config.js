import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // This is critical for your GitHub Pages URL: https://priyanshup.github.io/Portfolio/
  base: '/Portfolio/', 
})