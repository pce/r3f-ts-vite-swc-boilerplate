import { useEffect } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import { TextureLoader, EquirectangularReflectionMapping } from 'three';

import highResEnvironmentTexture from "../assets/skyboxes/jan2024.jpg";

const SetEnvironment = () => {
  const { scene } = useThree();
  const texture = useLoader(TextureLoader, highResEnvironmentTexture);

  useEffect(() => {
    if (texture) {
      texture.mapping = EquirectangularReflectionMapping;
      scene.environment = texture;
    }
  }, [texture, scene]);

  return null;
};

export default SetEnvironment;
