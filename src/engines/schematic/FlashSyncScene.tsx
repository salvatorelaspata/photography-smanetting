import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const SYNC = 1 / 250;
const FX = 70;
const FY = 64;
const FW = SCENE_W - 140;
const FH = SCENE_H - 150;

/**
 * Flash & sync speed: l'otturatore a tendina espone tutto il fotogramma solo entro il tempo
 * di sincro. Più veloce, le due tendine lasciano solo una fessura: il flash illumina la
 * striscia esposta e lascia una banda nera sul resto.
 */
export const FlashSyncScene: RendererComponent = ({ params }) => {
  const t = useT();
  const shutter = params.shutterSeconds;
  const litFrac = Math.min(1, shutter / SYNC); // 1 = fotogramma intero esposto
  const bandFrac = 1 - litFrac;
  const bandH = bandFrac * FH;
  const boundaryY = FY + FH - bandH;
  const hasBand = bandFrac > 0.001;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.flash.title')}>
      <Backdrop grid={false} />

      {/* fotogramma: scena illuminata dal flash */}
      <rect x={FX} y={FY} width={FW} height={FH * 0.62} fill="#5a6a86" />
      <rect x={FX} y={FY + FH * 0.62} width={FW} height={FH * 0.38} fill="#3a4860" />
      <circle cx={FX + FW * 0.74} cy={FY + FH * 0.26} r={30} fill="#e7e9ee" />
      <circle cx={FX + FW * 0.34} cy={FY + FH * 0.66} r={42} fill="#cdd6e2" />

      {/* banda nera: parte di fotogramma coperta dalla tendina durante il lampo */}
      {hasBand && <rect x={FX} y={boundaryY} width={FW} height={bandH} fill="#05080c" />}

      {/* bordo della seconda tendina + freccia di scorrimento */}
      {hasBand && (
        <g>
          <line x1={FX} y1={boundaryY} x2={FX + FW} y2={boundaryY} stroke="var(--accent)" strokeWidth={2} />
          <text x={FX + FW - 6} y={boundaryY + 16} textAnchor="end" className="scene__tick" style={{ fill: 'var(--accent)' }}>
            {t('scene.flash.curtain')}
          </text>
        </g>
      )}

      {/* cornice del fotogramma */}
      <rect x={FX} y={FY} width={FW} height={FH} fill="none" stroke="var(--border)" strokeWidth={2} />

      <text x={20} y={36} className="scene__label">
        {formatShutter(shutter)}
      </text>
      <text x={20} y={SCENE_H - 46} className="scene__label-sm">
        {t('scene.flash.sync', { sync: formatShutter(SYNC) })}
      </text>

      {hasBand ? (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-blur">
          {t('scene.flash.band')}
        </text>
      ) : (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-frozen">
          {t('scene.flash.lit')}
        </text>
      )}
    </svg>
  );
};
