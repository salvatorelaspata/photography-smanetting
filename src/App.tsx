import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { useAppStore } from './state/store';
import { Layout } from './ui/Layout';
import { Landing } from './routes/Landing';
import { ConceptPage } from './routes/ConceptPage';
import { AnatomyIndex } from './routes/AnatomyIndex';

// Explainer 3D caricato in lazy: porta con sé three.js, fuori dal bundle principale.
const AnatomyExplainer = lazy(() => import('./routes/AnatomyExplainer'));

export function App() {
  const style = useAppStore((s) => s.style);

  // Lo stile visivo guida i token CSS via attributo data-style su <html>.
  useEffect(() => {
    document.documentElement.dataset.style = style;
  }, [style]);

  return (
    <I18nProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/c/:id" element={<ConceptPage />} />
            <Route path="/anatomia" element={<AnatomyIndex />} />
            <Route
              path="/anatomia/:id"
              element={
                <Suspense fallback={<div className="route-loading">3D…</div>}>
                  <AnatomyExplainer />
                </Suspense>
              }
            />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Layout>
      </HashRouter>
    </I18nProvider>
  );
}
