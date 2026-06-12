import { useParams } from 'react-router-dom';
import { useT } from '../i18n';
import { useAppStore } from '../state/store';
import { EXPLAINERS, sectionsFor } from '../content/anatomy';
import { ScrollExplainer } from '../ui/ScrollExplainer';
import { ReflexScene } from '../engines/three/ReflexScene';
import { SensorScene } from '../engines/three/SensorScene';
import { OpticsScene } from '../engines/three/OpticsScene';

const SCENES: Record<string, typeof ReflexScene> = {
  reflex: ReflexScene,
  sensor: SensorScene,
  optics: OpticsScene,
};

/** Sceglie l'explainer di anatomia in base alla route /anatomia/:id (caricata in lazy). */
export default function AnatomyExplainer() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const { id = 'reflex' } = useParams();
  const def = EXPLAINERS[id] ?? EXPLAINERS.reflex;
  const Scene = SCENES[def.id] ?? ReflexScene;
  return <ScrollExplainer title={t(def.titleKey)} sections={sectionsFor(def.id, locale)} Scene={Scene} />;
}
