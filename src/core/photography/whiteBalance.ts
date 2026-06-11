/**
 * Bilanciamento del bianco — modello provvisorio (rifinito in M7).
 * Temperatura colore → guadagni RGB approssimati attorno al neutro (6500 K).
 * Riferimento: docs/REQUISITI.md §8.
 */

export interface WhiteBalanceDerived {
  kelvin: number;
  rgbGain: [number, number, number];
}

export function computeWhiteBalance(kelvin: number): WhiteBalanceDerived {
  const t = (kelvin - 6500) / 6500;
  const r = 1 - 0.4 * t;
  const b = 1 + 0.4 * t;
  return { kelvin, rgbGain: [r, 1, b] };
}
