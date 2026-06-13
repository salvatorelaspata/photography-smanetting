import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const CX = SCENE_W / 2;
const CY = SCENE_H / 2 + 8;

/** Proporzioni naturali di riferimento (distanza ritratto). */
const RX0 = 96;
const RY0 = 122;

/**
 * Distorsione prospettica del ritratto: da vicino i tratti centrali (naso, fronte) si
 * ingrandiscono e le orecchie arretrano; da lontano il viso si appiattisce.
 * Il volto è inscritto in un ovale di riferimento tratteggiato per leggere la deviazione.
 */
export const PortraitScene: RendererComponent = ({ params }) => {
  const t = useT();
  const dist = Math.max(0.3, params.distanceM);
  // fattore di ingrandimento dei tratti vicini: forte sotto i 0,7 m, neutro a 1,5 m
  const k = Math.min(2.2, Math.max(0.7, 1.5 / dist));
  const focalEq = Math.round(dist * 33);

  const rx = RX0 / (0.82 + 0.18 * k); // viso più stretto da vicino
  const noseScale = k;
  const earScale = 1 / k; // orecchie arretrano (rimpiccioliscono) da vicino
  const eyeGap = 46 / (0.62 + 0.38 * k);

  const state = dist < 0.7 ? 'warn' : dist > 2.2 ? 'flat' : 'ok';

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.portrait.title')}
    >
      <Backdrop grid={false} />

      {/* ovale di riferimento (proporzioni naturali) */}
      <ellipse cx={CX} cy={CY} rx={RX0} ry={RY0} className="dof__focus" fill="none" />

      {/* orecchie */}
      <ellipse cx={CX - rx} cy={CY} rx={14 * earScale} ry={26 * earScale} className="obj is-soft" />
      <ellipse cx={CX + rx} cy={CY} rx={14 * earScale} ry={26 * earScale} className="obj is-soft" />

      {/* testa */}
      <ellipse cx={CX} cy={CY} rx={rx} ry={RY0} fill="#dfe6ee" />

      {/* occhi */}
      <ellipse cx={CX - eyeGap} cy={CY - 32} rx={13} ry={9} fill="#1b2430" />
      <ellipse cx={CX + eyeGap} cy={CY - 32} rx={13} ry={9} fill="#1b2430" />

      {/* sopracciglia */}
      <path d={`M ${CX - eyeGap - 16} ${CY - 48} q 16 -8 32 0`} fill="none" stroke="#1b2430" strokeWidth={3} />
      <path d={`M ${CX + eyeGap - 16} ${CY - 48} q 16 -8 32 0`} fill="none" stroke="#1b2430" strokeWidth={3} />

      {/* naso: cresce avvicinandosi */}
      <ellipse cx={CX} cy={CY + 10} rx={15 * noseScale} ry={26 * noseScale} fill="#c9b8a8" stroke="#9a8a7a" strokeWidth={2} />

      {/* bocca */}
      <path d={`M ${CX - 26} ${CY + 60} Q ${CX} ${CY + 78} ${CX + 26} ${CY + 60}`} fill="none" stroke="#9a5a5a" strokeWidth={4} />

      <text x={20} y={36} className="scene__label">
        {dist.toFixed(2)} m
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.portrait.focal', { mm: focalEq })}
      </text>

      {state === 'warn' && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-blur">
          {t('scene.portrait.warn')}
        </text>
      )}
      {state === 'ok' && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-frozen">
          {t('scene.portrait.natural')}
        </text>
      )}
      {state === 'flat' && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-frozen">
          {t('scene.portrait.flat')}
        </text>
      )}
    </svg>
  );
};
