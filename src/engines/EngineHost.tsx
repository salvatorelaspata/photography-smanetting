import { useAppStore } from '../state/store';
import { useT } from '../i18n';
import type { DemoModule } from '../demos/types';
import type { DerivedPhysics, ParamValues } from './types';

interface EngineHostProps {
  demo: DemoModule;
  params: ParamValues;
  derived: DerivedPhysics;
  animate: boolean;
  onToggleAnimate: () => void;
}

/** Risolve l'engine selezionato per la demo, con fallback dichiarato e badge. */
export function EngineHost({ demo, params, derived, animate, onToggleAnimate }: EngineHostProps) {
  const t = useT();
  const approach = useAppStore((s) => s.approach);
  const style = useAppStore((s) => s.style);

  const Renderer = demo.renderers[approach] ?? demo.renderers[demo.fallback];
  const fellBack = !demo.renderers[approach];
  const size = { width: 640, height: 400 };

  return (
    <div className="stage">
      {demo.animated && (
        <button
          type="button"
          className="stage__toggle"
          aria-pressed={animate}
          aria-label={t(animate ? 'anim.pause' : 'anim.play')}
          onClick={onToggleAnimate}
        >
          {animate ? '⏸' : '▶'}
        </button>
      )}
      {Renderer ? (
        <Renderer params={params} derived={derived} style={style} size={size} animate={animate} />
      ) : (
        <div className="stage__empty">—</div>
      )}
      {fellBack && (
        <div className="stage__badge" role="status">
          {t('engine.fallback', {
            from: t(`switch.approach.${approach}`),
            to: t(`switch.approach.${demo.fallback}`),
          })}
        </div>
      )}
    </div>
  );
}
