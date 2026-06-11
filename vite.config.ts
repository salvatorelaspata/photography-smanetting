import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// In produzione il base è il sotto-percorso di GitHub Pages; in dev l'app sta su "/".
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/photography-smanetting/' : '/',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
