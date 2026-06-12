/** Sezioni degli explainer di anatomia (scroll-driven), localizzate it/en. */

import type { Locale } from '../types';

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

const REFLEX_SECTIONS_EN: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'The DSLR, inside',
    body: 'A DSLR (SLR) carries the lens’s light all the way to the viewfinder via a mirror: you see exactly what the sensor will record. Scroll to take it apart piece by piece.',
  },
  {
    id: 'lens',
    atProgress: 0.16,
    highlight: 'lens',
    title: 'Lens and aperture',
    body: 'The lens gathers light and focuses it on the sensor plane. Inside, the blade aperture sets the opening, and with it light and depth of field.',
  },
  {
    id: 'mirror',
    atProgress: 0.32,
    highlight: 'mirror',
    title: 'Reflex mirror (45°)',
    body: 'A mirror tilted at 45° intercepts the light and reflects it upward, into the viewfinder. At the moment of the shot it flips up to clear the path to the sensor.',
  },
  {
    id: 'pentaprism',
    atProgress: 0.48,
    highlight: 'pentaprism',
    title: 'Pentaprism and viewfinder',
    body: 'The pentaprism straightens the image reflected by the mirror and sends it to the eyepiece: that’s why in the viewfinder you see the scene upright, not flipped or mirrored.',
  },
  {
    id: 'shutter',
    atProgress: 0.64,
    highlight: 'shutter',
    title: 'Focal-plane shutter',
    body: 'In front of the sensor two curtains travel to uncover and then re-cover the sensitive surface: their run defines the shutter speed.',
  },
  {
    id: 'sensor',
    atProgress: 0.8,
    highlight: 'sensor',
    title: 'Sensor',
    body: 'When the mirror is up and the curtains run, light reaches the sensor, which converts photons into an electrical signal: this is where the image is born.',
  },
  {
    id: 'mirrorless',
    atProgress: 0.94,
    highlight: null,
    title: 'DSLR vs mirrorless',
    body: 'Mirrorless cameras drop the mirror and pentaprism: light always reaches the sensor and the viewfinder is electronic (EVF). A more compact body, the same physics of shutter, aperture and ISO.',
  },
];

const SENSOR_SECTIONS_EN: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'The sensor',
    body: 'The sensor turns light into an electrical signal. It’s a grid of millions of photosites, each with a microlens and a colour filter. Scroll to separate its layers.',
  },
  {
    id: 'microlens',
    atProgress: 0.18,
    highlight: 'microlens',
    title: 'Microlenses',
    body: 'Above each photosite a microlens funnels light toward the sensitive area, recovering photons that would fall into the gaps between the wells.',
  },
  {
    id: 'bayer',
    atProgress: 0.36,
    highlight: 'bayer',
    title: 'Bayer filter',
    body: 'Each photosite sees a single colour through a red, green or blue filter, arranged in a mosaic (RGGB, with green doubled). Demosaicing then reconstructs the full colour of each pixel.',
  },
  {
    id: 'photosite',
    atProgress: 0.54,
    highlight: 'photosite',
    title: 'Photosites',
    body: 'Each photosite is a well that collects the electrons freed by photons: the more light it gathers, the higher the signal and the better the signal-to-noise ratio.',
  },
  {
    id: 'gain',
    atProgress: 0.72,
    highlight: 'photosite',
    title: 'Gain and ISO',
    body: 'The photosite’s signal is amplified before it becomes a number: that amplification is the ISO. More gain means more brightness, but also more visible noise.',
  },
  {
    id: 'size',
    atProgress: 0.9,
    highlight: null,
    title: 'Sensor size',
    body: 'Larger sensors (full frame) gather more light and isolate the subject better; smaller ones (APS-C, M4/3) have a “crop” that narrows the angle of view for the same focal length.',
  },
];

const OPTICS_SECTIONS_EN: AnatomySection[] = [
  {
    id: 'intro',
    atProgress: 0,
    highlight: null,
    title: 'The lens',
    body: 'A lens is a system of glass elements that gathers light and focuses it on the sensor. Scroll to separate the elements.',
  },
  {
    id: 'elements',
    atProgress: 0.2,
    highlight: 'elements',
    title: 'Elements and groups',
    body: 'Several lenses (elements), gathered in groups, work together: some collect light, others correct defects. More elements give more correction, but also more reflections to manage.',
  },
  {
    id: 'focus',
    atProgress: 0.42,
    highlight: 'focus',
    title: 'Focusing',
    body: 'Moving a group of lenses back and forth changes the point where the rays converge: that’s how you focus on subjects at different distances.',
  },
  {
    id: 'iris',
    atProgress: 0.64,
    highlight: 'iris',
    title: 'Blade aperture',
    body: 'A ring of blades opens and closes the hole light passes through: it sets the aperture (f-number) and, with the number and shape of the blades, the look of the bokeh.',
  },
  {
    id: 'aberration',
    atProgress: 0.84,
    highlight: 'aberration',
    title: 'Aberrations and coatings',
    body: 'No lens is perfect: chromatic aberration, distortion and vignetting are corrected with special elements and anti-reflective coatings on the surfaces.',
  },
];

const SECTIONS_EN: Record<string, AnatomySection[]> = {
  reflex: REFLEX_SECTIONS_EN,
  sensor: SENSOR_SECTIONS_EN,
  optics: OPTICS_SECTIONS_EN,
};

/** Restituisce le sezioni dell'explainer per la lingua (fallback all'italiano). */
export function sectionsFor(id: string, locale: Locale): AnatomySection[] {
  return (locale === 'en' ? SECTIONS_EN[id] : EXPLAINERS[id]?.sections) ?? EXPLAINERS[id]?.sections ?? [];
}
