import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Elemento radice #root non trovato');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
