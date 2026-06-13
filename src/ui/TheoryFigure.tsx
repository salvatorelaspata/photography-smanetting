import type { ReactNode } from 'react';
import { useT } from '../i18n';

/**
 * Libreria di figure SVG didattiche mostrate nei blocchi di teoria.
 * Diagrammi procedurali (niente asset esterni), temati con le variabili CSS,
 * etichette localizzate via i18n (chiavi `fig.*`).
 */

type T = (key: string, params?: Record<string, string | number>) => string;

const ACCENT = 'var(--accent)';
const INK = 'var(--ink)';
const MUTED = 'var(--muted)';
const BORDER = 'var(--border)';
const GOOD = '#46d39a';
const WARN = '#ffb454';
const BAD = '#ff5a5a';
const COOL = '#5a9dff';

/** Etichetta di testo della figura. */
function L({
  x,
  y,
  children,
  anchor = 'start',
  size = 11,
  bold = false,
  fill = MUTED,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  bold?: boolean;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      style={{
        fontSize: size,
        fontWeight: bold ? 700 : 500,
        fill,
        fontFamily: bold ? 'system-ui, sans-serif' : 'ui-monospace, monospace',
      }}
    >
      {children}
    </text>
  );
}

function Svg({ h, label, children }: { h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 320 ${h}`} className="fig__svg" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

type Figure = { cap: string; render: (t: T) => ReactNode };

// Punti deterministici (no Math.random) per il rumore.
function dots(n: number, seed: number) {
  const out: { x: number; y: number }[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const x = (s % 1000) / 1000;
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const y = (s % 1000) / 1000;
    out.push({ x, y });
  }
  return out;
}

const FIGURES: Record<string, Figure> = {
  // ---- Tempo di otturazione: congelato vs mosso ----
  'motion-speeds': {
    cap: 'fig.cap.motion',
    render: (t) => (
      <Svg h={160} label={t('fig.cap.motion')}>
        <line x1={20} y1={55} x2={300} y2={55} stroke={BORDER} strokeWidth={1.5} strokeDasharray="5 6" />
        <circle cx={252} cy={55} r={15} fill={ACCENT} />
        <L x={20} y={32} bold>1/1000 s</L>
        <L x={278} y={36} anchor="end" fill={GOOD} bold>
          {t('fig.sharp')}
        </L>
        <line x1={20} y1={125} x2={300} y2={125} stroke={BORDER} strokeWidth={1.5} strokeDasharray="5 6" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={150 + i * 20} cy={125} r={15} fill={ACCENT} opacity={0.12 + i * 0.13} />
        ))}
        <L x={20} y={102} bold>1/30 s</L>
        <L x={300} y={106} anchor="end" fill={WARN} bold>
          {t('fig.blur')}
        </L>
      </Svg>
    ),
  },

  // ---- Apertura: f = focale / diametro + forme bokeh ----
  'aperture-fnumber': {
    cap: 'fig.cap.aperture',
    render: (t) => (
      <Svg h={170} label={t('fig.cap.aperture')}>
        <line x1={20} y1={70} x2={210} y2={70} stroke={BORDER} strokeWidth={1} />
        {/* lente */}
        <ellipse cx={70} cy={70} rx={10} ry={42} fill="none" stroke={ACCENT} strokeWidth={2} />
        {/* diametro pupilla D */}
        <line x1={48} y1={36} x2={48} y2={104} stroke={INK} strokeWidth={1.5} />
        <line x1={44} y1={36} x2={52} y2={36} stroke={INK} strokeWidth={1.5} />
        <line x1={44} y1={104} x2={52} y2={104} stroke={INK} strokeWidth={1.5} />
        <L x={40} y={70} anchor="end" fill={INK} bold>
          D
        </L>
        {/* piano sensore */}
        <line x1={200} y1={44} x2={200} y2={96} stroke={MUTED} strokeWidth={3} />
        <L x={200} y={112} anchor="middle">
          {t('fig.sensor')}
        </L>
        {/* raggi */}
        <path d="M60 40 L200 70 L60 100" fill="none" stroke={ACCENT} strokeWidth={1} opacity={0.6} />
        {/* focale f */}
        <line x1={70} y1={126} x2={200} y2={126} stroke={INK} strokeWidth={1.2} />
        <L x={135} y={120} anchor="middle" fill={INK}>
          f
        </L>
        <L x={20} y={150} fill={INK} bold>
          N = f / D
        </L>
        {/* forme bokeh */}
        <polygon points="250,40 262,49 257,63 243,63 238,49" fill="none" stroke={MUTED} strokeWidth={1.5} />
        <L x={290} y={56} anchor="end">
          5
        </L>
        <circle cx={250} cy={100} r={13} fill="none" stroke={ACCENT} strokeWidth={1.5} />
        <L x={290} y={104} anchor="end">
          ≈9
        </L>
        <L x={232} y={150}>
          bokeh
        </L>
      </Svg>
    ),
  },

  // ---- ISO / rumore ----
  'iso-noise': {
    cap: 'fig.cap.iso',
    render: (t) => {
      const isos = ['100', '800', '6400', '25600'];
      return (
        <Svg h={140} label={t('fig.cap.iso')}>
          {isos.map((iso, c) => {
            const x = 18 + c * 74;
            const noise = c * 0.9;
            const g = Math.round(120 - c * 10);
            return (
              <g key={iso}>
                <rect x={x} y={20} width={62} height={62} rx={4} fill={`rgb(${g},${g},${g})`} stroke={BORDER} />
                {dots(Math.round(8 + noise * 34), c + 1).map((d, i) => (
                  <circle
                    key={i}
                    cx={x + 4 + d.x * 54}
                    cy={24 + d.y * 54}
                    r={0.9}
                    fill={i % 2 ? '#fff' : '#000'}
                    opacity={0.15 + noise * 0.18}
                  />
                ))}
                <L x={x + 31} y={100} anchor="middle">
                  ISO {iso}
                </L>
              </g>
            );
          })}
          <L x={18} y={126} fill={MUTED}>
            {t('fig.noise')} ≈ √{t('fig.light')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Triangolo dell'esposizione ----
  'exposure-triangle': {
    cap: 'fig.cap.triangle',
    render: (t) => (
      <Svg h={185} label={t('fig.cap.triangle')}>
        <polygon points="160,24 286,160 34,160" fill="none" stroke={ACCENT} strokeWidth={2} />
        <circle cx={160} cy={24} r={5} fill={ACCENT} />
        <circle cx={34} cy={160} r={5} fill={ACCENT} />
        <circle cx={286} cy={160} r={5} fill={ACCENT} />
        <L x={160} y={16} anchor="middle" fill={INK} bold>
          {t('fig.shutter')}
        </L>
        <L x={26} y={176} anchor="start" fill={INK} bold>
          {t('fig.aperture')}
        </L>
        <L x={294} y={176} anchor="end" fill={INK} bold>
          ISO
        </L>
        <L x={160} y={104} anchor="middle" fill={MUTED} size={12} bold>
          EV
        </L>
        <L x={160} y={122} anchor="middle" size={10}>
          Av + Tv = Bv + Sv
        </L>
      </Svg>
    ),
  },

  // ---- Modalità P/A/S/M ----
  'modes-grid': {
    cap: 'fig.cap.modes',
    render: (t) => {
      const rows: [string, string, string][] = [
        ['P', 'AUTO', 'AUTO'],
        ['A', t('fig.you'), 'AUTO'],
        ['S', 'AUTO', t('fig.you')],
        ['M', t('fig.you'), t('fig.you')],
      ];
      return (
        <Svg h={170} label={t('fig.cap.modes')}>
          <L x={70} y={26} anchor="middle" fill={MUTED}>
            {t('fig.aperture')}
          </L>
          <L x={210} y={26} anchor="middle" fill={MUTED}>
            {t('fig.shutter')}
          </L>
          {rows.map((r, i) => {
            const y = 40 + i * 30;
            const cell = (txt: string, cx: number) => {
              const you = txt !== 'AUTO';
              return (
                <>
                  <rect x={cx - 52} y={y} width={104} height={24} rx={6} fill="var(--surface)" stroke={you ? ACCENT : BORDER} strokeWidth={you ? 2 : 1} />
                  <text x={cx} y={y + 16} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: you ? ACCENT : MUTED, fontFamily: 'ui-monospace' }}>
                    {txt}
                  </text>
                </>
              );
            };
            return (
              <g key={r[0]}>
                <L x={18} y={y + 16} fill={INK} bold size={13}>
                  {r[0]}
                </L>
                {cell(r[1], 70)}
                {cell(r[2], 210)}
              </g>
            );
          })}
        </Svg>
      );
    },
  },

  // ---- Modalità di misurazione ----
  'metering-zones': {
    cap: 'fig.cap.metering',
    render: (t) => {
      const frame = (x: number, label: string, inner: ReactNode) => (
        <g>
          <rect x={x} y={20} width={84} height={62} rx={4} fill="var(--surface)" stroke={BORDER} />
          {inner}
          <L x={x + 42} y={100} anchor="middle">
            {label}
          </L>
        </g>
      );
      return (
        <Svg h={120} label={t('fig.cap.metering')}>
          {frame(16, t('fig.spot'), <circle cx={58} cy={51} r={9} fill={ACCENT} opacity={0.8} />)}
          {frame(118, t('fig.center'), <ellipse cx={160} cy={51} rx={26} ry={20} fill={ACCENT} opacity={0.35} />)}
          {frame(220, 'matrix', (
            <g opacity={0.5}>
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <rect key={`${r}-${c}`} x={228 + c * 18} y={28 + r * 17} width={15} height={14} fill={ACCENT} opacity={0.3 + ((r + c) % 2) * 0.25} />
                )),
              )}
            </g>
          ))}
        </Svg>
      );
    },
  },

  // ---- Stabilizzazione: 5 assi + tempo sicuro ----
  'stabilization-axes': {
    cap: 'fig.cap.stab',
    render: (t) => (
      <Svg h={160} label={t('fig.cap.stab')}>
        <rect x={104} y={56} width={112} height={64} rx={8} fill="var(--surface)" stroke={ACCENT} strokeWidth={2} />
        <circle cx={160} cy={88} r={20} fill="none" stroke={MUTED} strokeWidth={2} />
        {/* X / Y */}
        <line x1={70} y1={88} x2={250} y2={88} stroke={COOL} strokeWidth={1.4} markerEnd="" />
        <line x1={160} y1={30} x2={160} y2={146} stroke={COOL} strokeWidth={1.4} />
        <L x={256} y={92} fill={COOL}>X</L>
        <L x={160} y={26} anchor="middle" fill={COOL}>Y</L>
        {/* roll */}
        <path d="M196 70 A18 18 0 1 1 192 64" fill="none" stroke={GOOD} strokeWidth={1.6} />
        <L x={224} y={62} fill={GOOD}>roll</L>
        <L x={30} y={84} fill={MUTED}>pitch</L>
        <L x={30} y={100} fill={MUTED}>yaw</L>
        <L x={16} y={146} fill={INK}>
          {t('fig.safe')}: 1/(f·crop)
        </L>
      </Svg>
    ),
  },

  // ---- Angolo di campo per focale ----
  'angle-of-view': {
    cap: 'fig.cap.aov',
    render: (t) => {
      const apex = { x: 40, y: 90 };
      const cone = (deg: number, len: number, color: string, op: number) => {
        const a = ((deg / 2) * Math.PI) / 180;
        const x = apex.x + Math.cos(a) * len;
        const yUp = apex.y - Math.sin(a) * len;
        const yDn = apex.y + Math.sin(a) * len;
        return (
          <path d={`M${apex.x} ${apex.y} L${x.toFixed(0)} ${yUp.toFixed(0)} M${apex.x} ${apex.y} L${x.toFixed(0)} ${yDn.toFixed(0)}`} stroke={color} strokeWidth={1.6} fill="none" opacity={op} />
        );
      };
      return (
        <Svg h={180} label={t('fig.cap.aov')}>
          {cone(84, 250, ACCENT, 0.4)}
          {cone(47, 250, ACCENT, 0.7)}
          {cone(12, 250, INK, 1)}
          <circle cx={apex.x} cy={apex.y} r={4} fill={INK} />
          <L x={300} y={28} anchor="end" fill={ACCENT}>
            24mm · 84°
          </L>
          <L x={300} y={92} anchor="end" fill={ACCENT}>
            50mm · 47°
          </L>
          <L x={300} y={150} anchor="end" fill={INK}>
            200mm · 12°
          </L>
          <L x={16} y={170}>
            AoV = 2·arctan(d / 2f)
          </L>
        </Svg>
      );
    },
  },

  // ---- "Compressione" = distanza, non focale ----
  compression: {
    cap: 'fig.cap.compression',
    render: (t) => {
      const scene = (y: number, camX: number, mtnScale: number, label: string) => (
        <g>
          {/* sfondo (montagne) */}
          <path
            d={`M250 ${y + 24} l${14 * mtnScale} ${-20 * mtnScale} l${12 * mtnScale} ${16 * mtnScale} l${10 * mtnScale} ${-12 * mtnScale} l${14 * mtnScale} ${16 * mtnScale}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.5}
          />
          {/* soggetto (sempre stessa dimensione) */}
          <circle cx={190} cy={y + 12} r={9} fill={ACCENT} />
          {/* camera */}
          <rect x={camX} y={y + 4} width={16} height={12} rx={2} fill={INK} />
          <line x1={camX + 16} y1={y + 10} x2={184} y2={y + 10} stroke={BORDER} strokeDasharray="3 4" />
          <L x={16} y={y + 2} size={10}>
            {label}
          </L>
        </g>
      );
      return (
        <Svg h={160} label={t('fig.cap.compression')}>
          {scene(26, 30, 0.7, t('fig.near'))}
          {scene(96, 96, 1.5, t('fig.far'))}
        </Svg>
      );
    },
  },

  // ---- Crop factor: formati annidati ----
  'crop-frames': {
    cap: 'fig.cap.crop',
    render: (t) => {
      const cx = 130;
      const cy = 96;
      const ff = { w: 220, h: 146 };
      const rect = (w: number, h: number, color: string, lab: string, ly: number) => (
        <g>
          <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} fill="none" stroke={color} strokeWidth={2} />
          <L x={cx - w / 2 + 4} y={ly} fill={color} size={10}>
            {lab}
          </L>
        </g>
      );
      return (
        <Svg h={196} label={t('fig.cap.crop')}>
          {rect(ff.w, ff.h, ACCENT, 'Full-frame · 50mm', cy - ff.h / 2 + 14)}
          {rect(ff.w / 1.5, ff.h / 1.5, GOOD, 'APS-C 1.5× · 75mm', cy - ff.h / 3 + 14)}
          {rect(ff.w / 2, ff.h / 2, WARN, 'm4/3 2.0× · 100mm', cy - ff.h / 4 + 14)}
          <L x={262} y={96} anchor="end" fill={MUTED} size={10}>
            f × crop
          </L>
        </Svg>
      );
    },
  },

  // ---- Diffrazione: due curve incrociate, sweet spot ----
  'diffraction-curve': {
    cap: 'fig.cap.diffraction',
    render: (t) => {
      const x0 = 36;
      const x1 = 300;
      const y0 = 30;
      const y1 = 130;
      return (
        <Svg h={170} label={t('fig.cap.diffraction')}>
          <line x1={x0} y1={y1} x2={x1} y2={y1} stroke={BORDER} />
          <line x1={x0} y1={y0} x2={x0} y2={y1} stroke={BORDER} />
          {/* aberrazioni: alte a sinistra, calano */}
          <path d={`M${x0} ${y0 + 6} Q120 ${y1} ${x1} ${y1 - 4}`} fill="none" stroke={WARN} strokeWidth={1.8} />
          {/* diffrazione: bassa a sinistra, sale */}
          <path d={`M${x0} ${y1 - 4} Q210 ${y1} ${x1} ${y0 + 8}`} fill="none" stroke={COOL} strokeWidth={1.8} />
          {/* sweet spot */}
          <line x1={150} y1={y0} x2={150} y2={y1} stroke={GOOD} strokeDasharray="4 4" />
          <circle cx={150} cy={y1} r={4} fill={GOOD} />
          <L x={150} y={y0 - 4} anchor="middle" fill={GOOD}>
            sweet spot
          </L>
          <L x={x0} y={y1 + 16}>
            f/2.8
          </L>
          <L x={x1} y={y1 + 16} anchor="end">
            f/22
          </L>
          <L x={44} y={y0 + 6} fill={WARN} size={10}>
            {t('fig.aberration')}
          </L>
          <L x={x1 - 4} y={y0 + 22} anchor="end" fill={COOL} size={10}>
            {t('fig.diffraction')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Ritratto: distanza e deformazione ----
  'portrait-distance': {
    cap: 'fig.cap.portrait',
    render: (t) => (
      <Svg h={160} label={t('fig.cap.portrait')}>
        {/* vicino: naso grande */}
        <rect x={18} y={60} width={14} height={11} rx={2} fill={INK} />
        <ellipse cx={92} cy={78} rx={26} ry={34} fill="none" stroke={WARN} strokeWidth={2} />
        <path d="M92 78 l-22 0" stroke={WARN} strokeWidth={2} />
        <circle cx={70} cy={78} r={3} fill={WARN} />
        <line x1={32} y1={66} x2={70} y2={78} stroke={BORDER} strokeDasharray="3 3" />
        <line x1={32} y1={66} x2={118} y2={78} stroke={BORDER} strokeDasharray="3 3" />
        <L x={70} y={126} anchor="middle" fill={WARN} size={10}>
          {t('fig.near')} · 24mm
        </L>
        {/* lontano: proporzioni naturali */}
        <rect x={196} y={70} width={14} height={11} rx={2} fill={INK} />
        <ellipse cx={272} cy={78} rx={22} ry={28} fill="none" stroke={GOOD} strokeWidth={2} />
        <path d="M272 78 l-14 0" stroke={GOOD} strokeWidth={2} />
        <line x1={210} y1={75} x2={258} y2={78} stroke={BORDER} strokeDasharray="3 3" />
        <line x1={210} y1={75} x2={294} y2={78} stroke={BORDER} strokeDasharray="3 3" />
        <L x={272} y={126} anchor="middle" fill={GOOD} size={10}>
          {t('fig.far')} · 85mm
        </L>
      </Svg>
    ),
  },

  // ---- Iperfocale ----
  hyperfocal: {
    cap: 'fig.cap.hyperfocal',
    render: (t) => (
      <Svg h={130} label={t('fig.cap.hyperfocal')}>
        <line x1={20} y1={70} x2={300} y2={70} stroke={BORDER} strokeWidth={1.5} />
        <rect x={150} y={50} width={150} height={40} fill={GOOD} opacity={0.16} />
        <line x1={150} y1={44} x2={150} y2={96} stroke={GOOD} strokeWidth={2} />
        <circle cx={150} cy={70} r={4} fill={GOOD} />
        <L x={150} y={38} anchor="middle" fill={GOOD}>
          H
        </L>
        <L x={150} y={112} anchor="middle" size={10}>
          H/2
        </L>
        <L x={296} y={112} anchor="end" size={10}>
          ∞
        </L>
        <rect x={20} y={62} width={16} height={16} rx={2} fill={INK} />
        <L x={20} y={40} fill={INK}>
          H = f² / (N·c)
        </L>
      </Svg>
    ),
  },

  // ---- Scala Kelvin + tinta ----
  'kelvin-scale': {
    cap: 'fig.cap.kelvin',
    render: (t) => (
      <Svg h={150} label={t('fig.cap.kelvin')}>
        <defs>
          <linearGradient id="kelv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff9233" />
            <stop offset="45%" stopColor="#ffe9c8" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#6aa6e8" />
          </linearGradient>
          <linearGradient id="tint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ad17a" />
            <stop offset="100%" stopColor="#d15ac0" />
          </linearGradient>
        </defs>
        <rect x={20} y={36} width={280} height={26} rx={4} fill="url(#kelv)" />
        {[
          [38, '1900K', t('fig.candle')],
          [110, '3200K', t('fig.tungsten')],
          [178, '5500K', t('fig.daylight')],
          [262, '8000K', t('fig.shade')],
        ].map(([x, k, name], i) => (
          <g key={i}>
            <line x1={x as number} y1={62} x2={x as number} y2={70} stroke={MUTED} />
            <L x={x as number} y={84} anchor="middle" size={10}>
              {k}
            </L>
            <L x={x as number} y={98} anchor="middle" size={9} fill={MUTED}>
              {name}
            </L>
          </g>
        ))}
        <rect x={20} y={116} width={14} height={26} rx={3} fill="url(#tint)" />
        <L x={42} y={126} size={10} fill={GOOD}>
          green
        </L>
        <L x={42} y={139} size={10} fill="#d15ac0">
          magenta
        </L>
        <L x={300} y={132} anchor="end" size={10}>
          tint
        </L>
      </Svg>
    ),
  },

  // ---- Istogramma + clipping ----
  'histogram-zones': {
    cap: 'fig.cap.histogram',
    render: (t) => {
      const base = 110;
      const bars = [10, 18, 30, 46, 60, 70, 64, 50, 40, 30, 24, 30, 46, 28, 16, 70];
      return (
        <Svg h={150} label={t('fig.cap.histogram')}>
          <line x1={20} y1={base} x2={300} y2={base} stroke={BORDER} />
          {bars.map((b, i) => {
            const x = 22 + i * 17;
            const clip = i === bars.length - 1;
            return <rect key={i} x={x} y={base - b} width={15} height={b} fill={clip ? BAD : ACCENT} opacity={clip ? 0.85 : 0.55} />;
          })}
          <L x={22} y={base + 16} size={10}>
            {t('fig.shadows')}
          </L>
          <L x={298} y={base + 16} anchor="end" size={10} fill={BAD}>
            clipping
          </L>
          <L x={160} y={base + 16} anchor="middle" size={10} fill={MUTED}>
            mid
          </L>
          <L x={20} y={28} size={10} fill={MUTED}>
            {t('fig.histnote')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Panning: arco del fotografo ----
  'panning-arc': {
    cap: 'fig.cap.panning',
    render: (t) => (
      <Svg h={150} label={t('fig.cap.panning')}>
        {/* sfondo strisciato */}
        {[40, 56, 72].map((y, i) => (
          <line key={i} x1={40} y1={y} x2={250} y2={y} stroke={MUTED} strokeWidth={2} strokeDasharray="14 6" opacity={0.4} />
        ))}
        {/* soggetto nitido */}
        <rect x={150} y={44} width={40} height={22} rx={5} fill={ACCENT} />
        <circle cx={160} cy={68} r={5} fill={INK} />
        <circle cx={182} cy={68} r={5} fill={INK} />
        {/* fotografo + arco */}
        <circle cx={160} cy={128} r={6} fill={INK} />
        <path d="M96 110 A70 70 0 0 1 224 110" fill="none" stroke={GOOD} strokeWidth={1.6} strokeDasharray="4 4" />
        <path d="M214 104 l12 4 l-8 9" fill="none" stroke={GOOD} strokeWidth={1.6} />
        <L x={20} y={30}>1/30 s</L>
        <L x={300} y={140} anchor="end" size={10} fill={GOOD}>
          {t('fig.sharp')} + {t('fig.blur')}
        </L>
      </Svg>
    ),
  },

  // ---- Flash & sync: tendina e banda nera ----
  'flash-sync': {
    cap: 'fig.cap.flash',
    render: (t) => {
      const frame = (x: number, lit: number, label: string, color: string) => (
        <g>
          <rect x={x} y={24} width={70} height={52} rx={3} fill="#5a6a86" />
          {lit < 1 && <rect x={x + 70 * lit} y={24} width={70 * (1 - lit)} height={52} fill="#05080c" />}
          <rect x={x} y={24} width={70} height={52} rx={3} fill="none" stroke={BORDER} />
          <L x={x + 35} y={92} anchor="middle" size={10} fill={color}>
            {label}
          </L>
        </g>
      );
      return (
        <Svg h={120} label={t('fig.cap.flash')}>
          {frame(16, 1, '≤ 1/250', GOOD)}
          {frame(124, 0.5, '1/1000', BAD)}
          {frame(232, 1, 'HSS', WARN)}
          {/* pulsazioni HSS */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={238 + i * 13} y1={24} x2={238 + i * 13} y2={76} stroke="#fff" strokeWidth={1} opacity={0.25} />
          ))}
          <L x={160} y={112} anchor="middle" size={10} fill={MUTED}>
            {t('fig.slit')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Polarizzatore: angolo 90° dal sole ----
  'polarizer-angle': {
    cap: 'fig.cap.polarizer',
    render: (t) => (
      <Svg h={170} label={t('fig.cap.polarizer')}>
        {/* cupola del cielo */}
        <path d="M30 150 A130 130 0 0 1 290 150" fill="none" stroke={BORDER} strokeWidth={1.5} />
        {/* sole */}
        <circle cx={64} cy={96} r={12} fill="#ffd166" />
        <L x={64} y={78} anchor="middle" size={10}>
          {t('fig.sun')}
        </L>
        {/* banda 90° max polarizzazione */}
        <path d="M160 20 A130 130 0 0 1 240 132" fill="none" stroke={COOL} strokeWidth={10} opacity={0.3} />
        <L x={224} y={64} anchor="middle" size={10} fill={COOL}>
          90°
        </L>
        <L x={250} y={92} anchor="end" size={9} fill={COOL}>
          {t('fig.maxpol')}
        </L>
        {/* camera */}
        <rect x={150} y={150} width={20} height={14} rx={2} fill={INK} />
      </Svg>
    ),
  },

  // ---- RAW: mosaico di Bayer → demosaicizzazione ----
  'bayer-demosaic': {
    cap: 'fig.cap.raw',
    render: (t) => {
      const bayer = (r: number, c: number) => {
        const even = (r + c) % 2 === 0;
        if (even) return '#3aa655';
        return r % 2 === 0 ? '#c0392b' : '#2f6fb6';
      };
      return (
        <Svg h={150} label={t('fig.cap.raw')}>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`b${r}-${c}`} x={26 + c * 24} y={30 + r * 24} width={23} height={23} fill={bayer(r, c)} opacity={0.85} />
            )),
          )}
          <L x={74} y={140} anchor="middle" size={10}>
            Bayer RGGB
          </L>
          <path d="M134 78 l30 0 m-8 -6 l8 6 l-8 6" fill="none" stroke={INK} strokeWidth={1.6} />
          <L x={150} y={64} anchor="middle" size={9} fill={MUTED}>
            {t('fig.demosaic')}
          </L>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`f${r}-${c}`} x={188 + c * 24} y={30 + r * 24} width={23} height={23} fill="#9aa7b8" opacity={0.8} stroke="#fff" strokeWidth={0.5} />
            )),
          )}
          <L x={236} y={140} anchor="middle" size={10}>
            RGB
          </L>
        </Svg>
      );
    },
  },

  // ---- Gamma dinamica: scala a pioli ----
  'dr-ladder': {
    cap: 'fig.cap.dynamic',
    render: (t) => {
      const x = 120;
      const w = 90;
      const top = 24;
      const stepH = 10;
      return (
        <Svg h={190} label={t('fig.cap.dynamic')}>
          {/* clip alte luci */}
          <rect x={x} y={top} width={w} height={stepH * 2} fill={BAD} opacity={0.5} />
          {/* gamma utile */}
          <rect x={x} y={top + stepH * 2} width={w} height={stepH * 12} fill={GOOD} opacity={0.18} />
          {/* rumore */}
          <rect x={x} y={top + stepH * 14} width={w} height={stepH * 2} fill={MUTED} opacity={0.4} />
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={i} x1={x} y1={top + i * stepH} x2={x + w} y2={top + i * stepH} stroke={BORDER} strokeWidth={0.6} />
          ))}
          <rect x={x} y={top} width={w} height={stepH * 16} fill="none" stroke={BORDER} />
          <L x={x - 8} y={top + 14} anchor="end" size={10} fill={BAD}>
            clip
          </L>
          <L x={x - 8} y={top + stepH * 8} anchor="end" size={10} fill={GOOD}>
            {t('fig.usable')}
          </L>
          <L x={x - 8} y={top + stepH * 15} anchor="end" size={10} fill={MUTED}>
            {t('fig.noise')}
          </L>
          <L x={x + w + 8} y={top + stepH * 2 + 4} size={9}>
            {t('fig.highlights')}
          </L>
          <L x={x + w + 8} y={top + stepH * 14} size={9}>
            {t('fig.shadows')}
          </L>
          <L x={x + w + 8} y={top + stepH * 8} size={10} fill={INK}>
            ~12–14 EV
          </L>
        </Svg>
      );
    },
  },

  // ---- Bracketing: tre istogrammi → uno ampio ----
  'bracketing-merge': {
    cap: 'fig.cap.bracketing',
    render: (t) => {
      const mini = (x: number, shift: number, label: string) => (
        <g>
          <rect x={x} y={40} width={56} height={36} rx={3} fill="var(--surface)" stroke={BORDER} />
          <path
            d={`M${x + 6} 72 q14 ${-28 - 0} 22 0 q8 28 22 0`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.6}
            transform={`translate(${shift},0)`}
            opacity={0.8}
          />
          <L x={x + 28} y={92} anchor="middle" size={10}>
            {label}
          </L>
        </g>
      );
      return (
        <Svg h={150} label={t('fig.cap.bracketing')}>
          {mini(16, -10, '−2 EV')}
          {mini(86, 0, '0')}
          {mini(156, 10, '+2 EV')}
          <path d="M218 64 l22 0 m-8 -6 l8 6 l-8 6" fill="none" stroke={INK} strokeWidth={1.6} />
          <rect x={248} y={40} width={60} height={36} rx={3} fill={GOOD} opacity={0.12} stroke={GOOD} />
          <path d="M252 72 q26 -34 52 0" fill="none" stroke={GOOD} strokeWidth={1.8} />
          <L x={278} y={92} anchor="middle" size={10} fill={GOOD}>
            HDR
          </L>
        </Svg>
      );
    },
  },

  // ---- Spazi colore: ferro di cavallo CIE + triangoli ----
  'color-gamut': {
    cap: 'fig.cap.colorspace',
    render: (t) => {
      // locus spettrale CIE 1931 (x,y) approssimato
      const locus: [number, number][] = [
        [0.175, 0.005], [0.1441, 0.0297], [0.0913, 0.1327], [0.0454, 0.295], [0.0082, 0.5384],
        [0.0139, 0.7502], [0.0743, 0.8338], [0.1547, 0.8059], [0.2296, 0.7543], [0.3016, 0.6923],
        [0.3731, 0.6245], [0.4441, 0.5547], [0.5125, 0.4866], [0.5752, 0.4242], [0.627, 0.3725],
        [0.6915, 0.3083], [0.7347, 0.2653],
      ];
      const X = (x: number) => 30 + x * 330;
      const Y = (y: number) => 210 - y * 230;
      const path = locus.map(([x, y], i) => `${i ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(y).toFixed(1)}`).join(' ') + ' Z';
      const tri = (pts: [number, number][], color: string, w: number, dash?: string) => (
        <polygon points={pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} />
      );
      return (
        <Svg h={224} label={t('fig.cap.colorspace')}>
          <path d={path} fill={ACCENT} opacity={0.06} stroke={MUTED} strokeWidth={1.2} />
          {/* ProPhoto (angoli fuori dal locus) */}
          {tri([[0.7347, 0.2653], [0.1596, 0.8404], [0.0366, 0.0001]], WARN, 1.4, '5 4')}
          {/* Adobe RGB */}
          {tri([[0.64, 0.33], [0.21, 0.71], [0.15, 0.06]], GOOD, 1.5)}
          {/* sRGB */}
          {tri([[0.64, 0.33], [0.3, 0.6], [0.15, 0.06]], ACCENT, 1.8)}
          <circle cx={X(0.3127)} cy={Y(0.329)} r={2.5} fill={INK} />
          <L x={X(0.3127) + 6} y={Y(0.329) + 4} size={9} fill={INK}>
            D65
          </L>
          <L x={250} y={180} anchor="end" size={10} fill={ACCENT}>
            sRGB
          </L>
          <L x={250} y={120} anchor="end" size={10} fill={GOOD}>
            Adobe RGB
          </L>
          <L x={250} y={40} anchor="end" size={10} fill={WARN}>
            ProPhoto
          </L>
          <L x={30} y={220} size={9} fill={MUTED}>
            {t('fig.imaginary')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Regola dei terzi ----
  'rule-of-thirds': {
    cap: 'fig.cap.thirds',
    render: (t) => {
      const fx = 20;
      const fy = 14;
      const fw = 280;
      const fh = 152;
      const vx = [fx + fw / 3, fx + (2 * fw) / 3];
      const hy = [fy + fh / 3, fy + (2 * fh) / 3];
      return (
        <Svg h={186} label={t('fig.cap.thirds')}>
          <rect x={fx} y={fy} width={fw} height={fh} fill="#6ea6db" opacity={0.18} />
          <rect x={fx} y={hy[1]} width={fw} height={fy + fh - hy[1]} fill="#6b8f55" opacity={0.5} />
          {vx.map((x, i) => (
            <line key={`v${i}`} x1={x} y1={fy} x2={x} y2={fy + fh} stroke={MUTED} strokeWidth={1} />
          ))}
          {hy.map((y, i) => (
            <line key={`h${i}`} x1={fx} y1={y} x2={fx + fw} y2={y} stroke={MUTED} strokeWidth={1} />
          ))}
          {vx.map((x) => hy.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill={MUTED} />))}
          {/* soggetto su un punto forte */}
          <circle cx={vx[1]} cy={hy[0]} r={9} fill={ACCENT} />
          <circle cx={vx[1]} cy={hy[0]} r={13} fill="none" stroke={GOOD} strokeWidth={2} />
          <rect x={fx} y={fy} width={fw} height={fh} fill="none" stroke={BORDER} />
          <L x={vx[1] + 18} y={hy[0] - 8} size={10} fill={GOOD}>
            {t('fig.power')}
          </L>
        </Svg>
      );
    },
  },

  // ---- Sezione aurea: phi grid + spirale ----
  'golden-ratio': {
    cap: 'fig.cap.golden',
    render: (t) => {
      const fx = 20;
      const fy = 14;
      const fw = 280;
      const fh = 152;
      const k = Math.log(1.618) / (Math.PI / 2);
      const ex = fx + 0.618 * fw;
      const ey = fy + 0.382 * fh;
      const pts: string[] = [];
      for (let i = 0; i <= 120; i++) {
        const th = (i / 120) * Math.PI * 3.4;
        const r = 2.2 * Math.exp(k * th);
        pts.push(`${(ex - Math.cos(th) * r).toFixed(1)} ${(ey + Math.sin(th) * r).toFixed(1)}`);
      }
      return (
        <Svg h={186} label={t('fig.cap.golden')}>
          <rect x={fx} y={fy} width={fw} height={fh} fill={ACCENT} opacity={0.05} />
          {[0.382, 0.618].map((f, i) => (
            <line key={`v${i}`} x1={fx + f * fw} y1={fy} x2={fx + f * fw} y2={fy + fh} stroke={MUTED} strokeWidth={1} />
          ))}
          {[0.382, 0.618].map((f, i) => (
            <line key={`h${i}`} x1={fx} y1={fy + f * fh} x2={fx + fw} y2={fy + f * fh} stroke={MUTED} strokeWidth={1} />
          ))}
          <path d={'M' + pts.join(' L')} fill="none" stroke={WARN} strokeWidth={1.8} />
          <rect x={fx} y={fy} width={fw} height={fh} fill="none" stroke={BORDER} />
          <L x={fx + 6} y={fy + fh + 16} size={10} fill={WARN}>
            φ ≈ 1,618 · 0,382 / 0,618
          </L>
        </Svg>
      );
    },
  },

  // ---- Linee guida + spazio di lettura ----
  'leading-lines': {
    cap: 'fig.cap.leading',
    render: (t) => {
      const fx = 20;
      const fy = 14;
      const fw = 280;
      const fh = 152;
      const subj = { x: fx + (2 * fw) / 3, y: fy + fh / 3 };
      return (
        <Svg h={186} label={t('fig.cap.leading')}>
          <rect x={fx} y={fy} width={fw} height={fh} fill="#6ea6db" opacity={0.14} />
          <rect x={fx} y={fy + (2 * fh) / 3} width={fw} height={fh / 3} fill="#6b8f55" opacity={0.45} />
          {/* linee guida convergenti */}
          <line x1={fx} y1={fy + fh} x2={subj.x} y2={subj.y} stroke={MUTED} strokeWidth={1.5} />
          <line x1={fx + fw} y1={fy + fh} x2={subj.x} y2={subj.y} stroke={MUTED} strokeWidth={1.5} />
          {/* soggetto */}
          <circle cx={subj.x} cy={subj.y} r={9} fill={ACCENT} />
          {/* spazio di lettura davanti al soggetto */}
          <path d={`M${subj.x - 16} ${subj.y} l-30 0 m8 -5 l-8 5 l8 5`} fill="none" stroke={GOOD} strokeWidth={1.6} />
          <L x={subj.x + 16} y={subj.y - 6} size={10} fill={GOOD}>
            {t('fig.subject')}
          </L>
          <rect x={fx} y={fy} width={fw} height={fh} fill="none" stroke={BORDER} />
          <L x={fx + 6} y={fy + fh + 16} size={10}>
            {t('fig.leadroom')}
          </L>
        </Svg>
      );
    },
  },
};

/** Rende una figura didattica per id (niente se l'id è sconosciuto). */
export function TheoryFigure({ id }: { id: string }) {
  const t = useT();
  const fig = FIGURES[id];
  if (!fig) return null;
  return (
    <figure className="theory__figure">
      {fig.render(t)}
      <figcaption className="theory__figcap">{t(fig.cap)}</figcaption>
    </figure>
  );
}
