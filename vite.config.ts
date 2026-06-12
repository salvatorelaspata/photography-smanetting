import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// In produzione il base è il sotto-percorso di GitHub Pages; in dev l'app sta su "/".
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/photography-smanetting/' : '/',
  plugins: [react()],
  // three.js è in un chunk lazy (caricato solo per 3D/anatomia): alziamo la soglia di avviso.
  build: { chunkSizeWarningLimit: 1000 },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
