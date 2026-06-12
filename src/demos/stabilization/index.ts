import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { SHUTTER_FULL_SECONDS, FOCAL_LENGTHS, formatShutter } from '../../core/params/stops';
import { StabilizationScene } from '../../engines/schematic/StabilizationScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 5.6, shutterSeconds: p.shutterSeconds, iso: 100 }, 12),
  };
}

/** B — Stabilizzazione e regola del tempo di sicurezza. */
export const stabilizationDemo: DemoModule = {
  id: 'stabilization',
  titleKey: 'demo.stabilization.title',
  group: 'advanced',
  defaultParams: { focalLengthMm: 200, shutterSeconds: 1 / 60, isStops: 0 },
  controls: [
    {
      id: 'focalLengthMm',
      kind: 'dial',
      labelKey: 'demo.stabilization.ctrl.focal',
      sequence: FOCAL_LENGTHS,
      format: (v) => `${v}mm`,
    },
    {
      id: 'shutterSeconds',
      kind: 'dial',
      labelKey: 'demo.stabilization.ctrl.time',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
    {
      id: 'isStops',
      kind: 'slider',
      labelKey: 'demo.stabilization.ctrl.is',
      min: 0,
      max: 5,
      step: 1,
      format: (v) => `+${v} stop`,
    },
  ],
  computeDerived,
  renderers: { schematic: StabilizationScene },
  fallback: 'schematic',
  presets: {
    handheld: { labelKey: 'demo.stabilization.preset.handheld', values: { focalLengthMm: 200, shutterSeconds: 1 / 60, isStops: 0 } },
    stabilized: { labelKey: 'demo.stabilization.preset.stabilized', values: { focalLengthMm: 200, shutterSeconds: 1 / 60, isStops: 4 } },
    safe: { labelKey: 'demo.stabilization.preset.safe', values: { focalLengthMm: 200, shutterSeconds: 1 / 250, isStops: 0 } },
  },
  lesson: {
    introKey: 'demo.stabilization.lesson.intro',
    pointKeys: ['demo.stabilization.lesson.p1', 'demo.stabilization.lesson.p2', 'demo.stabilization.lesson.p3'],
  },
};
