import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeNoise } from '../../core/photography/noise';
import { ISO_FULL } from '../../core/params/stops';
import { IsoScene } from '../../engines/schematic/IsoScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 4, shutterSeconds: 1 / 60, iso: p.iso }, 11),
    noise: computeNoise(p.iso),
  };
}

/** C3 — ISO / rumore digitale. Engine nativo: schematico. */
export const isoDemo: DemoModule = {
  id: 'iso',
  titleKey: 'demo.iso.title',
  group: 'core',
  defaultParams: { iso: 400 },
  controls: [
    {
      id: 'iso',
      kind: 'dial',
      labelKey: 'demo.iso.ctrl.iso',
      sequence: ISO_FULL,
      format: (v) => `ISO ${v}`,
    },
  ],
  computeDerived,
  renderers: { schematic: IsoScene },
  fallback: 'schematic',
  presets: {
    daylight: { labelKey: 'demo.iso.preset.daylight', values: { iso: 100 } },
    indoor: { labelKey: 'demo.iso.preset.indoor', values: { iso: 1600 } },
    night: { labelKey: 'demo.iso.preset.night', values: { iso: 12800 } },
  },
  lesson: {
    introKey: 'demo.iso.lesson.intro',
    pointKeys: ['demo.iso.lesson.p1', 'demo.iso.lesson.p2', 'demo.iso.lesson.p3'],
  },
};
