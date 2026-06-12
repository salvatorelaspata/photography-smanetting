import { describe, expect, it } from 'vitest';
import { resolveMode, TEACHING_EV } from './exposureModes';
import { ev100 } from './exposure';
import { APERTURES_FULL, SHUTTER_FULL_SECONDS } from '../params/stops';

const onSeq = (v: number, seq: readonly number[]) => seq.some((x) => Math.abs(x - v) < 1e-9);

describe('resolveMode', () => {
  it('A (priorità diaframmi): tiene l’apertura dell’utente e calcola il tempo', () => {
    const r = resolveMode({ mode: 'A', apertureFstop: 8, shutterSeconds: 1, targetEv100: TEACHING_EV });
    expect(r.apertureFstop).toBe(8); // invariata
    expect(r.apertureAuto).toBe(false);
    expect(r.shutterAuto).toBe(true);
    expect(onSeq(r.shutterSeconds, SHUTTER_FULL_SECONDS)).toBe(true);
    // l'esposizione risultante è vicina al corretto (entro mezzo stop per lo snap)
    expect(Math.abs(ev100(r) - TEACHING_EV)).toBeLessThanOrEqual(0.5);
  });

  it('S (priorità tempi): tiene il tempo dell’utente e calcola l’apertura', () => {
    const r = resolveMode({ mode: 'S', apertureFstop: 1.4, shutterSeconds: 1 / 125, targetEv100: TEACHING_EV });
    expect(r.shutterSeconds).toBe(1 / 125); // invariato
    expect(r.shutterAuto).toBe(false);
    expect(r.apertureAuto).toBe(true);
    expect(onSeq(r.apertureFstop, APERTURES_FULL)).toBe(true);
    expect(Math.abs(ev100(r) - TEACHING_EV)).toBeLessThanOrEqual(0.5);
  });

  it('P: la camera sceglie entrambi su un’esposizione corretta', () => {
    const r = resolveMode({ mode: 'P', apertureFstop: 22, shutterSeconds: 30, targetEv100: TEACHING_EV });
    expect(r.apertureAuto).toBe(true);
    expect(r.shutterAuto).toBe(true);
    expect(onSeq(r.apertureFstop, APERTURES_FULL)).toBe(true);
    expect(onSeq(r.shutterSeconds, SHUTTER_FULL_SECONDS)).toBe(true);
    expect(Math.abs(ev100(r) - TEACHING_EV)).toBeLessThanOrEqual(0.5);
  });

  it('M: passa entrambi i valori dell’utente senza correzione', () => {
    const r = resolveMode({ mode: 'M', apertureFstop: 2.8, shutterSeconds: 1 / 30, targetEv100: TEACHING_EV });
    expect(r.apertureFstop).toBe(2.8);
    expect(r.shutterSeconds).toBe(1 / 30);
    expect(r.apertureAuto).toBe(false);
    expect(r.shutterAuto).toBe(false);
  });

  it('M sottoesposto: deviazione negativa rispetto al corretto', () => {
    // f/16 a 1/1000 con scena EV12 è molto sottoesposto
    const r = resolveMode({ mode: 'M', apertureFstop: 16, shutterSeconds: 1 / 1000, targetEv100: TEACHING_EV });
    expect(ev100(r)).toBeGreaterThan(TEACHING_EV); // ev dei settaggi > luce scena ⇒ sotto
  });
});
