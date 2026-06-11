/** Costanti e sfondo condivisi dalle scene schematiche. */

export const SCENE_W = 640;
export const SCENE_H = 400;

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
