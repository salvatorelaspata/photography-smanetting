import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useT } from '../i18n';
import { DEMOS, getDemo, getReference } from '../demos/registry';
import { useAppStore } from '../state/store';
import { theoryFor } from '../content/theory';
import { TheorySection } from '../ui/TheorySection';
import { QuizCard } from '../ui/QuizCard';
import { SwitchBar } from '../ui/SwitchBar';
import { DemoView } from '../ui/DemoView';

/** Dettaglio di un concetto: teoria approfondita, demo interattiva, quiz e navigazione del percorso. */
export function ConceptPage() {
  const t = useT();
  const { id = 'shutter' } = useParams();
  const reference = getReference(id);
  const demo = getDemo(id);
  const locale = useAppStore((s) => s.locale);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Concetto solo-teoria (es. spazi colore): teoria + quiz, nessuna demo.
  if (reference) {
    return (
      <article className="concept">
        <Link to="/" className="back-link">
          ← {t('nav.home')}
        </Link>
        <h1 className="concept__title">{t(reference.titleKey)}</h1>

        <section className="concept__section">
          <h2 className="section-title">{t('section.theory')}</h2>
          <TheorySection blocks={theoryFor(reference.id, locale)} />
        </section>

        <QuizCard demoId={reference.id} />

        <nav className="concept-nav">
          <Link className="concept-nav__link" to="/">
            ← {t('nav.home')}
          </Link>
          <span />
          <span />
        </nav>
      </article>
    );
  }

  const blocks = theoryFor(demo.id, locale);
  const idx = DEMOS.findIndex((d) => d.id === demo.id);
  const prev = idx > 0 ? DEMOS[idx - 1] : null;
  const next = idx >= 0 && idx < DEMOS.length - 1 ? DEMOS[idx + 1] : null;

  return (
    <article className="concept">
      <Link to="/" className="back-link">
        ← {t('nav.home')}
      </Link>
      <h1 className="concept__title">{t(demo.titleKey)}</h1>

      <section className="concept__section">
        <h2 className="section-title">{t('section.theory')}</h2>
        <TheorySection blocks={blocks} />
      </section>

      <section className="concept__section">
        <h2 className="section-title">{t('section.demo')}</h2>
        <SwitchBar />
        <DemoView demoId={demo.id} />
      </section>

      <QuizCard demoId={demo.id} />

      <nav className="concept-nav">
        {prev ? (
          <Link className="concept-nav__link" to={`/c/${prev.id}`}>
            ← {t(prev.titleKey)}
          </Link>
        ) : (
          <span />
        )}
        <span className="concept-nav__pos">
          {idx + 1} / {DEMOS.length}
        </span>
        {next ? (
          <Link className="concept-nav__link concept-nav__link--next" to={`/c/${next.id}`}>
            {t(next.titleKey)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
