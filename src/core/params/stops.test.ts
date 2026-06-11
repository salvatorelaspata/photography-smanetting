import { describe, it, expect } from 'vitest';
import { snapToSequence, APERTURES_FULL, ISO_FULL, formatShutter, formatAperture } from './stops';

describe('snapToSequence', () => {
  it('aggancia al valore più vicino della sequenza', () => {
    expect(snapToSequence(3, APERTURES_FULL)).toBe(2.8);
    expect(snapToSequence(500, ISO_FULL)).toBe(400);
    expect(snapToSequence(900, ISO_FULL)).toBe(800);
  });
});

describe('formattazione', () => {
  it('tempi rapidi come frazioni', () => {
    expect(formatShutter(1 / 250)).toBe('1/250');
    expect(formatShutter(1 / 60)).toBe('1/60');
  });

  it('tempi lunghi in secondi', () => {
    expect(formatShutter(30)).toBe('30"');
    expect(formatShutter(1)).toBe('1"');
  });

  it('apertura', () => {
    expect(formatAperture(2.8)).toBe('f/2.8');
    expect(formatAperture(8)).toBe('f/8');
  });
});
