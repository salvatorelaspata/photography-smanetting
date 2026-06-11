/**
 * Contratti del rendering: strategy pattern condiviso dai 3 engine.
 * Riferimento: docs/REQUISITI.md §6.3.
 */
import type { ReactNode } from 'react';
import type { RenderingApproach, VisualStyle } from '../types';
import type { ExposureDerived } from '../core/photography/exposure';
import type { DofDerived } from '../core/photography/dof';
import type { FovDerived } from '../core/photography/fov';
import type { MotionDerived } from '../core/photography/motion';
import type { NoiseDerived } from '../core/photography/noise';
import type { WhiteBalanceDerived } from '../core/photography/whiteBalance';

export type { RenderingApproach, VisualStyle };

/** Insieme dei parametri di una demo (valori numerici indicizzati per chiave). */
export type ParamValues = Record<string, number>;

/** Valori fisici calcolati dal core, comuni a tutti gli engine. */
export interface DerivedPhysics {
  exposure: ExposureDerived;
  dof?: DofDerived;
  fov?: FovDerived;
  motion?: MotionDerived;
  noise?: NoiseDerived;
  whiteBalance?: WhiteBalanceDerived;
}

export interface SceneProps<P extends ParamValues = ParamValues> {
  params: P;
  derived: DerivedPhysics;
  style: VisualStyle;
  size: { width: number; height: number };
  /** Se false (o reduced-motion) la scena resta statica. */
  animate: boolean;
}

export type RendererComponent<P extends ParamValues = ParamValues> = (
  props: SceneProps<P>,
) => ReactNode;
