import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { RawScene } from '../../engines/schematic/RawScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 12),
  };
}

/** B — RAW vs JPEG: latitudine di recupero in post. */
export const rawDemo: DemoModule = {
  id: 'raw',
  titleKey: 'demo.raw.title',
  group: 'advanced',
  defaultParams: { format: 1, push: 0.5 },
  controls: [
    {
      id: 'format',
      kind: 'dial',
      labelKey: 'demo.raw.ctrl.format',
      sequence: [0, 1],
      format: (v) => (Math.round(v) === 1 ? 'RAW' : 'JPEG'),
    },
    {
      id: 'push',
      kind: 'slider',
      labelKey: 'demo.raw.ctrl.push',
      min: 0,
      max: 1,
      step: 0.05,
      format: (v) => `+${(v * 4).toFixed(1)} stop`,
    },
  ],
  computeDerived,
  renderers: { schematic: RawScene },
  fallback: 'schematic',
  presets: {
    raw: { labelKey: 'demo.raw.preset.raw', values: { format: 1, push: 0.7 } },
    jpeg: { labelKey: 'demo.raw.preset.jpeg', values: { format: 0, push: 0.7 } },
    light: { labelKey: 'demo.raw.preset.light', values: { format: 0, push: 0.1 } },
  },
  lesson: {
    introKey: 'demo.raw.lesson.intro',
    pointKeys: ['demo.raw.lesson.p1', 'demo.raw.lesson.p2', 'demo.raw.lesson.p3'],
  },
};
