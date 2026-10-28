import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// BASE_PATH is set by the GitHub Pages workflow: '/' for a <user>.github.io
// repo, '/<repo-name>/' for any other repo. Locally and on Vercel/Netlify it's '/'.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
