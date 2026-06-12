import { Canvas } from '@react-three/fiber';
import { CameraRig, Part, mat, type ProgressRef } from './anatomyParts';

/** Elemento ottico (lente) come ellissoide di vetro semitrasparente. */
function GlassElement({ active }: { active: boolean }) {
  return (
    <mesh scale={[1, 1, 0.22]}>
      <sphereGeometry args={[0.7, 24, 16]} />
      <meshStandardMaterial
        color="#9fd4e6"
        emissive="#9fd4e6"
        emissiveIntensity={active ? 0.5 : 0.12}
        roughness={0.1}
        metalness={0.1}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function OpticsModel({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  const elementsActive = activeId === 'elements' || activeId === 'aberration';
  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Barile (resta fermo) */}
      <Part basePos={[0, 0, 0]} explode={[0, 0, 0]} progressRef={progressRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.86, 0.86, 2.7, 28, 1, true]} />
          <meshStandardMaterial color="#2b313c" roughness={0.6} metalness={0.3} transparent opacity={0.22} side={2} />
        </mesh>
      </Part>

      {/* Elementi lente lungo l'asse: si separano allo scroll */}
      <Part basePos={[0, 0, 1.0]} explode={[0, 0, 1.4]} progressRef={progressRef}>
        <GlassElement active={elementsActive} />
      </Part>
      <Part basePos={[0, 0, 0.35]} explode={[0, 0, 0.5]} progressRef={progressRef}>
        <GlassElement active={elementsActive || activeId === 'focus'} />
      </Part>
      <Part basePos={[0, 0, -0.35]} explode={[0, 0, -0.5]} progressRef={progressRef}>
        <GlassElement active={elementsActive} />
      </Part>
      <Part basePos={[0, 0, -1.0]} explode={[0, 0, -1.4]} progressRef={progressRef}>
        <GlassElement active={elementsActive} />
      </Part>

      {/* Diaframma a lamelle (anello) */}
      <Part basePos={[0, 0, 0]} explode={[0, 1.7, 0]} progressRef={progressRef}>
        <mesh>
          <ringGeometry args={[0.34, 0.72, 7]} />
          <meshStandardMaterial {...mat('#4a4f5a', activeId === 'iris', 0.5, 0.6)} side={2} />
        </mesh>
      </Part>

      {/* Punto di fuoco dietro l'ultimo elemento */}
      <Part basePos={[0, 0, -1.9]} explode={[0, 0, -1.9]} progressRef={progressRef}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 12]} />
          <meshStandardMaterial color="#ffe08a" emissive="#ffe08a" emissiveIntensity={0.9} />
        </mesh>
      </Part>
    </group>
  );
}

/** Canvas dell'anatomia delle ottiche. */
export function OpticsScene({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  return (
    <Canvas
      className="anatomy__canvas"
      dpr={[1, 2]}
      frameloop="always"
      camera={{ position: [3, 1.2, 4.5], fov: 42 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 6]} intensity={1.0} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />
      <OpticsModel progressRef={progressRef} activeId={activeId} />
      <CameraRig progressRef={progressRef} baseDist={4.6} growth={2.4} baseY={1.0} yGrowth={0.6} />
    </Canvas>
  );
}
