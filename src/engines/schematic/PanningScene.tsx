import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { SCENE_W, SCENE_H, Backdrop } from './common';

const TRACK_Y = SCENE_H / 2;
const POSTS = [80, 180, 280, 460, 560];

/** Panning: il soggetto resta nitido mentre lo sfondo si striscia ∝ scia. */
export const PanningScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const blur = Math.min(derived.motion?.blurPx ?? 0, 260);
  const subjectX = SCENE_W / 2;

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.panning.title')}>
      <Backdrop grid={false} />
      <line x1={0} y1={TRACK_Y + 60} x2={SCENE_W} y2={TRACK_Y + 60} className="scene__track" />

      {/* sfondo strisciato: ogni elemento diventa una scia orizzontale ∝ blur */}
      {POSTS.map((x, i) => (
        <rect
          key={i}
          x={x - blur / 2}
          y={TRACK_Y - 70 + (i % 2) * 20}
          width={14 + blur}
          height={90}
          rx={7}
          className="scene__smear"
        />
      ))}

      {/* soggetto nitido */}
      <circle cx={subjectX} cy={TRACK_Y} r={26} className="obj is-subject" />
      <g className="scene__vector" transform={`translate(${subjectX}, ${TRACK_Y - 50})`}>
        <line x1={-34} y1={0} x2={34} y2={0} />
        <polygon points="34,0 26,-5 26,5" />
      </g>

      <text x={20} y={36} className="scene__label">
        {formatShutter(params.shutterSeconds)}
      </text>
      <text x={20} y={SCENE_H - 22} className="scene__label-sm">
        {t('scene.panning.streak', { px: Math.round(derived.motion?.blurPx ?? 0) })}
      </text>
    </svg>
  );
};
