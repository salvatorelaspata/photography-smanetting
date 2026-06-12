import type { DemoModule } from './types';
import { shutterDemo } from './shutter';
import { apertureDemo } from './aperture';
import { isoDemo } from './iso';
import { focalDemo } from './focal';
import { exposureTriangleDemo } from './exposure-triangle';
import { histogramDemo } from './histogram';
import { whiteBalanceDemo } from './white-balance';
import { panningDemo } from './panning';
import { cropFactorDemo } from './crop-factor';

/** Elenco delle demo nell'ordine del percorso didattico. */
export const DEMOS: DemoModule[] = [
  shutterDemo,
  apertureDemo,
  isoDemo,
  focalDemo,
  exposureTriangleDemo,
  histogramDemo,
  whiteBalanceDemo,
  panningDemo,
  cropFactorDemo,
];

export function getDemo(id: string): DemoModule {
  return DEMOS.find((d) => d.id === id) ?? DEMOS[0];
}
