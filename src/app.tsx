import { Stats, OrbitControls, Circle } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import "./app.scss";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function App() {
  const gltf = useLoader(GLTFLoader, "./models/ganesha.glb");

  return (
    <div className="App">
      <div className="CanvasWrapper">
        <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
          <directionalLight position={[3.3, 1.0, 4.4]} castShadow />
          <primitive
            object={gltf.scene}
            position={[0, 1, 0]}
            children-0-castShadow
          />
          <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial />
          </Circle>
          <OrbitControls target={[0, 1, 0]} />
          {/* <axesHelper args={[5]} /> */}
          <Stats />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
