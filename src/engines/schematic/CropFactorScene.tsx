import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SENSORS, cropFactor } from '../../core/photography/sensor';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const BASE_W = SCENE_W - 120;
const BASE_H = SCENE_H - 110;

/** Crop factor: a parità di focale, sensori più piccoli inquadrano un riquadro più stretto. */
export const CropFactorScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const sensorIndex = Math.round(params.sensorIndex);
  const focal = params.focalLengthMm;
  const selected = SENSORS[sensorIndex] ?? SENSORS[0];
  const crop = derived.fov?.cropFactor ?? cropFactor(selected);
  const cx = SCENE_W / 2;
  const cy = (SCENE_H + 30) / 2;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.crop.title')}>
      <Backdrop grid={false} />

      {/* "scena" di sfondo */}
      <rect x={cx - BASE_W / 2} y={cy - BASE_H / 2} width={BASE_W} height={BASE_H} fill="#1d2733" />
      <circle cx={cx + BASE_W / 4} cy={cy - BASE_H / 4} r={26} fill="#3a4a63" />
      <rect x={cx - BASE_W / 2} y={cy + BASE_H / 6} width={BASE_W} height={BASE_H / 3} fill="#22303f" />
      <circle cx={cx} cy={cy} r={22} className="obj is-subject" />

      {/* riquadri annidati: uno per sensore (dimensione ∝ 1/crop) */}
      {SENSORS.map((s, i) => {
        const k = cropFactor(s);
        const w = BASE_W / k;
        const h = BASE_H / k;
        const on = i === sensorIndex;
        return (
          <g key={s.name}>
            <rect
              x={cx - w / 2}
              y={cy - h / 2}
              width={w}
              height={h}
              fill="none"
              className={on ? 'dof__focus' : 'scene__grid'}
              strokeWidth={on ? 3 : 1.5}
            />
            <text x={cx - w / 2 + 6} y={cy - h / 2 + 18} className="scene__tick" style={on ? { fill: 'var(--accent)' } : undefined}>
              {s.name}
            </text>
          </g>
        );
      })}

      <text x={20} y={36} className="scene__label">
        {focal}mm · {selected.name}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {t('scene.crop.equiv', { crop: crop.toFixed(2), eq: Math.round(focal * crop) })}
      </text>
    </svg>
  );
};
