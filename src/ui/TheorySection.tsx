import type { TheoryBlock } from '../content/theory';

/** Rende i blocchi di teoria approfondita di un concetto. */
export function TheorySection({ blocks }: { blocks: TheoryBlock[] }) {
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
        </section>
      ))}
    </div>
  );
}
