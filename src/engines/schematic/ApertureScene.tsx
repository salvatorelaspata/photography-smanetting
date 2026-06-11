import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const CAM_X = 46;
const AXIS_Y = SCENE_H - 80;
const OBJ_Y = AXIS_Y - 48;
const MAX_DIST = 14; // metri rappresentati sull'asse

const scaleX = (d: number) => CAM_X + 34 + (Math.min(d, MAX_DIST) / MAX_DIST) * (SCENE_W - CAM_X - 80);

/** Scena schematica della profondità di campo: banda di fuoco sull'asse distanze + bokeh. */
export const ApertureScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const dof = derived.dof;
  const f = params.apertureFstop;
  const focus = params.focusDistanceM;
  if (!dof) return null;

  const farClamped = dof.infinity ? MAX_DIST : Math.min(dof.farM, MAX_DIST);
  const nearX = scaleX(dof.nearM);
  const farX = scaleX(farClamped);
  const focusX = scaleX(focus);

  const inFocus = (d: number) => d >= dof.nearM && (dof.infinity || d <= dof.farM);
  const blurRadius = (d: number) =>
    inFocus(d) ? 0 : (Math.min(Math.abs(d - focus), 8) / 8) * (16 / f) * 5;

  const objects = [1.5, 4, 9];

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.aperture.title')}
    >
      <Backdrop grid={false} />

      {/* banda di fuoco */}
      <rect
        x={nearX}
        y={OBJ_Y - 42}
        width={Math.max(farX - nearX, 2)}
        height={110}
        className="dof__band"
      />
      <text x={(nearX + farX) / 2} y={OBJ_Y - 50} textAnchor="middle" className="scene__tick">
        {t('scene.aperture.inFocus')}
      </text>

      {/* asse distanze + tacche */}
      <line x1={CAM_X} y1={AXIS_Y} x2={SCENE_W - 30} y2={AXIS_Y} className="scene__track" />
      {[1, 2, 4, 8].map((d) => (
        <g key={d}>
          <line x1={scaleX(d)} y1={AXIS_Y - 5} x2={scaleX(d)} y2={AXIS_Y + 5} className="scene__grid" />
          <text x={scaleX(d)} y={AXIS_Y + 22} textAnchor="middle" className="scene__tick">
            {d}m
          </text>
        </g>
      ))}

      {/* camera */}
      <g transform={`translate(${CAM_X - 16}, ${AXIS_Y - 14})`} className="scene__cam">
        <rect width={26} height={20} rx={3} />
        <polygon points="26,3 38,-3 38,23 26,17" />
      </g>

      {/* piano di fuoco */}
      <line x1={focusX} y1={OBJ_Y - 40} x2={focusX} y2={AXIS_Y} className="dof__focus" />

      {/* oggetti di riferimento */}
      {objects.map((d, i) => {
        const x = scaleX(d);
        const b = blurRadius(d);
        const sharp = b === 0;
        return (
          <g key={i}>
            {!sharp &&
              [3, 2, 1].map((k) => (
                <circle key={k} cx={x} cy={OBJ_Y} r={13 + b * k} className="bokeh" />
              ))}
            <circle cx={x} cy={OBJ_Y} r={13} className={`obj ${sharp ? 'is-sharp' : 'is-soft'}`} />
          </g>
        );
      })}

      {/* soggetto a fuoco */}
      <circle cx={focusX} cy={OBJ_Y} r={15} className="obj is-subject" />

      <text x={20} y={36} className="scene__label">
        {formatAperture(f)}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.aperture.dof', {
          from: dof.nearM.toFixed(1),
          to: dof.infinity ? '∞' : dof.farM.toFixed(1),
        })}
      </text>
    </svg>
  );
};
