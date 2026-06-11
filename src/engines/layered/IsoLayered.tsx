import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from '../schematic/common';

/** 2.5D: una "foto" a livelli con grana procedurale (feTurbulence) che cresce con l'ISO. */
export const IsoLayered: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const iso = params.iso;
  const sigma = derived.noise?.sigma ?? 0;
  const grainPx = derived.noise?.grainPx ?? 1;
  const baseFrequency = Math.max(0.15, 0.9 / grainPx);
  const noiseOpacity = Math.min(0.85, Math.max(0.04, sigma * 1.4));

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--layered"
      role="img"
      aria-label={t('demo.iso.title')}
    >
      <defs>
        <linearGradient id="iso-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3a55" />
          <stop offset="100%" stopColor="#7a6243" />
        </linearGradient>
        <filter id="iso-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={2}
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix in="n" type="saturate" values="0" />
        </filter>
      </defs>

      <rect x={0} y={0} width={SCENE_W} height={SCENE_H * 0.66} fill="url(#iso-sky)" />
      <rect x={0} y={SCENE_H * 0.66} width={SCENE_W} height={SCENE_H * 0.34} fill="#2e2a24" />
      <circle cx={SCENE_W - 120} cy={86} r={36} fill="#f2d9a0" />
      <rect x={SCENE_W / 2 - 48} y={SCENE_H * 0.44} width={96} height={SCENE_H * 0.22} rx={8} fill="#161d28" />
      <rect x={40} y={SCENE_H - 132} width={214} height={98} rx={10} fill="#0c1015" opacity={0.82} />

      <rect
        x={0}
        y={0}
        width={SCENE_W}
        height={SCENE_H}
        filter="url(#iso-grain)"
        opacity={noiseOpacity}
        style={{ mixBlendMode: 'overlay' }}
      />

      <text x={20} y={34} className="scene__label">
        ISO {iso}
      </text>
      <text x={20} y={60} className="scene__label-sm">
        {t('scene.iso.snr', { db: Math.round(derived.noise?.snrDb ?? 0) })}
      </text>
    </svg>
  );
};
