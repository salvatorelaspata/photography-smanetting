import { useEffect, useRef, useState } from 'react';
import type { RendererComponent } from '../types';
import { formatShutter } from '../../core/params/stops';
import { useT } from '../../i18n';
import { usePrefersReducedMotion } from '../../ui/usePrefersReducedMotion';

const W = 640;
const H = 400;
const R = 20;
const TRACK_Y = H / 2;
const MIN_X = 60;
const MAX_X = W - 60;
const FREEZE_THRESHOLD = 8;

/** Scena schematica del tempo di otturazione: soggetto in moto, scia ∝ tempo × velocità. */
export const ShutterScene: RendererComponent = ({ params, derived, animate }) => {
  const t = useT();
  const blurPx = derived.motion?.blurPx ?? 0;
  const reduce = usePrefersReducedMotion();
  const [x, setX] = useState((MIN_X + MAX_X) / 2);
  const dir = useRef(1);

  useEffect(() => {
    if (!animate || reduce) {
      setX((MIN_X + MAX_X) / 2);
      return;
    }
    let raf = 0;
    let prev = 0;
    const tick = (ts: number) => {
      if (!prev) prev = ts;
      const dt = ts - prev;
      prev = ts;
      setX((px) => {
        let nx = px + dir.current * 0.25 * dt;
        if (nx > MAX_X) {
          nx = MAX_X;
          dir.current = -1;
        } else if (nx < MIN_X) {
          nx = MIN_X;
          dir.current = 1;
        }
        return nx;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, reduce]);

  const frozen = blurPx < FREEZE_THRESHOLD;
  const trail = Math.min(blurPx, MAX_X - MIN_X);
  const tailX = x - dir.current * trail;
  const capLeft = Math.min(x, tailX);
  const capWidth = Math.abs(x - tailX);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="scene scene--schematic"
      role="img"
      aria-label={t('demo.shutter.title')}
    >
      <rect x={0} y={0} width={W} height={H} className="scene__bg" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={(i * W) / 10} y1={0} x2={(i * W) / 10} y2={H} className="scene__grid" />
      ))}
      <line x1={0} y1={TRACK_Y} x2={W} y2={TRACK_Y} className="scene__track" />

      {!frozen && (
        <rect
          x={capLeft}
          y={TRACK_Y - R}
          width={Math.max(capWidth, 1)}
          height={R * 2}
          rx={R}
          className="scene__smear"
        />
      )}
      {!frozen &&
        [0.25, 0.5, 0.75].map((f, i) => (
          <circle
            key={i}
            cx={x - dir.current * trail * f}
            cy={TRACK_Y}
            r={R}
            className="scene__ghost"
            style={{ opacity: 0.1 + 0.12 * i }}
          />
        ))}

      <circle
        cx={x}
        cy={TRACK_Y}
        r={R}
        className={`scene__subject ${frozen ? 'is-frozen' : 'is-blur'}`}
      />

      <g className="scene__vector" transform={`translate(${x}, ${TRACK_Y - R - 24})`}>
        <line x1={-28 * dir.current} y1={0} x2={28 * dir.current} y2={0} />
        <polygon
          points={`${28 * dir.current},0 ${20 * dir.current},-5 ${20 * dir.current},5`}
        />
      </g>

      <text x={20} y={36} className="scene__label">
        {formatShutter(params.shutterSeconds)}
      </text>
      <text x={20} y={H - 22} className="scene__label">
        {t('scene.shutter.trail', { px: Math.round(blurPx) })}
      </text>
      <text
        x={W - 20}
        y={36}
        textAnchor="end"
        className={`scene__state ${frozen ? 'is-frozen' : 'is-blur'}`}
      >
        {frozen ? t('state.frozen') : t('state.blur')}
      </text>
    </svg>
  );
};
