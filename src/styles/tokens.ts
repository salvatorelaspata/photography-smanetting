/**
 * Design token lato-JS che gli engine consumano dove sensato (materiali 3D, forma del bokeh…).
 * I token visivi CSS (palette, saturazione) sono gestiti via `data-style` in index.css.
 * Riferimento: docs/REQUISITI.md §6.4.
 */
import type { VisualStyle } from '../types';

export interface StyleTokens {
  surface: 'photoreal' | 'flat' | 'toon';
  bokehShape: 'circle' | 'hexagon';
  useTextures: boolean;
  lineWeight: number;
  /** Materiale usato dall'engine 3D. */
  material3d: 'standard' | 'toon';
  /** Colore d'accento del soggetto nelle scene 3D (coerente con la palette). */
  accent3d: string;
}

export const STYLE_TOKENS: Record<VisualStyle, StyleTokens> = {
  realistic: {
    surface: 'photoreal',
    bokehShape: 'circle',
    useTextures: true,
    lineWeight: 2.5,
    material3d: 'standard',
    accent3d: '#ff8a3d',
  },
  mixed: {
    surface: 'photoreal',
    bokehShape: 'hexagon',
    useTextures: true,
    lineWeight: 2,
    material3d: 'standard',
    accent3d: '#4ea1ff',
  },
  schematic: {
    surface: 'flat',
    bokehShape: 'hexagon',
    useTextures: false,
    lineWeight: 2.5,
    material3d: 'toon',
    accent3d: '#52e0c4',
  },
};
