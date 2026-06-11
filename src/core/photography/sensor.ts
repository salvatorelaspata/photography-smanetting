/** Specifiche dei sensori e grandezze derivate (crop factor, circolo di confusione). */

export interface SensorSpec {
  name: string;
  widthMm: number;
  heightMm: number;
}

export const FULL_FRAME: SensorSpec = { name: 'Full frame', widthMm: 36, heightMm: 24 };
export const APS_C: SensorSpec = { name: 'APS-C', widthMm: 23.6, heightMm: 15.7 };
export const MICRO_43: SensorSpec = { name: 'Micro 4/3', widthMm: 17.3, heightMm: 13 };
export const ONE_INCH: SensorSpec = { name: '1"', widthMm: 13.2, heightMm: 8.8 };

export const SENSORS: SensorSpec[] = [FULL_FRAME, APS_C, MICRO_43, ONE_INCH];

/** Diagonale del sensore in mm. */
export function diagonalMm(sensor: SensorSpec): number {
  return Math.hypot(sensor.widthMm, sensor.heightMm);
}

/** Fattore di crop rispetto al full frame. */
export function cropFactor(sensor: SensorSpec): number {
  return diagonalMm(FULL_FRAME) / diagonalMm(sensor);
}

/** Circolo di confusione limite ≈ diagonale / 1500. */
export function circleOfConfusionMm(sensor: SensorSpec): number {
  return diagonalMm(sensor) / 1500;
}
