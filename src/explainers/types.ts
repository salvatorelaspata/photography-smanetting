/**
 * Archetipo degli explainer 3D scroll-driven (anatomia: reflex/sensore/ottiche).
 * Contratto minimo per la v0; modello GLTF e funzione `explode` arrivano in M8.
 * Riferimento: docs/REQUISITI.md §6.7.
 */

export interface ExplainerSection {
  id: string;
  titleKey: string;
  /** Punto della timeline 0..1 a cui questa sezione è attiva. */
  atProgress: number;
  /** Id dei componenti da evidenziare/etichettare. */
  highlight?: string[];
}

export interface ExplainerModule {
  id: 'reflex' | 'sensor' | 'optics';
  titleKey: string;
  group: 'anatomy';
  sections: ExplainerSection[];
}
