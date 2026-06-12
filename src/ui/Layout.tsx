import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import { useAppStore } from '../state/store';
import type { Locale } from '../types';

const LOCALES: Locale[] = ['it', 'en'];

/** Cornice comune: skip-link, barra superiore con lingua globale, contenuto, piè di pagina. */
export function Layout({ children }: { children: ReactNode }) {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        {t('skip.toContent')}
      </a>
      <header className="topbar">
        <Link to="/" className="topbar__brand">
          {t('app.title')}
        </Link>
        <span className="topbar__tag">{t('app.subtitle')}</span>
        <div className="topbar__lang" role="group" aria-label={t('switch.locale.label')}>
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              className={`lang ${locale === l ? 'lang--on' : ''}`}
              aria-pressed={locale === l}
              onClick={() => setLocale(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <main id="main" className="app__main">
        {children}
      </main>
      <footer className="app__footer dim">{t('footer.note')}</footer>
    </div>
  );
}
