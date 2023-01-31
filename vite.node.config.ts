import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/hey-monaco-editor.ts',
        'src/hey-monaco-diff-editor.ts',
      ],
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit/, '@monaco-editor/loader'],
      output: {
        dir: 'dist/node',
      },
    },
    assetsDir: 'src/assets/',
  },
  base: './',
});
