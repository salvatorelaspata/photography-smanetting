import { describe, it, expect } from 'vitest';
import {
  ev100,
  exposureStops,
  isoToStops,
  apertureToStops,
  stopsFromTarget,
  displayBrightness,
  relativeLuminance,
  computeExposure,
  MIDDLE_GREY,
} from './exposure';

describe('ev100', () => {
  it('approssima il sunny-16 (EV ≈ 15 a ISO 100, f/16, 1/125)', () => {
    expect(ev100({ apertureFstop: 16, shutterSeconds: 1 / 125 })).toBeCloseTo(14.97, 1);
  });

  it('un tempo più veloce di 1 stop aumenta EV di 1', () => {
    const a = ev100({ apertureFstop: 8, shutterSeconds: 1 / 125 });
    const b = ev100({ apertureFstop: 8, shutterSeconds: 1 / 250 });
    expect(b - a).toBeCloseTo(1, 6);
  });
});

describe('conversioni in stop', () => {
  it('isoToStops', () => {
    expect(isoToStops(400)).toBeCloseTo(2, 6);
    expect(isoToStops(100)).toBe(0);
  });

  it('apertureToStops: f/1.41 ≈ 1 stop da f/1', () => {
    expect(apertureToStops(Math.SQRT2)).toBeCloseTo(1, 6);
  });
});

describe('reciprocità (triangolo dell esposizione)', () => {
  it('aprire 1 stop e dimezzare il tempo mantiene la luce raccolta', () => {
    // f/2.8 è un valore nominale arrotondato: per 1 stop esatto da f/4 si usa 4/√2.
    const base = exposureStops({ apertureFstop: 4, shutterSeconds: 1 / 125, iso: 100 });
    const swap = exposureStops({ apertureFstop: 4 / Math.SQRT2, shutterSeconds: 1 / 250, iso: 100 });
    expect(swap).toBeCloseTo(base, 6);
  });
});

describe('esposizione e luminosità', () => {
  it('settaggi corretti ⇒ ~0 stop dal target', () => {
    expect(stopsFromTarget({ apertureFstop: 16, shutterSeconds: 1 / 125, iso: 100 }, 15)).toBeCloseTo(
      0,
      1,
    );
  });

  it('+1 stop di ISO schiarisce di 1 stop', () => {
    const a = stopsFromTarget({ apertureFstop: 16, shutterSeconds: 1 / 125, iso: 100 }, 15);
    const b = stopsFromTarget({ apertureFstop: 16, shutterSeconds: 1 / 125, iso: 200 }, 15);
    expect(b - a).toBeCloseTo(1, 6);
  });

  it('relativeLuminance: grigio medio a 0, raddoppia per stop', () => {
    expect(relativeLuminance(0)).toBeCloseTo(MIDDLE_GREY, 6);
    expect(relativeLuminance(1)).toBeCloseTo(MIDDLE_GREY * 2, 6);
  });

  it('displayBrightness clampa in [0,1]', () => {
    expect(displayBrightness(10)).toBe(1);
    expect(displayBrightness(-20)).toBeCloseTo(0, 6);
  });

  it('computeExposure restituisce la tripla coerente', () => {
    const d = computeExposure({ apertureFstop: 16, shutterSeconds: 1 / 125, iso: 100 }, 15);
    expect(d.evAt100).toBeCloseTo(14.97, 1);
    expect(d.stopsFromTarget).toBeCloseTo(0, 1);
    expect(d.displayBrightness).toBeGreaterThan(0);
  });
});
