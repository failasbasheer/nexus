'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

interface DataPacketsProps {
    state: 'offline' | 'syncing' | 'online';
}

const DataPackets: React.FC<DataPacketsProps> = ({ state }) => {
    // Curve: Local (0,0,0) -> Cloud (0, 3, -2)
    // We'll make it curvy
    const curve = useMemo(() => {
        return new CatmullRomCurve3([
            new Vector3(0, 0, 0),
            new Vector3(2, 1, -1),
            new Vector3(-1, 2.5, -1.5),
            new Vector3(0, 3, -2)
        ]);
    }, []);

    // 5 Packets
    return (
        <group>
            {[0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => (
                <Packet key={i} curve={curve} offset={offset} state={state} />
            ))}
        </group>
    );
};

const Packet = ({ curve, offset, state }: { curve: CatmullRomCurve3, offset: number, state: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const progress = useRef(offset);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // Speed logic
        let speed = 0;
        if (state === 'offline') {
            speed = 0; // "Stop mid-path"
            // Actually, maybe very slow drift? Or strictly stop?
            // User said "Packets stop mid-path".
            // Let's stop them but maybe they jitter slightly
        } else if (state === 'syncing') {
            speed = 2.0; // Rapid
        } else {
            speed = 0.5; // Smooth
        }

        progress.current += speed * delta * 0.5; // Adjust multiplier
        if (progress.current > 1) progress.current = 0;

        const point = curve.getPointAt(progress.current % 1);
        meshRef.current.position.copy(point);
    });

    // Only show if not fully stopped at start? Or always show?
    // User: "When offline: packets stop halfway"
    // So they should be visible.

    const color = state === 'syncing' ? '#00E0FF' : state === 'online' ? '#0070F3' : '#FF3B81';

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
            {state !== 'offline' && (
                <Trail width={1} length={4} color={new THREE.Color(color)} attenuation={(t) => t * t}>
                    <meshBasicMaterial color={color} transparent opacity={0.5} />
                </Trail>
            )}
        </mesh>
    );
};

export default DataPackets;
