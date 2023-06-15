import { useFrame, useThree } from "@react-three/fiber";
import React from "react";

function CamAnimation() {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.rotation.order = "YXZ";
  }, [camera]);

  const [time, setTime] = React.useState(0);

  useFrame((state, delta) => {
    setTime((prevTime) => prevTime + delta);
    // the Moon's orbit based on time 
    const radius = 10;  
    const speed = 0.1; 
    const angle = time * speed;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    state.camera.position.set(x, 0, z);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default CamAnimation;
