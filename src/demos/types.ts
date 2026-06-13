/**
 * Contratto di una demo interattiva: parametri, controlli, fisica, scena schematica.
 * Riferimento: docs/REQUISITI.md §3.3 e §6.3.
 */
import type { DerivedPhysics, ParamValues, RendererComponent } from '../engines/types';

export type { ParamValues };

/**
 * Descrizione dichiarativa di un controllo.
 * - `dial`/`slider`: valori ordinati (stop di tempo, diaframma, ISO, focale…).
 * - `segment`: scelta categoriale a pulsanti (sensore, filtro, modalità, formato…).
 */
export interface ControlSpec {
  /** Chiave del parametro in `params`. */
  id: string;
  kind: 'slider' | 'dial' | 'segment';
  labelKey: string;
  /** Se presente, il controllo si muove su questi valori discreti (stop). */
  sequence?: readonly number[];
  /** Range continuo (alternativo a `sequence`). */
  min?: number;
  max?: number;
  step?: number;
  unitKey?: string;
  /** Formattazione del valore mostrato (es. 1/250). */
  format?: (v: number) => string;
}

export interface DemoPreset {
  labelKey: string;
  /** Valori da applicare sopra i parametri correnti. */
  values: ParamValues;
}

export interface DemoModule {
  id: string;
  titleKey: string;
  group: 'core' | 'advanced';
  /** La scena ha un'animazione continua → mostra il controllo play/pausa (WCAG 2.2.2). */
  animated?: boolean;
  defaultParams: ParamValues;
  controls: ControlSpec[];
  computeDerived: (p: ParamValues) => DerivedPhysics;
  /** Scena schematica (SVG) della demo. */
  scene: RendererComponent;
  presets?: Record<string, DemoPreset>;
  lesson: { introKey: string; pointKeys: string[] };
}
