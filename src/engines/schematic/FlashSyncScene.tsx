import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { SCENE_W, SCENE_H } from './common';

const SYNC = 1 / 250;

/** Flash & sync speed: oltre il tempo di sincro, la seconda tendina copre parte del fotogramma (banda nera). */
export const FlashSyncScene: RendererComponent = ({ params }) => {
  const t = useT();
  const shutter = params.shutterSeconds;
  const band = shutter < SYNC ? Math.min(0.85, 1 - shutter / SYNC) : 0;
  const bandW = band * SCENE_W;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.flash.title')}>
      {/* scena illuminata dal flash */}
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H * 0.66} fill="#5a6a86" />
      <rect x={0} y={SCENE_H * 0.66} width={SCENE_W} height={SCENE_H * 0.34} fill="#3a4860" />
      <circle cx={SCENE_W / 2} cy={SCENE_H / 2} r={46} fill="#e7e9ee" />

      {/* banda della tendina */}
      {band > 0 && <rect x={SCENE_W - bandW} y={0} width={bandW} height={SCENE_H} fill="#05080c" />}

      <text x={20} y={36} className="scene__label">
        {formatShutter(shutter)}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.flash.sync', { sync: formatShutter(SYNC) })}
      </text>
      {band > 0 && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-blur">
          {t('scene.flash.band')}
        </text>
      )}
    </svg>
  );
};
