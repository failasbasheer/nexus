'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SyncCard from './SyncCard';
import QueueBlocks from './QueueBlocks';
import AgentsNetwork from './AgentsNetwork';
import DataPackets from './DataPackets';
import Effects from './Effects';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const OfflineScene: React.FC = () => {
    // State management
    const [state, setState] = useState<'offline' | 'syncing' | 'online'>('offline');
    const groupRef = useRef<THREE.Group>(null);
    const cloudRef = useRef<THREE.Mesh>(null);

    // Animation orchestration
    useEffect(() => {
        let tl: gsap.core.Timeline;

        // Ensure GSAP context for cleanup
        const ctx = gsap.context(() => {
            // 1. Entrance Animation
            if (groupRef.current) {
                gsap.fromTo(groupRef.current.position,
                    { y: -2, z: -2 },
                    {
                        y: 0, z: 0, duration: 1.5, ease: "power3.out",
                        scrollTrigger: {
                            trigger: '#tech-canvas-container',
                            start: "top 80%"
                        }
                    }
                );

                gsap.fromTo(groupRef.current.rotation,
                    { x: 0.5 },
                    {
                        x: 0, duration: 1.5, ease: "power3.out",
                        scrollTrigger: {
                            trigger: '#tech-canvas-container',
                            start: "top 80%"
                        }
                    }
                );
            }

            // 2. State Loop via GSAP
            // We use a dummy object to animate "time" just to use the timeline's duration
            tl = gsap.timeline({
                repeat: -1,
                paused: true,
                scrollTrigger: {
                    trigger: '#tech-canvas-container',
                    start: "top 80%",
                    onEnter: () => tl.play(),
                    onLeave: () => tl.pause(),
                    onEnterBack: () => tl.play(),
                    onLeaveBack: () => tl.pause()
                }
            });

            // Phase 1: OFFLINE (starts at 0s, dura: 4s)
            tl.call(() => setState('offline'))
                .to({}, { duration: 4 })

                // Phase 2: SYNCING (starts at 4s, dura: 3s)
                .call(() => setState('syncing'))
                .to({}, { duration: 3 })

                // Phase 3: ONLINE (starts at 7s, dura: 5s)
                .call(() => setState('online'))
                .to({}, { duration: 5 });

        }); // Removed groupRef to avoid querySelectorAll error

        return () => ctx.revert();
    }, []);

    // Cloud Node Pulse
    useFrame((stateThree, delta) => {
        if (!cloudRef.current) return;
        if (state === 'syncing') {
            cloudRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), delta * 5);
            (cloudRef.current.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color('#00E0FF'), delta * 5);
        } else {
            cloudRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 2);
            (cloudRef.current.material as THREE.MeshBasicMaterial).color.lerp(new THREE.Color('#6B5CFF'), delta * 2);
        }
    });

    return (
        <>
            <group ref={groupRef}>
                <SyncCard state={state} />
                <QueueBlocks state={state} />
                <AgentsNetwork />
                <DataPackets state={state} />

                {/* Cloud Node */}
                <mesh ref={cloudRef} position={[0, 3, -2]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshBasicMaterial color="#6B5CFF" transparent opacity={0.8} toneMapped={false} />
                </mesh>

                {/* Halo for Cloud Node */}
                <mesh position={[0, 3, -2.1]}>
                    <circleGeometry args={[0.8, 32]} />
                    <meshBasicMaterial color="#6B5CFF" transparent opacity={0.2} />
                </mesh>

                {/* Under-card glow (State dependent) */}
                <pointLight
                    position={[0, -2, 0]}
                    intensity={state === 'offline' ? 2 : state === 'syncing' ? 1 : 0.5}
                    color={state === 'offline' ? '#FF3B81' : state === 'syncing' ? '#00E0FF' : '#0070F3'}
                    distance={5}
                />
            </group>

            {/* <Effects /> */}

            {/* Lights */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        </>
    );
};

export default OfflineScene;
