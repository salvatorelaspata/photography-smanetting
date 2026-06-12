import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import { DEMOS, REFERENCES } from '../demos/registry';
import { ConceptCard } from '../ui/ConceptCard';
import { ConceptIcon } from '../ui/ConceptIcon';

/** Pagina iniziale: presentazione + card per ogni concetto. */
export function Landing() {
  const t = useT();
  return (
    <div className="landing">
      <section className="hero">
        <h1 className="hero__title">
          {t('app.title')} <span className="app__subtitle">{t('app.subtitle')}</span>
        </h1>
        <p className="hero__lead">{t('landing.lead')}</p>
      </section>

      <div className="cards">
        {DEMOS.map((d) => (
          <ConceptCard key={d.id} demo={d} />
        ))}

        {REFERENCES.map((r) => (
          <Link key={r.id} to={`/c/${r.id}`} className="card-link">
            <article className="concept-card">
              <div className="concept-card__icon">
                <ConceptIcon id={r.id} />
              </div>
              <h3 className="concept-card__title">{t(r.titleKey)}</h3>
              <p className="concept-card__blurb">{t(`card.${r.id}.blurb`)}</p>
              <span className="concept-card__cta">{t('card.theory')} →</span>
            </article>
          </Link>
        ))}

        <Link to="/anatomia" className="card-link">
          <article className="concept-card concept-card--feature">
            <div className="concept-card__icon" aria-hidden="true">
              <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x={10} y={16} width={28} height={18} rx={3} />
                <circle cx={24} cy={25} r={6} />
                <path d="M18 16 L21 11 L27 11 L30 16" />
              </svg>
            </div>
            <h3 className="concept-card__title">{t('landing.anatomy.title')}</h3>
            <p className="concept-card__blurb">{t('landing.anatomy.blurb')}</p>
            <span className="concept-card__cta">{t('card.open')} →</span>
          </article>
        </Link>
      </div>
    </div>
  );
}
