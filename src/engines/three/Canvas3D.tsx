import { Canvas } from '@react-three/fiber';
import type { ReactNode } from 'react';

interface Canvas3DProps {
  children: ReactNode;
  frameloop?: 'always' | 'demand';
  cameraPosition?: [number, number, number];
}

/** Wrapper R3F: canvas dimensionato sullo stage, dpr adattivo, frameloop configurabile. */
export function Canvas3D({
  children,
  frameloop = 'demand',
  cameraPosition = [0, 1.2, 6],
}: Canvas3DProps) {
  return (
    <div className="scene scene--three">
      <Canvas
        dpr={[1, 2]}
        frameloop={frameloop}
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true }}
      >
        {children}
      </Canvas>
    </div>
  );
}
