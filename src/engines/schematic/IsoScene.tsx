import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

/** PRNG deterministico: posizioni della grana stabili tra i render. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GRAINS = (() => {
  const rnd = mulberry32(987654321);
  return Array.from({ length: 620 }, () => ({ x: rnd() * SCENE_W, y: rnd() * SCENE_H, p: rnd() }));
})();

const SHADOW = { x: 40, y: SCENE_H - 150, w: 220, h: 110 };
const inShadow = (x: number, y: number) =>
  x >= SHADOW.x && x <= SHADOW.x + SHADOW.w && y >= SHADOW.y && y <= SHADOW.y + SHADOW.h;

/** Scena ISO: una "foto" semplice con grana che cresce con l'ISO, peggiore nelle ombre. */
export const IsoScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const iso = params.iso;
  const sigma = derived.noise?.sigma ?? 0;
  const grainPx = derived.noise?.grainPx ?? 1;
  const k = Math.min(1, Math.max(0.04, sigma * 5));

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.iso.title')}
    >
      <Backdrop grid={false} />

      {/* "foto" di riferimento */}
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H * 0.62} className="iso__sky" />
      <rect x={0} y={SCENE_H * 0.62} width={SCENE_W} height={SCENE_H * 0.38} className="iso__ground" />
      <circle cx={SCENE_W - 130} cy={90} r={34} className="iso__sun" />
      <rect x={SHADOW.x} y={SHADOW.y} width={SHADOW.w} height={SHADOW.h} rx={10} className="iso__shadow" />
      <text x={SHADOW.x + 12} y={SHADOW.y + 28} className="scene__tick">
        {t('scene.iso.shadow')}
      </text>

      {/* grana */}
      <g className="iso__grain">
        {GRAINS.filter((g) => g.p < k).map((g, i) => {
          const boost = inShadow(g.x, g.y) ? 1.7 : 1;
          const opacity = Math.min(0.85, (0.12 + sigma * 0.6) * boost);
          return <rect key={i} x={g.x} y={g.y} width={grainPx} height={grainPx} opacity={opacity} />;
        })}
      </g>

      <text x={20} y={36} className="scene__label">
        ISO {iso}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.iso.snr', { db: Math.round(derived.noise?.snrDb ?? 0) })}
      </text>
    </svg>
  );
};
