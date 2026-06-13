import type { TheoryBlock } from '../content/theory';
import { useT } from '../i18n';
import { TheoryFigure } from './TheoryFigure';

/** Rende i blocchi di teoria approfondita di un concetto (con tip e figure). */
export function TheorySection({ blocks }: { blocks: TheoryBlock[] }) {
  const t = useT();
  return (
    <div className="theory">
      {blocks.map((b, i) => (
        <section className="theory__block" key={i}>
          <h3 className="theory__heading">{b.heading}</h3>
          {b.paragraphs.map((p, j) => (
            <p className="theory__p" key={j}>
              {p}
            </p>
          ))}
          {b.points && (
            <ul className="theory__points">
              {b.points.map((pt, k) => (
                <li key={k}>{pt}</li>
              ))}
            </ul>
          )}
          {b.formula && (
            <p className="theory__formula">
              <code>{b.formula}</code>
            </p>
          )}
          {b.figure && <TheoryFigure id={b.figure} />}
          {b.tip && (
            <aside className="theory__tip">
              <span className="theory__tip-label">{t('theory.tip')}</span>
              <span>{b.tip}</span>
            </aside>
          )}
        </section>
      ))}
    </div>
  );
}
