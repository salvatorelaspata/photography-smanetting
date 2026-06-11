import { describe, it, expect } from 'vitest';
import { computeDof, hyperfocalM } from './dof';
import { computeFov } from './fov';
import { FULL_FRAME, APS_C, cropFactor, circleOfConfusionMm } from './sensor';

describe('fov', () => {
  it('50mm su full frame ≈ 39.6° orizzontali', () => {
    expect(computeFov(50, FULL_FRAME).horizontalDeg).toBeCloseTo(39.6, 0);
  });

  it('focale più lunga → angolo di campo più stretto', () => {
    expect(computeFov(200, FULL_FRAME).diagonalDeg).toBeLessThan(
      computeFov(24, FULL_FRAME).diagonalDeg,
    );
  });

  it('crop factor APS-C ≈ 1.5', () => {
    expect(cropFactor(APS_C)).toBeGreaterThan(1.4);
    expect(cropFactor(APS_C)).toBeLessThan(1.7);
  });
});

describe('dof', () => {
  it('apertura più chiusa → profondità di campo più ampia', () => {
    const wide = computeDof({
      focalLengthMm: 50,
      apertureFstop: 1.4,
      focusDistanceM: 3,
      sensor: FULL_FRAME,
    });
    const narrow = computeDof({
      focalLengthMm: 50,
      apertureFstop: 16,
      focusDistanceM: 3,
      sensor: FULL_FRAME,
    });
    expect(narrow.totalM).toBeGreaterThan(wide.totalM);
  });

  it('iperfocale positiva e finita per valori normali', () => {
    const H = hyperfocalM(50, 8, circleOfConfusionMm(FULL_FRAME));
    expect(H).toBeGreaterThan(0);
    expect(Number.isFinite(H)).toBe(true);
  });
});
