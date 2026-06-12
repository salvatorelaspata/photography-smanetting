import type { DemoModule, ParamValues } from '../types';
import type { DerivedPhysics } from '../../engines/types';
import { computeExposure } from '../../core/photography/exposure';
import { resolveMode, MODES, TEACHING_EV } from '../../core/photography/exposureModes';
import {
  APERTURES_FULL,
  SHUTTER_FULL_SECONDS,
  formatAperture,
  formatShutter,
} from '../../core/params/stops';
import { ModesScene } from '../../engines/schematic/ModesScene';

function computeDerived(p: ParamValues): DerivedPhysics {
  const mode = MODES[Math.round(p.mode)] ?? 'M';
  const r = resolveMode({
    mode,
    apertureFstop: p.aperture,
    shutterSeconds: p.shutter,
    targetEv100: TEACHING_EV,
  });
  return {
    exposure: computeExposure(
      { apertureFstop: r.apertureFstop, shutterSeconds: r.shutterSeconds, iso: 100 },
      TEACHING_EV,
    ),
  };
}

/** B — Modalità di scatto P/A/S/M. */
export const modesDemo: DemoModule = {
  id: 'modes',
  titleKey: 'demo.modes.title',
  group: 'advanced',
  defaultParams: { mode: 1, aperture: 8, shutter: 1 / 125 },
  controls: [
    {
      id: 'mode',
      kind: 'dial',
      labelKey: 'demo.modes.ctrl.mode',
      sequence: [0, 1, 2, 3],
      format: (v) => MODES[Math.round(v)] ?? '',
    },
    {
      id: 'aperture',
      kind: 'dial',
      labelKey: 'demo.modes.ctrl.aperture',
      sequence: APERTURES_FULL,
      format: formatAperture,
    },
    {
      id: 'shutter',
      kind: 'dial',
      labelKey: 'demo.modes.ctrl.shutter',
      sequence: SHUTTER_FULL_SECONDS,
      format: formatShutter,
    },
  ],
  computeDerived,
  renderers: { schematic: ModesScene },
  fallback: 'schematic',
  presets: {
    program: { labelKey: 'demo.modes.preset.program', values: { mode: 0 } },
    aperture: { labelKey: 'demo.modes.preset.aperture', values: { mode: 1, aperture: 2.8 } },
    shutter: { labelKey: 'demo.modes.preset.shutter', values: { mode: 2, shutter: 1 / 1000 } },
    manual: { labelKey: 'demo.modes.preset.manual', values: { mode: 3, aperture: 8, shutter: 1 / 1000 } },
  },
  lesson: {
    introKey: 'demo.modes.lesson.intro',
    pointKeys: ['demo.modes.lesson.p1', 'demo.modes.lesson.p2', 'demo.modes.lesson.p3'],
  },
};
