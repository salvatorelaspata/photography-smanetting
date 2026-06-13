# Smanetting — Fotografia interattiva

App web educativa per imparare le tecniche fondamentali della fotografia **smanettando
con i parametri**: muovi slider e ghiere e vedi in tempo reale l'effetto di ogni
impostazione su una scena simulata. Per ogni concetto: **teoria approfondita**, una
**demo interattiva** e un **micro-quiz** di verifica.

## Cosa c'è dentro

**21 concetti** (teoria approfondita + demo interattiva + quiz), dai fondamentali agli
avanzati: tempo di otturazione, apertura/profondità di campo, ISO/rumore, distanza focale e
compressione, triangolo dell'esposizione, composizione, istogramma, bilanciamento del bianco,
panning, sensore/crop factor, diffrazione, ritratto, iperfocale, misurazione, stabilizzazione,
flash/sync, bracketing/HDR, filtri ND/CPL, modalità P/A/S/M, RAW vs JPEG, gamma dinamica —
più l'approfondimento **spazi colore**.

**Anatomia 3D scroll-driven** (`/anatomia`): la **reflex**, il **sensore** e le **ottiche**
si scompongono mentre scorri, con annotazioni componente per componente. È il punto di
partenza consigliato, in evidenza in cima alla home.

**Caratteristiche distintive**
- **Rendering schematico** (SVG) per tutte le demo: leggero, deterministico e coerente. La
  scena occupa **tutta la larghezza** disponibile, con i controlli in una barra **sotto**.
- **Controlli adatti al parametro**: ghiere/slider per i valori ordinati (tempo, diaframma,
  ISO, focale), **pulsanti** per le scelte categoriali (sensore, filtro, modalità…).
- **Confronto A/B**: blocca uno stato e confrontalo affiancato con quello corrente.
- **Deep-link** dei parametri (URL condivisibile) e **percorso** con navigazione
  avanti/indietro (demo + approfondimenti).
- **Bilingue IT/EN** (con fallback), accessibile (tastiera/ARIA, `prefers-reduced-motion`).
- SPA **statica**, deployabile su GitHub Pages.

## Stack
React + Vite + TypeScript · react-router · zustand · Vitest. Core fotografico in funzioni
pure testate (`src/core/photography`). Three.js (react-three-fiber + postprocessing) è
caricato in lazy **solo per l'anatomia 3D**.

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
├─ engines/            schematic/ (scene SVG delle demo) · three/ (anatomia 3D) · EngineHost
├─ demos/              un modulo per concetto + registry (ordine del percorso)
├─ content/            theory.ts · anatomy.ts · quiz.ts  (testi)
├─ routes/             Landing · ConceptPage · AnatomyIndex · AnatomyExplainer
├─ ui/                 controlli (Slider, Dial, Segment), pannelli, ScrollExplainer, …
├─ state/ · i18n/      (it.json + en.json)
```

## Documentazione
- 📋 [Requisiti & architettura](./docs/REQUISITI.md)
- 🗺️ [Roadmap & avanzamento](./docs/ROADMAP.md)
