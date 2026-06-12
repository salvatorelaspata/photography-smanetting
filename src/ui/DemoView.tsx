import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppStore } from '../state/store';
import { useT } from '../i18n';
import { getDemo } from '../demos/registry';
import { EngineHost } from '../engines/EngineHost';
import { DemoControls } from './DemoControls';
import { LessonPanel } from './LessonPanel';
import type { ParamValues } from '../demos/types';

const NOOP = () => {};

/** Orchestra una demo: scena (engine), controlli, lezione, deep-link, confronto A/B. */
export function DemoView({ demoId }: { demoId: string }) {
  const t = useT();
  const demo = getDemo(demoId);
  const stored = useAppStore((s) => s.paramsByDemo[demo.id]);
  const setDemoParams = useAppStore((s) => s.setDemoParams);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = stored ?? demo.defaultParams;
  const derived = useMemo(() => demo.computeDerived(params), [demo, params]);
  const didInit = useRef(false);
  const [animate, setAnimate] = useState(true);
  const [snapshot, setSnapshot] = useState<ParamValues | null>(null);
  const [copied, setCopied] = useState(false);

  const snapDerived = useMemo(
    () => (snapshot ? demo.computeDerived(snapshot) : null),
    [demo, snapshot],
  );

  // Init parametri dalla query (deep-link) al cambio demo.
  useEffect(() => {
    const next: ParamValues = { ...demo.defaultParams };
    for (const c of demo.controls) {
      const raw = searchParams.get(`${demo.id}.${c.id}`);
      if (raw !== null && raw !== '' && !Number.isNaN(Number(raw))) next[c.id] = Number(raw);
    }
    setDemoParams(demo.id, next);
    setSnapshot(null);
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
  const onToggleAnimate = () => setAnimate((a) => !a);

  const onCopyLink = () => {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(NOOP);
  };

  return (
    <div className="demo">
      <div className="demo__tools">
        <button
          type="button"
          className={`chip ${snapshot ? 'chip--on' : ''}`}
          aria-pressed={snapshot !== null}
          onClick={() => setSnapshot(snapshot ? null : { ...params })}
        >
          {snapshot ? t('compare.exit') : t('compare.toggle')}
        </button>
        <button type="button" className="chip" onClick={onCopyLink}>
          {copied ? t('copy.done') : t('copy.link')}
        </button>
        {snapshot && <span className="demo__tools-hint dim">{t('compare.hint')}</span>}
      </div>

      <div className="demo__body">
        <div className="demo__stage">
          {snapshot && snapDerived ? (
            <div className="compare">
              <div className="compare__pane">
                <span className="compare__tag">A</span>
                <EngineHost
                  demo={demo}
                  params={snapshot}
                  derived={snapDerived}
                  animate={false}
                  onToggleAnimate={NOOP}
                />
              </div>
              <div className="compare__pane">
                <span className="compare__tag compare__tag--b">B</span>
                <EngineHost
                  demo={demo}
                  params={params}
                  derived={derived}
                  animate={animate}
                  onToggleAnimate={onToggleAnimate}
                />
              </div>
            </div>
          ) : (
            <EngineHost
              demo={demo}
              params={params}
              derived={derived}
              animate={animate}
              onToggleAnimate={onToggleAnimate}
            />
          )}
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
    </div>
  );
}
