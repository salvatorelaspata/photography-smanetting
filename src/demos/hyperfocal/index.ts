import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeDof } from '../../core/photography/dof';
import { FULL_FRAME } from '../../core/photography/sensor';
import { APERTURES_FULL, formatAperture } from '../../core/params/stops';
import { HyperfocalScene } from '../../engines/schematic/HyperfocalScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: p.apertureFstop, shutterSeconds: 1 / 250, iso: 100 }, 14),
    dof: computeDof({
      focalLengthMm: 35,
      apertureFstop: p.apertureFstop,
      focusDistanceM: p.focusDistanceM,
      sensor: FULL_FRAME,
    }),
  };
}

/** B — Distanza iperfocale / zone focusing. */
export const hyperfocalDemo: DemoModule = {
  id: 'hyperfocal',
  titleKey: 'demo.hyperfocal.title',
  group: 'advanced',
  defaultParams: { apertureFstop: 8, focusDistanceM: 5 },
  controls: [
    {
      id: 'apertureFstop',
      kind: 'dial',
      labelKey: 'demo.hyperfocal.ctrl.fstop',
      sequence: APERTURES_FULL,
      format: formatAperture,
    },
    {
      id: 'focusDistanceM',
      kind: 'slider',
      labelKey: 'demo.hyperfocal.ctrl.focus',
      min: 0.5,
      max: 20,
      step: 0.5,
      format: (v) => `${v} m`,
    },
  ],
  computeDerived,
  renderers: { schematic: HyperfocalScene },
  fallback: 'schematic',
  presets: {
    near: { labelKey: 'demo.hyperfocal.preset.near', values: { focusDistanceM: 2 } },
    hyperfocal: { labelKey: 'demo.hyperfocal.preset.hyperfocal', values: { apertureFstop: 8, focusDistanceM: 5.5 } },
    far: { labelKey: 'demo.hyperfocal.preset.far', values: { focusDistanceM: 20 } },
  },
  lesson: {
    introKey: 'demo.hyperfocal.lesson.intro',
    pointKeys: ['demo.hyperfocal.lesson.p1', 'demo.hyperfocal.lesson.p2', 'demo.hyperfocal.lesson.p3'],
  },
};
