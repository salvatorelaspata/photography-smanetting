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

/** Monta la scena schematica della demo, con il toggle play/pausa per le scene animate. */
export function EngineHost({ demo, params, derived, animate, onToggleAnimate }: EngineHostProps) {
  const t = useT();
  const Scene = demo.scene;

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
      <Scene params={params} derived={derived} animate={animate} />
    </div>
  );
}
