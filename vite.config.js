import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteGLSL from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),ViteGLSL()],
})
