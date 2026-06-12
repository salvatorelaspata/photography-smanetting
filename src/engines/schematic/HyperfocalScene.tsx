import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const CAM_X = 46;
const AXIS_Y = SCENE_H - 90;
const OBJ_Y = AXIS_Y - 46;
const MAX_DIST = 24;
const scaleX = (d: number) => CAM_X + 34 + (Math.min(d, MAX_DIST) / MAX_DIST) * (SCENE_W - CAM_X - 80);

/** Iperfocale: mettendo a fuoco sulla distanza iperfocale, la zona nitida arriva all'infinito. */
export const HyperfocalScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const dof = derived.dof;
  const f = params.apertureFstop;
  const focus = params.focusDistanceM;
  if (!dof) return null;

  const farClamped = dof.infinity ? MAX_DIST : Math.min(dof.farM, MAX_DIST);
  const nearX = scaleX(dof.nearM);
  const farX = scaleX(farClamped);
  const focusX = scaleX(focus);
  const hX = scaleX(dof.hyperfocalM);

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.hyperfocal.title')}>
      <Backdrop grid={false} />

      <rect x={nearX} y={OBJ_Y - 36} width={Math.max(farX - nearX, 2)} height={96} className="dof__band" />
      {dof.infinity && (
        <text x={SCENE_W - 36} y={OBJ_Y} className="scene__label" style={{ fill: 'var(--accent)' }}>
          ∞
        </text>
      )}

      <line x1={CAM_X} y1={AXIS_Y} x2={SCENE_W - 30} y2={AXIS_Y} className="scene__track" />
      {[1, 2, 5, 10, 20].map((d) => (
        <g key={d}>
          <line x1={scaleX(d)} y1={AXIS_Y - 5} x2={scaleX(d)} y2={AXIS_Y + 5} className="scene__grid" />
          <text x={scaleX(d)} y={AXIS_Y + 22} textAnchor="middle" className="scene__tick">
            {d}m
          </text>
        </g>
      ))}

      <g transform={`translate(${CAM_X - 16}, ${AXIS_Y - 14})`} className="scene__cam">
        <rect width={26} height={20} rx={3} />
        <polygon points="26,3 38,-3 38,23 26,17" />
      </g>

      {/* marcatore iperfocale */}
      <line x1={hX} y1={OBJ_Y - 34} x2={hX} y2={AXIS_Y} className="dof__focus" />
      <text x={hX} y={OBJ_Y - 42} textAnchor="middle" className="scene__tick" style={{ fill: 'var(--accent)' }}>
        H
      </text>

      {/* piano di fuoco + soggetto */}
      <line x1={focusX} y1={OBJ_Y - 20} x2={focusX} y2={AXIS_Y} className="scene__grid" />
      <circle cx={focusX} cy={OBJ_Y} r={14} className="obj is-subject" />

      <text x={20} y={36} className="scene__label">
        {formatAperture(f)} · H {dof.hyperfocalM.toFixed(1)} m
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.hyperfocal.range', { from: dof.nearM.toFixed(1), to: dof.infinity ? '∞' : dof.farM.toFixed(1) })}
      </text>
    </svg>
  );
};
