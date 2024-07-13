import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './constants'),
      '@hooks': path.resolve(__dirname, './hooks'),
      '@helpers': path.resolve(__dirname, './helpers'),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
  },
});
