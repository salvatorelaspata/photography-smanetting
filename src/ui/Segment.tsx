import { indexOfNearest } from '../core/params/stops';

interface SegmentProps {
  label: string;
  sequence: readonly number[];
  value: number;
  /** Etichetta di ciascuna opzione. */
  format: (v: number) => string;
  onChange: (v: number) => void;
}

/** Selettore a pulsanti per scelte categoriali (sensore, filtro, modalità, formato…). */
export function Segment({ label, sequence, value, format, onChange }: SegmentProps) {
  const active = indexOfNearest(value, sequence);
  return (
    <div className="control control--segment">
      <span className="control__label">{label}</span>
      <div className="segment" role="group" aria-label={label}>
        {sequence.map((v, i) => (
          <button
            key={v}
            type="button"
            className={`segment__btn ${i === active ? 'segment__btn--on' : ''}`}
            aria-pressed={i === active}
            onClick={() => onChange(v)}
          >
            {format(v)}
          </button>
        ))}
      </div>
    </div>
  );
}
