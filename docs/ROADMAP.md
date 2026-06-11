# Roadmap di implementazione

> Companion di [`REQUISITI.md`](./REQUISITI.md). Suddivisione in **step reali** con obiettivo,
> attività, deliverable e criteri di accettazione. Stima relativa: **S**(piccolo) /
> **M**(medio) / **L**(grande). Le milestone sono sequenziali ma alcune attività interne
> sono parallelizzabili.

## Strategia generale

1. **Prima il core, poi la pelle.** La matematica fotografica condivisa (§8 dei requisiti) è il
   fondamento: gli engine renderizzano *gli stessi numeri*, non li ricalcolano.
2. **Un engine end-to-end prima di tutti e tre.** Partiamo dallo **schematico** (più
   deterministico e leggero) per validare l'intera pipeline (params → core → render →
   lezione → switch → URL) con una sola demo. Poi aggiungiamo 3D e 2.5D.
3. **Matrice di supporto come freno allo scope.** Costruiamo solo le combinazioni
   demo×engine che aggiungono valore; il resto usa il fallback dichiarato.
4. **Verticale prima di orizzontale.** Una demo *completa* (C1) attraverso tutti gli strati,
   prima di replicare le altre.

---

## M0 — Setup & impalcatura · `S/M`
**Obiettivo:** progetto che builda, con shell, switch globali e i18n, anche se con un solo engine "stub".

- Init Vite + React + TS (strict), ESLint + Prettier, Vitest.
- Struttura cartelle di §6.6; alias di import.
- `state/store.ts` (zustand) con `approach`, `style`, `locale` + persistenza localStorage.
- `i18n` con catalogo `it.json` e hook `t()` tipizzato; zero stringhe hard-coded.
- `ui/Shell` + `ui/SwitchBar` (i 3 switch funzionanti, anche se cambiano solo un placeholder).
- Routing con `basename` per GitHub Pages; lettura/scrittura stato nell'URL.
- GitHub Actions: build + test + (deploy Pages su `main`).

**Deliverable:** app deployata "vuota" con i 3 switch visibili e persistiti.
**Accettazione:** `vite build` verde in CI; cambiare approccio/stile/lingua aggiorna URL e localStorage; lighthouse base OK.

---

## M1 — Core fotografico (math puro) · `M`
**Obiettivo:** libreria `core/photography` completa e testata, indipendente da React.

- `exposure.ts` (EV, stop, displayBrightness, sequenze full/third stop).
- `dof.ts` (CoC, iperfocale, vicino/lontano, DoF).
- `fov.ts` (AOV, crop factor, magnificazione).
- `motion.ts` (blur proporzionale, panning).
- `noise.ts` (σ(ISO), grainPx, SNR).
- `params/stops.ts` e `ranges.ts` (range e snap dei controlli).
- Unit test Vitest per ogni funzione (casi noti: es. iperfocale a valori da manuale).

**Deliverable:** `computeDerived` building-block riusabili da tutte le demo.
**Accettazione:** copertura test sul core ≥ 90%; valori coerenti con tabelle fotografiche di riferimento entro tolleranza.

---

## M2 — Framework demo + engine **Schematico** + demo C1 (verticale completo) · `L`
**Obiettivo:** la prima demo (Tempo di otturazione) funziona end-to-end in stile schematico.

- Contratti `DemoModule`, `SceneProps`, `RendererComponent` (§6.3).
- `engines/EngineHost.tsx`: risoluzione engine + **fallback con badge**.
- Engine `schematic/` (SVG/Canvas 2D): primitive condivise (soggetto, sfondo, vettori moto, griglia, etichette).
- Controlli riusabili `ui/Slider` e `ui/Dial` (tastiera + touch, ARIA, snap agli stop).
- `demos/shutter/`: params, `computeDerived` (usa `motion`), renderer schematico, preset, lezione i18n.
- `ui/LessonPanel` con "punti chiave" + "prova questo" (applica preset).
- Deep-link dei parametri demo nell'URL; reset ai default.

**Deliverable:** C1 giocabile, accessibile, condivisibile via URL, in stile schematico.
**Accettazione:** Definition of Done (§10 requisiti) soddisfatta per C1 sull'engine schematico; cambiare tempo/velocità aggiorna scia/congelamento in tempo reale.

---

## M3 — Engine **3D real-time** (react-three-fiber) + overlay 2D · `L`
**Obiettivo:** validare lo switch engine sulla *stessa* C1 e introdurre il DoF 3D con C2.

- Setup R3F + drei + post-processing; canvas con render **on-demand** e dpr adattivo.
- Renderer 3D per **C1** (mosso reale via motion blur / multi-sample o shader).
- Renderer 3D per **C2 Apertura/DoF** (bokeh via post-processing DoF; forma diaframma dai token stile).
- Overlay 2D (etichette/HUD) sopra il canvas tramite drei `Html`/portale.
- Code-splitting: three caricato solo quando l'approccio è `3D`.
- Fallback a 2.5D/schematico se WebGL2 assente.

**Deliverable:** switch `Schematico ↔ 3D` a caldo su C1; C2 nativa in 3D.
**Accettazione:** 60 fps su desktop per C1/C2 in 3D; nessun reload nel cambio engine; parametri preservati.

---

## M4 — Engine **2.5D a livelli** + post-effetti · `M/L`
**Obiettivo:** completare lo switch a 3 vie con l'approccio dove brillano ISO e parallasse.

- Engine `layered/`: composizione di livelli su Canvas/WebGL; blur per-livello (DoF), parallasse (focale), grana (ISO).
- Renderer 2.5D per **C3 ISO** (post-effetto rumore/grana ∝ ISO) — engine nativo.
- Renderer 2.5D per **C1** e **C2** (fallback di qualità).
- Pipeline post-effetti riusabile (noise, blur, vignette) condivisa con gli altri engine dove utile.

**Deliverable:** i 3 engine selezionabili; C3 nativa in 2.5D.
**Accettazione:** alzare l'ISO aumenta visibilmente rumore e dimensione grana e abbassa l'indicatore SNR; switch a 3 vie senza glitch.

---

## M5 — Sistema **stili** (3 skin) agganciato agli engine · `M`
**Obiettivo:** rendere reale lo switch di stile, ortogonale all'approccio.

- `styles/tokens.ts` + `realistic.ts` / `mixed.ts` / `schematic.ts` + `StyleProvider`.
- Ogni engine consuma i token che gli competono (texture vs flat vs toon; bokeh circle/hexagon…).
- Verifica della **matrice di compatibilità** (§6.4) e dei fallback "graziosi".
- Asset realistici lazy-loaded per stile `realistico`/`misto`.

**Deliverable:** 3 stili × 3 approcci navigabili, con resa coerente o degradazione dichiarata.
**Accettazione:** cambiare stile non altera i numeri derivati; combinazioni "○" mostrano resa accettabile, non rotta.

---

## M6 — Completare i **concetti core** C4 e C5 · `L`
**Obiettivo:** chiudere il set must-have.

- **C4 Distanza focale**: dolly-zoom (3D nativo), parallasse a livelli (2.5D), diagramma angoli (schematico); indicatori AOV + crop factor; messaggio didattico "è la distanza a comprimere".
- **C5 Triangolo dell'esposizione**: integra C1–C3; controlli dei 3 parametri + lettura EV + **istogramma** (`ui/Histogram`); engine schematico nativo (bilancia + istogramma); preset "stessa esposizione, resa diversa".

**Deliverable:** tutti i 5 concetti core completi sul/sui rispettivo/i engine nativo/i.
**Accettazione:** in C5, compensare un parametro con un altro mantiene la luminosità (a parità di EV) e lo si vede su scena + istogramma.

---

## M7 — Concetti **aggiuntivi** · `M` (modulare)
**Obiettivo:** percorso più completo. Inseribili singolarmente secondo budget.

- A1 Esposizione & istogramma/metering (riusa `ui/Histogram`, clipping highlights/shadows).
- A2 Bilanciamento del bianco (slider Kelvin → `whiteBalance` → dominante colore).
- A3 Sensore/crop factor (collega focale↔AOV↔DoF).
- A4 Panning (mosso creativo: sfondo strisciato, soggetto nitido).
- (Opz.) A5 Diffrazione, A6 distorsione del ritratto.

**Deliverable:** ogni concept aggiuntivo come `DemoModule` indipendente nel registry.
**Accettazione:** Definition of Done per ciascun concept incluso.

---

## M8 — Explainer 3D scroll-driven (anatomia: reflex, sensore, ottiche) · `L`
**Obiettivo:** scene Three.js animate allo scroll che spiegano reflex, sensore e ottiche scomponendole.
**Dipende da:** M3 (engine `three`: canvas R3F + pipeline 3D).

- Archetipo `ExplainerModule` + **scroll rig** (drei `ScrollControls`/`useScroll` o GSAP `ScrollTrigger`).
- **Asset**: modello reflex (low-poly stilizzato ad hoc o GLTF libero) con **parti nominate** per l'exploded view.
- **An1 Reflex**: scomposizione allo scroll, percorso della luce, **sequenza dello scatto** (specchio/tendine/sensore), annotazioni `Html` i18n, confronto reflex vs mirrorless.
- **An2 Sensore**: zoom su fotositi, Bayer/demosaicizzazione, **gain↔ISO**, dimensioni/crop factor.
- **An3 Ottiche**: formazione immagine, gruppi/fuoco/zoom, iris/bokeh, aberrazioni/distorsione.
- Fallback **diagramma statico annotato** per 2.5D/schematico e `prefers-reduced-motion` (stepper).

**Deliverable:** sezione "Anatomia" con 3 explainer 3D scroll-driven.
**Accettazione:** scorrendo, la reflex si scompone fluidamente (~60 fps desktop) e ogni componente è etichettato; con reduced-motion la versione a step resta navigabile; i rimandi incrociati ai concetti (C1/C2/C3/C4) sono presenti.

---

## M9 — **Percorso didattico & UX** · `M`
**Obiettivo:** trasformare le demo in un'esperienza di apprendimento.

- Indice + **percorso consigliato** (ordine), navigazione avanti/indietro.
- **Confronto A/B** (RF-10): blocca stato e confronta (toggle o split).
- Preset curati per concetto; condivisione via deep-link (RF-11).
- (Opz.) micro-quiz/check di comprensione (RF-15).

**Deliverable:** flusso "lezione → gioca → confronta → prova sfida".
**Accettazione:** un principiante completa il percorso C1→C5 senza istruzioni esterne.

---

## M10 — **Rifinitura, a11y, performance, release** · `M`
**Obiettivo:** qualità di rilascio.

- Accessibilità completa (tastiera, ARIA su slider/ghiere, contrasto AA, `prefers-reduced-motion`).
- Responsive/touch finale (ghiere al dito, layout impilato mobile).
- Performance budget (bundle per-engine, lazy asset, dpr adattivo); fallback WebGL2.
- i18n review (nessuna stringa fuori catalogo); meta/SEO/OG; favicon.
- Deploy finale su GitHub Pages + README utente.

**Deliverable:** v1 pubblica.
**Accettazione:** Lighthouse a11y/perf ≥ 90 desktop; smoke test su Chrome/Firefox/Safari/Edge; tutti i concetti core soddisfano la Definition of Done.

---

## Riepilogo dipendenze

```
M0 → M1 → M2 ─┬→ M3 ─┬───────────────→ M8  (explainer 3D · richiede l'engine three di M3)
              ├→ M4 ─┤
              └──────┴→ M5 → M6 → (M7 opz.) → M9 → M10
```
- **MVP minimo dimostrabile** dopo **M2** (1 concetto, 1 engine, end-to-end).
- **MVP "wow"** dopo **M3** (switch engine a caldo + DoF/bokeh 3D).
- **Sezione "Anatomia"** (explainer 3D scroll-driven) consegnabile a **M8**, in parallelo a M5–M6 una volta pronto M3.
- **v1 funzionale completa** a **M6**; **v1 rifinita** a **M10**.

## Primo passo operativo proposto
Eseguire **M0** (scaffolding) e l'inizio di **M1** (core `exposure.ts` + test), così la base
è pronta e verificabile prima di costruire la prima demo.
