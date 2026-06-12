import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { PortraitScene } from '../../engines/schematic/PortraitScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 4, shutterSeconds: 1 / 200, iso: 100 }, 13),
  };
}

/** B — Distorsione prospettica del ritratto. */
export const portraitDemo: DemoModule = {
  id: 'portrait',
  titleKey: 'demo.portrait.title',
  group: 'advanced',
  defaultParams: { distanceM: 1.5 },
  controls: [
    {
      id: 'distanceM',
      kind: 'slider',
      labelKey: 'demo.portrait.ctrl.distance',
      min: 0.3,
      max: 3,
      step: 0.05,
      format: (v) => `${v.toFixed(2)} m`,
    },
  ],
  computeDerived,
  renderers: { schematic: PortraitScene },
  fallback: 'schematic',
  presets: {
    close: { labelKey: 'demo.portrait.preset.close', values: { distanceM: 0.4 } },
    portrait: { labelKey: 'demo.portrait.preset.portrait', values: { distanceM: 1.5 } },
    far: { labelKey: 'demo.portrait.preset.far', values: { distanceM: 2.5 } },
  },
  lesson: {
    introKey: 'demo.portrait.lesson.intro',
    pointKeys: ['demo.portrait.lesson.p1', 'demo.portrait.lesson.p2', 'demo.portrait.lesson.p3'],
  },
};
