import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { FiltersScene } from '../../engines/schematic/FiltersScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 12),
  };
}

/** B — Filtri: densità neutra (ND) e polarizzatore (CPL). */
export const filtersDemo: DemoModule = {
  id: 'filters',
  titleKey: 'demo.filters.title',
  group: 'advanced',
  defaultParams: { filter: 1, strength: 0.6 },
  controls: [
    {
      id: 'filter',
      kind: 'segment',
      labelKey: 'demo.filters.ctrl.type',
      sequence: [0, 1, 2],
      format: (v) => ['Nessuno', 'ND', 'CPL'][Math.round(v)] ?? '',
    },
    {
      id: 'strength',
      kind: 'slider',
      labelKey: 'demo.filters.ctrl.strength',
      min: 0,
      max: 1,
      step: 0.05,
      format: (v) => `${Math.round(v * 100)}%`,
    },
  ],
  computeDerived,
  scene: FiltersScene,
  presets: {
    none: { labelKey: 'demo.filters.preset.none', values: { filter: 0, strength: 0 } },
    nd: { labelKey: 'demo.filters.preset.nd', values: { filter: 1, strength: 0.8 } },
    cpl: { labelKey: 'demo.filters.preset.cpl', values: { filter: 2, strength: 0.9 } },
  },
  lesson: {
    introKey: 'demo.filters.lesson.intro',
    pointKeys: ['demo.filters.lesson.p1', 'demo.filters.lesson.p2', 'demo.filters.lesson.p3'],
  },
};
