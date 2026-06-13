import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const CAM_X = 40;
const GROUND_Y = SCENE_H - 64;
const MAX_DIST = 12; // metri rappresentati sull'asse
const scaleX = (d: number) =>
  CAM_X + 34 + (Math.min(d, MAX_DIST) / MAX_DIST) * (SCENE_W - CAM_X - 78);

/** Soggetti di riferimento a distanze fisse (m). */
const SUBJECTS = [1, 2, 3.5, 6, 10];

/**
 * Scena della profondità di campo: il diaframma (iris) cambia dimensione col numero f,
 * i soggetti dentro la zona di fuoco sono nitidi, gli altri si sfocano. Righello in basso.
 */
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
  const blurFor = (d: number) => (inFocus(d) ? 0 : Math.min(6, Math.abs(d - focus) * (11 / f) * 0.5));
  // raggio dell'apertura: ampia a f/1.4, minuscola a f/22
  const irisR = 4 + 22 * Math.min(1, 1.4 / f);

  // soggetto più vicino al piano di fuoco → evidenziato
  let focusIdx = 0;
  SUBJECTS.forEach((d, i) => {
    if (Math.abs(d - focus) < Math.abs(SUBJECTS[focusIdx] - focus)) focusIdx = i;
  });

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.aperture.title')}
    >
      <Backdrop grid={false} />
      <defs>
        {SUBJECTS.map((d, i) => {
          const b = blurFor(d);
          return b > 0 ? (
            <filter key={i} id={`ap-blur-${i}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={b} />
            </filter>
          ) : null;
        })}
      </defs>

      {/* banda della zona a fuoco (dal vicino al lontano) */}
      <rect x={nearX} y={56} width={Math.max(farX - nearX, 2)} height={GROUND_Y - 56} className="dof__band" />
      <text x={(nearX + farX) / 2} y={48} textAnchor="middle" className="scene__tick">
        {t('scene.aperture.inFocus')}
      </text>

      {/* terreno + righello distanze */}
      <line x1={CAM_X} y1={GROUND_Y} x2={SCENE_W - 24} y2={GROUND_Y} className="scene__track" />
      {[1, 2, 4, 8].map((d) => (
        <g key={d}>
          <line x1={scaleX(d)} y1={GROUND_Y - 5} x2={scaleX(d)} y2={GROUND_Y + 5} className="scene__grid" />
          <text x={scaleX(d)} y={GROUND_Y + 20} textAnchor="middle" className="scene__tick">
            {d}m
          </text>
        </g>
      ))}

      {/* piano di fuoco */}
      <line x1={focusX} y1={70} x2={focusX} y2={GROUND_Y} className="dof__focus" />

      {/* soggetti in profondità: nitidi dentro la zona, sfocati fuori */}
      {SUBJECTS.map((d, i) => {
        const x = scaleX(d);
        const persp = 1 / (1 + d * 0.22);
        const h = 150 * persp;
        const w = 30 * persp;
        const headR = 13 * persp;
        const b = blurFor(d);
        const isFocus = i === focusIdx;
        const cls = b > 0 ? 'is-soft' : isFocus ? 'is-subject' : 'is-sharp';
        return (
          <g key={i} filter={b > 0 ? `url(#ap-blur-${i})` : undefined}>
            <rect x={x - w / 2} y={GROUND_Y - h} width={w} height={h - headR} rx={w / 2} className={`obj ${cls}`} />
            <circle cx={x} cy={GROUND_Y - h + headR} r={headR} className={`obj ${cls}`} />
          </g>
        );
      })}

      {/* camera */}
      <g transform={`translate(${CAM_X - 14}, ${GROUND_Y - 16})`} className="scene__cam">
        <rect width={26} height={20} rx={3} />
        <polygon points="26,3 38,-3 38,23 26,17" />
      </g>

      {/* diaframma (iris): grande = apertura ampia, piccolo = chiuso */}
      <g transform={`translate(${SCENE_W - 60}, 60)`}>
        <circle cx={0} cy={0} r={30} className="dial__face" />
        <circle cx={0} cy={0} r={irisR} fill="var(--accent)" />
        <circle cx={0} cy={0} r={irisR} fill="none" stroke="var(--ink)" strokeWidth={1.5} opacity={0.5} />
        <text x={0} y={48} textAnchor="middle" className="scene__tick">
          {formatAperture(f)}
        </text>
      </g>

      <text x={20} y={36} className="scene__label">
        {formatAperture(f)}
      </text>
      <text x={20} y={GROUND_Y + 20} className="scene__label-sm">
        {t('scene.aperture.dof', {
          from: dof.nearM.toFixed(1),
          to: dof.infinity ? '∞' : dof.farM.toFixed(1),
        })}
      </text>
    </svg>
  );
};
