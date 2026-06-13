import type { DemoModule } from './types';
import { shutterDemo } from './shutter';
import { apertureDemo } from './aperture';
import { isoDemo } from './iso';
import { focalDemo } from './focal';
import { exposureTriangleDemo } from './exposure-triangle';
import { compositionDemo } from './composition';
import { histogramDemo } from './histogram';
import { whiteBalanceDemo } from './white-balance';
import { panningDemo } from './panning';
import { cropFactorDemo } from './crop-factor';
import { diffractionDemo } from './diffraction';
import { portraitDemo } from './portrait';
import { hyperfocalDemo } from './hyperfocal';
import { meteringDemo } from './metering';
import { stabilizationDemo } from './stabilization';
import { flashDemo } from './flash-sync';
import { bracketingDemo } from './bracketing';
import { filtersDemo } from './filters';
import { modesDemo } from './modes';
import { rawDemo } from './raw';
import { dynamicRangeDemo } from './dynamic-range';

/** Elenco delle demo nell'ordine del percorso didattico. */
export const DEMOS: DemoModule[] = [
  shutterDemo,
  apertureDemo,
  isoDemo,
  focalDemo,
  exposureTriangleDemo,
  compositionDemo,
  histogramDemo,
  whiteBalanceDemo,
  panningDemo,
  cropFactorDemo,
  diffractionDemo,
  portraitDemo,
  hyperfocalDemo,
  meteringDemo,
  stabilizationDemo,
  flashDemo,
  bracketingDemo,
  filtersDemo,
  modesDemo,
  rawDemo,
  dynamicRangeDemo,
];

export function getDemo(id: string): DemoModule {
  return DEMOS.find((d) => d.id === id) ?? DEMOS[0];
}

/** Concetto solo-teoria (senza demo interattiva): scheda + pagina con teoria e quiz. */
export interface RefConcept {
  id: string;
  titleKey: string;
}

/** Approfondimenti teorici senza simulazione (es. spazi colore). */
export const REFERENCES: RefConcept[] = [{ id: 'colorSpace', titleKey: 'demo.colorSpace.title' }];

export function getReference(id: string): RefConcept | undefined {
  return REFERENCES.find((r) => r.id === id);
}

export interface PathEntry {
  id: string;
  titleKey: string;
}

/** Ordine del percorso didattico per la navigazione prev/next: demo + approfondimenti. */
export const PATH: PathEntry[] = [
  ...DEMOS.map((d) => ({ id: d.id, titleKey: d.titleKey })),
  ...REFERENCES.map((r) => ({ id: r.id, titleKey: r.titleKey })),
];

/** Concetto precedente/successivo nel percorso, per la navigazione a fondo pagina. */
export function pathNeighbors(id: string): { prev: PathEntry | null; next: PathEntry | null } {
  const i = PATH.findIndex((p) => p.id === id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? PATH[i - 1] : null,
    next: i < PATH.length - 1 ? PATH[i + 1] : null,
  };
}
