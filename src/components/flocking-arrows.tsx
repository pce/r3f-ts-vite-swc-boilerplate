// FlockingArrows.tsx
import React, { useState, useEffect } from 'react';
import { Vector3 } from 'three';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setArrows((prevArrows) =>
        prevArrows.map((arrow) => {
          const newPos = new Vector3(...arrow.position).add(arrow.velocity);
          return { ...arrow, position: [newPos.x, newPos.y, newPos.z] };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

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
