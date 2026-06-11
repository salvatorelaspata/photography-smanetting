import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const rgb = (v: number) => `rgb(${v},${v},${v})`;

/** Scena del triangolo dell'esposizione: anteprima luminosità + esposimetro + istogramma. */
export const ExposureScene: RendererComponent = ({ derived }) => {
  const t = useT();
  const ex = derived.exposure;
  const dev = ex.stopsFromTarget;
  const cd = clamp(dev, -3, 3);

  const srgb = Math.pow(clamp(ex.displayBrightness, 0, 1), 1 / 2.2);
  const base = Math.round(srgb * 255);
  const highlight = Math.min(255, base + 95);
  const shadow = Math.max(0, base - 95);

  // anteprima
  const PV = { x: 24, y: 60, w: 300, h: SCENE_H - 120 };
  // esposimetro
  const M = { x0: 372, x1: 612, y: 120 };
  const mCenter = (M.x0 + M.x1) / 2;
  const needleX = mCenter + (cd / 3) * ((M.x1 - M.x0) / 2);
  // istogramma
  const H = { x: 372, y: 210, w: 240, h: 150 };
  const sigma = 0.13;
  const mean = 0.5 + cd * 0.14;
  const N = 48;
  const curve = Array.from({ length: N + 1 }, (_, i) => {
    const x = i / N;
    const y = Math.exp(-((x - mean) ** 2) / (2 * sigma * sigma));
    return `${H.x + x * H.w},${H.y + H.h - y * H.h}`;
  }).join(' ');
  const area = `${H.x},${H.y + H.h} ${curve} ${H.x + H.w},${H.y + H.h}`;

  const statusKey = dev > 0.5 ? 'state.over' : dev < -0.5 ? 'state.under' : 'state.correct';

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.triangle.title')}
    >
      <Backdrop grid={false} />

      {/* anteprima luminosità */}
      <rect x={PV.x} y={PV.y} width={PV.w} height={PV.h} rx={8} style={{ fill: rgb(base) }} />
      <circle cx={PV.x + PV.w - 60} cy={PV.y + 56} r={30} style={{ fill: rgb(highlight) }} />
      <g transform={`translate(${PV.x + 120} ${PV.y + PV.h})`}>
        <rect x={-26} y={-104} width={52} height={88} rx={18} style={{ fill: rgb(shadow) }} />
        <circle cx={0} cy={-122} r={24} style={{ fill: rgb(shadow) }} />
      </g>
      <text x={PV.x} y={PV.y - 14} className="scene__label">
        {t('scene.triangle.preview')}
      </text>

      {/* esposimetro */}
      <text x={M.x0} y={M.y - 26} className="scene__label-sm">
        {t('scene.triangle.meter')}
      </text>
      <line x1={M.x0} y1={M.y} x2={M.x1} y2={M.y} className="meter__scale" />
      {[-2, -1, 0, 1, 2].map((s) => {
        const x = mCenter + (s / 3) * ((M.x1 - M.x0) / 2);
        return (
          <g key={s}>
            <line x1={x} y1={M.y - 7} x2={x} y2={M.y + 7} className="meter__tick" />
            <text x={x} y={M.y + 24} textAnchor="middle" className="scene__tick">
              {s > 0 ? `+${s}` : s}
            </text>
          </g>
        );
      })}
      <polygon
        points={`${needleX},${M.y - 16} ${needleX - 7},${M.y - 30} ${needleX + 7},${M.y - 30}`}
        className={`meter__needle ${statusKey === 'state.correct' ? 'is-ok' : 'is-off'}`}
      />

      {/* istogramma */}
      <text x={H.x} y={H.y - 10} className="scene__label-sm">
        {t('scene.triangle.histogram')}
      </text>
      <rect x={H.x} y={H.y} width={H.w} height={H.h} className="histo__box" />
      <polygon points={area} className="histo__fill" />
      <polyline points={curve} className="histo__line" />

      <text x={20} y={36} className="scene__label">
        EV {ex.evAt100.toFixed(1)}
      </text>
      <text
        x={SCENE_W - 20}
        y={36}
        textAnchor="end"
        className={`scene__state ${statusKey === 'state.correct' ? 'is-frozen' : 'is-blur'}`}
      >
        {t(statusKey)}
      </text>
    </svg>
  );
};
