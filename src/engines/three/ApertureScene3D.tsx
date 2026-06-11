import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import type { RendererComponent } from '../types';
import { Canvas3D } from './Canvas3D';

const BALLS: { p: [number, number, number]; c: string }[] = [
  { p: [-2.2, 0.7, -5], c: '#ff6b6b' },
  { p: [1.9, 1.1, -6.5], c: '#ffd93d' },
  { p: [2.7, -0.5, -4.2], c: '#6bcb77' },
  { p: [-1.5, -0.9, -7.5], c: '#4ea1ff' },
  { p: [0.5, 1.5, -9], c: '#c77dff' },
  { p: [-3, 0, -8], c: '#52e0c4' },
];

/** Scena 3D dell'apertura: soggetto a fuoco + punti luce sullo sfondo che diventano bokeh. */
export const ApertureScene3D: RendererComponent = ({ params }) => {
  const f = params.apertureFstop;
  const focus = params.focusDistanceM;
  // Aperture ampie (f piccolo) → bokeh grande; fuoco normalizzato dalla distanza.
  const bokehScale = Math.min(12, Math.max(0.6, 14 / f));
  const focusDistance = Math.min(0.03, Math.max(0.001, focus / 400));

  return (
    <Canvas3D frameloop="demand" cameraPosition={[0, 0.4, 6]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1} />
      <mesh position={[0, 0, 0.5]}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#e7e9ee" roughness={0.4} metalness={0.1} />
      </mesh>
      {BALLS.map((b, i) => (
        <mesh key={i} position={b.p}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color={b.c} emissive={b.c} emissiveIntensity={0.55} />
        </mesh>
      ))}
      <EffectComposer>
        <DepthOfField focusDistance={focusDistance} focalLength={0.04} bokehScale={bokehScale} />
      </EffectComposer>
    </Canvas3D>
  );
};
