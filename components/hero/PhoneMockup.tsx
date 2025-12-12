import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Camera, Navigation, Check, Clock, MoreHorizontal, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PhoneMockup: React.FC<{ className?: string }> = ({ className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);
    const viewportProgressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const visitedRef = useRef<HTMLSpanElement>(null);
    const remainingRef = useRef<HTMLSpanElement>(null);
    const [currentTime, setCurrentTime] = useState("9:41");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
                        end: "+=3000", // Increased scroll distance for multi-step animation
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            if (viewportProgressRef.current) {
                                gsap.set(viewportProgressRef.current, { scaleX: self.progress });

                                // Auto-hide logic upon completion
                                if (self.progress > 0.99) {
                                    gsap.to(viewportProgressRef.current, { opacity: 0, duration: 0.3, overwrite: true });
                                } else {
                                    gsap.to(viewportProgressRef.current, { opacity: 1, duration: 0.3, overwrite: true });
                                }
                            }
                        }
                    }
                });

                // Animate both counter and bar width synchronously with scroll
                const counter = { val: 0 };

                // === STEP 1: Route Start (0-30%) ===
                tl.to(counter, {
                    val: 45,
                    ease: "none",
                    duration: 1.5,
                    onUpdate: () => {
                        if (progressTextRef.current) progressTextRef.current.innerText = Math.round(counter.val) + "%";
                    }
                })
                    .to(progressBarRef.current, { width: "45%", ease: "none", duration: 1.5 }, "<")

                    // === STEP 2: First Stop Complete (30-40%) ===
                    // Item 1 swipes left
                    .to(".item-1", { x: -50, opacity: 0, duration: 0.5, ease: "power2.in" })
                    .set(".item-1", { display: "none" }) // Hide layout space
                    .call(() => {
                        if (visitedRef.current) visitedRef.current.innerText = "13 Visited";
                        if (remainingRef.current) remainingRef.current.innerText = "1 Remaining";
                    })

                    // === STEP 3: Route Continue (40-60%) ===
                    .to(counter, {
                        val: 80,
                        ease: "none",
                        duration: 1,
                        onUpdate: () => {
                            if (progressTextRef.current) progressTextRef.current.innerText = Math.round(counter.val) + "%";
                        }
                    })
                    .to(progressBarRef.current, { width: "80%", ease: "none", duration: 1 }, "<")

                    // === STEP 4: Second Stop Complete (60-70%) ===
                    // Item 2 swipes left
                    .to(".item-2", { x: -50, opacity: 0, duration: 0.5, ease: "power2.in" })
                    .set(".item-2", { display: "none" })
                    .call(() => {
                        if (visitedRef.current) visitedRef.current.innerText = "14 Visited";
                        if (remainingRef.current) remainingRef.current.innerText = "0 Remaining";
                    })

                    // === STEP 5: Route Finish (70-90%) ===
                    .to(counter, {
                        val: 100,
                        ease: "none",
                        duration: 1,
                        onUpdate: () => {
                            if (progressTextRef.current) progressTextRef.current.innerText = Math.round(counter.val) + "%";
                        }
                    })
                    .to(progressBarRef.current, { width: "100%", ease: "none", duration: 1 }, "<")

                    // Change UI State to "Completed"
                    .to(".route-status-label", {
                        opacity: 0, duration: 0.2, onComplete: () => {
                            const el = document.querySelector(".route-status-label") as HTMLElement;
                            if (el) el.innerText = "Route Completed";
                        }
                    })
                    .to(".route-status-label", { opacity: 1, duration: 0.2, color: "#10B981" })
                    .to(progressBarRef.current, { backgroundColor: "#10B981" }, "<")

                    // === STEP 6: Show Summary Card (90-100%) ===
                    .to(".up-next-label", { opacity: 0, duration: 0.2 }, "<") // Hide "Up Next"
                    .set(".completed-view", { display: "flex" })
                    .fromTo(".completed-view",
                        { y: 50, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
                    )
                    // Stagger stats entrance
                    .fromTo(".stat-item",
                        { y: 10, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
                        "-=0.4"
                    )

                    // === Hold at end ===
                    .to({}, { duration: 0.5 });
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
                                    <span className="text-white/80 text-xs font-medium route-status-label">Route Progress</span>
                                </div>
                                <span ref={progressTextRef} className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded-full">0%</span>
                            </div>

                            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden mb-2">
                                {/* Viewport Scroll Progress Bar - Portaled to avoid Transform context */}
                                {mounted && createPortal(
                                    <div ref={viewportProgressRef} className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-accent-secondary z-[9999] origin-left scale-x-0 pointer-events-none" />,
                                    document.body
                                )}
                                <div ref={progressBarRef} className="h-full w-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-secondary">
                                <span ref={visitedRef}>12 Visited</span>
                                <span ref={remainingRef}>2 Remaining</span>
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
                            <h4 className="text-white text-sm font-semibold tracking-tight up-next-label">Up Next</h4>
                            <button className="text-[10px] text-accent-primary font-medium hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="relative h-[200px]"> {/* Fixed height container for swapping views */}
                            {/* View 1: Pending List */}
                            <div className="space-y-3 absolute inset-0 w-full pointer-events-none">
                                {/* Active Item - Item 1 */}
                                <div className="item-1 bg-white/[0.03] border border-accent-primary/30 rounded-xl p-4 relative group transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h5 className="text-white font-medium text-sm">Starbucks HQ</h5>
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(99,91,255,0.8)]"></div>
                                    </div>
                                    <p className="text-secondary text-[11px] flex items-center gap-1.5">
                                        <Clock size={10} strokeWidth={1.5} /> 2:30 PM • 0.8 mi
                                    </p>
                                </div>

                                {/* Pending Item - Item 2 */}
                                <div className="item-2 bg-transparent border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-60">
                                    <div>
                                        <h5 className="text-white font-medium text-sm mb-1">Tech Data Inc</h5>
                                        <p className="text-secondary text-[11px]">Follow Up</p>
                                    </div>
                                    <MoreHorizontal size={14} className="text-white/20" />
                                </div>
                            </div>

                            {/* View 2: Premium Completed State (Hidden initially) */}
                            <div className="completed-view hidden absolute inset-0 w-full flex-col justify-end pb-2 opacity-0">
                                <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl ring-1 ring-white/5">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                            <Check size={24} className="text-emerald-500" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold text-lg leading-tight">All Done!</h5>
                                            <p className="text-secondary text-xs">Great job today.</p>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="stat-item bg-white/5 rounded-lg p-2 text-center border border-white/5">
                                            <div className="flex justify-center mb-1 text-accent-primary"><MapPin size={12} /></div>
                                            <p className="text-white font-bold text-sm">15</p>
                                            <p className="text-[9px] text-white/40 uppercase">Visits</p>
                                        </div>
                                        <div className="stat-item bg-white/5 rounded-lg p-2 text-center border border-white/5">
                                            <div className="flex justify-center mb-1 text-accent-secondary"><TrendingUp size={12} /></div>
                                            <p className="text-white font-bold text-sm">98%</p>
                                            <p className="text-[9px] text-white/40 uppercase">On Time</p>
                                        </div>
                                        <div className="stat-item bg-white/5 rounded-lg p-2 text-center border border-white/5">
                                            <div className="flex justify-center mb-1 text-emerald-400"><Calendar size={12} /></div>
                                            <p className="text-white font-bold text-sm">6h</p>
                                            <p className="text-[9px] text-white/40 uppercase">Duration</p>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                        Finish Day <ArrowRight size={12} />
                                    </button>
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