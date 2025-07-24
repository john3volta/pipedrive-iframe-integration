import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/pipedrive-iframe-integration/',
  esbuild: {
    target: 'es2020'
  },
  build: {
    target: 'es2020'
  }
}) 