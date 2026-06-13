import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeFov } from '../../core/photography/fov';
import { FULL_FRAME } from '../../core/photography/sensor';
import { FOCAL_LENGTHS } from '../../core/params/stops';
import { FocalScene } from '../../engines/schematic/FocalScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 5.6, shutterSeconds: 1 / 250, iso: 100 }, 14),
    fov: computeFov(p.focalLengthMm, FULL_FRAME),
  };
}

/** C4 — Distanza focale, angolo di campo e compressione prospettica (dolly-zoom). */
export const focalDemo: DemoModule = {
  id: 'focal',
  titleKey: 'demo.focal.title',
  group: 'core',
  defaultParams: { focalLengthMm: 50 },
  controls: [
    {
      id: 'focalLengthMm',
      kind: 'dial',
      labelKey: 'demo.focal.ctrl.focal',
      sequence: FOCAL_LENGTHS,
      format: (v) => `${v}mm`,
    },
  ],
  computeDerived,
  scene: FocalScene,
  presets: {
    wide: { labelKey: 'demo.focal.preset.wide', values: { focalLengthMm: 24 } },
    normal: { labelKey: 'demo.focal.preset.normal', values: { focalLengthMm: 50 } },
    tele: { labelKey: 'demo.focal.preset.tele', values: { focalLengthMm: 200 } },
  },
  lesson: {
    introKey: 'demo.focal.lesson.intro',
    pointKeys: ['demo.focal.lesson.p1', 'demo.focal.lesson.p2', 'demo.focal.lesson.p3'],
  },
};
