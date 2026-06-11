import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '../state/store';
import { getDemo } from '../demos/registry';
import { EngineHost } from '../engines/EngineHost';
import { DemoControls } from './DemoControls';
import { LessonPanel } from './LessonPanel';
import type { ParamValues } from '../demos/types';

/** Orchestra una demo: scena (engine), controlli, lezione e deep-link dei parametri (hash query). */
export function DemoView({ demoId }: { demoId: string }) {
  const demo = getDemo(demoId);
  const stored = useAppStore((s) => s.paramsByDemo[demo.id]);
  const setDemoParams = useAppStore((s) => s.setDemoParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = stored ?? demo.defaultParams;
  const derived = useMemo(() => demo.computeDerived(params), [demo, params]);
  const didInit = useRef(false);
  const [animate, setAnimate] = useState(true);

  // Init parametri dalla query (deep-link) al cambio demo.
  useEffect(() => {
    const next: ParamValues = { ...demo.defaultParams };
    for (const c of demo.controls) {
      const raw = searchParams.get(`${demo.id}.${c.id}`);
      if (raw !== null && raw !== '' && !Number.isNaN(Number(raw))) next[c.id] = Number(raw);
    }
    setDemoParams(demo.id, next);
    didInit.current = true;
  }, [demo.id]);

  // Riflette i parametri nella query.
  useEffect(() => {
    if (!didInit.current) return;
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        for (const c of demo.controls) p.set(`${demo.id}.${c.id}`, String(params[c.id]));
        return p;
      },
      { replace: true },
    );
  }, [params, demo.id]);

  const onChange = (id: string, v: number) => setDemoParams(demo.id, { ...params, [id]: v });
  const onPreset = (vals: ParamValues) => setDemoParams(demo.id, { ...params, ...vals });
  const onReset = () => setDemoParams(demo.id, { ...demo.defaultParams });

  return (
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
  );
}
