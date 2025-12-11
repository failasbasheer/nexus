'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Scene Components ---

const FloatingDiamond = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Icosahedron args={[1.5, 0]} ref={meshRef}>
                <meshStandardMaterial
                    color="#111"
                    roughness={0.1}
                    metalness={1}
                    emissive="#635BFF"
                    emissiveIntensity={0.5}
                    wireframe
                />
            </Icosahedron>
            <Icosahedron args={[1.48, 0]}>
                <meshBasicMaterial color="#000" />
            </Icosahedron>
        </Float>
    );
};

const AbstractRings = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });
    return (
        <group ref={groupRef} rotation={[0.5, 0, 0]}>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <Torus args={[1.5, 0.02, 16, 100]}>
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
                </Torus>
                <Torus args={[1.8, 0.01, 16, 100]} rotation={[0.5, 0, 0]}>
                    <meshStandardMaterial color="#635BFF" transparent opacity={0.5} />
                </Torus>
                <Torus args={[1.2, 0.01, 16, 100]} rotation={[-0.5, 0, 0]}>
                    <meshStandardMaterial color="#00D4FF" transparent opacity={0.5} />
                </Torus>
            </Float>
        </group>
    );
};

const ParticleField = () => {
    const ref = useRef<THREE.Points>(null);
    const sphere = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
        const i3 = i * 3;
        const r = 2.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        sphere[i3] = r * Math.sin(phi) * Math.cos(theta);
        sphere[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        sphere[i3 + 2] = r * Math.cos(phi);
    }

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#635BFF"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};


// --- Main Wrapper ---

type SceneVariant = 'diamond' | 'rings' | 'particles';

interface PageHeader3DProps {
    variant: SceneVariant;
    className?: string;
}

const PageHeader3D: React.FC<PageHeader3DProps> = ({ variant, className = "h-[400px]" }) => {
    return (
        <div className={`w-full relative ${className}`}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#635BFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />

                {variant === 'diamond' && <FloatingDiamond />}
                {variant === 'rings' && <AbstractRings />}
                {variant === 'particles' && <ParticleField />}
            </Canvas>
        </div>
    );
};

export default PageHeader3D;