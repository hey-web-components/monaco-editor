import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/hey-monaco-editor.ts',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/,
    },
    assetsDir: 'src/assets/'
  },
})
