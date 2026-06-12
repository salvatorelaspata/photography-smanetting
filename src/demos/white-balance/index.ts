import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { computeWhiteBalance } from '../../core/photography/whiteBalance';
import { WhiteBalanceScene } from '../../engines/schematic/WhiteBalanceScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 5.6, shutterSeconds: 1 / 125, iso: 100 }, 13),
    whiteBalance: computeWhiteBalance(p.kelvin),
  };
}

/** A2 — Bilanciamento del bianco / temperatura colore. */
export const whiteBalanceDemo: DemoModule = {
  id: 'whiteBalance',
  titleKey: 'demo.wb.title',
  group: 'advanced',
  defaultParams: { kelvin: 5500 },
  controls: [
    {
      id: 'kelvin',
      kind: 'slider',
      labelKey: 'demo.wb.ctrl.kelvin',
      min: 2500,
      max: 9000,
      step: 100,
      format: (v) => `${v} K`,
    },
  ],
  computeDerived,
  renderers: { schematic: WhiteBalanceScene },
  fallback: 'schematic',
  presets: {
    candle: { labelKey: 'demo.wb.preset.candle', values: { kelvin: 2800 } },
    daylight: { labelKey: 'demo.wb.preset.daylight', values: { kelvin: 5500 } },
    shade: { labelKey: 'demo.wb.preset.shade', values: { kelvin: 8000 } },
  },
  lesson: {
    introKey: 'demo.wb.lesson.intro',
    pointKeys: ['demo.wb.lesson.p1', 'demo.wb.lesson.p2', 'demo.wb.lesson.p3'],
  },
};
