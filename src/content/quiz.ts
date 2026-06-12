/** Micro-quiz di verifica per ogni concetto (una domanda a scelta multipla). Italiano. */

export interface QuizQuestion {
  q: string;
  options: string[];
  /** Indice della risposta corretta. */
  answer: number;
}

export const QUIZ: Record<string, QuizQuestion> = {
  shutter: {
    q: 'Per congelare un’auto in corsa, quale tempo scegli?',
    options: ['1/8 s', '1/1000 s', '2 s'],
    answer: 1,
  },
  aperture: {
    q: 'Quale apertura dà lo sfondo più sfocato?',
    options: ['f/16', 'f/8', 'f/1.4'],
    answer: 2,
  },
  iso: {
    q: 'Cosa aumenta soprattutto alzando l’ISO?',
    options: ['La nitidezza', 'Il rumore', 'La profondità di campo'],
    answer: 1,
  },
  focal: {
    q: 'Cosa “comprime” davvero lo sfondo?',
    options: ['La focale lunga di per sé', 'La distanza dal soggetto', 'Il diaframma chiuso'],
    answer: 1,
  },
  triangle: {
    q: 'Apri il diaframma di 1 stop: per mantenere l’esposizione…',
    options: ['accorci il tempo di 1 stop', 'allunghi il tempo di 1 stop', 'alzi l’ISO di 1 stop'],
    answer: 0,
  },
  histogram: {
    q: 'Le alte luci “bruciate” (clipping a destra) sono…',
    options: ['recuperabili in post', 'irrecuperabili', 'sempre un errore da evitare'],
    answer: 1,
  },
  whiteBalance: {
    q: 'Una luce a 3000 K è…',
    options: ['fredda e blu', 'calda e arancio', 'perfettamente neutra'],
    answer: 1,
  },
  panning: {
    q: 'In un panning riuscito, lo sfondo risulta…',
    options: ['nitido', 'strisciato', 'completamente nero'],
    answer: 1,
  },
  crop: {
    q: 'Un 50mm su APS-C (crop 1.5×) inquadra come un…',
    options: ['33mm', '50mm', '75mm'],
    answer: 2,
  },
};
