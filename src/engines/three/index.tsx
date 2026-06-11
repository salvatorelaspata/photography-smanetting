import { Suspense, lazy } from 'react';
import type { RendererComponent } from '../types';

// Code-split: three.js viene caricato solo quando si seleziona l'engine 3D.
const ShutterImpl = lazy(() =>
  import('./ShutterScene3D').then((m) => ({ default: m.ShutterScene3D })),
);
const ApertureImpl = lazy(() =>
  import('./ApertureScene3D').then((m) => ({ default: m.ApertureScene3D })),
);

export const ShutterThree: RendererComponent = (props) => (
  <Suspense fallback={<div className="stage__empty">3D…</div>}>
    <ShutterImpl {...props} />
  </Suspense>
);

export const ApertureThree: RendererComponent = (props) => (
  <Suspense fallback={<div className="stage__empty">3D…</div>}>
    <ApertureImpl {...props} />
  </Suspense>
);
