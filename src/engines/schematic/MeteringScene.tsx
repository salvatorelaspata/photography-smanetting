import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from './common';

const SUBJ = 0.12;
const BG = 0.85;
const cl = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const grey = (lin: number) => Math.round(Math.pow(cl(lin, 0, 1), 1 / 2.2) * 255);
const MODES = ['spot', 'center', 'matrix'] as const;

/** Modalità di misurazione: spot/centro/matrix misurano la scena in modo diverso → esposizione diversa. */
export const MeteringScene: RendererComponent = ({ params }) => {
  const t = useT();
  const mode = Math.round(params.meteringMode);
  const metered = mode === 0 ? SUBJ : mode === 2 ? (SUBJ + BG * 2) / 3 : (SUBJ + BG) / 2;
  const comp = Math.log2(0.18 / metered);
  const gain = Math.pow(2, comp);
  const sky = grey(BG * gain);
  const ground = grey(BG * 0.5 * gain);
  const subj = grey(SUBJ * gain);

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.metering.title')}>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H * 0.66} style={{ fill: `rgb(${sky},${sky},${sky})` }} />
      <rect x={0} y={SCENE_H * 0.66} width={SCENE_W} height={SCENE_H * 0.34} style={{ fill: `rgb(${ground},${ground},${ground})` }} />
      <rect x={SCENE_W / 2 - 50} y={SCENE_H * 0.4} width={100} height={SCENE_H * 0.42} rx={10} style={{ fill: `rgb(${subj},${subj},${subj})` }} />

      {mode === 0 && <circle cx={SCENE_W / 2} cy={SCENE_H * 0.6} r={26} className="meter__zone" />}
      {mode === 1 && <ellipse cx={SCENE_W / 2} cy={SCENE_H * 0.55} rx={130} ry={95} className="meter__zone" />}
      {mode === 2 &&
        Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={50 + (i % 4) * 138} y={70 + Math.floor(i / 4) * 96} width={128} height={86} className="meter__zone" />
        ))}

      <text x={20} y={36} className="scene__label">
        {t(`scene.metering.${MODES[mode]}`)}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {comp >= 0 ? `+${comp.toFixed(1)}` : comp.toFixed(1)} EV
      </text>
    </svg>
  );
};
