import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.scss";
import CamAnimation from "./animations/cam-animation";
import Boxes from "./boxes";

function App() {
  return <div className="App">
    <div className="CanvasWrapper">
      <Canvas camera={{ position: [0, 0, 5] }} shadows={true}>
        <ambientLight castShadow={true} />
        <pointLight position={[-10, -10, -10]} />
        <Boxes rows={10} columns={10}/>
        <OrbitControls />
        <CamAnimation />
      </Canvas>
    </div>
  </div>;
}

export default App;
