# Requisiti — App educativa di fotografia interattiva

> Nome di lavoro: **Smanetting** — "smanettare con i parametri" per capire la fotografia.
> Documento di requisiti e architettura. Companion: [`ROADMAP.md`](./ROADMAP.md) per la suddivisione in step.

---

## 1. Visione e obiettivi

Applicazione web che insegna le **tecniche fondamentali della fotografia** non solo
spiegandole, ma facendole **toccare con mano**: l'utente muove slider/ghiere e vede in
**tempo reale** l'effetto di ogni parametro su una scena simulata.

Obiettivi misurabili:

- **O1** — Ogni concetto ha almeno una **demo interattiva** con parametri modificabili dal vivo.
- **O2** — L'utente può **confrontare** stati (es. before/after, preset) e leggere il "perché" accanto al "cosa".
- **O3** — La stessa scena reagisce in modo **fisicamente plausibile** (math condivisa, non animazioni finte scollegate).
- **O4** — L'esperienza è **comprensibile a un principiante assoluto** ma non banale per un appassionato.

### Decisioni di prodotto (dall'intervista)

| Tema | Scelta |
|---|---|
| Approccio di rendering | **Switch a runtime tra 3**: `3D real-time + overlay 2D`, `2.5D a livelli + post-effetti`, `procedurale schematico` |
| Stile visivo | **Switch a runtime tra 3**: `misto realistico+schematico`, `fotorealistico`, `illustrato/schematico` |
| Stack | **React + Vite + TypeScript + Three.js** (react-three-fiber) |
| Lingua | **Italiano**, con i18n predisposto per aggiungere altre lingue senza riscrivere |

> Implicazione architetturale chiave: *approccio di rendering* e *stile visivo* sono **due assi
> ortogonali**, entrambi commutabili a runtime. Non tutte le 9 combinazioni hanno pari senso:
> vedi §6.4 (matrice di compatibilità) e §7 (matrice di supporto per demo).

> ⚠️ **Aggiornamento di prodotto (giugno 2026) — consolidamento sullo schematico.** Il doppio
> switch *approccio × stile* è stato in seguito **semplificato sul solo rendering schematico**
> (SVG): gli engine 3D/2.5D delle demo erano incompleti e poco intuitivi, mentre lo schematico
> è completo, leggero e più chiaro. Three.js resta **solo** per gli explainer di anatomia (§3.4).
> Da qui in poi, i riferimenti ai 3 approcci, ai 3 stili e alle relative matrici (RF-4/RF-5,
> §6.4, §7) vanno letti come **visione iniziale / storico**; lo stato corrente è descritto in
> [`ROADMAP.md`](./ROADMAP.md) (sezione *Aggiornamento architetturale*). In più: i controlli
> categoriali usano **pulsanti** oltre a slider/ghiere, e la scena è a **tutta larghezza** con i
> controlli **sotto**.

---

## 2. Pubblico e contesto d'uso

- **Primario**: principianti che vogliono passare dall'automatico al manuale.
- **Secondario**: appassionati che vogliono consolidare l'intuizione (es. compressione prospettica).
- **Terziario**: docenti/workshop che proiettano le demo a lezione.
- **Dispositivi**: desktop-first, ma **responsive e touch-friendly** (le "ghiere" devono funzionare al dito). Mobile supportato con engine alleggerito.
- **Online/offline**: SPA statica, nessun backend richiesto (vedi §5). Funziona anche offline una volta caricata.

---

## 3. Concetti didattici

Per ogni concetto definiamo: *cosa si impara*, *parametri interattivi*, *cosa mostra la demo*,
*modello fisico* (vedi §8 per le formule).

### 3.1 Concetti core (must-have, v1)

| # | Concetto | Parametri interattivi | La demo mostra | Modello |
|---|---|---|---|---|
| C1 | **Tempo di otturazione** | tempo (30s…1/8000), velocità soggetto | Congelamento vs mosso; scia di movimento; panning | `motion` |
| C2 | **Apertura del diaframma** | f-number (f/1.4…f/22), distanza di fuoco | Profondità di campo, bokeh, forma del diaframma | `dof` |
| C3 | **ISO** | ISO (50…25600) | Rumore digitale, grana che cresce, calo di gamma dinamica | `noise` |
| C4 | **Distanza focale** | focale (16…300mm), distanza di ripresa, sensore | Angolo di campo + **compressione prospettica** (dolly zoom) | `fov` |
| C5 | **Triangolo dell'esposizione** | tempo + apertura + ISO insieme | Come i 3 si compensano a parità di luce; EV; istogramma | `exposure` (integra C1–C3) |

### 3.2 Concetti aggiuntivi consigliati (per un percorso completo)

| # | Concetto | Perché è utile | Modello |
|---|---|---|---|
| A1 | **Esposizione & istogramma / metering** | Leggere sovra/sottoesposizione, clipping, zone | `exposure` |
| A2 | **Bilanciamento del bianco (temperatura colore)** | Capire il colore della luce (K) e le dominanti | `whiteBalance` |
| A3 | **Dimensione del sensore / crop factor** | Lega focale↔angolo di campo↔profondità di campo | `fov` + `dof` |
| A4 | **Panning** (mosso creativo) | Soggetto nitido su sfondo strisciato | `motion` |
| A5 | **Diffrazione** (avanzato) | Perché chiudere troppo il diaframma ammorbidisce | `dof` |
| A6 | **Distorsione/prospettiva del ritratto** | Perché i grandangoli "deformano" i volti da vicino | `fov` |

> A5–A6 sono opzionali/avanzati: entrano se il budget lo consente (vedi roadmap M7).

### 3.3 Struttura comune di ogni concetto

Ogni concetto è un **modulo demo** auto-contenuto che espone:
1. un **modello di parametri** (con range e passi espressi in *stop* dove ha senso);
2. uno o più **controlli** (slider/ghiera per valori ordinati, **pulsanti** per scelte categoriali) generati dichiarativamente;
3. una **funzione `computeDerived`** che usa il core fisico (§8);
4. una **scena schematica** (SVG) che disegna lo stato corrente *(in origine: una implementazione per engine + fallback)*;
5. un **testo-lezione** i18n (cosa, perché, "prova questo").

### 3.4 Anatomia & explainer 3D (scroll-driven) — sensori e ottiche

Secondo archetipo, diverso dalle demo parametriche: niente slider, l'utente **scorre** e una
scena **Three.js** si anima — la reflex si **scompone** (exploded view), la camera si muove sui
componenti, compaiono annotazioni. L'interazione è il **progresso di scroll (0→1)** mappato su
una timeline (posizioni dei gruppi, pose camera, etichette). È **3D-nativo** (engine `three`);
con `prefers-reduced-motion` o sugli altri approcci mostra un **diagramma annotato statico**
(versione "a step" con avanti/indietro).

| # | Explainer | Cosa scompone / mostra | Collega a |
|---|---|---|---|
| **An1** | **Anatomia della reflex** *(flagship)* | Obiettivo e gruppi ottici · diaframma a lamelle · specchio reflex (45°) e specchio secondario · schermo di messa a fuoco · pentaprisma · mirino ottico · otturatore a tendina · sensore · modulo AF a rilevamento di fase. **Percorso della luce** + **sequenza dello scatto** (specchio su → tendine che corrono → sensore esposto → specchio giù). Confronto **reflex vs mirrorless** (EVF, niente specchio). | C1, C2, An2, An3 |
| **An2** | **Il sensore** | Zoom sui **fotositi**, microlenti, **filtro di Bayer** (CFA) e demosaicizzazione, fotoni→elettroni, **gain/ADC = legame fisico con l'ISO**, rumore di lettura vs shot. **Dimensioni sensore** (FF / APS-C / M4-3 / 1" / phone) → crop factor e profondità di campo. Cenni rolling vs global shutter. | C3, A3, C4 |
| **An3** | **Le ottiche** | Come la lente forma l'immagine (rifrazione, fuoco, focale) · **elementi e gruppi** · messa a fuoco e zoom (gruppi mobili) · **diaframma a lamelle** e forma del bokeh · stabilizzazione (gruppo IS) · aberrazioni: cromatica, vignettatura, **distorsione** (barile/cuscinetto), flare e trattamenti antiriflesso. | C2, C4, A6 |

> Questi tre vivono nella sezione **"Anatomia"** del percorso: sono il luogo naturale dove
> mostrare il *funzionamento fisico* dietro ai parametri delle demo interattive.

---

## 4. Requisiti funzionali

### 4.1 Demo interattive
- **RF-1** Ogni concetto core ha una demo con controlli che aggiornano la scena in tempo reale (<16 ms per frame dove possibile, vedi §5).
- **RF-2** I controlli includono **slider** e **ghiere** (dial) rotanti, con valori "fotografici" reali (es. f/2.8, 1/250 s, ISO 400) e snap ai *full/third stop*.
- **RF-3** Lettura numerica sempre visibile (valore corrente + unità + eventuale equivalente in stop/EV).

### 4.2 Switch globali
- **RF-4 Approccio di rendering** — *superato (vedi nota in §1): il rendering è oggi solo schematico, nessun selettore.* ~~l'utente sceglie tra `3D`, `2.5D`, `Schematico`…~~
- **RF-5 Stile visivo** — *superato (vedi nota in §1): lo switch di stile è stato rimosso.* ~~l'utente sceglie tra `Realistico`, `Misto`, `Schematico`…~~
- **RF-6 Lingua**: selettore lingua; l'app parte in **italiano**; struttura i18n pronta per altre lingue.
- **RF-7** Le scelte degli switch sono **persistite** (localStorage) e **riflesse nell'URL** (deep-link).

### 4.3 Apprendimento e confronto
- **RF-8 Pannello-lezione** accanto alla demo: spiegazione breve, "punti chiave", call-to-action "prova questo" che imposta preset di parametri.
- **RF-9 Preset** richiamabili (es. "ritratto sfocato", "panorama tutto a fuoco", "sport congelato").
- **RF-10 Confronto A/B**: blocca uno stato e confrontalo con quello corrente (split o toggle).
- **RF-11 Deep-link parametri**: lo stato della demo (parametri + engine + stile) è codificato nell'URL e condivisibile.
- **RF-12 Navigazione/percorso**: indice dei concetti + percorso consigliato (ordine didattico), con possibilità di salto libero.

### 4.4 Trasversali
- **RF-13** Reset ai default per ogni demo.
- **RF-14** Indicatori derivati on-screen pertinenti al concetto (es. EV, intervallo di fuoco in metri, angolo di campo in gradi, istogramma).
- **RF-15** (Opzionale, M8) micro-quiz/check di comprensione per concetto.

---

## 5. Requisiti non funzionali

| Area | Requisito |
|---|---|
| **Performance** | 60 fps target su desktop per l'engine 3D di una scena demo; degradazione controllata su mobile (dpr ridotto, render *on-demand*). Le funzioni del core sono pure e O(1). |
| **Accessibilità** | Navigazione da tastiera per tutti i controlli; ARIA su slider/ghiere; contrasto AA; rispetto di `prefers-reduced-motion` (anima in modo ridotto o mostra stato statico). |
| **Responsive/Touch** | Layout a colonne su desktop, impilato su mobile; ghiere usabili al dito; nessun hover-only. |
| **Compatibilità** | Ultimi 2 major di Chrome/Edge/Firefox/Safari; WebGL2 con fallback a 2.5D/schematico se assente. |
| **Peso/Caricamento** | Code-splitting per engine e per demo (three.js caricato solo se serve l'engine 3D); asset realistici lazy-loaded. |
| **Offline/Hosting** | Build **statica** deployabile su GitHub Pages / qualsiasi CDN; nessun server. |
| **Qualità** | TypeScript strict; core fotografico coperto da unit test; lint+format in CI. |
| **i18n** | Nessuna stringa hard-coded nei componenti; tutte da catalogo `it` con chiavi. |

---

## 6. Architettura tecnica

### 6.1 Stack
- **UI**: React 18 + TypeScript (strict) + Vite.
- **3D**: three.js via **@react-three/fiber** + **@react-three/drei** (+ post-processing per DoF/bokeh).
- **Stato**: **zustand** (store leggero: switch globali + parametri per demo; sottoscrizioni selettive per evitare re-render).
- **Routing**: router con `basename` per GitHub Pages (hash o history+404 fallback); parametri demo nello URL.
- **i18n**: catalogo JSON + hook `t()` (libreria leggera tipo `i18next` o soluzione minima tipizzata).
- **Test**: Vitest (core + util) ; (opz.) Playwright per smoke E2E.
- **Qualità**: ESLint + Prettier; GitHub Actions per build/test/deploy.

### 6.2 Architettura a strati

```
┌──────────────────────────────────────────────────────────────┐
│  UI shell (navigazione, switch bar, pannello-lezione, layout)  │
├──────────────────────────────────────────────────────────────┤
│  DEMOS  (un modulo per concetto: params + controls + lessons)  │
│         dichiara quali ENGINE supporta + fallback              │
├───────────────┬───────────────────────────┬──────────────────┤
│  ENGINES      │  STYLES (design token)     │  CONTROLS (UI)    │
│  three/       │  realistic / mixed /       │  Slider, Dial,    │
│  layered/     │  schematic  (skin)         │  Histogram, …     │
│  schematic/   │                            │                   │
├───────────────┴───────────────────────────┴──────────────────┤
│  CORE fotografico (math puro, no React): exposure, dof, fov,   │
│  motion, noise, whiteBalance  +  modelli parametri (stop/EV)   │
├──────────────────────────────────────────────────────────────┤
│  STATE (zustand)  ·  I18N (cataloghi)  ·  ROUTING/URL state    │
└──────────────────────────────────────────────────────────────┘
```

Principi:
- Il **core** non conosce React né gli engine: è matematica pura e testabile.
- Gli **engine** sono **intercambiabili** dietro un'interfaccia comune (strategy pattern).
- Gli **stili** sono **token** consumati dagli engine dove sensato; non cambiano la fisica.
- Le **demo** orchestrano: prendono i parametri → `computeDerived` (core) → passano i valori all'engine selezionato con i token dello stile selezionato.

### 6.3 Contratti di rendering

> Nota (giugno 2026): la versione iniziale prevedeva uno *strategy pattern* multi-engine
> (`RenderingApproach`/`VisualStyle`, mappa `renderers` + `fallback`). Dopo il consolidamento
> sullo schematico (vedi §1), i contratti sono quelli sotto: niente assi `approach`/`style`,
> ogni demo ha una singola `scene`.

```ts
// engines/types.ts
/** Valori fisici calcolati dal core, comuni a tutte le scene. */
export interface DerivedPhysics {
  exposure: { evAt100: number; stopsFromTarget: number; displayBrightness: number };
  dof?: { nearM: number; farM: number; totalM: number; hyperfocalM: number; cocMm: number };
  fov?: { horizontalDeg: number; verticalDeg: number; diagonalDeg: number; cropFactor: number };
  motion?: { blurPx: number; blurNormalized: number };
  noise?: { sigma: number; grainPx: number; snrDb: number };
  whiteBalance?: { kelvin: number; rgbGain: [number, number, number] };
}

export interface SceneProps<P> {
  params: P;                 // parametri del concetto
  derived: DerivedPhysics;   // output del core
  animate: boolean;          // false (o reduced-motion) → scena statica
}

export type RendererComponent<P> = React.FC<SceneProps<P>>;
```

```ts
// demos/<concept>/index.ts
export interface DemoModule<P> {
  id: string;                       // es. 'shutter'
  titleKey: string;                 // chiave i18n
  group: 'core' | 'advanced';
  defaultParams: P;
  controls: ControlSpec[];          // slider/ghiere (valori ordinati) o pulsanti (segment, scelte categoriali)
  computeDerived: (p: P) => DerivedPhysics;
  scene: RendererComponent<P>;      // scena schematica (SVG)
  presets?: Record<string, Partial<P>>;
}
```

Il componente host monta la scena della demo:
```ts
const Scene = demo.scene; // un'unica scena schematica per demo
```

### 6.4 Stile come token (asse ortogonale)

```ts
// styles/tokens.ts
export interface StyleTokens {
  palette: { bg: string; ink: string; accent: string; grid: string; /* … */ };
  scene: { useTextures: boolean; lineWeight: number; labelDensity: 'low'|'high' };
  material: { surface: 'photoreal'|'flat'|'toon'; bokehShape: 'circle'|'hexagon' };
}
```

Regola: ogni engine **consuma i token che gli competono**. Esempio: l'engine `schematic`
ignora `useTextures` (disegna sempre a tratto) ma usa `palette`/`lineWeight`; l'engine
`three` usa `material.surface` per scegliere shader photoreal vs toon.

**Matrice di compatibilità approccio × stile** (qualità attesa):

| Stile ↓ / Approccio → | 3D (three) | 2.5D (layered) | Schematico |
|---|:---:|:---:|:---:|
| Realistico | ◎ nativo | ◎ nativo | ○ degradato* |
| Misto | ◎ | ◎ | ◎ |
| Schematico | ○ (toon) | ○ | ◎ nativo |

◎ ottimo · ○ accettabile/fallback grazioso · *lo stile realistico su engine schematico mostra una resa "diagramma" con etichette: dichiarato, non un bug.

### 6.5 Gestione stato (zustand)

```ts
interface AppState {
  locale: string;
  currentDemoId: string;
  paramsByDemo: Record<string, unknown>;   // parametri correnti per demo
  // setter: setLocale · setCurrentDemo · setDemoParams
}
```
Persistenza: `locale` e demo corrente in `localStorage`; parametri della demo serializzati in
URL (deep-link). Il confronto A/B è stato locale del componente `DemoView`.
*(In origine lo store conteneva anche `approach`/`style`, rimossi col consolidamento — vedi §1.)*

### 6.6 Struttura cartelle

```
photography-smanetting/
├─ index.html
├─ package.json · tsconfig.json · vite.config.ts
├─ public/assets/                  # texture, foto e modelli GLTF (reflex/anatomia), lazy
├─ src/
│  ├─ main.tsx · App.tsx
│  ├─ core/                        # MATH PURO (testato, no React)
│  │  ├─ photography/ exposure.ts · dof.ts · fov.ts · motion.ts · noise.ts · whiteBalance.ts
│  │  └─ params/ stops.ts · ranges.ts
│  ├─ engines/
│  │  ├─ types.ts
│  │  ├─ schematic/  (scene SVG delle demo) · three/  (anatomia 3D, scroll-driven)
│  │  └─ EngineHost.tsx           # monta la scena della demo
│  ├─ demos/
│  │  ├─ shutter/ · aperture/ · iso/ · focal/ · exposure-triangle/ · …
│  │  └─ registry.ts              # elenco demo + ordine percorso (+ approfondimenti)
│  ├─ ui/  Layout.tsx · LessonPanel.tsx · Slider.tsx · Dial.tsx · Segment.tsx · Histogram.tsx
│  ├─ state/ store.ts
│  ├─ i18n/ index.ts · it.json
│  └─ types.ts
└─ docs/ REQUISITI.md · ROADMAP.md
```

### 6.7 Explainer 3D scroll-driven (archetipo `ExplainerModule`)

Gli explainer di anatomia (§3.4) usano un contratto diverso dalle demo parametriche: sono
**guidati dallo scroll** e **nativi `three`** (fuori dalla matrice dei 3 approcci).

```ts
// explainers/types.ts
export interface ExplainerSection {
  id: string;
  titleKey: string;          // testo i18n del passo
  atProgress: number;        // 0..1 — punto della timeline
  camera?: CameraKeyframe;   // posa camera target del passo
  highlight?: string[];      // id dei componenti da evidenziare/etichettare
}

export interface ExplainerModule {
  id: 'reflex' | 'sensor' | 'optics';
  titleKey: string;
  group: 'anatomy';
  model: () => Promise<THREE.Object3D>;                 // GLTF caricato lazy
  sections: ExplainerSection[];                         // narrazione scroll-driven
  explode: (p: number, parts: Record<string, THREE.Object3D>) => void; // exploded view su p∈[0,1]
  reducedMotion: 'stepper';                             // fallback senza animazione continua
}
```

Tecnologia:
- **Scroll rig**: drei `ScrollControls`/`useScroll` *oppure* GSAP `ScrollTrigger` che pilota una
  timeline; `progress 0→1` → interpolazione di posizioni (exploded view), pose camera, opacità etichette.
- **Annotazioni**: drei `Html` ancorate ai componenti + pannello testo i18n sincronizzato.
- **Performance**: modello **GLTF lazy** (+ Draco), render on-demand; `prefers-reduced-motion` → stepper.
- **Asset**: serve un **modello 3D della reflex** con parti nominate — stilizzato low-poly costruito ad
  hoc (zero licenze) *oppure* GLTF con licenza libera. Decisione condivisa con gli asset degli stili realistici.

Su `2.5D`/`schematico` e con reduced-motion gli explainer degradano a un **diagramma annotato statico**.

---

## 7. Matrice di supporto Demo × Engine (controllo dello scope)

Per non costruire 9 combinazioni inutili, **ogni demo dichiara** gli engine che supporta.
Pianificazione (`◎` nativo/prioritario, `✓` previsto, `↳` via fallback):

| Demo | 3D | 2.5D | Schematico | Note |
|---|:---:|:---:|:---:|---|
| C1 Otturazione | ◎ | ✓ | ✓ | blur reale 3D vs scia a livelli vs vettori schematici |
| C2 Apertura/DoF | ◎ | ✓ | ✓ | bokeh shader (3D) vs blur per-livello (2.5D) vs cono di fuoco (schematico) |
| C3 ISO/rumore | ✓ | ◎ | ✓ | il rumore è un **post-effetto**: brilla in 2.5D/2D |
| C4 Focale/compressione | ◎ | ✓ | ✓ | dolly-zoom vero in 3D; parallasse a livelli in 2.5D; diagramma angoli in schematico |
| C5 Triangolo esposiz. | ✓ | ✓ | ◎ | integra C1–C3; lo schematico (bilancia + istogramma) è il più chiaro |

> La matrice è **viva**: `↳ fallback` esplicito quando un engine non aggiunge valore, con badge UI.

> **Explainer 3D (Anatomia: reflex / sensore / ottiche):** sono `three`-only e **non** rientrano nei 3
> approcci commutabili (vedi §3.4 e §6.7). Fallback su `2.5D`/`schematico`/reduced-motion = diagramma statico annotato.

---

## 8. Modello fotografico (fisica semplificata ma plausibile)

Tutte le formule vivono in `core/photography/` come funzioni pure e testate. Sono
*semplificazioni didattiche*: plausibili e coerenti, non simulazioni metrologiche.

**Esposizione / stop / EV** (`exposure.ts`)
```
N  = f-number (apertura)      t = tempo in secondi      ISO = sensibilità
EV100 = log2(N² / t)                         // a ISO 100
Esposizione ∝ t · ISO / N²                    // luce raccolta (scena fissa)
stopsDalTarget = log2(t/t0) + log2(N0²/N²) + log2(ISO/ISO0)
displayBrightness = clamp( target * 2^stopsDalTarget )   // mappa su luminosità scena
```
Sequenze "di stop" standard: apertura {1.4,2,2.8,4,5.6,8,11,16,22}, tempo {1,1/2,1/4,…},
ISO {100,200,400,…}; snap a full/third stop.

**Profondità di campo** (`dof.ts`)
```
c = circle of confusion limite (dipende dal sensore, es. FF ≈ diag/1500 ≈ 0.029 mm)
H = f²/(N·c) + f                              // iperfocale
Dn = (H·s) / (H + (s − f))                    // limite vicino   (s = distanza di fuoco)
Df = (H·s) / (H − (s − f))   per s < H        // limite lontano (∞ se s ≥ H)
DoF = Df − Dn
```

**Angolo di campo & compressione** (`fov.ts`)
```
AOV = 2 · atan( d / (2f) )                    // d = dimensione sensore (W/H/diag)
cropFactor = diagFF / diagSensore
magnificazione m = f / (s − f)
// Compressione = effetto della DISTANZA: per mantenere il soggetto della stessa
// dimensione cambiando f, si scala s ∝ f (dolly) → lo sfondo cambia scala → compressione.
```

**Mosso da movimento** (`motion.ts`)
```
blurPx ∝ velocitàSoggetto · t · (f / dSensore) · risoluzione   // modello proporzionale
// panning: blur applicato allo SFONDO, soggetto nitido (frame di riferimento del soggetto)
```

**Rumore ISO** (`noise.ts`)
```
σ(ISO) ∝ ISO (gain)                           // deviazione standard del rumore
grainPx cresce con ISO                         // la grana si "ingrossa"
SNR ↓ all'aumentare di ISO                      // qualità che cala
// resa: noise gaussiano + dimensione cella della grana ∝ ISO  (post-effetto)
```

**Bilanciamento del bianco** (`whiteBalance.ts`)
```
kelvin → guadagni RGB (curva approssimata corpo nero): caldo (basso K) ↔ freddo (alto K)
```

---

## 9. Rischi e mitigazioni

| Rischio | Impatto | Mitigazione |
|---|---|---|
| **Doppio switch a 3 vie triplica il rendering** | Alto (tempo) | Core condiviso; matrice di supporto per demo; fallback dichiarato; partire da 1 engine (schematico) end-to-end |
| DoF/bokeh 3D pesante su mobile | Medio | Render on-demand, dpr adattivo, fallback a 2.5D dove WebGL2 manca |
| Asset realistici (peso/licenze) | Medio | Lazy-load; generare scene proprie o usare asset con licenza libera; lo stile schematico non richiede asset |
| Coerenza fisica tra engine | Medio | Un solo `computeDerived` per demo: gli engine **renderizzano gli stessi numeri**, non li ricalcolano |
| Compressione prospettica "fraintesa" | Basso/didattico | Demo dolly-zoom esplicita che è la **distanza** a comprimere, non la lente (vedi §11) |
| Scope creep dei concetti aggiuntivi | Medio | A1–A4 in M7; A5–A6 opzionali oltre il budget |

---

## 10. Definition of Done (per demo)

Una demo è "fatta" quando: ① reagisce in tempo reale ai controlli; ② almeno l'engine
nativo + il fallback funzionano; ③ mostra gli indicatori derivati pertinenti; ④ ha il
testo-lezione i18n + almeno un preset "prova questo"; ⑤ è accessibile da tastiera e
rispetta `reduced-motion`; ⑥ il core relativo ha unit test verdi.

---

## 11. Estensioni future

- Modalità "macchina fotografica virtuale" che unisce tutti i parametri in un mirino unico.
- Sfide/gamification ("ottieni questo risultato regolando i parametri").
- Caricamento di una **propria foto** come scena per alcuni post-effetti (ISO, WB, esposizione).
- Lingue aggiuntive (EN già predisposto).
- Modulo composizione (regola dei terzi, linee guida) — fuori dal triangolo tecnico ma utile.

---

## 12. Riferimenti (ricerca)

Benchmark di simulatori esistenti:
- [CameraSim — Exposure Contraption](https://www.camerasim.com/exposure-contraption)
- [Canon "Outside of Auto" (rassegna Fstoppers)](https://fstoppers.com/other/best-online-tool-ive-seen-learning-manual-photography-canon-8709)
- [Exposure Triangle simulator 3.0 — dima.fi](https://dima.fi/exposure/)
- [Andersen Images — Exposure Simulator](http://www.andersenimages.com/tutorials/exposure-simulator/)
- [9 Online Camera Simulators — Adorama](https://www.adorama.com/alc/9-online-camera-simulators-to-help-your-photography-skill/)

Tecniche di rendering:
- [Simulating Depth of Field with Particles (Blurry) — Codrops](https://tympanus.net/codrops/2019/10/01/simulating-depth-of-field-with-particles-using-the-blurry-library/)
- [glfx.js — effetti immagine WebGL (tiltShift)](https://evanw.github.io/glfx.js/docs/)
- [three.js — esempio post-processing Depth of Field](https://threejs.org/examples/webgl_postprocessing_dof.html)
- [Depth of field in p5.js — Dave Pagurek](https://www.davepagurek.com/blog/depth-of-field/)

Distanza focale / compressione prospettica:
- [How Lens Compression and Perspective Distortion Work — Fstoppers](https://fstoppers.com/architecture/how-lens-compression-and-perspective-distortion-work-251737)
- [Lens Basics #5: Perspective — Canon Snapshot](https://snapshot.canon-asia.com/article/eng/lens-basics-5-perspective)

Rumore ISO / grana:
- [A Generative Model for Digital Camera Noise Synthesis — arXiv](https://arxiv.org/html/2303.09199v3)
- [How to Emulate Film Grain in Your Digital Photos — PetaPixel](https://petapixel.com/2025/09/19/how-to-emulate-film-grain-in-your-digital-photos/)
