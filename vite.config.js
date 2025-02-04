import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Place all modules from node_modules in a separate chunk
            return 'vendor'
          }
        }
      }
    },
    // Optionally adjust the warning limit (in kB)
    chunkSizeWarningLimit: 600, // for example, 600 kB instead of 500 kB
  },
})
