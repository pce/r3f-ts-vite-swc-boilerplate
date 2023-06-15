import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./app.scss";
import CamAnimation from "./animations/cam-animation";
import Moon from "./moon";

function App() {


  return (
    <div className="App">
      <div className="CanvasWrapper">
        <Canvas camera={{ position: [-20, -10, 5] }} shadows={true}>
          {/* <ambientLight/> */}
          <pointLight position={[-10, -10, -10]} />
          <Moon pos={[0, 0, 0]} />
          <OrbitControls />
          <CamAnimation/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
