import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeMotion } from '../../core/photography/motion';
import { SHUTTER_FULL_SECONDS, formatShutter } from '../../core/params/stops';
import { ShutterScene } from '../../engines/schematic/ShutterScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure(
      { apertureFstop: 8, shutterSeconds: p.shutterSeconds, iso: 100 },
      13,
    ),
    motion: computeMotion({
      subjectSpeed: p.subjectSpeed,
      shutterSeconds: p.shutterSeconds,
      focalLengthMm: 50,
    }),
  };
}

/** C1 — Tempo di otturazione. Engine nativo: schematico (M2). */
export const shutterDemo: DemoModule = {
  id: 'shutter',
  titleKey: 'demo.shutter.title',
  group: 'core',
  animated: true,
  defaultParams: { shutterSeconds: 1 / 125, subjectSpeed: 1400 },
  controls: [
    {
      id: 'shutterSeconds',
      kind: 'dial',
      labelKey: 'demo.shutter.ctrl.time',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
    {
      id: 'subjectSpeed',
      kind: 'slider',
      labelKey: 'demo.shutter.ctrl.speed',
      min: 200,
      max: 4000,
      step: 100,
      unitKey: 'unit.pxs',
    },
  ],
  computeDerived,
  renderers: { schematic: ShutterScene },
  fallback: 'schematic',
  presets: {
    freeze: {
      labelKey: 'demo.shutter.preset.freeze',
      values: { shutterSeconds: 1 / 1000, subjectSpeed: 2600 },
    },
    blur: {
      labelKey: 'demo.shutter.preset.blur',
      values: { shutterSeconds: 1 / 8, subjectSpeed: 1400 },
    },
    panning: {
      labelKey: 'demo.shutter.preset.panning',
      values: { shutterSeconds: 1 / 30, subjectSpeed: 3200 },
    },
  },
  lesson: {
    introKey: 'demo.shutter.lesson.intro',
    pointKeys: [
      'demo.shutter.lesson.p1',
      'demo.shutter.lesson.p2',
      'demo.shutter.lesson.p3',
    ],
  },
};
