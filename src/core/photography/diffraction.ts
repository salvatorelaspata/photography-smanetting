/**
 * Modello provvisorio della nitidezza vs apertura: aberrazioni (∝ 1/N) a tutta apertura,
 * diffrazione (∝ N) chiudendo. Esiste uno "sweet spot" intermedio.
 * Riferimento: docs/REQUISITI.md §8.
 */
import { APERTURES_FULL } from '../params/stops';

/** Ammorbidimento totale (px, provvisorio): aberrazioni + diffrazione. */
export function totalBlurPx(fstop: number): number {
  return fstop * 0.25 + 30 / fstop;
}

/** Nitidezza 0..1 normalizzata sulle aperture a stop pieni (1 = più nitido). */
export function sharpness(fstop: number): number {
  const blurs = APERTURES_FULL.map(totalBlurPx);
  const min = Math.min(...blurs);
  const max = Math.max(...blurs);
  const b = totalBlurPx(fstop);
  return max > min ? 1 - (b - min) / (max - min) : 1;
}

/** Apertura con nitidezza massima (sweet spot). */
export function sweetSpot(): number {
  let best: number = APERTURES_FULL[0];
  let bestBlur = Infinity;
  for (const f of APERTURES_FULL) {
    const b = totalBlurPx(f);
    if (b < bestBlur) {
      bestBlur = b;
      best = f;
    }
  }
  return best;
}
