import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})
