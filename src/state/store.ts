import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale, RenderingApproach, VisualStyle } from '../types';
import type { ParamValues } from '../engines/types';

interface AppState {
  approach: RenderingApproach;
  style: VisualStyle;
  locale: Locale;
  currentDemoId: string;
  paramsByDemo: Record<string, ParamValues>;
  setApproach: (approach: RenderingApproach) => void;
  setStyle: (style: VisualStyle) => void;
  setLocale: (locale: Locale) => void;
  setCurrentDemo: (id: string) => void;
  setDemoParams: (id: string, params: ParamValues) => void;
}

/** Store globale: i 3 switch + demo corrente + parametri per demo. Le preferenze sono persistite. */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      approach: 'schematic',
      style: 'mixed',
      locale: 'it',
      currentDemoId: 'shutter',
      paramsByDemo: {},
      setApproach: (approach) => set({ approach }),
      setStyle: (style) => set({ style }),
      setLocale: (locale) => set({ locale }),
      setCurrentDemo: (currentDemoId) => set({ currentDemoId }),
      setDemoParams: (id, params) =>
        set((s) => ({ paramsByDemo: { ...s.paramsByDemo, [id]: params } })),
    }),
    {
      name: 'smanetting-prefs',
      partialize: (s) => ({
        approach: s.approach,
        style: s.style,
        locale: s.locale,
        currentDemoId: s.currentDemoId,
      }),
    },
  ),
);
