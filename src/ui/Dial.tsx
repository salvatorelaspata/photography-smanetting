import { useRef, type KeyboardEvent } from 'react';
import { indexOfNearest } from '../core/params/stops';

interface DialProps {
  label: string;
  display: string;
  sequence: readonly number[];
  value: number;
  onChange: (v: number) => void;
}

const SWEEP = 270;
const START = -135;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Ghiera rotante accessibile (role=slider): trascinamento, tastiera, touch via pointer events. */
export function Dial({ label, display, sequence, value, onChange }: DialProps) {
  const n = sequence.length;
  const idx = indexOfNearest(value, sequence);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const angleFor = (i: number) => START + (i / (n - 1)) * SWEEP;
  const needle = angleFor(idx) * (Math.PI / 180);

  const setFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    let deg = Math.atan2(dx, -dy) * (180 / Math.PI);
    deg = clamp(deg, START, START + SWEEP);
    const t = (deg - START) / SWEEP;
    onChange(sequence[clamp(Math.round(t * (n - 1)), 0, n - 1)]);
  };

  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      onChange(sequence[clamp(idx + 1, 0, n - 1)]);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      onChange(sequence[clamp(idx - 1, 0, n - 1)]);
      e.preventDefault();
    } else if (e.key === 'Home') {
      onChange(sequence[0]);
      e.preventDefault();
    } else if (e.key === 'End') {
      onChange(sequence[n - 1]);
      e.preventDefault();
    }
  };

  return (
    <div className="control control--dial">
      <span className="control__label">
        {label}
        <span className="control__value">{display}</span>
      </span>
      <svg
        ref={svgRef}
        className="dial"
        viewBox="0 0 100 100"
        width={120}
        height={120}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={n - 1}
        aria-valuenow={idx}
        aria-valuetext={display}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromPointer(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromPointer(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
      >
        {sequence.map((_, i) => {
          const a = angleFor(i) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={50 + Math.sin(a) * 38}
              y1={50 - Math.cos(a) * 38}
              x2={50 + Math.sin(a) * 44}
              y2={50 - Math.cos(a) * 44}
              className={`dial__tick ${i === idx ? 'dial__tick--on' : ''}`}
            />
          );
        })}
        <circle cx={50} cy={50} r={32} className="dial__face" />
        <line
          x1={50}
          y1={50}
          x2={50 + Math.sin(needle) * 26}
          y2={50 - Math.cos(needle) * 26}
          className="dial__needle"
        />
        <circle cx={50} cy={50} r={4} className="dial__hub" />
      </svg>
    </div>
  );
}
