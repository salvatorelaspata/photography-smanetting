import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../state/store';
import { useT } from '../i18n';
import { getDemo } from '../demos/registry';
import { EngineHost } from '../engines/EngineHost';
import { DemoControls } from './DemoControls';
import { LessonPanel } from './LessonPanel';
import type { ParamValues } from '../demos/types';

/** Orchestra una demo: scena (engine), controlli, lezione e deep-link dei parametri. */
export function DemoView({ demoId }: { demoId: string }) {
  const t = useT();
  const demo = getDemo(demoId);
  const stored = useAppStore((s) => s.paramsByDemo[demo.id]);
  const setDemoParams = useAppStore((s) => s.setDemoParams);
  const params = stored ?? demo.defaultParams;
  const derived = useMemo(() => demo.computeDerived(params), [demo, params]);
  const didInit = useRef(false);
  // Auto-play della scena, ma rispetta reduced-motion ed è fermabile col ▶/⏸ (WCAG 2.2.2).
  const [animate, setAnimate] = useState(true);

  // Init parametri dallo URL (deep-link) al cambio demo.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const next: ParamValues = { ...demo.defaultParams };
    for (const c of demo.controls) {
      const raw = p.get(`${demo.id}.${c.id}`);
      if (raw !== null && raw !== '' && !Number.isNaN(Number(raw))) next[c.id] = Number(raw);
    }
    setDemoParams(demo.id, next);
    didInit.current = true;
  }, [demo, setDemoParams]);

  // Riflette i parametri nello URL.
  useEffect(() => {
    if (!didInit.current) return;
    const p = new URLSearchParams(window.location.search);
    p.set('demo', demo.id);
    for (const c of demo.controls) p.set(`${demo.id}.${c.id}`, String(params[c.id]));
    const url = `${window.location.pathname}?${p.toString()}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }, [params, demo]);

  const onChange = (id: string, v: number) => setDemoParams(demo.id, { ...params, [id]: v });
  const onPreset = (vals: ParamValues) => setDemoParams(demo.id, { ...params, ...vals });
  const onReset = () => setDemoParams(demo.id, { ...demo.defaultParams });

  return (
    <section className="demo">
      <h2 className="demo__title">{t(demo.titleKey)}</h2>
      <div className="demo__body">
        <div className="demo__stage">
          <EngineHost
            demo={demo}
            params={params}
            derived={derived}
            animate={animate}
            onToggleAnimate={() => setAnimate((a) => !a)}
          />
        </div>
        <div className="demo__side">
          <DemoControls
            demo={demo}
            params={params}
            onChange={onChange}
            onPreset={onPreset}
            onReset={onReset}
          />
          <LessonPanel demo={demo} derived={derived} />
        </div>
      </div>
    </section>
  );
}
