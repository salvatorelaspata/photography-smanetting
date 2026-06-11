/**
 * Sequenze "di stop" standard e utilità di snap/formattazione.
 * Riferimento: docs/REQUISITI.md §8.
 */

/** Aperture a stop pieni (f-number). */
export const APERTURES_FULL = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32] as const;

/** Tempi di otturazione a stop pieni, in secondi (dal più lungo al più breve). */
export const SHUTTER_FULL_SECONDS = [
  30, 15, 8, 4, 2, 1, 1 / 2, 1 / 4, 1 / 8, 1 / 15, 1 / 30, 1 / 60, 1 / 125, 1 / 250, 1 / 500,
  1 / 1000, 1 / 2000, 1 / 4000, 1 / 8000,
] as const;

/** Valori ISO a stop pieni. */
export const ISO_FULL = [50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600] as const;

/** Restituisce il valore della sequenza più vicino a `value`. */
export function snapToSequence(value: number, sequence: readonly number[]): number {
  let best = sequence[0];
  let bestDist = Math.abs(value - best);
  for (const v of sequence) {
    const d = Math.abs(value - v);
    if (d < bestDist) {
      best = v;
      bestDist = d;
    }
  }
  return best;
}

/** Formatta un tempo di otturazione in notazione fotografica: 1/250, 2", 0"5. */
export function formatShutter(seconds: number): string {
  if (seconds >= 1) {
    return Number.isInteger(seconds) ? `${seconds}"` : `${seconds.toFixed(1).replace('.', '"')}`;
  }
  return `1/${Math.round(1 / seconds)}`;
}

/** Formatta l'apertura: f/2.8, f/8. */
export function formatAperture(fstop: number): string {
  return `f/${Number.isInteger(fstop) ? fstop.toFixed(0) : fstop}`;
}
