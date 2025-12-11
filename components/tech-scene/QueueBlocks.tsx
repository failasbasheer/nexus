'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface QueueBlocksProps {
    state: 'offline' | 'syncing' | 'online';
}

const QueueBlocks: React.FC<QueueBlocksProps> = ({ state }) => {
    // Max 6 blocks
    // Offline: Add 1 block every ~0.6s until full (4s total duration)
    // Syncing: Remove 1 block every 0.3s (quick drain)
    // Online: Empty

    const [count, setCount] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (state === 'offline') {
            setCount(0); // Start fresh or keep? "Blocks increase"
            let c = 0;
            interval = setInterval(() => {
                c++;
                if (c <= 6) setCount(c);
            }, 600);
        } else if (state === 'syncing') {
            interval = setInterval(() => {
                setCount(prev => Math.max(0, prev - 1));
            }, 400); // Drain over 3s
        } else {
            setCount(0);
        }

        return () => clearInterval(interval);
    }, [state]);

    return (
        <group position={[0, -1.2, 0.2]}> {/* Position at bottom of card */}
            {Array.from({ length: count }).map((_, i) => (
                <Block key={i} index={i} />
            ))}
        </group>
    );
};

const Block = ({ index }: { index: number }) => {
    const ref = useRef<THREE.Group>(null);
    // Stack them up
    // y = 0 is bottom
    const yPos = index * 0.25;

    useFrame((state) => {
        if (!ref.current) return;
        // Subtle float/breathing
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, yPos, 0.2);
    });

    return (
        <group ref={ref} position={[0, -2, 0]}>
            <RoundedBox args={[2.2, 0.15, 0.05]} radius={0.02} smoothness={2}>
                <meshStandardMaterial
                    color="#0B0C10"
                    emissive="#00E0FF"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </RoundedBox>
        </group>
    );
};

export default QueueBlocks;
