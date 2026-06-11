import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture } from '../../core/params/stops';
import { SCENE_W, SCENE_H } from '../schematic/common';

const DOTS: { x: number; y: number; r: number; c: string }[] = [
  { x: 120, y: 120, r: 16, c: '#ff8a5c' },
  { x: 250, y: 90, r: 13, c: '#ffd93d' },
  { x: 430, y: 110, r: 18, c: '#7ad7f0' },
  { x: 540, y: 150, r: 14, c: '#c08cff' },
  { x: 350, y: 175, r: 12, c: '#9bf6a0' },
];

/** 2.5D: profondità di campo come sfocato (feGaussianBlur) del livello di sfondo ∝ apertura. */
export const ApertureLayered: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const f = params.apertureFstop;
  const dof = derived.dof;
  const blur = Math.min(22, Math.max(0, (16 / f) * 1.2 - 1));

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--layered"
      role="img"
      aria-label={t('demo.aperture.title')}
    >
      <defs>
        <linearGradient id="ap-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23314e" />
          <stop offset="100%" stopColor="#3c4a63" />
        </linearGradient>
        <filter id="ap-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>

      {/* livello di sfondo, sfocato ∝ apertura */}
      <g filter="url(#ap-blur)">
        <rect x={0} y={0} width={SCENE_W} height={SCENE_H} fill="url(#ap-sky)" />
        <rect x={0} y={SCENE_H * 0.7} width={SCENE_W} height={SCENE_H * 0.3} fill="#2a3346" />
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.95} />
        ))}
      </g>

      {/* soggetto a fuoco (nitido) */}
      <g transform={`translate(${SCENE_W / 2} ${SCENE_H * 0.94})`}>
        <ellipse cx={0} cy={4} rx={54} ry={12} fill="#0c1015" opacity={0.5} />
        <rect x={-30} y={-150} width={60} height={130} rx={22} fill="#dfe6ee" />
        <circle cx={0} cy={-172} r={28} fill="#eef2f7" />
      </g>

      <text x={20} y={34} className="scene__label">
        {formatAperture(f)}
      </text>
      {dof && (
        <text x={20} y={60} className="scene__label-sm">
          {t('scene.aperture.dof', {
            from: dof.nearM.toFixed(1),
            to: dof.infinity ? '∞' : dof.farM.toFixed(1),
          })}
        </text>
      )}
    </svg>
  );
};
