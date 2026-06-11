import { useT } from '../i18n';
import { useAppStore } from '../state/store';
import { DEMOS } from '../demos/registry';
import { SwitchBar } from './SwitchBar';
import { DemoView } from './DemoView';

/** Guscio dell'app: header, switch globali, navigazione concetti, demo corrente. */
export function Shell() {
  const t = useT();
  const demoId = useAppStore((s) => s.currentDemoId);
  const setCurrentDemo = useAppStore((s) => s.setCurrentDemo);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          {t('app.title')} <span className="app__subtitle">{t('app.subtitle')}</span>
        </h1>
        <p className="app__tagline">{t('app.tagline')}</p>
      </header>

      <SwitchBar />

      <nav className="demos-nav" aria-label={t('demos.nav.label')}>
        {DEMOS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`chip ${d.id === demoId ? 'chip--on' : ''}`}
            aria-pressed={d.id === demoId}
            onClick={() => setCurrentDemo(d.id)}
          >
            {t(d.titleKey)}
          </button>
        ))}
      </nav>

      <main className="app__main">
        <DemoView demoId={demoId} />
      </main>

      <footer className="app__footer dim">
        Milestone M2 · vedi <code>docs/ROADMAP.md</code>
      </footer>
    </div>
  );
}
