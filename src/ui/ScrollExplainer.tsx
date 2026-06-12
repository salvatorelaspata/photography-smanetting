import { useMemo, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import type { AnatomySection } from '../content/anatomy';
import type { ProgressRef } from '../engines/three/anatomyParts';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useScrollProgress } from './useScrollProgress';

interface Props {
  title: string;
  sections: AnatomySection[];
  Scene: FC<{ progressRef: ProgressRef; activeId: string | null }>;
}

/** Explainer 3D scroll-driven generico: la scena si scompone allo scroll con annotazioni sincronizzate. */
export function ScrollExplainer({ title, sections, Scene }: Props) {
  const t = useT();
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const thresholds = useMemo(() => sections.map((s) => s.atProgress), [sections]);
  const { progress, activeIndex } = useScrollProgress(containerRef, thresholds, !reduce);
  const section = sections[activeIndex];

  if (reduce) {
    return (
      <div className="anatomy anatomy--static">
        <Link to="/anatomia" className="back-link">
          ← {t('anatomy.back')}
        </Link>
        <h1 className="concept__title">{title}</h1>
        <div className="anatomy__staticStage">
          <Scene progressRef={progress} activeId={null} />
        </div>
        <ol className="anatomy__list">
          {sections.map((s) => (
            <li key={s.id}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="anatomy" ref={containerRef} style={{ height: `${sections.length * 100}vh` }}>
      <div className="anatomy__sticky">
        <div className="anatomy__stage">
          <Scene progressRef={progress} activeId={section.highlight} />
        </div>
        <aside className="anatomy__panel">
          <Link to="/anatomia" className="back-link">
            ← {t('anatomy.back')}
          </Link>
          <p className="anatomy__crumb">{title}</p>
          <span className="anatomy__step">
            {activeIndex + 1} / {sections.length}
          </span>
          <h2 className="anatomy__title">{section.title}</h2>
          <p className="anatomy__body">{section.body}</p>
          <span className="anatomy__hint">{t('anatomy.scrollHint')}</span>
        </aside>
      </div>
    </div>
  );
}
