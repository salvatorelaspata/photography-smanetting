import { Canvas } from '@react-three/fiber';
import { CameraRig, type ProgressRef } from './anatomyParts';
import { ReflexModel } from './ReflexModel';

/** Canvas dell'anatomia reflex (riempie il viewport sticky). */
export function ReflexScene({ progressRef, activeId }: { progressRef: ProgressRef; activeId: string | null }) {
  return (
    <Canvas
      className="anatomy__canvas"
      dpr={[1, 2]}
      frameloop="always"
      camera={{ position: [3, 1.4, 5], fov: 42 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} />
      <ReflexModel progressRef={progressRef} activeId={activeId} />
      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
