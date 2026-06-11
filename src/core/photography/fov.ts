/**
 * Angolo di campo e fattore di crop in funzione di focale e sensore.
 * Riferimento: docs/REQUISITI.md §8.
 */
import { cropFactor, diagonalMm, type SensorSpec } from './sensor';

export interface FovDerived {
  horizontalDeg: number;
  verticalDeg: number;
  diagonalDeg: number;
  cropFactor: number;
}

/** Angolo di campo in gradi: 2·atan(d / 2f). */
export function angleOfViewDeg(sensorDimMm: number, focalLengthMm: number): number {
  return (2 * Math.atan(sensorDimMm / (2 * focalLengthMm)) * 180) / Math.PI;
}

export function computeFov(focalLengthMm: number, sensor: SensorSpec): FovDerived {
  return {
    horizontalDeg: angleOfViewDeg(sensor.widthMm, focalLengthMm),
    verticalDeg: angleOfViewDeg(sensor.heightMm, focalLengthMm),
    diagonalDeg: angleOfViewDeg(diagonalMm(sensor), focalLengthMm),
    cropFactor: cropFactor(sensor),
  };
}
