import React, { useLayoutEffect, useRef } from 'react';
import { MapPin, Camera, Navigation, Check, Clock, MoreHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PhoneMockup: React.FC<{ className?: string }> = ({ className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = React.useState("9:41");

    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000 * 60); // Update every minute
        return () => clearInterval(interval);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const section = containerRef.current?.closest('section');
            if (progressTextRef.current && progressBarRef.current && section) {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center center", // Lock when hero is centered
                        end: "+=1000", // Scroll distance to unlock
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    }
                });

                // Animate both counter and bar width synchronously with scroll
                const counter = { val: 0 };

                tl.to(counter, {
                    val: 100,
                    ease: "none", // Linear scrub
                    duration: 1,
                    onUpdate: () => {
                        if (progressTextRef.current) {
                            progressTextRef.current.innerText = Math.round(counter.val) + "%";
                        }
                    }
                })
                    .to(progressBarRef.current, {
                        width: "100%",
                        ease: "none",
                        duration: 1
                    }, "<"); // Run at start of timeline
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`relative mx-auto h-[580px] w-[300px] rounded-[50px] border-[8px] border-[#1a1a1a] bg-[#050505] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_50px_100px_-20px_rgba(0,0,0,0.5)] ${className}`}>

            {/* Screen Container */}
            <div className="relative h-full w-full rounded-[42px] overflow-hidden bg-surface font-sans flex flex-col">

                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-b-[18px] z-30 flex items-center justify-center gap-2 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c]"></div>
                    <div className="w-12 h-1.5 rounded-full bg-[#1c1c1c]"></div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 pt-3.5 text-[10px] text-white/40 font-medium tracking-wide">
                    <span>{currentTime}</span>
                    <div className="flex gap-1.5 items-center">
                        <div className="w-3 h-3 border border-white/20 rounded-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/80 rounded-[1px]"></div>
                        </div>
                    </div>
                </div>

                {/* App Content */}
                <div className="mt-8 px-5 flex flex-col gap-6 h-full relative z-0">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">Dashboard</p>
                            <h3 className="text-white font-semibold text-xl tracking-tight">Overview</h3>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 ring-1 ring-white/5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary opacity-20 absolute"></div>
                            <span className="text-xs font-bold text-white relative z-10">AW</span>
                        </div>
                    </div>

                    {/* Main KPI Card */}
                    <div className="rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 rounded-full blur-[60px] transform translate-x-10 -translate-y-10 group-hover:bg-accent-secondary/20 transition-colors duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-white/10">
                                        <MapPin size={14} className="text-white" strokeWidth={2} />
                                    </div>
                                    <span className="text-white/80 text-xs font-medium">Route Progress</span>
                                </div>
                                <span ref={progressTextRef} className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded-full">0%</span>
                            </div>

                            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden mb-2">
                                <div ref={progressBarRef} className="h-full w-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-secondary">
                                <span>12 Visited</span>
                                <span>3 Remaining</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-xl p-4 flex flex-col gap-3 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center border border-white/5 group-hover:border-accent-primary/30 transition-colors">
                                <Navigation size={14} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-white/70 font-medium">Map View</span>
                        </button>
                        <button className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-xl p-4 flex flex-col gap-3 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-[#1c1c1c] text-white flex items-center justify-center border border-white/5 group-hover:border-accent-primary/30 transition-colors">
                                <Camera size={14} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-white/70 font-medium">Log Visit</span>
                        </button>
                    </div>

                    {/* Feed */}
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-4">
                            <h4 className="text-white text-sm font-semibold tracking-tight">Up Next</h4>
                            <button className="text-[10px] text-accent-primary font-medium hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="space-y-3">

                            {/* Active Item */}
                            <div className="bg-white/[0.03] border border-accent-primary/30 rounded-xl p-4 relative group hover:bg-white/[0.05] transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className="text-white font-medium text-sm">Starbucks HQ</h5>
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(99,91,255,0.8)]"></div>
                                </div>
                                <p className="text-secondary text-[11px] flex items-center gap-1.5">
                                    <Clock size={10} strokeWidth={1.5} /> 2:30 PM • 0.8 mi
                                </p>
                            </div>

                            {/* Pending Item */}
                            <div className="bg-transparent border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                <div>
                                    <h5 className="text-white font-medium text-sm mb-1">Tech Data Inc</h5>
                                    <p className="text-secondary text-[11px]">Follow Up</p>
                                </div>
                                <MoreHorizontal size={14} className="text-white/20" />
                            </div>
                            {/* Pending Item */}
                            <div className="bg-transparent border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-40">
                                <div className="flex items-center gap-3">
                                    <div className="p-1 rounded bg-white/10">
                                        <Check size={10} />
                                    </div>
                                    <h5 className="text-white font-medium text-sm line-through decoration-white/30">Whole Foods</h5>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full"></div>
            </div>
        </div>
    );
};

export default PhoneMockup;