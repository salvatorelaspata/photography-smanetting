import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { BracketingScene } from '../../engines/schematic/BracketingScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 12),
  };
}

/** B — Bracketing / HDR. */
export const bracketingDemo: DemoModule = {
  id: 'bracketing',
  titleKey: 'demo.bracketing.title',
  group: 'advanced',
  defaultParams: { evStep: 1 },
  controls: [
    {
      id: 'evStep',
      kind: 'slider',
      labelKey: 'demo.bracketing.ctrl.step',
      min: 0,
      max: 3,
      step: 0.5,
      format: (v) => `±${v.toFixed(1)} EV`,
    },
  ],
  computeDerived,
  renderers: { schematic: BracketingScene },
  fallback: 'schematic',
  presets: {
    single: { labelKey: 'demo.bracketing.preset.single', values: { evStep: 0 } },
    moderate: { labelKey: 'demo.bracketing.preset.moderate', values: { evStep: 1.5 } },
    wide: { labelKey: 'demo.bracketing.preset.wide', values: { evStep: 3 } },
  },
  lesson: {
    introKey: 'demo.bracketing.lesson.intro',
    pointKeys: ['demo.bracketing.lesson.p1', 'demo.bracketing.lesson.p2', 'demo.bracketing.lesson.p3'],
  },
};
