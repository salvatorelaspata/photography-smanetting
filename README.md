# Smanetting — Fotografia interattiva

App web educativa per imparare le tecniche fondamentali della fotografia **smanettando
con i parametri**: muovi slider e ghiere, e vedi in tempo reale l'effetto di ogni
impostazione su una scena simulata.

## Concetti coperti
Tempo di otturazione · Apertura/profondità di campo · ISO/rumore · Distanza focale e
compressione prospettica · Triangolo dell'esposizione · (+ bilanciamento del bianco,
istogramma, panning, crop factor…) · **Anatomia: reflex, sensore, ottiche**.

## Caratteristiche distintive
- **3 approcci di rendering** commutabili a runtime: 3D real-time (Three.js), 2.5D a
  livelli, procedurale schematico.
- **3 stili visivi** commutabili: realistico, misto, illustrato/schematico.
- Fisica fotografica **condivisa** tra gli engine (gli stessi numeri, rese diverse).
- **Anatomia in 3D**: explainer *scroll-driven* (Three.js) che scompongono la reflex e
  dettagliano sensore e ottiche, componente per componente.
- Italiano, con **i18n predisposto**.

## Stack
React + Vite + TypeScript + Three.js (react-three-fiber) · zustand · Vitest. SPA statica,
deployabile su GitHub Pages.

## Documentazione
- 📋 [Requisiti & architettura](./docs/REQUISITI.md)
- 🗺️ [Roadmap di implementazione](./docs/ROADMAP.md)

> Stato: **pianificazione**. Il codice parte con la milestone **M0** della roadmap.
