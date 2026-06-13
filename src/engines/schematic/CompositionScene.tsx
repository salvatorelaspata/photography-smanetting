import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { SCENE_W, SCENE_H } from './common';
import { THIRDS, PHI_LINES, isAligned, isCentered } from '../../core/composition/grid';

const GOOD = '#46d39a';
const GUIDE = 'rgba(255,255,255,0.45)';

/** Spirale aurea (logaritmica) con occhio su un punto forte. */
function goldenSpiral(): string {
  const k = Math.log(1.618) / (Math.PI / 2);
  const ex = 0.618 * SCENE_W;
  const ey = 0.382 * SCENE_H;
  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const th = (i / 160) * Math.PI * 4.6;
    const r = 3 * Math.exp(k * th);
    pts.push(`${(ex - Math.cos(th) * r).toFixed(1)} ${(ey + Math.sin(th) * r).toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

/**
 * Inquadratura & composizione: posiziona il soggetto e l'orizzonte e prova le griglie
 * (terzi, sezione aurea, spirale, linee guida), con feedback sull'allineamento ai punti forti.
 */
export const CompositionScene: RendererComponent = ({ params }) => {
  const t = useT();
  const guide = Math.round(params.guide); // 0 nessuna · 1 terzi · 2 aureo · 3 spirale · 4 linee guida
  const sx = Math.min(0.94, Math.max(0.06, params.subjectX ?? 0.66));
  const hy = Math.min(0.85, Math.max(0.15, params.horizonY ?? 0.66));

  const subjX = sx * SCENE_W;
  const horizonPx = hy * SCENE_H;

  const lines = guide === 2 ? PHI_LINES : THIRDS;
  const gridV = lines.map((l) => l * SCENE_W);
  const gridH = lines.map((l) => l * SCENE_H);
  const subjAligned = isAligned(sx, lines);
  const horizonAligned = isAligned(hy, lines);
  const centered = isCentered(sx) && isCentered(hy);

  const treeTop = horizonPx - 96;
  const guideName = t(`scene.composition.guide.${guide}`);

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.composition.title')}>
      <defs>
        <linearGradient id="comp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ea6db" />
          <stop offset="100%" stopColor="#cfe2f2" />
        </linearGradient>
      </defs>

      {/* cielo + terra */}
      <rect x={0} y={0} width={SCENE_W} height={horizonPx} fill="url(#comp-sky)" />
      <rect x={0} y={horizonPx} width={SCENE_W} height={SCENE_H - horizonPx} fill="#6b8f55" />
      <circle cx={SCENE_W * 0.18} cy={horizonPx * 0.42} r={22} fill="#fff1c4" />

      {/* soggetto: un albero che poggia sull'orizzonte */}
      <g>
        <rect x={subjX - 5} y={treeTop + 40} width={10} height={horizonPx - (treeTop + 40)} fill="#5b4632" />
        <circle cx={subjX} cy={treeTop + 34} r={30} fill="#33502f" />
        <circle cx={subjX - 16} cy={treeTop + 50} r={20} fill="#3a5c34" />
        <circle cx={subjX + 16} cy={treeTop + 50} r={20} fill="#3a5c34" />
      </g>

      {/* ---- overlay guida ---- */}
      {(guide === 1 || guide === 2) && (
        <g>
          {gridV.map((x, i) => (
            <line key={`v${i}`} x1={x} y1={0} x2={x} y2={SCENE_H} stroke={GUIDE} strokeWidth={1.5} />
          ))}
          {gridH.map((y, i) => (
            <line key={`h${i}`} x1={0} y1={y} x2={SCENE_W} y2={y} stroke={GUIDE} strokeWidth={1.5} />
          ))}
          {/* linee allineate evidenziate */}
          {subjAligned && (
            <line x1={lines.reduce((a, b) => (Math.abs(b - sx) < Math.abs(a - sx) ? b : a)) * SCENE_W} y1={0} x2={lines.reduce((a, b) => (Math.abs(b - sx) < Math.abs(a - sx) ? b : a)) * SCENE_W} y2={SCENE_H} stroke={GOOD} strokeWidth={2.5} />
          )}
          {horizonAligned && (
            <line x1={0} y1={lines.reduce((a, b) => (Math.abs(b - hy) < Math.abs(a - hy) ? b : a)) * SCENE_H} x2={SCENE_W} y2={lines.reduce((a, b) => (Math.abs(b - hy) < Math.abs(a - hy) ? b : a)) * SCENE_H} stroke={GOOD} strokeWidth={2.5} />
          )}
          {/* punti forti */}
          {gridV.map((x) =>
            gridH.map((y) => {
              const near = Math.abs(x - subjX) < 28 && Math.abs(y - horizonPx) < 90;
              return <circle key={`${x}-${y}`} cx={x} cy={y} r={near ? 8 : 5} fill={near ? GOOD : GUIDE} />;
            }),
          )}
        </g>
      )}

      {guide === 3 && <path d={goldenSpiral()} fill="none" stroke={GUIDE} strokeWidth={2} />}

      {guide === 4 && (
        <g stroke={GUIDE} strokeWidth={1.5} fill="none">
          {/* linee guida convergenti verso il soggetto */}
          <line x1={0} y1={SCENE_H} x2={subjX} y2={treeTop + 34} />
          <line x1={SCENE_W} y1={SCENE_H} x2={subjX} y2={treeTop + 34} />
          {/* diagonali del fotogramma */}
          <line x1={0} y1={0} x2={SCENE_W} y2={SCENE_H} strokeDasharray="6 8" opacity={0.5} />
          <line x1={SCENE_W} y1={0} x2={0} y2={SCENE_H} strokeDasharray="6 8" opacity={0.5} />
        </g>
      )}

      {/* etichette */}
      <rect x={0} y={0} width={SCENE_W} height={30} fill="rgba(0,0,0,0.28)" />
      <text x={16} y={20} className="scene__label" fill="#fff">
        {guideName}
      </text>

      <text x={SCENE_W - 16} y={20} textAnchor="end" className={subjAligned ? 'scene__state is-frozen' : 'scene__state is-blur'} style={{ fontSize: 15 }}>
        {subjAligned ? t('scene.composition.onpoint') : centered ? t('scene.composition.centered') : t('scene.composition.free')}
      </text>

      <rect x={0} y={SCENE_H - 28} width={SCENE_W} height={28} fill="rgba(0,0,0,0.28)" />
      <text x={16} y={SCENE_H - 9} className="scene__label-sm" fill="#fff">
        {horizonAligned ? t('scene.composition.horizonThird') : isCentered(hy) ? t('scene.composition.horizonMid') : t('scene.composition.horizonFree')}
      </text>
    </svg>
  );
};
