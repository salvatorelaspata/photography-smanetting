import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Mappa lo scroll attraverso un contenitore alto su un progresso 0..1 (in un ref, per il 3D)
 * e sull'indice di sezione attiva (in stato, per le annotazioni).
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  thresholds: number[],
  enabled = true,
) {
  const progress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      progress.current = 0.85;
      return;
    }
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top, 0), total) / total : 0;
      progress.current = p;

      let idx = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (p >= thresholds[i]) idx = i;
      }
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, thresholds, enabled]);

  return { progress, activeIndex };
}
