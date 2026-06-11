import { Link, useParams } from 'react-router-dom';
import { useT } from '../i18n';
import { getDemo } from '../demos/registry';
import { THEORY } from '../content/theory';
import { TheorySection } from '../ui/TheorySection';
import { SwitchBar } from '../ui/SwitchBar';
import { DemoView } from '../ui/DemoView';

/** Dettaglio di un concetto: prima la teoria approfondita, poi la demo interattiva. */
export function ConceptPage() {
  const t = useT();
  const { id = 'shutter' } = useParams();
  const demo = getDemo(id);
  const blocks = THEORY[demo.id] ?? [];

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
    </article>
  );
}
