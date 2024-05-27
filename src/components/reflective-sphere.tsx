import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping, Mesh } from 'three';
import React, { useRef } from 'react';

import highResEnvironmentTexture from "../assets/skyboxes/jan2024.jpg"; // high-res-environment-texture.jpg


interface ReflectiveSphereProps {
  pos: [number, number, number];
}

const ReflectiveSphere: React.FC<ReflectiveSphereProps> = ({ pos }) => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useThree();

  // Load a high-resolution texture for the environment map
  const texture = useLoader(TextureLoader, highResEnvironmentTexture); // Ensure you have a suitable environment texture
  texture.mapping = RepeatWrapping;

  return (
    <mesh ref={meshRef} position={pos}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        metalness={1} 
        roughness={0}
        envMap={scene.environment}
      />
    </mesh>
  );
};

export default ReflectiveSphere;
