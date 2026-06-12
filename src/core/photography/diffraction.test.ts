import { describe, it, expect } from 'vitest';
import { totalBlurPx, sweetSpot } from './diffraction';

describe('diffrazione', () => {
  it('lo sweet spot è intermedio (tra f/4 e f/11)', () => {
    const s = sweetSpot();
    expect(s).toBeGreaterThanOrEqual(4);
    expect(s).toBeLessThanOrEqual(11);
  });

  it('agli estremi è più morbido che allo sweet spot', () => {
    const sweet = totalBlurPx(sweetSpot());
    expect(totalBlurPx(1.4)).toBeGreaterThan(sweet);
    expect(totalBlurPx(22)).toBeGreaterThan(sweet);
  });
});
