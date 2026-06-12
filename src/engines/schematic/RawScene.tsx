import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from './common';

const N = 64; // fettine del gradiente
const PAD = 40;
const BARW = SCENE_W - PAD * 2;

/**
 * RAW vs JPEG: spinta delle ombre in post.
 * Il RAW (12–14 bit) recupera in modo pulito; il JPEG (8 bit) mostra banding,
 * rumore di colore e alte luci bruciate non recuperabili.
 */
export const RawScene: RendererComponent = ({ params }) => {
  const t = useT();
  const raw = Math.round(params.format) === 1; // 0 JPEG · 1 RAW
  const push = Math.min(1, Math.max(0, params.push ?? 0)); // 0..1 → recupero ombre
  const stops = (push * 4).toFixed(1);
  const levels = Math.max(3, Math.round(9 - push * 6)); // livelli effettivi del JPEG spinto
  const sliceW = BARW / N;

  const original: { x: number; v: number }[] = Array.from({ length: N }).map((_, i) => ({
    x: PAD + i * sliceW,
    v: i / (N - 1),
  }));

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.raw.title')}>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} className="scene__bg" />

      {/* scatto originale (uguale per entrambi) */}
      <text x={PAD} y={66} className="scene__label-sm">
        {t('scene.raw.original')}
      </text>
      {original.map((s, i) => {
        const c = Math.round(s.v * 255);
        return <rect key={i} x={s.x} y={76} width={sliceW + 0.5} height={56} fill={`rgb(${c},${c},${c})`} />;
      })}

      {/* dopo aver alzato le ombre in post */}
      <text x={PAD} y={210} className="scene__label-sm">
        {t('scene.raw.pushed', { stops })}
      </text>
      {original.map((s, i) => {
        const lifted = Math.pow(s.v, 1 / (1 + push * 1.2)); // ombre sollevate
        const clipped = s.v > 0.9; // zona alte luci
        let r: number, g: number, b: number;
        if (raw) {
          const v = clipped ? Math.min(0.96, lifted) : lifted; // recupero pulito
          r = g = b = Math.round(v * 255);
        } else {
          // JPEG: quantizzazione (banding) + clipping bianco + rumore di colore nelle ombre
          if (clipped) {
            r = g = b = 255; // bruciato, irrecuperabile
          } else {
            const q = Math.round(lifted * (levels - 1)) / (levels - 1);
            const base = Math.round(q * 255);
            const tint = s.v < 0.4 ? (i % 2 === 0 ? 1 : -1) * Math.round(push * 22) : 0;
            r = Math.min(255, Math.max(0, base + tint));
            g = base;
            b = Math.min(255, Math.max(0, base - tint));
          }
        }
        return <rect key={i} x={s.x} y={220} width={sliceW + 0.5} height={70} fill={`rgb(${r},${g},${b})`} />;
      })}

      {/* etichette */}
      <text x={PAD} y={36} className="scene__label">
        {raw ? t('scene.raw.rawTag') : t('scene.raw.jpegTag')}
      </text>
      <text x={SCENE_W - PAD} y={36} textAnchor="end" className={raw ? 'scene__state is-frozen' : 'scene__state is-blur'} style={{ fontSize: 16 }}>
        {raw ? t('scene.raw.clean') : push > 0.25 ? t('scene.raw.broken') : t('scene.raw.ok')}
      </text>
    </svg>
  );
};
