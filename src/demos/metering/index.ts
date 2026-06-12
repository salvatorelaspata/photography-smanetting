import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { MeteringScene } from '../../engines/schematic/MeteringScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 5.6, shutterSeconds: 1 / 125, iso: 100 }, 13),
  };
}

/** B — Modalità di misurazione esposimetrica. */
export const meteringDemo: DemoModule = {
  id: 'metering',
  titleKey: 'demo.metering.title',
  group: 'advanced',
  defaultParams: { meteringMode: 2 },
  controls: [
    {
      id: 'meteringMode',
      kind: 'dial',
      labelKey: 'demo.metering.ctrl.mode',
      sequence: [0, 1, 2],
      format: (v) => ['Spot', 'Center', 'Matrix'][Math.round(v)] ?? '',
    },
  ],
  computeDerived,
  renderers: { schematic: MeteringScene },
  fallback: 'schematic',
  presets: {
    spot: { labelKey: 'demo.metering.preset.spot', values: { meteringMode: 0 } },
    center: { labelKey: 'demo.metering.preset.center', values: { meteringMode: 1 } },
    matrix: { labelKey: 'demo.metering.preset.matrix', values: { meteringMode: 2 } },
  },
  lesson: {
    introKey: 'demo.metering.lesson.intro',
    pointKeys: ['demo.metering.lesson.p1', 'demo.metering.lesson.p2', 'demo.metering.lesson.p3'],
  },
};
