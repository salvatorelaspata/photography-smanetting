import { useEffect } from 'react';
import { useAppStore } from './store';
import type { RenderingApproach, VisualStyle } from '../types';

const APPROACHES: readonly string[] = ['three', 'layered', 'schematic'];
const STYLES: readonly string[] = ['realistic', 'mixed', 'schematic'];

/** Sincronizza approccio/stile con la query string dell'URL (deep-link condivisibile). */
export function useUrlSync(): void {
  const approach = useAppStore((s) => s.approach);
  const style = useAppStore((s) => s.style);

  // Init dallo URL al primo mount (vince sull'eventuale stato persistito).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get('approach');
    const s = params.get('style');
    const store = useAppStore.getState();
    if (a && APPROACHES.includes(a)) store.setApproach(a as RenderingApproach);
    if (s && STYLES.includes(s)) store.setStyle(s as VisualStyle);
  }, []);

  // Riflette i cambi nello URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('approach', approach);
    params.set('style', style);
    const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }, [approach, style]);
}
