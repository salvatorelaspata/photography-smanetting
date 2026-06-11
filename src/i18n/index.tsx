import { createContext, useContext, type ReactNode } from 'react';
import it from './it.json';
import { useAppStore } from '../state/store';
import type { Locale } from '../types';

type Catalog = Record<string, string>;

const catalogs: Record<Locale, Catalog> = { it };

const I18nContext = createContext<Catalog>(it);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useAppStore((s) => s.locale);
  return <I18nContext.Provider value={catalogs[locale] ?? it}>{children}</I18nContext.Provider>;
}

/** Hook di traduzione: `t('chiave')`, con interpolazione opzionale `{nome}`. */
export function useT(): (key: string, params?: Record<string, string | number>) => string {
  const catalog = useContext(I18nContext);
  return (key, params) => {
    let str = catalog[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}
