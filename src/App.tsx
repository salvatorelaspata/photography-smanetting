import { useEffect } from 'react';
import { I18nProvider } from './i18n';
import { useAppStore } from './state/store';
import { useUrlSync } from './state/useUrlSync';
import { Shell } from './ui/Shell';

export function App() {
  const style = useAppStore((s) => s.style);
  useUrlSync();

  // Lo stile visivo guida i token CSS via attributo data-style su <html>.
  useEffect(() => {
    document.documentElement.dataset.style = style;
  }, [style]);

  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  );
}
