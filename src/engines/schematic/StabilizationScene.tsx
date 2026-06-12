import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

/** Stabilizzazione & tempo di sicurezza: il mosso da micromosso dipende da tempo, focale e stop di IS. */
export const StabilizationScene: RendererComponent = ({ params }) => {
  const t = useT();
  const focal = params.focalLengthMm;
  const shutter = params.shutterSeconds;
  const is = params.isStops;
  const safety = 1 / focal;
  const eff = safety * Math.pow(2, is);
  const ratio = shutter / eff;
  const blur = Math.min(30, Math.max(0, ratio - 1) * 6);
  const sharp = ratio <= 1.1;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.stabilization.title')}>
      <Backdrop grid={false} />
      <defs>
        <filter id="stab-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter="url(#stab-blur)">
        <circle cx={SCENE_W / 2} cy={SCENE_H / 2 - 10} r={42} className="obj is-subject" />
        <rect x={SCENE_W / 2 - 80} y={SCENE_H / 2 + 64} width={160} height={16} rx={6} className="obj is-soft" />
      </g>

      <text x={20} y={36} className="scene__label">
        {formatShutter(shutter)} · {focal}mm
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.stab.safety', { time: formatShutter(eff) })} · IS +{is}
      </text>
      <text x={SCENE_W - 20} y={36} textAnchor="end" className={`scene__state ${sharp ? 'is-frozen' : 'is-blur'}`}>
        {sharp ? t('state.frozen') : t('state.blur')}
      </text>
    </svg>
  );
};
