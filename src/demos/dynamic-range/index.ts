import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { DynamicRangeScene } from '../../engines/schematic/DynamicRangeScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 12),
  };
}

/** B — Gamma dinamica e profondità di bit. */
export const dynamicRangeDemo: DemoModule = {
  id: 'dynamic',
  titleKey: 'demo.dynamic.title',
  group: 'advanced',
  defaultParams: { sceneDr: 14, bits: 14 },
  controls: [
    {
      id: 'sceneDr',
      kind: 'slider',
      labelKey: 'demo.dynamic.ctrl.scene',
      min: 4,
      max: 16,
      step: 1,
      format: (v) => `${Math.round(v)} stop`,
    },
    {
      id: 'bits',
      kind: 'dial',
      labelKey: 'demo.dynamic.ctrl.bits',
      sequence: [8, 10, 12, 14],
      format: (v) => `${Math.round(v)} bit`,
    },
  ],
  computeDerived,
  renderers: { schematic: DynamicRangeScene },
  fallback: 'schematic',
  presets: {
    low: { labelKey: 'demo.dynamic.preset.low', values: { sceneDr: 8, bits: 14 } },
    high: { labelKey: 'demo.dynamic.preset.high', values: { sceneDr: 16, bits: 14 } },
    eight: { labelKey: 'demo.dynamic.preset.eight', values: { sceneDr: 10, bits: 8 } },
  },
  lesson: {
    introKey: 'demo.dynamic.lesson.intro',
    pointKeys: ['demo.dynamic.lesson.p1', 'demo.dynamic.lesson.p2', 'demo.dynamic.lesson.p3'],
  },
};
