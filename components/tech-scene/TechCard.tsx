'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { Wifi, Database, Lock, CheckCircle2, Zap, Cloud } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechCard: React.FC = () => {
    const [state, setState] = useState<'offline' | 'syncing' | 'online'>('offline');
    const [simulatedProgress, setSimulatedProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Target the parent section for pinning to avoid transform/overflow conflicts
            const section = containerRef.current?.closest('section');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section || containerRef.current,
                    start: "center center",
                    end: "+=1500", // Slightly shorter scroll distance
                    scrub: 0.5, // Smoother scrubbing
                    pin: section,
                    anticipatePin: 1,
                }
            });

            // We animate a proxy value to drive the React state updates safely
            const proxy = { t: 0 };

            tl.to(proxy, {
                t: 100,
                ease: "none",
                duration: 10,
                onUpdate: () => {
                    const p = proxy.t;
                    setSimulatedProgress(p);

                    if (p < 15) { // Short offline accumulation
                        setState('offline');
                    } else if (p < 90) { // Long syncing phase
                        setState('syncing');
                    } else {
                        setState('online'); // Success at the very end
                    }
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Deterministic item generation based on progress
    const getItems = () => {
        if (state === 'online') return [];

        const count = state === 'offline'
            ? Math.min(6, Math.floor((simulatedProgress / 15) * 6))
            : Math.max(0, 6 - Math.floor(((simulatedProgress - 15) / 75) * 7)); // Drain over 15->90 range

        return Array.from({ length: count }, (_, i) => i);
    };

    const items = getItems();

    return (
        <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center perspective-1000 group">
            {/* Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[80px] -z-10 transition-colors duration-500
           ${state === 'offline' ? 'bg-rose-500/10' : state === 'syncing' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}
       `}></div>

            {/* Main Card */}
            <div className={`w-[340px] bg-[#0F0F12] border rounded-2xl p-6 relative flex flex-col gap-6 transform transition-all duration-300
          ${state === 'offline' ? 'shadow-[0_10px_30px_-10px_rgba(244,63,94,0.15)] border-rose-500/20' :
                    state === 'syncing' ? 'shadow-[0_10px_30px_-10px_rgba(245,158,11,0.15)] border-amber-500/20' :
                        'shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] border-emerald-500/20'}
      `}>

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors duration-500 ${state === 'offline' ? 'bg-rose-500/10' : state === 'syncing' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                            {state === 'offline' ? <Wifi size={18} className="text-rose-500" /> :
                                state === 'syncing' ? <Zap size={18} className="text-amber-500" /> :
                                    <Cloud size={18} className="text-emerald-500" />}
                        </div>
                        <span className="text-sm font-semibold text-white tracking-wide">Sync Engine</span>
                    </div>

                    {/* Dynamic Badge */}
                    <div className={`px-2.5 py-1 rounded-full border flex items-center gap-2 transition-all duration-500
               ${state === 'offline' ? 'bg-rose-500/5 border-rose-500/20' :
                            state === 'syncing' ? 'bg-amber-500/5 border-amber-500/20' :
                                'bg-emerald-500/5 border-emerald-500/20'}
           `}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse
                   ${state === 'offline' ? 'bg-rose-500' : state === 'syncing' ? 'bg-amber-500' : 'bg-emerald-500'}
               `}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider
                   ${state === 'offline' ? 'text-rose-500' : state === 'syncing' ? 'text-amber-500' : 'text-emerald-500'}
               `}>
                            {state === 'offline' ? 'Offline' : state === 'syncing' ? 'Syncing...' : 'Online'}
                        </span>
                    </div>
                </div>

                {/* Dynamic Content Area */}
                <div className="relative h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden p-3 flex flex-col gap-2 transition-colors duration-500 group-hover:border-white/10">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>

                    {/* Content Switcher */}
                    {state === 'online' ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <CheckCircle2 size={32} className="text-emerald-500" />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-sm text-white font-medium">Sync Complete</span>
                                <span className="text-xs text-white/40">All databases up to date</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 z-10 w-full">
                            {items.map((key) => {
                                const packet = [
                                    { name: "User_Profile_v2.json", size: "12kb" },
                                    { name: "Daily_Route_Logs.db", size: "1.4mb" },
                                    { name: "Visit_Checkin_04.enc", size: "48kb" },
                                    { name: "Site_Photo_HighRes.jpg", size: "3.2mb" },
                                    { name: "GPS_Telemetry_Batch.csv", size: "128kb" },
                                    { name: "Field_Notes_Audio.aac", size: "850kb" },
                                ][key % 6];

                                return (
                                    <div key={key} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-lg p-2.5 animate-in slide-in-from-bottom duration-300">
                                        <div className="flex items-center gap-3">
                                            <Database size={12} className="text-white/40" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-medium text-white/90 font-mono tracking-tight">{packet.name}</span>
                                                <span className="text-[9px] text-white/40 font-mono">{packet.size} • Pending</span>
                                            </div>
                                        </div>
                                        <div className={`w-1.5 h-1.5 rounded-full ${state === 'offline' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                                    </div>
                                );
                            })}
                            {/* Empty State Text */}
                            {items.length === 0 && state === 'offline' && (
                                <div className="text-[10px] text-white/30 text-center mt-16">Initializing...</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Stats & Progress */}
                <div className="space-y-3">
                    <div className="flex justify-between text-[11px] text-white/40 font-medium uppercase tracking-wider">
                        <span>Sync Progress</span>
                        <span className={`transition-colors duration-300 ${state === 'online' ? 'text-emerald-400' : 'text-white'}`}>
                            {Math.round(simulatedProgress)}%
                        </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full
                ${state === 'offline' ? 'bg-rose-500' : state === 'syncing' ? 'bg-amber-500' : 'bg-emerald-500'}
            `} style={{ width: `${simulatedProgress}%` }}></div>
                    </div>
                </div>

                {/* Security Indicator */}
                <div className="absolute -top-3 -right-3 p-2 bg-[#15151A] border border-white/10 rounded-full shadow-xl animate-bounce-slow">
                    <Lock size={12} className={state === 'offline' ? 'text-rose-500' : state === 'syncing' ? 'text-amber-500' : 'text-emerald-500'} />
                </div>

            </div>
        </div>
    );
};

export default TechCard;
