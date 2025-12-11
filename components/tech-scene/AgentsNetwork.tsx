'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const AgentsNetwork: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Generate random agents
    const agents = useMemo(() => {
        return new Array(12).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 5 - 2 // Behind the card
            ] as [number, number, number],
            speed: Math.random() * 0.5 + 0.2
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <group ref={groupRef}>
            {agents.map((agent, i) => (
                <Agent key={i} position={agent.position} />
            ))}
            {/* Grid Plane */}
            <gridHelper args={[20, 20, 0x1f1f1f, 0x050505]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -4]} />
        </group>
    );
};

const Agent = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Mesh>(null);
    const [offset] = React.useState(Math.random() * 100);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() + offset;
        ref.current.position.y = position[1] + Math.sin(t) * 0.2;
        ref.current.position.x = position[0] + Math.cos(t * 0.5) * 0.2;
    });

    return (
        <Sphere ref={ref} args={[0.05, 16, 16]} position={position}>
            <meshBasicMaterial color="#00E0FF" transparent opacity={0.6} />
        </Sphere>
    );
};

export default AgentsNetwork;
