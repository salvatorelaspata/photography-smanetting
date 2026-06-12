import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from './common';

const SCENE_DR = 10; // stop di gamma dinamica della scena
const BASE_WINDOW = 6; // finestra di un singolo scatto

/** Bracketing / HDR: più scatti a esposizioni diverse coprono una gamma dinamica più ampia. */
export const BracketingScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const step = params.evStep;
  const coverage = Math.min(SCENE_DR, BASE_WINDOW + step * 2 * 1.3);

  const B = { x: SCENE_W / 2 - 46, y: 50, w: 92, h: SCENE_H - 130 };
  const covH = (coverage / SCENE_DR) * B.h;
  const gap = (B.h - covH) / 2;
  const full = gap < 3;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.bracketing.title')}>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} className="scene__bg" />

      {/* alte luci tagliate (rosso), zona coperta (banda), ombre chiuse (blu) */}
      <rect x={B.x} y={B.y} width={B.w} height={gap} fill="#ff5a5a" opacity={0.55} />
      <rect x={B.x} y={B.y + gap} width={B.w} height={covH} className="dof__band" />
      <rect x={B.x} y={B.y + B.h - gap} width={B.w} height={gap} fill="#5a9dff" opacity={0.55} />
      <rect x={B.x} y={B.y} width={B.w} height={B.h} fill="none" stroke="var(--border)" strokeWidth={1.5} />

      {/* marcatori dei 3 scatti */}
      {[-1, 0, 1].map((k) => {
        const yy = B.y + B.h / 2 - (k * step * 1.3) / SCENE_DR * B.h;
        return <line key={k} x1={B.x - 16} y1={yy} x2={B.x - 2} y2={yy} className="meter__tick" />;
      })}

      <text x={B.x + B.w + 16} y={B.y + 16} className="scene__label-sm" fill="#ff8a8a">
        {t('scene.bracketing.highlights')}
      </text>
      <text x={B.x + B.w + 16} y={B.y + B.h - 6} className="scene__label-sm" fill="#8ab6ff">
        {t('scene.bracketing.shadows')}
      </text>

      <text x={20} y={36} className="scene__label">
        ±{step.toFixed(1)} EV · EV {derived.exposure.evAt100.toFixed(0)}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {full ? t('scene.bracketing.full') : t('scene.bracketing.partial')}
      </text>
    </svg>
  );
};
