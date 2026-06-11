/**
 * Profondità di campo (DoF): iperfocale, limite vicino/lontano.
 * Formule standard, unità coerenti (mm internamente, output in metri).
 * Riferimento: docs/REQUISITI.md §8.
 */
import { circleOfConfusionMm, type SensorSpec } from './sensor';

export interface DofInput {
  focalLengthMm: number;
  apertureFstop: number;
  /** Distanza di messa a fuoco, in metri. */
  focusDistanceM: number;
  sensor: SensorSpec;
}

export interface DofDerived {
  nearM: number;
  farM: number;
  totalM: number;
  hyperfocalM: number;
  cocMm: number;
  /** True quando il limite lontano arriva all'infinito. */
  infinity: boolean;
}

/** Distanza iperfocale in metri: H = f²/(N·c) + f. */
export function hyperfocalM(focalLengthMm: number, fstop: number, cocMm: number): number {
  return (focalLengthMm * focalLengthMm) / (fstop * cocMm) / 1000 + focalLengthMm / 1000;
}

export function computeDof(input: DofInput): DofDerived {
  const { focalLengthMm: f, apertureFstop: N, focusDistanceM: s, sensor } = input;
  const coc = circleOfConfusionMm(sensor);
  const H = hyperfocalM(f, N, coc);
  const fM = f / 1000;

  const near = (H * s) / (H + (s - fM));
  const farDenom = H - (s - fM);
  const infinity = farDenom <= 0;
  const far = infinity ? Infinity : (H * s) / farDenom;

  return {
    nearM: near,
    farM: far,
    totalM: infinity ? Infinity : far - near,
    hyperfocalM: H,
    cocMm: coc,
    infinity,
  };
}
