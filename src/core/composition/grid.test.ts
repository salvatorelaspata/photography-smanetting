import { describe, expect, it } from 'vitest';
import { THIRDS, PHI_LINES, nearestLine, isAligned, isCentered } from './grid';

describe('guide compositive', () => {
  it('nearestLine trova la linea dei terzi più vicina', () => {
    expect(nearestLine(0.34, THIRDS).line).toBeCloseTo(1 / 3, 5);
    expect(nearestLine(0.7, THIRDS).line).toBeCloseTo(2 / 3, 5);
  });

  it('isAligned: vicino a un terzo è allineato, al centro no', () => {
    expect(isAligned(0.34, THIRDS, 0.04)).toBe(true);
    expect(isAligned(0.5, THIRDS, 0.04)).toBe(false);
    expect(isAligned(0.62, THIRDS, 0.04)).toBe(false); // più vicino all'aureo che al terzo
  });

  it('phi grid: 0.618 è allineato alla sezione aurea', () => {
    expect(isAligned(0.618, PHI_LINES, 0.02)).toBe(true);
    expect(nearestLine(0.4, PHI_LINES).line).toBeCloseTo(0.381966, 4);
  });

  it('isCentered riconosce il centro', () => {
    expect(isCentered(0.5)).toBe(true);
    expect(isCentered(0.52, 0.04)).toBe(true);
    expect(isCentered(0.66, 0.04)).toBe(false);
  });
});
