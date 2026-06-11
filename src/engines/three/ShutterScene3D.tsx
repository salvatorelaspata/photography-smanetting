import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { RendererComponent } from '../types';
import { STYLE_TOKENS } from '../../styles/tokens';
import { usePrefersReducedMotion } from '../../ui/usePrefersReducedMotion';
import { Canvas3D } from './Canvas3D';

const RANGE = 3.2;

/** Soggetto in moto: la posizione è animata, la "scia" è uno stiramento lungo X ∝ blur. */
function Subject({
  blurPx,
  animate,
  color,
  toon,
}: {
  blurPx: number;
  animate: boolean;
  color: string;
  toon: boolean;
}) {
  const ref = useRef<Mesh>(null);
  const dir = useRef(1);
  const x = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (animate) {
      x.current += dir.current * 2.2 * Math.min(delta, 0.05);
      if (x.current > RANGE) {
        x.current = RANGE;
        dir.current = -1;
      } else if (x.current < -RANGE) {
        x.current = -RANGE;
        dir.current = 1;
      }
    } else {
      x.current = 0;
    }
    ref.current.position.x = x.current;
  });

  const stretch = 1 + Math.min(blurPx / 90, 6);
  const opacity = stretch > 1.6 ? 0.78 : 1;

  return (
    <mesh ref={ref} scale={[stretch, 1, 1]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      {toon ? (
        <meshToonMaterial color={color} transparent opacity={opacity} />
      ) : (
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      )}
    </mesh>
  );
}

/** Scena 3D dell'otturatore: mosso reale in prospettiva, materiale guidato dallo stile. */
export const ShutterScene3D: RendererComponent = ({ derived, animate, style }) => {
  const reduce = usePrefersReducedMotion();
  const blurPx = derived.motion?.blurPx ?? 0;
  const tk = STYLE_TOKENS[style];

  return (
    <Canvas3D frameloop="always" cameraPosition={[0, 1.4, 6.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[26, 14]} />
        <meshStandardMaterial color="#11161d" />
      </mesh>
      {[-2.4, 0, 2.4].map((px) => (
        <mesh key={px} position={[px, -0.4, -2.6]}>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <meshStandardMaterial color="#2a3340" />
        </mesh>
      ))}
      <Subject
        blurPx={blurPx}
        animate={animate && !reduce}
        color={tk.accent3d}
        toon={tk.material3d === 'toon'}
      />
    </Canvas3D>
  );
};
