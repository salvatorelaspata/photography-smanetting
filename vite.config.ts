import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// In produzione il base è il sotto-percorso di GitHub Pages; in dev l'app sta su "/".
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/photography-smanetting/' : '/',
  plugins: [react()],
  // Rispetta la porta assegnata dall'ambiente (es. anteprima), altrimenti usa il default Vite.
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : undefined,
  // three.js è in un chunk lazy (caricato solo per 3D/anatomia): alziamo la soglia di avviso.
  build: { chunkSizeWarningLimit: 1000 },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
