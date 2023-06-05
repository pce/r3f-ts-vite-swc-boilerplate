import React from "react";
import { useFrame } from "@react-three/fiber";
import { Box as ThreeBox } from "@react-three/drei";

type BoxRef = React.RefObject<THREE.Mesh>;

type BoxesProps = {
  rows: number;
  columns: number;
};

const colors = [
  0xffeeaa, 0xeeaaff, 0xaaffee,
  0x3344ff, 0x6644cc, 0xffcc0b
]; 

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateRefs(rows: number, columns: number) {
  const boxRefs: BoxRef[] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      boxRefs.push(React.useRef<THREE.Mesh>(null));
    }
  }

  return boxRefs;
}

function Boxes({ rows, columns }: BoxesProps) {
  const boxRefs = generateRefs(rows, columns);

  useFrame((_, delta) => {
    // rotate the boxes
    boxRefs.forEach((boxRef) => {
      if (boxRef.current) {
        boxRef.current.rotation.x += delta;
      }
    });
  });

  const offsetX = -(columns - 1) / 2;
  const offsetY = (rows - 1) / 2;

  return (
    <>
      {Array(rows)
        .fill(1)
        .map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array(columns)
              .fill(1)
              .map((_, columnIndex) => (
                <ThreeBox
                  key={`${rowIndex}-${columnIndex}`}
                  ref={boxRefs[rowIndex * columns + columnIndex]}
                  position={[
                    columnIndex + offsetX,
                    -rowIndex + offsetY,
                    0
                  ]}
                  args={[0.25, 0.25, 0.25]} // size of the box
                  receiveShadow={true}
                >
                  <meshStandardMaterial
                    attach="material"
                    color={getRandomColor()} 
                  />
                </ThreeBox>
              ))}
          </React.Fragment>
        ))}
    </>
  );
}

export default Boxes;
