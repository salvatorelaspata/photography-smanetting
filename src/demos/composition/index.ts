import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { CompositionScene } from '../../engines/schematic/CompositionScene';

function computeDerived(_p: ParamValues): DerivedPhysics {
  return {
    exposure: computeExposure({ apertureFstop: 8, shutterSeconds: 1 / 125, iso: 100 }, 12),
  };
}

/** Inquadratura & composizione: griglie compositive e posizionamento del soggetto. */
export const compositionDemo: DemoModule = {
  id: 'composition',
  titleKey: 'demo.composition.title',
  group: 'core',
  defaultParams: { subjectX: 0.66, horizonY: 0.66, guide: 1 },
  controls: [
    {
      id: 'subjectX',
      kind: 'slider',
      labelKey: 'demo.composition.ctrl.subject',
      min: 0.06,
      max: 0.94,
      step: 0.01,
      format: (v) => `${Math.round(v * 100)}%`,
    },
    {
      id: 'horizonY',
      kind: 'slider',
      labelKey: 'demo.composition.ctrl.horizon',
      min: 0.15,
      max: 0.85,
      step: 0.01,
      format: (v) => `${Math.round(v * 100)}%`,
    },
    {
      id: 'guide',
      kind: 'segment',
      labelKey: 'demo.composition.ctrl.guide',
      sequence: [0, 1, 2, 3, 4],
      format: (v) => ['—', '1/3', 'φ', '↻', '↗'][Math.round(v)] ?? '',
    },
  ],
  computeDerived,
  scene: CompositionScene,
  presets: {
    center: { labelKey: 'demo.composition.preset.center', values: { subjectX: 0.5, horizonY: 0.5, guide: 1 } },
    thirds: { labelKey: 'demo.composition.preset.thirds', values: { subjectX: 0.667, horizonY: 0.667, guide: 1 } },
    golden: { labelKey: 'demo.composition.preset.golden', values: { subjectX: 0.618, horizonY: 0.382, guide: 2 } },
    spiral: { labelKey: 'demo.composition.preset.spiral', values: { subjectX: 0.62, horizonY: 0.38, guide: 3 } },
  },
  lesson: {
    introKey: 'demo.composition.lesson.intro',
    pointKeys: ['demo.composition.lesson.p1', 'demo.composition.lesson.p2', 'demo.composition.lesson.p3'],
  },
};
