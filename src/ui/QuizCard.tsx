import { useState } from 'react';
import { useT } from '../i18n';
import { useAppStore } from '../state/store';
import { quizFor } from '../content/quiz';

/** Micro-quiz di verifica mostrato in fondo al concetto. */
export function QuizCard({ demoId }: { demoId: string }) {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const quiz = quizFor(demoId, locale);
  const [picked, setPicked] = useState<number | null>(null);

  if (!quiz) return null;

  return (
    <section className="concept__section">
      <h2 className="section-title">{t('section.quiz')}</h2>
      <div className="quiz">
        <p className="quiz__q">{quiz.q}</p>
        <div className="quiz__options">
          {quiz.options.map((o, i) => {
            const state =
              picked === null
                ? ''
                : i === quiz.answer
                  ? 'is-correct'
                  : i === picked
                    ? 'is-wrong'
                    : '';
            return (
              <button
                key={i}
                type="button"
                className={`quiz__opt ${state}`}
                disabled={picked !== null}
                aria-pressed={picked === i}
                onClick={() => setPicked(i)}
              >
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <>
            <p className="quiz__feedback">
              {picked === quiz.answer ? t('quiz.correct') : t('quiz.wrong')}
            </p>
            <button type="button" className="chip chip--ghost" onClick={() => setPicked(null)}>
              {t('quiz.retry')}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
