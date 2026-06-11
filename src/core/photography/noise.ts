/**
 * Rumore ISO — modello provvisorio (rifinito in M4): σ e grana crescono con l'ISO, l'SNR cala.
 * Riferimento: docs/REQUISITI.md §8.
 */

export interface NoiseDerived {
  /** Deviazione standard del rumore (0..~). */
  sigma: number;
  /** Dimensione della "cella" di grana in pixel. */
  grainPx: number;
  /** Rapporto segnale/rumore approssimato in dB. */
  snrDb: number;
}

export function computeNoise(iso: number, baseIso = 100): NoiseDerived {
  const stops = Math.log2(iso / baseIso);
  return {
    sigma: 0.02 * Math.pow(2, stops),
    grainPx: 1 + 0.5 * Math.max(0, stops),
    snrDb: 40 - 6 * Math.max(0, stops),
  };
}
