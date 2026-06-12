/** Sezioni dell'explainer "Anatomia della reflex" (scroll-driven). Italiano per la v1. */

export interface AnatomySection {
  id: string;
  /** Punto della timeline di scroll (0..1) a cui la sezione diventa attiva. */
  atProgress: number;
  title: string;
  body: string;
  /** Id del componente da evidenziare (null = vista d'insieme). */
  highlight: string | null;
}

export const REFLEX_SECTIONS: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'La reflex, dentro',
    body: 'Una reflex (SLR) porta la luce dell’obiettivo fino al mirino tramite uno specchio: guardi esattamente ciò che registrerà il sensore. Scorri per scomporla pezzo per pezzo.',
  },
  {
    id: 'lens',
    atProgress: 0.16,
    highlight: 'lens',
    title: 'Obiettivo e diaframma',
    body: 'L’obiettivo raccoglie la luce e la mette a fuoco sul piano del sensore. Al suo interno il diaframma a lamelle regola l’apertura, e con essa luce e profondità di campo.',
  },
  {
    id: 'mirror',
    atProgress: 0.32,
    highlight: 'mirror',
    title: 'Specchio reflex (45°)',
    body: 'Uno specchio inclinato a 45° intercetta la luce e la riflette verso l’alto, nel mirino. Al momento dello scatto si solleva per liberare il percorso verso il sensore.',
  },
  {
    id: 'pentaprism',
    atProgress: 0.48,
    highlight: 'pentaprism',
    title: 'Pentaprisma e mirino',
    body: 'Il pentaprisma raddrizza l’immagine riflessa dallo specchio e la invia all’oculare: per questo nel mirino vedi la scena dritta e non capovolta o speculare.',
  },
  {
    id: 'shutter',
    atProgress: 0.64,
    highlight: 'shutter',
    title: 'Otturatore a tendina',
    body: 'Davanti al sensore due tendine scorrono per scoprire e poi ricoprire la superficie sensibile: la loro corsa definisce il tempo di otturazione.',
  },
  {
    id: 'sensor',
    atProgress: 0.8,
    highlight: 'sensor',
    title: 'Sensore',
    body: 'Quando lo specchio è alzato e le tendine corrono, la luce raggiunge il sensore, che converte i fotoni in segnale elettrico: è qui che nasce l’immagine.',
  },
  {
    id: 'mirrorless',
    atProgress: 0.94,
    highlight: null,
    title: 'Reflex vs mirrorless',
    body: 'Le mirrorless eliminano specchio e pentaprisma: la luce arriva sempre al sensore e il mirino è elettronico (EVF). Corpo più compatto, stessa fisica di tempo, diaframma e ISO.',
  },
];

export const SENSOR_SECTIONS: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'Il sensore',
    body: 'Il sensore trasforma la luce in segnale elettrico. È una griglia di milioni di fotositi, ciascuno con una microlente e un filtro colore. Scorri per separarne i livelli.',
  },
  {
    id: 'microlens',
    atProgress: 0.18,
    highlight: 'microlens',
    title: 'Microlenti',
    body: 'Sopra ogni fotosito una microlente convoglia la luce verso l’area sensibile, recuperando i fotoni che cadrebbero negli spazi tra i pozzi.',
  },
  {
    id: 'bayer',
    atProgress: 0.36,
    highlight: 'bayer',
    title: 'Filtro di Bayer',
    body: 'Ogni fotosito vede un solo colore tramite un filtro rosso, verde o blu, disposti a mosaico (RGGB, col verde doppio). La demosaicizzazione ricostruisce poi il colore pieno di ogni pixel.',
  },
  {
    id: 'photosite',
    atProgress: 0.54,
    highlight: 'photosite',
    title: 'Fotositi',
    body: 'Ogni fotosito è un pozzo che accumula gli elettroni liberati dai fotoni: più luce raccoglie, più alto è il segnale e migliore il rapporto segnale/rumore.',
  },
  {
    id: 'gain',
    atProgress: 0.72,
    highlight: 'photosite',
    title: 'Guadagno e ISO',
    body: 'Il segnale del fotosito viene amplificato prima di diventare numero: questa amplificazione è l’ISO. Più guadagno significa più luminosità, ma anche più rumore visibile.',
  },
  {
    id: 'size',
    atProgress: 0.9,
    highlight: null,
    title: 'Dimensione del sensore',
    body: 'Sensori più grandi (full frame) raccolgono più luce e isolano meglio il soggetto; quelli più piccoli (APS-C, M4/3) hanno un “crop” che restringe l’angolo di campo a parità di focale.',
  },
];

export const OPTICS_SECTIONS: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'L’obiettivo',
    body: 'Un obiettivo è un sistema di lenti che raccoglie la luce e la mette a fuoco sul sensore. Scorri per separarne gli elementi.',
  },
  {
    id: 'elements',
    atProgress: 0.2,
    highlight: 'elements',
    title: 'Elementi e gruppi',
    body: 'Più lenti (elementi), riunite in gruppi, lavorano insieme: alcune raccolgono la luce, altre correggono i difetti. Più elementi danno più correzione, ma anche più riflessi da gestire.',
  },
  {
    id: 'focus',
    atProgress: 0.42,
    highlight: 'focus',
    title: 'Messa a fuoco',
    body: 'Spostando avanti e indietro un gruppo di lenti si cambia il punto in cui i raggi convergono: così metti a fuoco soggetti a distanze diverse.',
  },
  {
    id: 'iris',
    atProgress: 0.64,
    highlight: 'iris',
    title: 'Diaframma a lamelle',
    body: 'Un anello di lamelle apre e chiude il foro di passaggio della luce: regola l’apertura (numero f) e, con numero e forma delle lamelle, l’aspetto del bokeh.',
  },
  {
    id: 'aberration',
    atProgress: 0.84,
    highlight: 'aberration',
    title: 'Aberrazioni e trattamenti',
    body: 'Nessuna lente è perfetta: aberrazione cromatica, distorsione e vignettatura si correggono con elementi speciali e trattamenti antiriflesso sulle superfici.',
  },
];

export interface ExplainerDef {
  id: string;
  titleKey: string;
  sections: AnatomySection[];
}

export const EXPLAINERS: Record<string, ExplainerDef> = {
  reflex: { id: 'reflex', titleKey: 'anatomy.reflex.title', sections: REFLEX_SECTIONS },
  sensor: { id: 'sensor', titleKey: 'anatomy.sensor.title', sections: SENSOR_SECTIONS },
  optics: { id: 'optics', titleKey: 'anatomy.optics.title', sections: OPTICS_SECTIONS },
};

export const EXPLAINER_LIST: ExplainerDef[] = [
  EXPLAINERS.reflex,
  EXPLAINERS.sensor,
  EXPLAINERS.optics,
];
