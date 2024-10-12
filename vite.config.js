import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

