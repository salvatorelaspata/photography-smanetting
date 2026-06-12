import type { RendererComponent } from '../types';
import { useT } from '../../i18n';
import { formatAperture, formatShutter } from '../../core/params/stops';
import { resolveMode, MODES, TEACHING_EV, type CameraMode } from '../../core/photography/exposureModes';
import { SCENE_W, SCENE_H } from './common';

const MODE_LABELS: Record<CameraMode, string> = { P: 'P', A: 'A', S: 'S', M: 'M' };

/** Chip di un valore di scatto: bordo acceso se lo imposti tu, verde "AUTO" se lo sceglie la camera. */
function ValueChip({
  x,
  label,
  value,
  auto,
  autoText,
  youText,
}: {
  x: number;
  label: string;
  value: string;
  auto: boolean;
  autoText: string;
  youText: string;
}) {
  const w = 150;
  return (
    <g transform={`translate(${x}, 150)`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={96}
        rx={10}
        fill="var(--surface)"
        stroke={auto ? '#46d39a' : 'var(--accent)'}
        strokeWidth={2.5}
      />
      <text x={w / 2} y={26} textAnchor="middle" className="scene__label-sm">
        {label}
      </text>
      <text x={w / 2} y={60} textAnchor="middle" className="scene__label" style={{ fontSize: 26 }}>
        {value}
      </text>
      <text
        x={w / 2}
        y={84}
        textAnchor="middle"
        style={{ fontSize: 12, fontWeight: 700, fill: auto ? '#46d39a' : 'var(--accent)' }}
      >
        {auto ? autoText : youText}
      </text>
    </g>
  );
}

/** Modalità P/A/S/M: cosa imposti tu e cosa calcola la camera per centrare l'esposizione. */
export const ModesScene: RendererComponent = ({ params, derived }) => {
  const t = useT();
  const mode = MODES[Math.round(params.mode)] ?? 'M';
  const r = resolveMode({
    mode,
    apertureFstop: params.aperture,
    shutterSeconds: params.shutter,
    targetEv100: TEACHING_EV,
  });

  const dev = derived.exposure.stopsFromTarget; // <0 sotto, >0 sovra
  const needle = Math.min(2, Math.max(-2, dev));
  const meterX = SCENE_W / 2 + (needle / 2) * 150;
  const ok = Math.abs(dev) < 0.34;

  const autoText = t('scene.modes.auto');
  const youText = t('scene.modes.you');

  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="scene scene--schematic" role="img" aria-label={t('demo.modes.title')}>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} className="scene__bg" />

      {/* ghiera modalità */}
      <g transform="translate(54, 70)">
        <circle cx={0} cy={0} r={34} fill="var(--surface)" stroke="var(--border)" strokeWidth={2} />
        <text x={0} y={11} textAnchor="middle" style={{ fontSize: 30, fontWeight: 800, fill: 'var(--accent)' }}>
          {MODE_LABELS[mode]}
        </text>
      </g>
      <text x={104} y={60} className="scene__label">
        {t(`scene.modes.name.${mode}`)}
      </text>
      <text x={104} y={86} className="scene__label-sm">
        {t(`scene.modes.desc.${mode}`)}
      </text>

      {/* chip dei tre parametri */}
      <ValueChip x={40} label={t('scene.modes.aperture')} value={formatAperture(r.apertureFstop)} auto={r.apertureAuto} autoText={autoText} youText={youText} />
      <ValueChip x={245} label={t('scene.modes.shutter')} value={formatShutter(r.shutterSeconds)} auto={r.shutterAuto} autoText={autoText} youText={youText} />
      <ValueChip x={450} label="ISO" value="100" auto={false} autoText={autoText} youText={youText} />

      {/* esposimetro */}
      <g transform="translate(0, 300)">
        <line x1={SCENE_W / 2 - 150} y1={40} x2={SCENE_W / 2 + 150} y2={40} stroke="var(--border)" strokeWidth={3} />
        {[-2, -1, 0, 1, 2].map((s) => (
          <line
            key={s}
            x1={SCENE_W / 2 + (s / 2) * 150}
            y1={s === 0 ? 28 : 34}
            x2={SCENE_W / 2 + (s / 2) * 150}
            y2={s === 0 ? 52 : 46}
            stroke="var(--muted)"
            strokeWidth={2}
          />
        ))}
        <polygon
          points={`${meterX},22 ${meterX - 8},6 ${meterX + 8},6`}
          fill={ok ? '#46d39a' : '#ffb454'}
        />
        <text x={SCENE_W / 2} y={78} textAnchor="middle" className={ok ? 'scene__state is-frozen' : 'scene__state is-blur'} style={{ fontSize: 16 }}>
          {ok ? t('scene.modes.correct') : t('scene.modes.off', { ev: (dev > 0 ? '+' : '') + dev.toFixed(1) })}
        </text>
      </g>
    </svg>
  );
};
