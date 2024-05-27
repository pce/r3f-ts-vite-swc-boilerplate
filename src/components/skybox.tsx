import { useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';

interface SkyboxProps {
  imagePath: string;
}

const Skybox = ({ imagePath }: SkyboxProps) => {
  const texture = useLoader(TextureLoader, imagePath);
  const meshRef = useRef<THREE.Mesh>(null);

  const { scene } = useThree();
  useEffect(() => {
    scene.background = texture;
  }, [texture, scene]);

  return (
    <mesh ref={meshRef} scale={500}>  // scaled up the sphere
      <sphereGeometry args={[1, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
};

export default Skybox;
