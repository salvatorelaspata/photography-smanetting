import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import {
  APERTURES_FULL,
  ISO_FULL,
  SHUTTER_FULL_SECONDS,
  formatAperture,
  formatShutter,
} from '../../core/params/stops';
import { ExposureScene } from '../../engines/schematic/ExposureScene';

const TARGET_EV = 12;

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure(
      { apertureFstop: p.apertureFstop, shutterSeconds: p.shutterSeconds, iso: p.iso },
      TARGET_EV,
    ),
  };
}

/** C5 — Triangolo dell'esposizione: tempo, diaframma e ISO insieme. */
export const exposureTriangleDemo: DemoModule = {
  id: 'triangle',
  titleKey: 'demo.triangle.title',
  group: 'core',
  defaultParams: { apertureFstop: 8, shutterSeconds: 1 / 60, iso: 100 },
  controls: [
    {
      id: 'shutterSeconds',
      kind: 'dial',
      labelKey: 'demo.triangle.ctrl.time',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
    {
      id: 'apertureFstop',
      kind: 'dial',
      labelKey: 'demo.triangle.ctrl.fstop',
      sequence: APERTURES_FULL,
      format: formatAperture,
    },
    {
      id: 'iso',
      kind: 'dial',
      labelKey: 'demo.triangle.ctrl.iso',
      sequence: ISO_FULL,
      format: (v) => `ISO ${v}`,
    },
  ],
  computeDerived,
  renderers: { schematic: ExposureScene },
  fallback: 'schematic',
  presets: {
    blurBg: {
      labelKey: 'demo.triangle.preset.blurBg',
      values: { apertureFstop: 2.8, shutterSeconds: 1 / 500, iso: 100 },
    },
    sharp: {
      labelKey: 'demo.triangle.preset.sharp',
      values: { apertureFstop: 16, shutterSeconds: 1 / 15, iso: 100 },
    },
    over: {
      labelKey: 'demo.triangle.preset.over',
      values: { apertureFstop: 4, shutterSeconds: 1 / 60, iso: 200 },
    },
  },
  lesson: {
    introKey: 'demo.triangle.lesson.intro',
    pointKeys: [
      'demo.triangle.lesson.p1',
      'demo.triangle.lesson.p2',
      'demo.triangle.lesson.p3',
    ],
  },
};
