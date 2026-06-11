import { useEffect, useRef, useState } from 'react';
import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatShutter } from '../../core/params/stops';
import { usePrefersReducedMotion } from '../../ui/usePrefersReducedMotion';
import { SCENE_W, SCENE_H } from '../schematic/common';

const R = 22;
const TRACK_Y = SCENE_H / 2;
const MIN_X = 60;
const MAX_X = SCENE_W - 60;

/** 2.5D: mosso come blur direzionale (feGaussianBlur orizzontale) ∝ scia. */
export const ShutterLayered: RendererComponent = ({ params, derived, animate }) => {
  const t = useT();
  const reduce = usePrefersReducedMotion();
  const blurPx = derived.motion?.blurPx ?? 0;
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
      const dt = Math.min(ts - prev, 50);
      prev = ts;
      setX((px) => {
        let nx = px + dir.current * 0.28 * dt;
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

  const mblur = Math.min(40, blurPx / 8);

  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className="scene scene--layered"
      role="img"
      aria-label={t('demo.shutter.title')}
    >
      <defs>
        <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#243044" />
          <stop offset="100%" stopColor="#3a4a60" />
        </linearGradient>
        <filter id="sh-mblur" x="-60%" y="-20%" width="220%" height="140%">
          <feGaussianBlur stdDeviation={`${mblur} 0`} />
        </filter>
      </defs>

      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} fill="url(#sh-sky)" />
      <rect x={0} y={TRACK_Y + 60} width={SCENE_W} height={SCENE_H - TRACK_Y - 60} fill="#222c3a" />
      {[-2.2, 0, 2.2].map((mult, i) => (
        <rect
          key={i}
          x={SCENE_W / 2 + mult * 120 - 4}
          y={TRACK_Y + 18}
          width={8}
          height={44}
          fill="#2d3a4c"
        />
      ))}

      <g filter="url(#sh-mblur)">
        <circle cx={x} cy={TRACK_Y} r={R} fill="#52e0c4" />
      </g>

      <text x={20} y={34} className="scene__label">
        {formatShutter(params.shutterSeconds)}
      </text>
      <text x={20} y={SCENE_H - 22} className="scene__label-sm">
        {t('scene.shutter.trail', { px: Math.round(blurPx) })}
      </text>
    </svg>
  );
};
