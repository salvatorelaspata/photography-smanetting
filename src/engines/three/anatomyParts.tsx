import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, type Group } from 'three';

export type Vec3 = [number, number, number];
export type ProgressRef = { current: number };

export function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Materiale standard con evidenziazione (emissive) quando il componente è attivo. */
export function mat(color: string, active: boolean, roughness = 0.6, metalness = 0.2) {
  return { color, emissive: color, emissiveIntensity: active ? 0.55 : 0.05, roughness, metalness };
}

/** Gruppo che parte da `basePos` e si allontana di `explode` ∝ scroll (exploded view). */
export function Part({
  basePos,
  explode,
  rotation,
  progressRef,
  children,
}: {
  basePos: Vec3;
  explode: Vec3;
  rotation?: Vec3;
  progressRef: ProgressRef;
  children: ReactNode;
}) {
  const ref = useRef<Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const amt = smoothstep(0.12, 0.92, progressRef.current);
    ref.current.position.set(
      basePos[0] + explode[0] * amt,
      basePos[1] + explode[1] * amt,
      basePos[2] + explode[2] * amt,
    );
  });
  return (
    <group ref={ref} position={basePos} rotation={rotation}>
      {children}
    </group>
  );
}

const _target = new Vector3();

/** Camera che arretra e ruota mentre il modello si scompone. */
export function CameraRig({
  progressRef,
  baseDist = 5.2,
  growth = 3.2,
  baseY = 1.1,
  yGrowth = 1.0,
}: {
  progressRef: ProgressRef;
  baseDist?: number;
  growth?: number;
  baseY?: number;
  yGrowth?: number;
}) {
  useFrame((state) => {
    const p = progressRef.current;
    const angle = -0.45 + p * 1.15;
    const dist = baseDist + p * growth;
    _target.set(Math.sin(angle) * dist, baseY + p * yGrowth, Math.cos(angle) * dist);
    state.camera.position.lerp(_target, 0.08);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
