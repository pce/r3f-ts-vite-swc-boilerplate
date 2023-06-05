import { useFrame, useThree } from "@react-three/fiber";
import React from "react";

function CamAnimation() {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.rotation.order = "YXZ";
  }, [camera]);

  useFrame((state) => {
    camera.position.x = Math.cos(state.clock.getElapsedTime()) * 5;
    camera.position.z = Math.sin(state.clock.getElapsedTime()) * 5;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default CamAnimation;
