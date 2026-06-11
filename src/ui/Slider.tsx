import { indexOfNearest } from '../core/params/stops';

interface SliderProps {
  label: string;
  display: string;
  value: number;
  onChange: (v: number) => void;
  /** Se presente, lo slider si muove sugli indici della sequenza (snap agli stop). */
  sequence?: readonly number[];
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({
  label,
  display,
  value,
  onChange,
  sequence,
  min = 0,
  max = 100,
  step = 1,
}: SliderProps) {
  const head = (
    <span className="control__label">
      {label}
      <span className="control__value">{display}</span>
    </span>
  );

  if (sequence) {
    return (
      <label className="control">
        {head}
        <input
          type="range"
          className="control__range"
          min={0}
          max={sequence.length - 1}
          step={1}
          value={indexOfNearest(value, sequence)}
          aria-valuetext={display}
          onChange={(e) => onChange(sequence[Number(e.target.value)])}
        />
      </label>
    );
  }

  return (
    <label className="control">
      {head}
      <input
        type="range"
        className="control__range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
