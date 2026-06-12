import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import { EXPLAINER_LIST } from '../content/anatomy';

function AnatomyIcon({ id }: { id: string }) {
  if (id === 'sensor') {
    return (
      <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x={9} y={9} width={30} height={30} rx={2} />
        {[18, 24, 30].map((y) =>
          [18, 24, 30].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill="currentColor" stroke="none" />),
        )}
      </svg>
    );
  }
  if (id === 'optics') {
    return (
      <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
        <ellipse cx={24} cy={24} rx={9} ry={15} />
        <ellipse cx={24} cy={24} rx={15} ry={9} />
      </svg>
    );
  }
  return (
    <svg className="cicon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x={10} y={16} width={28} height={18} rx={3} />
      <circle cx={24} cy={25} r={6} />
      <path d="M18 16 L21 11 L27 11 L30 16" />
    </svg>
  );
}

/** Indice della sezione Anatomia: card verso i tre explainer 3D. */
export function AnatomyIndex() {
  const t = useT();
  return (
    <div className="landing">
      <section className="hero">
        <Link to="/" className="back-link">
          ← {t('nav.home')}
        </Link>
        <h1 className="hero__title">{t('anatomy.index.title')}</h1>
        <p className="hero__lead">{t('anatomy.index.lead')}</p>
      </section>
      <div className="cards">
        {EXPLAINER_LIST.map((e) => (
          <Link key={e.id} to={`/anatomia/${e.id}`} className="card-link">
            <article className="concept-card">
              <div className="concept-card__icon">
                <AnatomyIcon id={e.id} />
              </div>
              <h3 className="concept-card__title">{t(e.titleKey)}</h3>
              <p className="concept-card__blurb">{t(`anatomy.${e.id}.blurb`)}</p>
              <span className="concept-card__cta">{t('card.open')} →</span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
