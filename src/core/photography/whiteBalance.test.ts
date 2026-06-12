import { describe, it, expect } from 'vitest';
import { kelvinToRgb } from './whiteBalance';

describe('kelvinToRgb', () => {
  it('temperatura bassa = luce calda (più rosso che blu)', () => {
    const [r, , b] = kelvinToRgb(2700);
    expect(r).toBeGreaterThan(b);
  });

  it('temperatura alta = luce fredda (più blu che rosso)', () => {
    const [r, , b] = kelvinToRgb(9000);
    expect(b).toBeGreaterThanOrEqual(r);
  });

  it('valori sempre nel range 0..255', () => {
    for (const k of [1500, 4000, 6500, 12000]) {
      for (const c of kelvinToRgb(k)) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(255);
      }
    }
  });
});
