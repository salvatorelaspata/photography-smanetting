import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useT } from '../i18n';
import { getDemo, getReference, pathNeighbors, PATH } from '../demos/registry';
import { useAppStore } from '../state/store';
import { theoryFor } from '../content/theory';
import { TheorySection } from '../ui/TheorySection';
import { QuizCard } from '../ui/QuizCard';
import { DemoView } from '../ui/DemoView';

/** Navigazione prev/next del percorso, condivisa da demo e approfondimenti. */
function ConceptNav({ id }: { id: string }) {
  const t = useT();
  const { prev, next } = pathNeighbors(id);
  const pos = PATH.findIndex((p) => p.id === id);
  return (
    <nav className="concept-nav">
      {prev ? (
        <Link className="concept-nav__link" to={`/c/${prev.id}`}>
          ← {t(prev.titleKey)}
        </Link>
      ) : (
        <Link className="concept-nav__link" to="/">
          ← {t('nav.home')}
        </Link>
      )}
      <span className="concept-nav__pos">
        {pos + 1} / {PATH.length}
      </span>
      {next ? (
        <Link className="concept-nav__link concept-nav__link--next" to={`/c/${next.id}`}>
          {t(next.titleKey)} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

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

        <ConceptNav id={reference.id} />
      </article>
    );
  }

  const blocks = theoryFor(demo.id, locale);

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
        <DemoView demoId={demo.id} />
      </section>

      <QuizCard demoId={demo.id} />

      <ConceptNav id={demo.id} />
    </article>
  );
}
