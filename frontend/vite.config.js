import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.44.237:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

