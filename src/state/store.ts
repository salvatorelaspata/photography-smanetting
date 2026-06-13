import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '../types';
import type { ParamValues } from '../engines/types';

interface AppState {
  locale: Locale;
  currentDemoId: string;
  paramsByDemo: Record<string, ParamValues>;
  setLocale: (locale: Locale) => void;
  setCurrentDemo: (id: string) => void;
  setDemoParams: (id: string, params: ParamValues) => void;
}

/** Store globale: lingua + demo corrente + parametri per demo. Le preferenze sono persistite. */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: 'it',
      currentDemoId: 'shutter',
      paramsByDemo: {},
      setLocale: (locale) => set({ locale }),
      setCurrentDemo: (currentDemoId) => set({ currentDemoId }),
      setDemoParams: (id, params) =>
        set((s) => ({ paramsByDemo: { ...s.paramsByDemo, [id]: params } })),
    }),
    {
      name: 'smanetting-prefs',
      partialize: (s) => ({
        locale: s.locale,
        currentDemoId: s.currentDemoId,
      }),
    },
  ),
);
