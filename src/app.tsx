import { Canvas } from '@react-three/fiber';
import './app.scss';
import CamAnimation from './animations/cam-animation';
import Skybox from './components/skybox';

import skyboxImage from './assets/skyboxes/jan2024.jpg';
import SetEnvironment from './components/set-environment';
import FlockingArrows from './components/flocking-arrows';

function App() {
  return (
    <div className="App">
      <div className="CanvasWrapper">
        <Canvas camera={{ position: [-20, -10, 5] }} shadows={true}>
          <Skybox imagePath={skyboxImage} />
          <ambientLight />
          {/* <pointLight position={[-10, -10, -10]} /> */}
          <FlockingArrows />
          <SetEnvironment />

          {/* <Moon pos={[0, 0, 0]} /> */}
          {/* <OrbitControls />  */}
          <CamAnimation />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
