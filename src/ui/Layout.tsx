import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n';

/** Cornice comune: barra superiore, contenuto, piè di pagina. */
export function Layout({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="topbar__brand">
          {t('app.title')}
        </Link>
        <span className="topbar__tag">{t('app.subtitle')}</span>
      </header>
      <main className="app__main">{children}</main>
      <footer className="app__footer dim">{t('footer.note')}</footer>
    </div>
  );
}
