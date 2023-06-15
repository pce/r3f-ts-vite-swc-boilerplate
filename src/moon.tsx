// import React from "react";
import { Vector3 } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import moonTexture from "./assets/textures/moon-2313871_1920.jpg";

type MoonProps = {
  pos: Vector3;
};

function Moon({ pos }: MoonProps) {
  const props = useTexture({
    map: moonTexture,
    roughnessMap: moonTexture,
    // displacementMap: ,
    // normalMap: ,
    // aoMap: ,
  });

  return (
    <mesh position={pos} visible>
      <sphereGeometry args={[1, 16, 16]} />
      <meshLambertMaterial {...props} color={0xffa500} />
    </mesh>
  );
}

export default Moon;
