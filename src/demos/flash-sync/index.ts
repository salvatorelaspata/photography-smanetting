import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { SHUTTER_FULL_SECONDS, formatShutter } from '../../core/params/stops';
import { FlashSyncScene } from '../../engines/schematic/FlashSyncScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 11),
  };
}

/** B — Flash e tempo di sincronizzazione. */
export const flashDemo: DemoModule = {
  id: 'flash',
  titleKey: 'demo.flash.title',
  group: 'advanced',
  defaultParams: { shutterSeconds: 1 / 60 },
  controls: [
    {
      id: 'shutterSeconds',
      kind: 'dial',
      labelKey: 'demo.flash.ctrl.time',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
  ],
  computeDerived,
  renderers: { schematic: FlashSyncScene },
  fallback: 'schematic',
  presets: {
    safe: { labelKey: 'demo.flash.preset.safe', values: { shutterSeconds: 1 / 60 } },
    sync: { labelKey: 'demo.flash.preset.sync', values: { shutterSeconds: 1 / 250 } },
    over: { labelKey: 'demo.flash.preset.over', values: { shutterSeconds: 1 / 1000 } },
  },
  lesson: {
    introKey: 'demo.flash.lesson.intro',
    pointKeys: ['demo.flash.lesson.p1', 'demo.flash.lesson.p2', 'demo.flash.lesson.p3'],
  },
};
