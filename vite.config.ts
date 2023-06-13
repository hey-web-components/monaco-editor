import {defineConfig} from 'vite';
import glob from 'tiny-glob';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/hey-monaco-editor.ts',
        'src/hey-monaco-diff-editor.ts',
        ...(await glob('src/monaco-assets/*.ts')),
      ],
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: 'dist/cdn',
      },
    },
  },
});
