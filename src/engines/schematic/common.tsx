/** Costanti e sfondo condivisi dalle scene schematiche. */

export const SCENE_W = 640;
export const SCENE_H = 400;

/** Interpola due colori esadecimali (#rrggbb) e restituisce un rgb() — t in 0..1. */
export function mixHex(a: string, b: string, t: number): string {
  const k = Math.min(1, Math.max(0, t));
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) + (((pb >> 16) & 255) - ((pa >> 16) & 255)) * k);
  const g = Math.round(((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * k);
  const bl = Math.round((pa & 255) + ((pb & 255) - (pa & 255)) * k);
  return `rgb(${r}, ${g}, ${bl})`;
}

/** Sfondo della scena (riempimento + griglia opzionale). */
export function Backdrop({ grid = true }: { grid?: boolean }) {
  return (
    <>
      <rect x={0} y={0} width={SCENE_W} height={SCENE_H} className="scene__bg" />
      {grid &&
        Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1={(i * SCENE_W) / 10}
            y1={0}
            x2={(i * SCENE_W) / 10}
            y2={SCENE_H}
            className="scene__grid"
          />
        ))}
    </>
  );
}
