import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/hey-monaco-editor.ts',
        'src/hey-monaco-diff-editor.ts',
        'src/react.ts',
      ],
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: 'cdn',
      },
    },
    assetsDir: 'src/assets/',
  },
  base: './',
});