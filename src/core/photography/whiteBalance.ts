/**
 * Bilanciamento del bianco / temperatura colore.
 * Colore approssimato del corpo nero (algoritmo di Tanner Helland).
 * Riferimento: docs/REQUISITI.md §8.
 */

export interface WhiteBalanceDerived {
  kelvin: number;
  /** Colore della luce a quella temperatura, sRGB 0..255. */
  rgb: [number, number, number];
}

function clamp255(x: number): number {
  return Math.min(255, Math.max(0, x));
}

/** Temperatura colore (K) → colore approssimato della luce (sRGB 0..255). */
export function kelvinToRgb(kelvin: number): [number, number, number] {
  const t = Math.min(40000, Math.max(1000, kelvin)) / 100;

  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;

  return [Math.round(clamp255(r)), Math.round(clamp255(g)), Math.round(clamp255(b))];
}

export function computeWhiteBalance(kelvin: number): WhiteBalanceDerived {
  return { kelvin, rgb: kelvinToRgb(kelvin) };
}
