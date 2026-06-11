import { useT } from '../i18n';
import { useAppStore } from '../state/store';
import { computeExposure } from '../core/photography/exposure';
import { SwitchBar } from './SwitchBar';

/** Guscio dell'app: header, barra switch, area contenuto (placeholder M0). */
export function Shell() {
  const t = useT();
  const approach = useAppStore((s) => s.approach);
  const style = useAppStore((s) => s.style);

  // Prova end-to-end che il core fotografico è incluso nel bundle e calcola davvero.
  const ev = computeExposure({ apertureFstop: 16, shutterSeconds: 1 / 125, iso: 100 }, 15).evAt100;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          {t('app.title')} <span className="app__subtitle">{t('app.subtitle')}</span>
        </h1>
        <p className="app__tagline">{t('app.tagline')}</p>
      </header>

      <SwitchBar />

      <main className="app__main">
        <section className="card">
          <h2 className="card__title">{t('home.placeholder.title')}</h2>
          <p>{t('home.placeholder.body')}</p>
          <p className="muted">
            {t('home.core.label')} — <code>EV {ev.toFixed(2)}</code>{' '}
            <span className="dim">({t('home.core.example')})</span>
          </p>
          <p className="muted">
            Rendering: <code>{approach}</code> · Stile: <code>{style}</code>
          </p>
        </section>
      </main>

      <footer className="app__footer dim">
        Milestone M0–M1 · vedi <code>docs/ROADMAP.md</code>
      </footer>
    </div>
  );
}
