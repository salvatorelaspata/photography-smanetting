import { Part, mat, type ProgressRef } from './anatomyParts';

/** Reflex low-poly procedurale, scomponibile allo scroll. */
export function ReflexModel({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  return (
    <group position={[0, -0.1, 0]}>
      {/* Corpo + impugnatura (restano fermi) */}
      <Part basePos={[0, 0, 0]} explode={[0, 0, 0]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[2, 1.3, 1.1]} />
          <meshStandardMaterial {...mat('#3a4150', activeId === null)} />
        </mesh>
        <mesh position={[1.05, 0, 0.15]}>
          <boxGeometry args={[0.34, 1.12, 1.0]} />
          <meshStandardMaterial {...mat('#2b313c', false)} />
        </mesh>
      </Part>

      {/* Obiettivo + vetro frontale */}
      <Part basePos={[0, -0.08, 0.78]} explode={[0, 0, 2.4]} rotation={[Math.PI / 2, 0, 0]} progressRef={progressRef}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.56, 1.1, 28]} />
          <meshStandardMaterial {...mat('#23262d', activeId === 'lens', 0.5, 0.4)} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 28]} />
          <meshStandardMaterial color="#7fc4e0" emissive="#7fc4e0" emissiveIntensity={activeId === 'lens' ? 0.7 : 0.25} roughness={0.15} metalness={0.3} />
        </mesh>
      </Part>

      {/* Specchio reflex a 45° */}
      <Part basePos={[0, -0.05, 0.18]} explode={[0, -1.8, 0.3]} rotation={[-Math.PI / 4, 0, 0]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[1.1, 0.03, 0.85]} />
          <meshStandardMaterial {...mat('#aebfce', activeId === 'mirror', 0.15, 0.85)} />
        </mesh>
      </Part>

      {/* Pentaprisma (prisma triangolare sopra il corpo) */}
      <Part basePos={[0, 0.8, 0.05]} explode={[0, 1.9, 0]} rotation={[0, 0, Math.PI / 2]} progressRef={progressRef}>
        <mesh>
          <cylinderGeometry args={[0.48, 0.48, 1.0, 3]} />
          <meshStandardMaterial {...mat('#c9cdd6', activeId === 'pentaprism', 0.35, 0.5)} />
        </mesh>
      </Part>

      {/* Mirino / oculare (retro alto) */}
      <Part basePos={[0, 0.5, -0.62]} explode={[0, 0.55, -1.7]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[0.5, 0.38, 0.3]} />
          <meshStandardMaterial {...mat('#2b313c', activeId === 'pentaprism')} />
        </mesh>
      </Part>

      {/* Otturatore a tendina */}
      <Part basePos={[0, -0.05, -0.3]} explode={[0, 0, 1.3]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[1.0, 0.86, 0.05]} />
          <meshStandardMaterial {...mat('#5a2f2f', activeId === 'shutter', 0.7, 0.1)} />
        </mesh>
      </Part>

      {/* Sensore */}
      <Part basePos={[0, -0.05, -0.5]} explode={[0, 0, -2.0]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[0.96, 0.78, 0.07]} />
          <meshStandardMaterial {...mat('#1b6ca8', activeId === 'sensor', 0.3, 0.6)} />
        </mesh>
      </Part>

      {/* Modulo AF (sotto lo specchio) */}
      <Part basePos={[0, -0.58, 0.1]} explode={[0, -2.0, -0.5]} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[0.7, 0.12, 0.5]} />
          <meshStandardMaterial {...mat('#6b5a2a', false)} />
        </mesh>
      </Part>
    </group>
  );
}
