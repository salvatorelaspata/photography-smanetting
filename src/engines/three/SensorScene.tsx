import { Canvas } from '@react-three/fiber';
import { CameraRig, Part, mat, type ProgressRef } from './anatomyParts';

const N = 6;
const CELL = 0.34;
const at = (i: number) => (i - (N - 1) / 2) * CELL;
const CELLS = Array.from({ length: N }, (_, i) =>
  Array.from({ length: N }, (_, j) => ({ i, j })),
).flat();

/** Colore del filtro di Bayer (RGGB) per il fotosito (i, j). */
function bayer(i: number, j: number): string {
  if (i % 2 === 0 && j % 2 === 0) return '#e0544b';
  if (i % 2 === 1 && j % 2 === 1) return '#4b7fe0';
  return '#4bbf5a';
}

function SensorModel({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Microlenti */}
      <Part basePos={[0, 1.0, 0]} explode={[0, 1.5, 0]} progressRef={progressRef}>
        {CELLS.map(({ i, j }) => (
          <mesh key={`m${i}-${j}`} position={[at(i), 0, at(j)]}>
            <sphereGeometry args={[0.13, 16, 12]} />
            <meshStandardMaterial
              color="#bfe6f5"
              emissive="#bfe6f5"
              emissiveIntensity={activeId === 'microlens' ? 0.5 : 0.12}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </Part>

      {/* Filtro di Bayer */}
      <Part basePos={[0, 0.55, 0]} explode={[0, 0.8, 0]} progressRef={progressRef}>
        {CELLS.map(({ i, j }) => (
          <mesh key={`b${i}-${j}`} position={[at(i), 0, at(j)]}>
            <boxGeometry args={[0.3, 0.05, 0.3]} />
            <meshStandardMaterial {...mat(bayer(i, j), activeId === 'bayer', 0.4, 0.1)} />
          </mesh>
        ))}
      </Part>

      {/* Fotositi (pozzi) */}
      <Part basePos={[0, 0.1, 0]} explode={[0, 0, 0]} progressRef={progressRef}>
        {CELLS.map(({ i, j }) => (
          <mesh key={`p${i}-${j}`} position={[at(i), 0, at(j)]}>
            <boxGeometry args={[0.3, 0.18, 0.3]} />
            <meshStandardMaterial {...mat('#3a4150', activeId === 'photosite', 0.5, 0.3)} />
          </mesh>
        ))}
      </Part>

      {/* Substrato */}
      <Part basePos={[0, -0.1, 0]} explode={[0, -0.7, 0]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[N * CELL + 0.2, 0.12, N * CELL + 0.2]} />
          <meshStandardMaterial {...mat('#1b2430', false)} />
        </mesh>
      </Part>
    </group>
  );
}

/** Canvas dell'anatomia del sensore. */
export function SensorScene({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  return (
    <Canvas
      className="anatomy__canvas"
      dpr={[1, 2]}
      frameloop="always"
      camera={{ position: [3, 3, 4], fov: 42 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} />
      <SensorModel progressRef={progressRef} activeId={activeId} />
      <CameraRig progressRef={progressRef} baseDist={4.2} growth={2.6} baseY={2.6} yGrowth={0.6} />
    </Canvas>
  );
}
