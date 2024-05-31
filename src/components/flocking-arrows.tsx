// FlockingArrows.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import useMousePosition from '../hooks/use-mouse-position';
import ArrowShape from './arrow-shape';


const NUM_ARROWS = 20;

const getRandomPosition = (): [number, number, number] => [
  (Math.random() - 0.5) * 20,
  (Math.random() - 0.5) * 20,
  (Math.random() - 0.5) * 20,
];

const getRandomSize = (): number => Math.random() * 0.5 + 0.5;

const getRandomRotation = (): [number, number, number] => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

interface Arrow {
  position: [number, number, number];
  size: number;
  rotation: [number, number, number];
  velocity: Vector3;
}

const FlockingArrows: React.FC = () => {
  const [arrows, setArrows] = useState<Arrow[]>(
    Array.from({ length: NUM_ARROWS }).map(() => ({
      position: getRandomPosition(),
      size: getRandomSize(),
      rotation: getRandomRotation(),
      velocity: new Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02),
    }))
  );

  const mousePosition = useMousePosition();
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const updateArrows = () => {
      setArrows((prevArrows) =>
        prevArrows.map((arrow) => {
          // Calculate the vector from the arrow to the mouse position
          const mouseVector = new Vector3(
            (mousePosition.x / window.innerWidth) * 2 - 1,
            -(mousePosition.y / window.innerHeight) * 2 + 1,
            0
          );
          const arrowVector = new Vector3(...arrow.position);
          const direction = mouseVector.sub(arrowVector).normalize();

          // Update the arrow's position and velocity
          const newVelocity = arrow.velocity.add(direction.multiplyScalar(0.01)); // Adjust speed here
          const newPos = arrowVector.add(newVelocity);

          return { ...arrow, position: [newPos.x, newPos.y, newPos.z], velocity: newVelocity };
        })
      );

      animationFrameId.current = requestAnimationFrame(updateArrows);
    };

    animationFrameId.current = requestAnimationFrame(updateArrows);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      {arrows.map((arrow, idx) => (
        <ArrowShape
          key={idx}
          pos={arrow.position}
          size={arrow.size}
          rotation={arrow.rotation}
        />
      ))}
    </>
  );
};

export default FlockingArrows;
