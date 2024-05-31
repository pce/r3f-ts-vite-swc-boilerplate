import React, { useRef } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping, Mesh, Shape, ExtrudeGeometry } from 'three';
import highResEnvironmentTexture from "../assets/skyboxes/jan2024.jpg"; // high-res-environment-texture.jpg

interface ArrowShapeProps {
  pos: [number, number, number];
  size: number;
  rotation: [number, number, number];
}

const ArrowShape: React.FC<ArrowShapeProps> = ({ pos, size, rotation }) => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useThree();

  // Load a high-resolution texture for the environment map
  const texture = useLoader(TextureLoader, highResEnvironmentTexture);
  texture.mapping = RepeatWrapping;

  // Create the arrow shape
  const arrowShape = new Shape();
  arrowShape.moveTo(0, 0);
  arrowShape.lineTo(0, 1); // Forward
  arrowShape.lineTo(-0.5, 1); // 90 degrees left
  arrowShape.lineTo(0, 2); // Forward
  arrowShape.lineTo(0.5, 1); // 90 degrees right
  arrowShape.lineTo(0, 1); // Back to center

  const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: false,
  };

  const geometry = new ExtrudeGeometry(arrowShape, extrudeSettings);
  geometry.scale(size, size, size);

  // Animation effect: swinging motion
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2; // Swinging effect
    }
  });

  return (
    <mesh ref={meshRef} position={pos} rotation={rotation} geometry={geometry}>
      <meshStandardMaterial
        metalness={1}
        roughness={0}
        envMap={scene.environment}
        map={texture}
      />
    </mesh>
  );
};

export default ArrowShape;
