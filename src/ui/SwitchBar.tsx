import { useAppStore } from '../state/store';
import { useT } from '../i18n';
import type { RenderingApproach, VisualStyle } from '../types';

const APPROACHES: RenderingApproach[] = ['three', 'layered', 'schematic'];
const STYLES: VisualStyle[] = ['realistic', 'mixed', 'schematic'];

/** Barra dei 3 switch globali: approccio di rendering, stile visivo, lingua. */
export function SwitchBar() {
  const t = useT();
  const approach = useAppStore((s) => s.approach);
  const style = useAppStore((s) => s.style);
  const setApproach = useAppStore((s) => s.setApproach);
  const setStyle = useAppStore((s) => s.setStyle);

  return (
    <div className="switchbar">
      <fieldset className="switch">
        <legend>{t('switch.approach.label')}</legend>
        <div className="switch__options">
          {APPROACHES.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={approach === a}
              className={`seg ${approach === a ? 'seg--on' : ''}`}
              onClick={() => setApproach(a)}
            >
              {t(`switch.approach.${a}`)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="switch">
        <legend>{t('switch.style.label')}</legend>
        <div className="switch__options">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={style === s}
              className={`seg ${style === s ? 'seg--on' : ''}`}
              onClick={() => setStyle(s)}
            >
              {t(`switch.style.${s}`)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="switch">
        <legend>{t('switch.locale.label')}</legend>
        <div className="switch__options">
          <button type="button" className="seg seg--on" aria-pressed={true}>
            IT
          </button>
        </div>
      </fieldset>
    </div>
  );
}
