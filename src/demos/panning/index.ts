import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeMotion } from '../../core/photography/motion';
import { SHUTTER_FULL_SECONDS, formatShutter } from '../../core/params/stops';
import { PanningScene } from '../../engines/schematic/PanningScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: p.shutterSeconds, iso: 100 }, 13),
    motion: computeMotion({
      subjectSpeed: p.subjectSpeed,
      shutterSeconds: p.shutterSeconds,
      focalLengthMm: 50,
    }),
  };
}

/** A4 — Panning: soggetto nitido, sfondo strisciato. */
export const panningDemo: DemoModule = {
  id: 'panning',
  titleKey: 'demo.panning.title',
  group: 'advanced',
  defaultParams: { shutterSeconds: 1 / 30, subjectSpeed: 1800 },
  controls: [
    {
      id: 'shutterSeconds',
      kind: 'dial',
      labelKey: 'demo.panning.ctrl.time',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
    {
      id: 'subjectSpeed',
      kind: 'slider',
      labelKey: 'demo.panning.ctrl.speed',
      min: 400,
      max: 4000,
      step: 100,
      unitKey: 'unit.pxs',
    },
  ],
  computeDerived,
  renderers: { schematic: PanningScene },
  fallback: 'schematic',
  presets: {
    subtle: { labelKey: 'demo.panning.preset.subtle', values: { shutterSeconds: 1 / 125, subjectSpeed: 1800 } },
    classic: { labelKey: 'demo.panning.preset.classic', values: { shutterSeconds: 1 / 30, subjectSpeed: 2400 } },
    extreme: { labelKey: 'demo.panning.preset.extreme', values: { shutterSeconds: 1 / 8, subjectSpeed: 3000 } },
  },
  lesson: {
    introKey: 'demo.panning.lesson.intro',
    pointKeys: ['demo.panning.lesson.p1', 'demo.panning.lesson.p2', 'demo.panning.lesson.p3'],
  },
};
