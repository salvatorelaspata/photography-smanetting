import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from '../schematic/common';

const GROUND_Y = SCENE_H * 0.72;
const REF_FOCAL = 50;

/** 2.5D: livelli (sfondo/mezzo/soggetto) con parallasse-scala dalla focale; soggetto costante. */
export const FocalLayered: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const focal = params.focalLengthMm;
  const fov = derived.fov;
  const bg = focal / REF_FOCAL;
  const distanceM = 2 * (focal / REF_FOCAL);

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--layered"
      role="img"
      aria-label={t('demo.focal.title')}
    >
      <defs>
        <linearGradient id="fo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3b5c" />
          <stop offset="100%" stopColor="#c98f63" />
        </linearGradient>
        <filter id="fo-haze" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={2.4} />
        </filter>
      </defs>

      <rect x={0} y={0} width={SCENE_W} height={GROUND_Y} fill="url(#fo-sky)" />

      {/* livello lontano (foschia), scalato dalla focale */}
      <g transform={`translate(${SCENE_W / 2} ${GROUND_Y}) scale(${bg})`} filter="url(#fo-haze)">
        <circle cx={130} cy={-150} r={26} fill="#ffdca8" />
        <polygon points="-230,0 -95,-120 35,0" fill="#3a4a63" />
        <polygon points="45,0 175,-150 305,0" fill="#33425a" />
      </g>

      {/* livello intermedio, scalato dalla focale */}
      <g transform={`translate(${SCENE_W / 2} ${GROUND_Y}) scale(${bg})`}>
        <polygon points="-170,0 -45,-72 95,0" fill="#46566e" />
      </g>

      <rect x={0} y={GROUND_Y} width={SCENE_W} height={SCENE_H - GROUND_Y} fill="#23303f" />

      {/* soggetto a dimensione costante */}
      <g transform={`translate(${SCENE_W / 2} ${GROUND_Y})`}>
        <ellipse cx={0} cy={6} rx={44} ry={10} fill="#0c1015" opacity={0.5} />
        <rect x={-22} y={-88} width={44} height={76} rx={16} fill="#dfe6ee" />
        <circle cx={0} cy={-106} r={20} fill="#eef2f7" />
      </g>

      <text x={20} y={34} className="scene__label">
        {focal}mm
      </text>
      <text x={20} y={60} className="scene__label-sm">
        {t('scene.focal.aov', { deg: Math.round(fov?.diagonalDeg ?? 0) })}
      </text>
      <text x={SCENE_W - 20} y={34} textAnchor="end" className="scene__label-sm">
        {t('scene.focal.distance', { m: distanceM.toFixed(1) })}
      </text>
    </svg>
  );
};
