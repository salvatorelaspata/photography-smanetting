import type { DemoModule } from './types';
import { shutterDemo } from './shutter';
import { apertureDemo } from './aperture';
import { isoDemo } from './iso';
import { focalDemo } from './focal';
import { exposureTriangleDemo } from './exposure-triangle';

/** Elenco delle demo nell'ordine del percorso didattico. */
export const DEMOS: DemoModule[] = [
  shutterDemo,
  apertureDemo,
  isoDemo,
  focalDemo,
  exposureTriangleDemo,
];

export function getDemo(id: string): DemoModule {
  return DEMOS.find((d) => d.id === id) ?? DEMOS[0];
}
