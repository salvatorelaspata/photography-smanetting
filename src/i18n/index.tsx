import { useEffect, type ReactNode } from 'react';
import it from './it.json';
import en from './en.json';
import { useAppStore } from '../state/store';
import type { Locale } from '../types';

type Catalog = Record<string, string>;

const catalogs: Record<Locale, Catalog> = { it, en };

/** Applica la lingua attiva all'attributo lang di <html> (accessibilità). */
export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useAppStore((s) => s.locale);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <>{children}</>;
}

/** Hook di traduzione: `t('chiave')`, con interpolazione `{nome}` e fallback all'italiano. */
export function useT(): (key: string, params?: Record<string, string | number>) => string {
  const locale = useAppStore((s) => s.locale);
  const c = catalogs[locale] ?? catalogs.it;
  return (key, params) => {
    let str = c[key] ?? catalogs.it[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}
