import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    target: 'es2020'
  },
  build: {
    target: 'es2020'
  }
}) 