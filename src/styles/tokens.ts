/**
 * Design token lato-JS che gli engine consumano dove sensato (materiali, forma del bokeh…).
 * I token visivi CSS (palette) sono gestiti via `data-style` in index.css.
 * Riferimento: docs/REQUISITI.md §6.4.
 */
import type { VisualStyle } from '../types';

export interface StyleTokens {
  surface: 'photoreal' | 'flat' | 'toon';
  bokehShape: 'circle' | 'hexagon';
  useTextures: boolean;
  lineWeight: number;
}

export const STYLE_TOKENS: Record<VisualStyle, StyleTokens> = {
  realistic: { surface: 'photoreal', bokehShape: 'circle', useTextures: true, lineWeight: 0 },
  mixed: { surface: 'photoreal', bokehShape: 'hexagon', useTextures: true, lineWeight: 1 },
  schematic: { surface: 'flat', bokehShape: 'hexagon', useTextures: false, lineWeight: 2 },
};
