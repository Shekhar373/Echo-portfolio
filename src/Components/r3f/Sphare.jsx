import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const images = [
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
  "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/1.jpg",
];

// Spherical radius controls y/z, both x and z are modified by stretch values now
const radius = 6;
const xStretch = 1.8; // Increase x axis space (1 = normal, >1 = stretched further out)
const zStretch = 1.6; // Increase z axis space (1 = normal, >1 = stretched further out)

function fibonacciPosition(i, total, radius, xStretch = 1, zStretch = 1) {
  const y = 1 - (2 * (i + 0.5)) / total;

  const r = Math.sqrt(1 - y * y);

  const theta = i * Math.PI * (3 - Math.sqrt(5));

  // Stretch X and Z axes by multiplying by xStretch and zStretch
  const x = r * Math.cos(theta) * radius * xStretch;
  const z = r * Math.sin(theta) * radius * zStretch;

  return [x, y * radius, z];
}

function ImageCard({ src, position }) {
  const texture = new THREE.TextureLoader().load(src);

  return (
    <mesh position={position}>
      <planeGeometry args={[1.2, 1.6]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Sphere() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Slow rotation on Y axis
    group.current.rotation.y += delta * 0.1;

    // Make each child (image card) always face the camera
    group.current.children.forEach((child) => {
      child.lookAt(state.camera.position);
      // child.lookAt(0, 0, 0);
    });
  });

  return (
    <group ref={group}>
      {images.map((src, i) => {
        const position = fibonacciPosition(
          i,
          images.length,
          radius,
          xStretch, // pass in xStretch to function
          zStretch // now also stretching z axis
        );

        return (
          <ImageCard
            key={i}
            src={src}
            position={position}
          />
        );
      })}
    </group>
  );
}