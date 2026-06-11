import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const GROUND_Y = SCENE_H * 0.7;
const REF_FOCAL = 50;

/** Scena focale: il soggetto resta della stessa dimensione (dolly), lo sfondo si comprime. */
export const FocalScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const focal = params.focalLengthMm;
  const fov = derived.fov;
  const bg = focal / REF_FOCAL; // scala dello sfondo rispetto a 50mm
  const distanceM = 2 * (focal / REF_FOCAL); // distanza di ripresa per mantenere il soggetto

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.focal.title')}
    >
      <Backdrop grid={false} />
      <rect x={0} y={0} width={SCENE_W} height={GROUND_Y} className="focal__sky" />
      <rect x={0} y={GROUND_Y} width={SCENE_W} height={SCENE_H - GROUND_Y} className="focal__ground" />

      {/* sfondo che scala con la focale (compressione) */}
      <g transform={`translate(${SCENE_W / 2} ${GROUND_Y}) scale(${bg})`} className="focal__bg">
        <circle cx={120} cy={-150} r={26} className="focal__sun" />
        <polygon points="-200,0 -90,-130 20,0" className="focal__mountain" />
        <polygon points="-60,0 70,-170 200,0" className="focal__mountain focal__mountain--far" />
        <polygon points="60,0 170,-120 280,0" className="focal__mountain" />
      </g>

      {/* soggetto a dimensione costante (dolly) */}
      <g transform={`translate(${SCENE_W / 2} ${GROUND_Y})`} className="focal__subject">
        <ellipse cx={0} cy={6} rx={42} ry={10} className="focal__shadow" />
        <rect x={-22} y={-86} width={44} height={74} rx={16} />
        <circle cx={0} cy={-104} r={20} />
      </g>

      <text x={20} y={36} className="scene__label">
        {focal}mm
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.focal.aov', { deg: Math.round(fov?.diagonalDeg ?? 0) })}
      </text>
      <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__label-sm">
        {t('scene.focal.distance', { m: distanceM.toFixed(1) })}
      </text>
    </svg>
  );
};
