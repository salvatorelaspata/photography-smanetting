/** Tipi condivisi a livello applicazione. */

/** I 3 approcci di rendering commutabili a runtime (vedi docs/REQUISITI.md §6.3). */
export type RenderingApproach = 'three' | 'layered' | 'schematic';

/** I 3 stili visivi commutabili (vedi docs/REQUISITI.md §6.4). */
export type VisualStyle = 'realistic' | 'mixed' | 'schematic';

/** Lingue supportate. Italiano alla v1, struttura pronta per altre. */
export type Locale = 'it';
