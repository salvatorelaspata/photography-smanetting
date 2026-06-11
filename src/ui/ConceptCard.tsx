import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import type { DemoModule } from '../demos/types';
import { ConceptIcon } from './ConceptIcon';

/** Card di accesso a un concetto nella landing. */
export function ConceptCard({ demo }: { demo: DemoModule }) {
  const t = useT();
  return (
    <Link to={`/c/${demo.id}`} className="card-link">
      <article className="concept-card">
        <div className="concept-card__icon">
          <ConceptIcon id={demo.id} />
        </div>
        <h3 className="concept-card__title">{t(demo.titleKey)}</h3>
        <p className="concept-card__blurb">{t(`card.${demo.id}.blurb`)}</p>
        <span className="concept-card__cta">{t('card.open')} →</span>
      </article>
    </Link>
  );
}
