import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale, RenderingApproach, VisualStyle } from '../types';

interface AppState {
  approach: RenderingApproach;
  style: VisualStyle;
  locale: Locale;
  setApproach: (approach: RenderingApproach) => void;
  setStyle: (style: VisualStyle) => void;
  setLocale: (locale: Locale) => void;
}

/** Store globale: i 3 switch (rendering, stile, lingua), persistiti in localStorage. */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      approach: 'schematic',
      style: 'mixed',
      locale: 'it',
      setApproach: (approach) => set({ approach }),
      setStyle: (style) => set({ style }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'smanetting-prefs',
      partialize: (s) => ({ approach: s.approach, style: s.style, locale: s.locale }),
    },
  ),
);
