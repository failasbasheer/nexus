'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface SyncCardProps {
    state: 'offline' | 'syncing' | 'online';
}

const SyncCard: React.FC<SyncCardProps> = ({ state }) => {
    const meshRef = useRef<THREE.Group>(null);
    const badgeMatRef = useRef<THREE.MeshBasicMaterial>(null);
    const borderMatRef = useRef<THREE.MeshBasicMaterial>(null);
    const haloRef = useRef<THREE.Mesh>(null);

    // Theme Colors
    const colors = {
        offline: new THREE.Color('#FF3B81'),  // Magenta/Red
        syncing: new THREE.Color('#FFB020'),  // Amber
        online: new THREE.Color('#0070F3')    // Vercel Blue
    };

    useFrame((stateThree, delta) => {
        if (!meshRef.current || !badgeMatRef.current || !borderMatRef.current || !haloRef.current) return;

        // Parallax
        const x = stateThree.pointer.x * 0.1;
        const y = stateThree.pointer.y * 0.1;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x, 0.1);

        // Color Transitions
        const targetColor = state === 'offline' ? colors.offline : state === 'syncing' ? colors.syncing : colors.online;

        // Lerp color for smooth transition
        badgeMatRef.current.color.lerp(targetColor, delta * 3);
        borderMatRef.current.color.lerp(targetColor, delta * 3);

        // Halo/Glow logic
        // Offline: Magenta, pulsing
        // Syncing: Cyan/Blue-ish, expanding
        // Online: Soft blue, relaxed
        if (state === 'offline') {
            haloRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1), delta * 2);
            (haloRef.current.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color('#FF3B81'), delta * 2);
            (haloRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp((haloRef.current.material as THREE.MeshBasicMaterial).opacity, 0.3, delta * 2);
        } else if (state === 'syncing') {
            haloRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1), delta * 5); // Expand
            (haloRef.current.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color('#00E0FF'), delta * 5); // Cyan
            (haloRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5;
        } else {
            haloRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1), delta * 2); // Relax
            (haloRef.current.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color('#0070F3'), delta * 2);
            (haloRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Halo/Backlight */}
            <mesh ref={haloRef} position={[0, 0, -0.1]}>
                <planeGeometry args={[3.2, 4.2]} />
                <meshBasicMaterial transparent opacity={0.3} color="#FF3B81" />
            </mesh>

            {/* Main Glass Card */}
            <RoundedBox args={[3, 4, 0.1]} radius={0.1} smoothness={4}>
                <meshPhysicalMaterial
                    transparent
                    opacity={0.2}
                    roughness={0.2}
                    metalness={0.9}
                    clearcoat={1}
                    color="#111"
                />
            </RoundedBox>

            {/* Emissive Frame */}
            <RoundedBox args={[3.05, 4.05, 0.05]} radius={0.1} smoothness={4}>
                <meshBasicMaterial
                    ref={borderMatRef}
                    color={colors.offline}
                    transparent
                    opacity={0.5}
                    wireframe
                />
            </RoundedBox>

            {/* Badge */}
            <mesh position={[0, 1.5, 0.08]}>
                <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
                <meshBasicMaterial ref={badgeMatRef} color={colors.offline} toneMapped={false} />
            </mesh>
            <mesh position={[0, 1.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
                <meshBasicMaterial color="black" transparent opacity={0.0} /> {/* Invisible collider or structure if needed */}
            </mesh>

            {/* UI Lines Placeholder on Card */}
            {[0.5, 0, -0.5, -1].map((y, i) => (
                <mesh key={i} position={[0, y, 0.06]}>
                    <planeGeometry args={[2, 0.05]} />
                    <meshBasicMaterial color="white" transparent opacity={0.1} />
                </mesh>
            ))}
        </group>
    );
};

export default SyncCard;
