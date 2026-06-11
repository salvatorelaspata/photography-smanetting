import { useT } from '../i18n';
import type { DemoModule } from '../demos/types';
import type { DerivedPhysics } from '../engines/types';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="readout__item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

/** Pannello-lezione: spiegazione, punti chiave e lettura dei valori derivati pertinenti. */
export function LessonPanel({ demo, derived }: { demo: DemoModule; derived: DerivedPhysics }) {
  const t = useT();
  const { exposure, motion, dof, fov, noise } = derived;

  return (
    <aside className="lesson">
      <p className="lesson__intro">{t(demo.lesson.introKey)}</p>
      <ul className="lesson__points">
        {demo.lesson.pointKeys.map((k) => (
          <li key={k}>{t(k)}</li>
        ))}
      </ul>
      <dl className="readout">
        <Stat label={t('readout.ev')} value={`EV ${exposure.evAt100.toFixed(1)}`} />
        {motion && <Stat label={t('readout.trail')} value={`${Math.round(motion.blurPx)} px`} />}
        {motion && (
          <Stat
            label={t('readout.state')}
            value={motion.blurPx < 8 ? t('state.frozen') : t('state.blur')}
          />
        )}
        {dof && (
          <Stat
            label={t('readout.dof')}
            value={`${dof.nearM.toFixed(1)}–${dof.infinity ? '∞' : dof.farM.toFixed(1)} m`}
          />
        )}
        {fov && <Stat label={t('readout.aov')} value={`${Math.round(fov.diagonalDeg)}°`} />}
        {fov && <Stat label={t('readout.crop')} value={`×${fov.cropFactor.toFixed(2)}`} />}
        {noise && <Stat label={t('readout.snr')} value={`${Math.round(noise.snrDb)} dB`} />}
      </dl>
    </aside>
  );
}
