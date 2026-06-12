import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { displayBrightness } from '../../core/photography/exposure';
import { HistogramScene } from '../../engines/schematic/HistogramScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  const dev = p.exposureComp;
  return {
    exposure: { evAt100: 12, stopsFromTarget: dev, displayBrightness: displayBrightness(dev) },
  };
}

/** A1 — Esposizione, istogramma e clipping (metering). */
export const histogramDemo: DemoModule = {
  id: 'histogram',
  titleKey: 'demo.hist.title',
  group: 'advanced',
  defaultParams: { exposureComp: 0 },
  controls: [
    {
      id: 'exposureComp',
      kind: 'slider',
      labelKey: 'demo.hist.ctrl.comp',
      min: -3,
      max: 3,
      step: 0.1,
      format: (v) => `${v >= 0 ? '+' : ''}${v.toFixed(1)} EV`,
    },
  ],
  computeDerived,
  renderers: { schematic: HistogramScene },
  fallback: 'schematic',
  presets: {
    under: { labelKey: 'demo.hist.preset.under', values: { exposureComp: -2 } },
    correct: { labelKey: 'demo.hist.preset.correct', values: { exposureComp: 0 } },
    over: { labelKey: 'demo.hist.preset.over', values: { exposureComp: 2 } },
  },
  lesson: {
    introKey: 'demo.hist.lesson.intro',
    pointKeys: ['demo.hist.lesson.p1', 'demo.hist.lesson.p2', 'demo.hist.lesson.p3'],
  },
};
