import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Scena istogramma/metering: zone tonali che clippano + istogramma che si sposta con la compensazione. */
export const HistogramScene: RendererComponent = ({ derived }) => {
  const t = useT();
  const comp = derived.exposure.stopsFromTarget;
  const gain = Math.pow(2, comp);

  // strip di zone tonali, schiarite dalla compensazione
  const ZONES = 9;
  const zones = Array.from({ length: ZONES }, (_, i) => {
    const tone = i / (ZONES - 1);
    const v = clamp(tone * gain, 0, 1);
    return { v, clipHigh: tone * gain >= 1 && tone > 0, clipLow: tone * gain <= 0.02 && tone < 1 };
  });

  // istogramma gaussiano spostato dalla compensazione
  const H = { x: 60, y: 250, w: SCENE_W - 120, h: 110 };
  const cd = clamp(comp, -3, 3);
  const mean = clamp(0.5 + cd * 0.14, 0.02, 0.98);
  const sigma = 0.13;
  const N = 56;
  const curve = Array.from({ length: N + 1 }, (_, i) => {
    const x = i / N;
    const y = Math.exp(-((x - mean) ** 2) / (2 * sigma * sigma));
    return `${H.x + x * H.w},${H.y + H.h - y * H.h}`;
  }).join(' ');
  const area = `${H.x},${H.y + H.h} ${curve} ${H.x + H.w},${H.y + H.h}`;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.hist.title')}>
      <Backdrop grid={false} />

      {zones.map((z, i) => {
        const w = (SCENE_W - 80) / ZONES;
        const x = 40 + i * w;
        const g = Math.round(z.v * 255);
        return (
          <g key={i}>
            <rect x={x} y={60} width={w - 4} height={150} style={{ fill: `rgb(${g},${g},${g})` }} />
            {z.clipHigh && <rect x={x} y={60} width={w - 4} height={150} fill="none" stroke="#ff5a5a" strokeWidth={4} />}
            {z.clipLow && <rect x={x} y={60} width={w - 4} height={150} fill="none" stroke="#5a9dff" strokeWidth={4} />}
          </g>
        );
      })}

      <rect x={H.x} y={H.y} width={H.w} height={H.h} className="histo__box" />
      <polygon points={area} className="histo__fill" />
      <polyline points={curve} className="histo__line" />
      <line x1={H.x + H.w / 2} y1={H.y} x2={H.x + H.w / 2} y2={H.y + H.h} className="scene__grid" />

      <text x={20} y={36} className="scene__label">
        {comp >= 0 ? `+${comp.toFixed(1)}` : comp.toFixed(1)} EV
      </text>
      <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__label-sm">
        {t('scene.hist.clip')}
      </text>
    </svg>
  );
};
