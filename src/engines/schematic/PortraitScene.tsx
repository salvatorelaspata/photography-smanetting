import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const CX = SCENE_W / 2;
const CY = SCENE_H / 2 + 10;

/** Distorsione del ritratto: da vicino i tratti centrali (naso) si ingrandiscono. */
export const PortraitScene: RendererComponent = ({ params }) => {
  const t = useT();
  const dist = params.distanceM;
  const noseScale = Math.min(3, Math.max(0.7, 1 + 0.6 * (1.5 / dist - 1)));
  const focalEq = Math.round(dist * 33);
  const eyeGap = 42 / Math.max(1, noseScale * 0.8);
  const warn = dist < 0.7;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.portrait.title')}>
      <Backdrop grid={false} />

      {/* orecchie (arretrano percettivamente da vicino) */}
      <ellipse cx={CX - 92} cy={CY} rx={14} ry={24} className="obj is-soft" />
      <ellipse cx={CX + 92} cy={CY} rx={14} ry={24} className="obj is-soft" />

      {/* testa */}
      <ellipse cx={CX} cy={CY} rx={92} ry={120} className="focal__subject" fill="#dfe6ee" />

      {/* occhi */}
      <ellipse cx={CX - eyeGap} cy={CY - 30} rx={13} ry={9} fill="#1b2430" />
      <ellipse cx={CX + eyeGap} cy={CY - 30} rx={13} ry={9} fill="#1b2430" />

      {/* naso: cresce avvicinandosi */}
      <ellipse cx={CX} cy={CY + 8} rx={16 * noseScale} ry={26 * noseScale} fill="#c9b8a8" stroke="#9a8a7a" strokeWidth={2} />

      {/* bocca */}
      <path d={`M ${CX - 26} ${CY + 56} Q ${CX} ${CY + 72} ${CX + 26} ${CY + 56}`} fill="none" stroke="#9a5a5a" strokeWidth={4} />

      <text x={20} y={36} className="scene__label">
        {dist.toFixed(2)} m
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.portrait.focal', { mm: focalEq })}
      </text>
      {warn && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-blur">
          {t('scene.portrait.warn')}
        </text>
      )}
    </svg>
  );
};
