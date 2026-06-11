/**
 * Modello fotografico dell'esposizione — funzioni pure, nessuna dipendenza da React.
 * Semplificazioni didattiche ma fisicamente coerenti (APEX/EV, raddoppio della luce per stop).
 * Riferimento: docs/REQUISITI.md §8.
 */

export interface ExposureSettings {
  /** Apertura come f-number (es. 2.8). */
  apertureFstop: number;
  /** Tempo di otturazione in secondi (es. 1/250 = 0.004). */
  shutterSeconds: number;
  /** Sensibilità ISO (es. 400). */
  iso: number;
}

export interface ExposureDerived {
  /** EV a ISO 100 dei settaggi correnti. */
  evAt100: number;
  /** Deviazione in stop dall'esposizione corretta (>0 sovraesposto, <0 sottoesposto). */
  stopsFromTarget: number;
  /** Luminosità 0..1 in luce lineare (grigio medio a deviazione 0), clampata. */
  displayBrightness: number;
}

/** Riflettanza del grigio medio (18%) in luce lineare. */
export const MIDDLE_GREY = 0.18;
export const REFERENCE_ISO = 100;

/**
 * EV a ISO 100 (APEX): EV = log2(N² / t).
 * Più alto = scena più luminosa per un'esposizione corretta (la regola del sunny-16 ≈ EV 15).
 */
export function ev100(settings: Pick<ExposureSettings, 'apertureFstop' | 'shutterSeconds'>): number {
  const { apertureFstop: N, shutterSeconds: t } = settings;
  return Math.log2((N * N) / t);
}

/** Apertura → stop relativi a f/1.0. Una apertura più chiusa = più stop: 2·log2(N). */
export function apertureToStops(fstop: number): number {
  return 2 * Math.log2(fstop);
}

/** ISO → stop relativi a ISO 100. */
export function isoToStops(iso: number): number {
  return Math.log2(iso / REFERENCE_ISO);
}

/** Tempo → stop relativi a 1 s. */
export function shutterToStops(seconds: number): number {
  return Math.log2(seconds);
}

/**
 * Luce raccolta dal sensore, in stop, relativa al riferimento (f/1.0, 1 s, ISO 100).
 * Cresce con tempo più lungo, ISO più alto e apertura più ampia (N minore):
 *   stops = log2(t) + log2(ISO/100) − 2·log2(N)
 */
export function exposureStops(settings: ExposureSettings): number {
  return (
    shutterToStops(settings.shutterSeconds) +
    isoToStops(settings.iso) -
    apertureToStops(settings.apertureFstop)
  );
}

/**
 * Deviazione in stop rispetto all'esposizione corretta per una scena di data luminosità.
 * `targetEv100` rappresenta la luce disponibile nella scena (EV a ISO 100).
 * A ISO 100 l'esposizione è corretta quando ev100(settings) === targetEv100;
 * ogni stop di ISO sopra 100 schiarisce di 1 stop.
 */
export function stopsFromTarget(settings: ExposureSettings, targetEv100: number): number {
  return targetEv100 - ev100(settings) + isoToStops(settings.iso);
}

/** Luminanza relativa lineare per una deviazione in stop dal corretto: 0.18 · 2^dev. */
export function relativeLuminance(stopsFromCorrect: number): number {
  return MIDDLE_GREY * Math.pow(2, stopsFromCorrect);
}

/** Luminosità 0..1 (luce lineare, grigio medio a dev 0), clampata. Il renderer applica il gamma. */
export function displayBrightness(stopsFromCorrect: number): number {
  return clamp01(relativeLuminance(stopsFromCorrect));
}

/** Calcola la tripla `ExposureDerived` per i renderer. */
export function computeExposure(settings: ExposureSettings, targetEv100: number): ExposureDerived {
  const dev = stopsFromTarget(settings, targetEv100);
  return {
    evAt100: ev100(settings),
    stopsFromTarget: dev,
    displayBrightness: displayBrightness(dev),
  };
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}
