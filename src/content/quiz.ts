/** Micro-quiz di verifica per ogni concetto (una domanda a scelta multipla). Localizzato it/en. */

import type { Locale } from '../types';

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
  diffraction: {
    q: 'A quale apertura un obiettivo è di solito più nitido?',
    options: ['f/1.4', 'f/8', 'f/22'],
    answer: 1,
  },
  portrait: {
    q: 'Cosa causa il “naso grande” nei ritratti?',
    options: ['Una focale lunga', 'La distanza troppo ravvicinata', 'Un ISO alto'],
    answer: 1,
  },
  hyperfocal: {
    q: 'Mettendo a fuoco sull’iperfocale, la zona nitida arriva…',
    options: ['solo a 2 metri', 'fino all’infinito', 'solo da vicino'],
    answer: 1,
  },
  metering: {
    q: 'Per esporre un soggetto in controluce, quale misurazione?',
    options: ['Matrix', 'Spot sul soggetto', 'Nessuna, è impossibile'],
    answer: 1,
  },
  stabilization: {
    q: 'La stabilizzazione aiuta contro…',
    options: ['il soggetto in movimento', 'il tremolio della fotocamera', 'il rumore ISO'],
    answer: 1,
  },
  flash: {
    q: 'Scattando più veloce del tempo di sincro, nel fotogramma compare…',
    options: ['più luce', 'una banda nera', 'più colore'],
    answer: 1,
  },
  bracketing: {
    q: 'Il bracketing serve a…',
    options: ['ridurre il rumore', 'coprire una gamma dinamica più ampia', 'aumentare la nitidezza'],
    answer: 1,
  },
};

const QUIZ_EN: Record<string, QuizQuestion> = {
  shutter: {
    q: 'To freeze a speeding car, which shutter time do you pick?',
    options: ['1/8 s', '1/1000 s', '2 s'],
    answer: 1,
  },
  aperture: {
    q: 'Which aperture gives the most blurred background?',
    options: ['f/16', 'f/8', 'f/1.4'],
    answer: 2,
  },
  iso: {
    q: 'What mainly increases as you raise the ISO?',
    options: ['Sharpness', 'Noise', 'Depth of field'],
    answer: 1,
  },
  focal: {
    q: 'What actually “compresses” the background?',
    options: ['A long focal length by itself', 'The distance from the subject', 'A closed aperture'],
    answer: 1,
  },
  triangle: {
    q: 'You open the aperture by 1 stop: to keep the exposure…',
    options: ['shorten the shutter by 1 stop', 'lengthen the shutter by 1 stop', 'raise ISO by 1 stop'],
    answer: 0,
  },
  histogram: {
    q: 'Blown highlights (clipping on the right) are…',
    options: ['recoverable in post', 'unrecoverable', 'always a mistake to avoid'],
    answer: 1,
  },
  whiteBalance: {
    q: 'A 3000 K light is…',
    options: ['cool and blue', 'warm and orange', 'perfectly neutral'],
    answer: 1,
  },
  panning: {
    q: 'In a successful pan, the background looks…',
    options: ['sharp', 'streaked', 'completely black'],
    answer: 1,
  },
  crop: {
    q: 'A 50mm on APS-C (1.5× crop) frames like a…',
    options: ['33mm', '50mm', '75mm'],
    answer: 2,
  },
  diffraction: {
    q: 'At which aperture is a lens usually sharpest?',
    options: ['f/1.4', 'f/8', 'f/22'],
    answer: 1,
  },
  portrait: {
    q: 'What causes the “big nose” in portraits?',
    options: ['A long focal length', 'Shooting too close', 'A high ISO'],
    answer: 1,
  },
  hyperfocal: {
    q: 'Focusing on the hyperfocal, the sharp zone reaches…',
    options: ['only 2 metres', 'all the way to infinity', 'only close up'],
    answer: 1,
  },
  metering: {
    q: 'To expose a backlit subject, which metering?',
    options: ['Matrix', 'Spot on the subject', "None, it's impossible"],
    answer: 1,
  },
  stabilization: {
    q: 'Stabilisation helps against…',
    options: ['a moving subject', 'camera shake', 'ISO noise'],
    answer: 1,
  },
  flash: {
    q: 'Shooting faster than the sync speed, the frame shows…',
    options: ['more light', 'a black band', 'more colour'],
    answer: 1,
  },
  bracketing: {
    q: 'Bracketing is used to…',
    options: ['reduce noise', 'cover a wider dynamic range', 'increase sharpness'],
    answer: 1,
  },
};

/** Restituisce la domanda di quiz per il concetto e la lingua (fallback all'italiano). */
export function quizFor(id: string, locale: Locale): QuizQuestion | undefined {
  return (locale === 'en' ? QUIZ_EN[id] : QUIZ[id]) ?? QUIZ[id];
}
