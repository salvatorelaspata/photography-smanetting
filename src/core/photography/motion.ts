/**
 * Mosso da movimento — modello proporzionale provvisorio (rifinito in M4).
 * Riferimento: docs/REQUISITI.md §8.
 */

export interface MotionInput {
  /** Velocità del soggetto in unità di scena al secondo. */
  subjectSpeed: number;
  shutterSeconds: number;
  focalLengthMm?: number;
}

export interface MotionDerived {
  /** Lunghezza della scia in pixel (modello proporzionale). */
  blurPx: number;
  /** Scia normalizzata 0..1 per i renderer. */
  blurNormalized: number;
}

export function computeMotion({
  subjectSpeed,
  shutterSeconds,
  focalLengthMm = 50,
}: MotionInput): MotionDerived {
  const blurPx = subjectSpeed * shutterSeconds * (focalLengthMm / 50);
  return { blurPx, blurNormalized: Math.min(1, blurPx / 100) };
}
