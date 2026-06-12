import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from './common';

const SENSOR_DR = 12; // gamma dinamica tipica del sensore (stop)
const BAR_X = 150;
const BAR_W = 120;
const BAR_Y = 44;
const BAR_H = SCENE_H - 88;

/**
 * Gamma dinamica & profondità di bit.
 * Se la scena supera la gamma del sensore, le alte luci bruciano e le ombre si chiudono.
 * I bit determinano il numero di livelli tonali (banding quando sono pochi).
 */
export const DynamicRangeScene: RendererComponent = ({ params }) => {
  const t = useT();
  const sceneDr = Math.max(4, Math.min(16, params.sceneDr ?? 12));
  const bits = Math.round(params.bits ?? 14);
  const levels = Math.pow(2, bits);

  const excess = Math.max(0, sceneDr - SENSOR_DR);
  const stopPx = BAR_H / sceneDr;
  const clipPx = (excess / 2) * stopPx; // metà in alto (alte luci), metà in basso (ombre)
  const midH = BAR_H - clipPx * 2;
  const clipped = excess > 0.2;

  // swatch della quantizzazione: passi visibili legati ai bit (didattico)
  const visibleSteps = Math.min(64, Math.max(4, Math.round(Math.pow(2, bits - 4))));

  const grad = Array.from({ length: 24 }).map((_, i) => i / 23);

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.dynamic.title')}>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} className="scene__bg" />

      {/* scala in stop */}
      {Array.from({ length: Math.round(sceneDr) + 1 }).map((_, i) => {
        const y = BAR_Y + (i / sceneDr) * BAR_H;
        return (
          <g key={i}>
            <line x1={BAR_X - 26} y1={y} x2={BAR_X - 8} y2={y} className="meter__tick" />
            <text x={BAR_X - 32} y={y + 4} textAnchor="end" className="scene__tick">
              {Math.round(sceneDr) - i}
            </text>
          </g>
        );
      })}

      {/* alte luci bruciate */}
      {clipPx > 1 && <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={clipPx} fill="#ff5a5a" opacity={0.6} />}
      {/* toni catturati (gradiente chiaro→scuro) */}
      {grad.map((v, i) => {
        const c = Math.round((1 - v) * 235 + 10);
        return (
          <rect
            key={i}
            x={BAR_X}
            y={BAR_Y + clipPx + (i / grad.length) * midH}
            width={BAR_W}
            height={midH / grad.length + 0.5}
            fill={`rgb(${c},${c},${c})`}
          />
        );
      })}
      {/* ombre chiuse */}
      {clipPx > 1 && <rect x={BAR_X} y={BAR_Y + BAR_H - clipPx} width={BAR_W} height={clipPx} fill="#5a9dff" opacity={0.6} />}
      <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} fill="none" stroke="var(--border)" strokeWidth={1.5} />

      {/* finestra del sensore */}
      <line x1={BAR_X - 4} y1={BAR_Y + clipPx} x2={BAR_X + BAR_W + 4} y2={BAR_Y + clipPx} stroke="#46d39a" strokeWidth={2} strokeDasharray="5 4" />
      <line x1={BAR_X - 4} y1={BAR_Y + BAR_H - clipPx} x2={BAR_X + BAR_W + 4} y2={BAR_Y + BAR_H - clipPx} stroke="#46d39a" strokeWidth={2} strokeDasharray="5 4" />

      <text x={BAR_X + BAR_W + 16} y={BAR_Y + 14} className="scene__label-sm" fill="#ff8a8a">
        {t('scene.dynamic.highlights')}
      </text>
      <text x={BAR_X + BAR_W + 16} y={BAR_Y + BAR_H - 2} className="scene__label-sm" fill="#8ab6ff">
        {t('scene.dynamic.shadows')}
      </text>

      {/* swatch quantizzazione (profondità di bit) */}
      <text x={440} y={BAR_Y + 60} className="scene__label-sm">
        {t('scene.dynamic.levels', { n: levels.toLocaleString() })}
      </text>
      {Array.from({ length: visibleSteps }).map((_, i) => {
        const c = Math.round((i / (visibleSteps - 1)) * 235 + 10);
        return <rect key={i} x={440 + (i * 150) / visibleSteps} y={BAR_Y + 74} width={150 / visibleSteps + 0.5} height={40} fill={`rgb(${c},${c},${c})`} />;
      })}
      <text x={440} y={BAR_Y + 134} className="scene__tick">
        {bits} bit
      </text>

      {/* stato */}
      <text x={BAR_X} y={28} className="scene__label">
        {t('scene.dynamic.scene', { dr: Math.round(sceneDr) })} · {t('scene.dynamic.sensor', { dr: SENSOR_DR })}
      </text>
      <text x={440} y={28} className={clipped ? 'scene__state is-blur' : 'scene__state is-frozen'} style={{ fontSize: 15 }}>
        {clipped ? t('scene.dynamic.clip', { stops: excess.toFixed(0) }) : t('scene.dynamic.fits')}
      </text>
    </svg>
  );
};
