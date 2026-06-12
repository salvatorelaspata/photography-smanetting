import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeFov } from '../../core/photography/fov';
import { SENSORS } from '../../core/photography/sensor';
import { FOCAL_LENGTHS } from '../../core/params/stops';
import { CropFactorScene } from '../../engines/schematic/CropFactorScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  const sensor = SENSORS[Math.round(p.sensorIndex)] ?? SENSORS[0];
  return {
    exposure: computeExposure({ apertureFstop: 5.6, shutterSeconds: 1 / 250, iso: 100 }, 14),
    fov: computeFov(p.focalLengthMm, sensor),
  };
}

/** A3 — Dimensione del sensore e crop factor. */
export const cropFactorDemo: DemoModule = {
  id: 'crop',
  titleKey: 'demo.crop.title',
  group: 'advanced',
  defaultParams: { sensorIndex: 0, focalLengthMm: 50 },
  controls: [
    {
      id: 'sensorIndex',
      kind: 'dial',
      labelKey: 'demo.crop.ctrl.sensor',
      sequence: [0, 1, 2, 3],
      format: (v) => SENSORS[Math.round(v)]?.name ?? '',
    },
    {
      id: 'focalLengthMm',
      kind: 'dial',
      labelKey: 'demo.crop.ctrl.focal',
      sequence: FOCAL_LENGTHS,
      format: (v) => `${v}mm`,
    },
  ],
  computeDerived,
  renderers: { schematic: CropFactorScene },
  fallback: 'schematic',
  presets: {
    ff: { labelKey: 'demo.crop.preset.ff', values: { sensorIndex: 0 } },
    apsc: { labelKey: 'demo.crop.preset.apsc', values: { sensorIndex: 1 } },
    m43: { labelKey: 'demo.crop.preset.m43', values: { sensorIndex: 2 } },
  },
  lesson: {
    introKey: 'demo.crop.lesson.intro',
    pointKeys: ['demo.crop.lesson.p1', 'demo.crop.lesson.p2', 'demo.crop.lesson.p3'],
  },
};
