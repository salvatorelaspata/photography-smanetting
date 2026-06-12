/**
 * Modalità di scatto P/A/S/M — funzioni pure.
 * La camera calcola il parametro che non controlli per centrare l'esposizione della scena.
 * Riferimento: docs/REQUISITI.md §8.
 */
import { APERTURES_FULL, SHUTTER_FULL_SECONDS, snapToSequence } from '../params/stops';

export type CameraMode = 'P' | 'A' | 'S' | 'M';

/** Ordine delle modalità sulla ghiera. */
export const MODES: readonly CameraMode[] = ['P', 'A', 'S', 'M'];

/** Livello di luce della scena didattica (EV a ISO 100). */
export const TEACHING_EV = 12;

/** Tempo di riferimento della linea programma (modalità P). */
const PROGRAM_SHUTTER = 1 / 125;

export interface ModeInput {
  mode: CameraMode;
  /** Apertura impostata dall'utente (f-number). */
  apertureFstop: number;
  /** Tempo impostato dall'utente (secondi). */
  shutterSeconds: number;
  /** Luce della scena (EV a ISO 100). */
  targetEv100: number;
}

export interface ModeResult {
  /** Apertura effettiva usata per lo scatto. */
  apertureFstop: number;
  /** Tempo effettivo usato per lo scatto. */
  shutterSeconds: number;
  /** L'apertura è scelta dalla camera (true) o dall'utente (false). */
  apertureAuto: boolean;
  /** Il tempo è scelto dalla camera (true) o dall'utente (false). */
  shutterAuto: boolean;
}

/**
 * Risolve i valori effettivi per la modalità selezionata.
 * - P: la camera sceglie entrambi su una linea programma equilibrata.
 * - A (priorità diaframmi): tu scegli l'apertura, la camera il tempo.
 * - S (priorità tempi): tu scegli il tempo, la camera l'apertura.
 * - M: scegli entrambi (l'esposizione può deviare dal corretto).
 */
export function resolveMode(input: ModeInput): ModeResult {
  const { mode, apertureFstop, shutterSeconds, targetEv100 } = input;
  const ev2 = Math.pow(2, targetEv100); // N²/t corretto
  const shutterFor = (n: number) => (n * n) / ev2; // tempo corretto per data apertura
  const apertureFor = (t: number) => Math.sqrt(t * ev2); // apertura corretta per dato tempo

  switch (mode) {
    case 'A': {
      const t = snapToSequence(shutterFor(apertureFstop), SHUTTER_FULL_SECONDS);
      return { apertureFstop, shutterSeconds: t, apertureAuto: false, shutterAuto: true };
    }
    case 'S': {
      const n = snapToSequence(apertureFor(shutterSeconds), APERTURES_FULL);
      return { apertureFstop: n, shutterSeconds, apertureAuto: true, shutterAuto: false };
    }
    case 'P': {
      const n = snapToSequence(apertureFor(PROGRAM_SHUTTER), APERTURES_FULL);
      const t = snapToSequence(shutterFor(n), SHUTTER_FULL_SECONDS);
      return { apertureFstop: n, shutterSeconds: t, apertureAuto: true, shutterAuto: true };
    }
    case 'M':
    default:
      return { apertureFstop, shutterSeconds, apertureAuto: false, shutterAuto: false };
  }
}
