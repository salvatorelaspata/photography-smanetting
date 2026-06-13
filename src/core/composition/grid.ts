/**
 * Guide compositive — funzioni pure per l'allineamento di soggetto e orizzonte alle linee guida.
 * Le posizioni sono normalizzate 0..1 (frazione di larghezza/altezza del fotogramma).
 */

/** Linee della regola dei terzi: 1/3 e 2/3. */
export const THIRDS: readonly number[] = [1 / 3, 2 / 3];

/** Linee della "phi grid" (sezione aurea): 1/φ² ≈ 0,382 e 1/φ ≈ 0,618. */
export const PHI_LINES: readonly number[] = [0.381966, 0.618034];

/** Restituisce la linea più vicina a `v` tra `lines`, con la sua distanza. */
export function nearestLine(v: number, lines: readonly number[]): { line: number; dist: number } {
  let line = lines[0];
  let dist = Math.abs(v - lines[0]);
  for (const l of lines) {
    const d = Math.abs(v - l);
    if (d < dist) {
      line = l;
      dist = d;
    }
  }
  return { line, dist };
}

/** True se `v` è allineato (entro `tol`) a una delle linee guida. */
export function isAligned(v: number, lines: readonly number[], tol = 0.04): boolean {
  return nearestLine(v, lines).dist <= tol;
}

/** True se `v` è praticamente al centro del fotogramma (0,5). */
export function isCentered(v: number, tol = 0.04): boolean {
  return Math.abs(v - 0.5) <= tol;
}
