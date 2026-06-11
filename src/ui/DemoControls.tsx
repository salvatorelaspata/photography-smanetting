import { useT } from '../i18n';
import type { ControlSpec, DemoModule, ParamValues } from '../demos/types';
import { Slider } from './Slider';
import { Dial } from './Dial';

interface DemoControlsProps {
  demo: DemoModule;
  params: ParamValues;
  onChange: (id: string, value: number) => void;
  onPreset: (values: ParamValues) => void;
  onReset: () => void;
}

export function DemoControls({ demo, params, onChange, onPreset, onReset }: DemoControlsProps) {
  const t = useT();

  const display = (c: ControlSpec, v: number): string => {
    if (c.format) return c.format(v);
    if (c.unitKey) return `${v} ${t(c.unitKey)}`;
    return String(v);
  };

  return (
    <div className="controls">
      {demo.controls.map((c) => {
        const value = params[c.id];
        const d = display(c, value);
        if (c.kind === 'dial' && c.sequence) {
          return (
            <Dial
              key={c.id}
              label={t(c.labelKey)}
              display={d}
              sequence={c.sequence}
              value={value}
              onChange={(v) => onChange(c.id, v)}
            />
          );
        }
        return (
          <Slider
            key={c.id}
            label={t(c.labelKey)}
            display={d}
            sequence={c.sequence}
            min={c.min}
            max={c.max}
            step={c.step}
            value={value}
            onChange={(v) => onChange(c.id, v)}
          />
        );
      })}

      {demo.presets && (
        <div className="presets">
          <span className="presets__label">{t('demo.tryThis')}</span>
          {Object.entries(demo.presets).map(([k, p]) => (
            <button key={k} type="button" className="chip" onClick={() => onPreset(p.values)}>
              {t(p.labelKey)}
            </button>
          ))}
          <button type="button" className="chip chip--ghost" onClick={onReset}>
            {t('demo.reset')}
          </button>
        </div>
      )}
    </div>
  );
}
