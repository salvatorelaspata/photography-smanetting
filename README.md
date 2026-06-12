# Smanetting — Fotografia interattiva

App web educativa per imparare le tecniche fondamentali della fotografia **smanettando
con i parametri**: muovi slider e ghiere e vedi in tempo reale l'effetto di ogni
impostazione su una scena simulata. Per ogni concetto: **teoria approfondita**, una
**demo interattiva** e un **micro-quiz** di verifica.

## Cosa c'è dentro

**9 concetti** (teoria + demo interattiva + quiz):
Tempo di otturazione · Apertura/profondità di campo · ISO/rumore · Distanza focale e
compressione · Triangolo dell'esposizione · Istogramma & esposizione · Bilanciamento del
bianco · Panning · Sensore & crop factor.

**Anatomia 3D scroll-driven** (`/anatomia`): la **reflex**, il **sensore** e le **ottiche**
si scompongono mentre scorri, con annotazioni componente per componente.

**Caratteristiche distintive**
- **3 approcci di rendering** commutabili a runtime: 3D real-time (Three.js), 2.5D a livelli
  (filtri SVG), procedurale schematico — con fallback dichiarato per demo.
- **3 stili visivi** commutabili: realistico, misto, illustrato (palette + materiale 3D +
  saturazione). La fisica non cambia: gli engine renderizzano gli stessi numeri.
- **Confronto A/B**: blocca uno stato e confrontalo affiancato con quello corrente.
- **Deep-link** dei parametri (URL condivisibile) e percorso con navigazione avanti/indietro.
- **Bilingue IT/EN** (con fallback), accessibile (tastiera/ARIA, `prefers-reduced-motion`).
- SPA **statica**, deployabile su GitHub Pages.

## Stack
React + Vite + TypeScript · Three.js (react-three-fiber + postprocessing) · react-router ·
zustand · Vitest. Core fotografico in funzioni pure testate (`src/core/photography`).

## Sviluppo
```bash
npm install
npm run dev        # http://localhost:5173/
npm test           # unit test del core (Vitest)
npm run lint
npm run build      # type-check + build statica in dist/
```

## Deploy
Il workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) builda, testa e
**pubblica su GitHub Pages** a ogni push su `main`. In produzione il `base` è
`/photography-smanetting/` (vedi [`vite.config.ts`](vite.config.ts)); per un dominio
custom o user-site, modificalo lì.

## Struttura
```
src/
├─ core/photography/   math pura e testata (exposure, dof, fov, motion, noise, whiteBalance, sensor)
├─ engines/            schematic/ · layered/ · three/  (+ EngineHost con fallback)
├─ demos/              un modulo per concetto + registry
├─ content/            theory.ts · anatomy.ts · quiz.ts  (testi)
├─ routes/             Landing · ConceptPage · AnatomyIndex · AnatomyExplainer
├─ ui/                 controlli, pannelli, ScrollExplainer, …
├─ styles/ · state/ · i18n/   (it.json + en.json)
```

## Documentazione
- 📋 [Requisiti & architettura](./docs/REQUISITI.md)
- 🗺️ [Roadmap & avanzamento](./docs/ROADMAP.md)
