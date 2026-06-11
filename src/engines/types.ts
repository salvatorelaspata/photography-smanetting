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

/** Valori fisici calcolati dal core, comuni a tutti gli engine. */
export interface DerivedPhysics {
  exposure: ExposureDerived;
  dof?: DofDerived;
  fov?: FovDerived;
  motion?: MotionDerived;
  noise?: NoiseDerived;
  whiteBalance?: WhiteBalanceDerived;
}

export interface SceneProps<P> {
  params: P;
  derived: DerivedPhysics;
  style: VisualStyle;
  size: { width: number; height: number };
}

export type RendererComponent<P> = (props: SceneProps<P>) => ReactNode;
