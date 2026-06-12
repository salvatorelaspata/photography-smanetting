import { useId } from 'react';
import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { SCENE_W, SCENE_H, mixHex } from './common';

const BASE_SHUTTER = 1 / 125;
const HORIZON = 168;
const SUN_X = 470;

/**
 * Filtri ND e polarizzatore.
 * ND: taglia luce → tempi più lunghi a parità di esposizione → acqua/nuvole setose (mosso).
 * Polarizzatore (CPL): taglia riflessi e abbagliamento, satura il cielo, rivela il fondale.
 */
export const FiltersScene: RendererComponent = ({ params }) => {
  const t = useT();
  const filter = Math.round(params.filter); // 0 nessuno · 1 ND · 2 polarizzatore
  const strength = Math.min(1, Math.max(0, params.strength ?? 0));
  const uid = useId().replace(/:/g, '');
  const blurId = `silk-${uid}`;
  const skyId = `sky-${uid}`;

  const ndStops = filter === 1 ? Math.round(1 + strength * 9) : 0; // 1..10 stop
  const shutter = BASE_SHUTTER * Math.pow(2, ndStops);
  const silky = filter === 1 ? Math.min(1, ndStops / 10) : 0;

  const cpl = filter === 2 ? strength : 0;
  const glare = 1 - 0.85 * cpl; // riflessi residui
  const skyTop = mixHex('#bcd6f0', '#2f6fb6', cpl);
  const skyHorizon = mixHex('#e3f0fc', '#7fb0dd', cpl);
  const water = mixHex('#48708f', '#2b4d68', cpl);

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.filters.title')}
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyHorizon} />
        </linearGradient>
        <filter id={blurId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={`0 ${silky * 7}`} />
        </filter>
      </defs>

      {/* cielo */}
      <rect x={0} y={0} width={SCENE_W} height={HORIZON} fill={`url(#${skyId})`} />
      <circle cx={SUN_X} cy={54} r={26} fill="#fff3d0" />

      {/* acqua */}
      <rect x={0} y={HORIZON} width={SCENE_W} height={SCENE_H - HORIZON} fill={water} />

      {/* riflesso del sole sull'acqua (abbattuto dal CPL) */}
      <g opacity={glare}>
        <rect x={SUN_X - 22} y={HORIZON} width={44} height={SCENE_H - HORIZON} fill="#fbe6b0" opacity={0.5} />
        <circle cx={SUN_X} cy={HORIZON + 26} r={20} fill="#fdf1c8" opacity={0.7} />
      </g>

      {/* increspature: col CPL i riflessi calano, con l'ND il lungo tempo le rende setose */}
      <g filter={`url(#${blurId})`} opacity={1 - 0.55 * silky}>
        {Array.from({ length: 7 }).map((_, r) => {
          const y = HORIZON + 24 + r * 28;
          return (
            <g key={r} opacity={glare}>
              {Array.from({ length: 5 }).map((_, c) => {
                const x = 30 + c * 130 + (r % 2) * 50;
                return (
                  <line
                    key={c}
                    x1={x}
                    y1={y}
                    x2={x + 70}
                    y2={y}
                    stroke="#cfe0ee"
                    strokeWidth={3}
                    strokeLinecap="round"
                    opacity={0.45}
                  />
                );
              })}
            </g>
          );
        })}
      </g>

      {/* fondale rivelato dal polarizzatore */}
      {cpl > 0.15 && (
        <g opacity={Math.min(0.85, cpl)}>
          <ellipse cx={150} cy={300} rx={34} ry={14} fill="#24414f" />
          <ellipse cx={250} cy={340} rx={26} ry={11} fill="#1f3a47" />
          <ellipse cx={360} cy={310} rx={30} ry={12} fill="#24414f" />
        </g>
      )}

      {/* etichette */}
      <text x={20} y={36} className="scene__label">
        {filter === 1
          ? `ND −${ndStops} stop`
          : filter === 2
            ? t('scene.filters.cpl')
            : t('scene.filters.none')}
      </text>
      <text x={20} y={62} className="scene__label-sm">
        {filter === 1
          ? t('scene.filters.longexp', { shutter: formatShutter(shutter) })
          : filter === 2
            ? t('scene.filters.glare', { pct: Math.round(cpl * 85) })
            : t('scene.filters.baseline', { shutter: formatShutter(BASE_SHUTTER) })}
      </text>

      {filter === 1 && silky > 0.4 && (
        <text x={SCENE_W - 20} y={36} textAnchor="end" className="scene__state is-frozen">
          {t('scene.filters.silky')}
        </text>
      )}
    </svg>
  );
};
