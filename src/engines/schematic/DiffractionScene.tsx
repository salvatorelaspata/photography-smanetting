import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture, APERTURES_FULL } from '../../core/params/stops';
import { totalBlurPx, sharpness, sweetSpot } from '../../core/photography/diffraction';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const APS: readonly number[] = APERTURES_FULL;

/** Diffrazione: la nitidezza sale chiudendo il diaframma, poi cala oltre lo sweet spot. */
export const DiffractionScene: RendererComponent = ({ params }) => {
  const t = useT();
  const f = params.apertureFstop;
  const blur = totalBlurPx(f);
  const sharp = sharpness(f);
  const sweet = sweetSpot();

  // curva nitidezza vs apertura
  const C = { x: 60, y: 70, w: SCENE_W - 120, h: 150 };
  const xAt = (i: number) => C.x + (i / (APS.length - 1)) * C.w;
  const yAt = (s: number) => C.y + C.h - s * C.h;
  const curve = APS.map((ap, i) => `${xAt(i)},${yAt(sharpness(ap))}`).join(' ');
  const curIdx = APS.indexOf(f);
  const dotX = curIdx >= 0 ? xAt(curIdx) : xAt(0);

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.diffraction.title')}>
      <Backdrop grid={false} />

      {/* assi + curva */}
      <line x1={C.x} y1={C.y + C.h} x2={C.x + C.w} y2={C.y + C.h} className="scene__track" />
      <polyline points={curve} className="histo__line" />
      <line x1={xAt(APS.indexOf(sweet))} y1={C.y} x2={xAt(APS.indexOf(sweet))} y2={C.y + C.h} className="dof__focus" />
      <circle cx={dotX} cy={yAt(sharp)} r={6} className="obj is-subject" />
      <text x={xAt(APS.indexOf(sweet))} y={C.y - 8} textAnchor="middle" className="scene__tick" style={{ fill: 'var(--accent)' }}>
        {t('scene.diffraction.sweet')}
      </text>

      {/* campione che si ammorbidisce agli estremi */}
      <defs>
        <filter id="dif-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={blur / 3.5} />
        </filter>
      </defs>
      <g filter="url(#dif-blur)" transform={`translate(${SCENE_W / 2 - 90}, ${SCENE_H - 130})`}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={i * 30} y={0} width={14} height={90} fill="#dfe6ee" />
        ))}
      </g>

      <text x={20} y={36} className="scene__label">
        {formatAperture(f)}
      </text>
      <text x={20} y={SCENE_H - 22} className="scene__label-sm">
        {t('scene.diffraction.sharpness', { pct: Math.round(sharp * 100) })}
      </text>
    </svg>
  );
};
