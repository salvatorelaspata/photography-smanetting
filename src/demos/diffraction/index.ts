import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { APERTURES_FULL, formatAperture } from '../../core/params/stops';
import { DiffractionScene } from '../../engines/schematic/DiffractionScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: p.apertureFstop, shutterSeconds: 1 / 125, iso: 100 }, 13),
  };
}

/** B — Diffrazione e sweet spot dell'obiettivo. */
export const diffractionDemo: DemoModule = {
  id: 'diffraction',
  titleKey: 'demo.diffraction.title',
  group: 'advanced',
  defaultParams: { apertureFstop: 5.6 },
  controls: [
    {
      id: 'apertureFstop',
      kind: 'dial',
      labelKey: 'demo.diffraction.ctrl.fstop',
      sequence: APERTURES_FULL,
      format: formatAperture,
    },
  ],
  computeDerived,
  renderers: { schematic: DiffractionScene },
  fallback: 'schematic',
  presets: {
    wide: { labelKey: 'demo.diffraction.preset.wide', values: { apertureFstop: 2.8 } },
    sweet: { labelKey: 'demo.diffraction.preset.sweet', values: { apertureFstop: 8 } },
    closed: { labelKey: 'demo.diffraction.preset.closed', values: { apertureFstop: 22 } },
  },
  lesson: {
    introKey: 'demo.diffraction.lesson.intro',
    pointKeys: ['demo.diffraction.lesson.p1', 'demo.diffraction.lesson.p2', 'demo.diffraction.lesson.p3'],
  },
};
