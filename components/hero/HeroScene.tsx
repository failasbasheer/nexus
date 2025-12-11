'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Add type definitions for R3F elements to resolve TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      coneGeometry: any;
      ringGeometry: any;
      torusGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      instancedMesh: any;
      primitive: any;
    }
  }
}

const TechGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const pinsRef = useRef<THREE.Group>(null);

  // Generate random pin locations
  const pins = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 12; i++) {
      const phi = Math.acos(-1 + (2 * i) / 12);
      const theta = Math.sqrt(12 * Math.PI) * phi;
      const r = 1.65; // Slightly above globe surface
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      temp.push({ position: [x, y, z], color: i % 3 === 0 ? '#FF7AE0' : '#00D4FF' });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate Globe
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * 0.12;
    }

    // Rotate Pins with Globe
    if (pinsRef.current) {
      pinsRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group>
      {/* Main Wireframe Globe */}
      <mesh ref={globeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#635BFF"
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Inner Solid Core (Dark Ocean) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.58, 32, 32]} />
        <meshBasicMaterial color="#050509" />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#635BFF" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Map Pins / GPS Markers */}
      <group ref={pinsRef}>
        {pins.map((pin, i) => (
          <group key={i} position={pin.position as [number, number, number]}>
            {/* Pin Head */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} lookAt={() => new THREE.Vector3(0, 0, 0)}>
              <coneGeometry args={[0.08, 0.25, 8]} />
              <meshStandardMaterial
                color={pin.color}
                emissive={pin.color}
                emissiveIntensity={2}
              />
            </mesh>
            {/* Ripple Ring */}
            <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 16]} />
              <meshBasicMaterial color={pin.color} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Connection Lines (Abstract Routes) */}
      <mesh rotation={[0.4, 0, 0.2]}>
        <torusGeometry args={[1.7, 0.01, 16, 100]} />
        <meshBasicMaterial color="#635BFF" transparent opacity={0.3} />
      </mesh>

      {/* Background Particles */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const HeroScene: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#635BFF" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#00D4FF" />
        <spotLight position={[0, 5, 8]} angle={0.5} penumbra={1} intensity={1} color="#ffffff" />

        <TechGlobe />

        {/* Soft environment reflection */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroScene;