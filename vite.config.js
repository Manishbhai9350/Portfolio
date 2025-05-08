import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteGLSL from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [react(), ViteGLSL()],
  build: {
    chunkSizeWarningLimit: 1500, // Optional, silences warnings
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: [
            'three',
            '@react-three/fiber',
            '@react-three/drei'
          ],
          animation: ['gsap', 'lenis']
        }
      }
    }
  }
})
