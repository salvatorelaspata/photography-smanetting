import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeDof } from '../../core/photography/dof';
import { FULL_FRAME } from '../../core/photography/sensor';
import { APERTURES_FULL, formatAperture } from '../../core/params/stops';
import { ApertureScene } from '../../engines/schematic/ApertureScene';
import { ApertureThree } from '../../engines/three';
import { ApertureLayered } from '../../engines/layered/ApertureLayered';

const FOCAL = 50;

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure(
      { apertureFstop: p.apertureFstop, shutterSeconds: 1 / 125, iso: 100 },
      13,
    ),
    dof: computeDof({
      focalLengthMm: FOCAL,
      apertureFstop: p.apertureFstop,
      focusDistanceM: p.focusDistanceM,
      sensor: FULL_FRAME,
    }),
  };
}

/** C2 — Apertura del diaframma / profondità di campo. Engine nativo: schematico. */
export const apertureDemo: DemoModule = {
  id: 'aperture',
  titleKey: 'demo.aperture.title',
  group: 'core',
  defaultParams: { apertureFstop: 2.8, focusDistanceM: 3 },
  controls: [
    {
      id: 'apertureFstop',
      kind: 'dial',
      labelKey: 'demo.aperture.ctrl.fstop',
      sequence: APERTURES_FULL,
      format: formatAperture,
    },
    {
      id: 'focusDistanceM',
      kind: 'slider',
      labelKey: 'demo.aperture.ctrl.focus',
      min: 0.5,
      max: 8,
      step: 0.1,
      format: (v) => `${v.toFixed(1)} m`,
    },
  ],
  computeDerived,
  renderers: { schematic: ApertureScene, three: ApertureThree, layered: ApertureLayered },
  fallback: 'schematic',
  presets: {
    portrait: { labelKey: 'demo.aperture.preset.portrait', values: { apertureFstop: 1.4, focusDistanceM: 2 } },
    group: { labelKey: 'demo.aperture.preset.group', values: { apertureFstop: 5.6, focusDistanceM: 3 } },
    landscape: { labelKey: 'demo.aperture.preset.landscape', values: { apertureFstop: 16, focusDistanceM: 6 } },
  },
  lesson: {
    introKey: 'demo.aperture.lesson.intro',
    pointKeys: [
      'demo.aperture.lesson.p1',
      'demo.aperture.lesson.p2',
      'demo.aperture.lesson.p3',
    ],
  },
};
