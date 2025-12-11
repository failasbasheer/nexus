import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { MapPin, Wifi, Database, RefreshCw, Check, User, Navigation, Lock, ChevronLeft, CheckCircle2, Zap, Activity } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import OfflineScene from './tech-scene/OfflineScene';
import TechCard from './tech-scene/TechCard';

import BillingCard from './tech-scene/BillingCard';

gsap.registerPlugin(ScrollTrigger);

type ArtVariant = 'mobile' | 'dashboard' | 'tech' | 'pricing' | 'billing';

interface AbstractArtProps {
  variant: ArtVariant;
  className?: string;
  style?: React.CSSProperties;
}

const AbstractArt: React.FC<AbstractArtProps> = ({ variant, className = '', style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = React.useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // Refs for mobile internal UI animations
  const uiImageRef = useRef<HTMLImageElement>(null);
  const uiGpsTagRef = useRef<HTMLDivElement>(null);
  const uiBadgeRef = useRef<HTMLDivElement>(null);
  const uiFocusRef = useRef<HTMLDivElement>(null);

  // Refs for Dashboard animations
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const agent1Ref = useRef<HTMLDivElement>(null);
  const agent2Ref = useRef<HTMLDivElement>(null);
  const agent3Ref = useRef<HTMLDivElement>(null);

  // Scoped Parallax Handlers (Only on hover, only within container)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(phoneRef.current, {
      rotationY: x * 3, // Very subtle tilt (±1.5deg)
      rotationX: -y * 3,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!phoneRef.current) return;
    gsap.to(phoneRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // === MOBILE VARIANT ANIMATIONS ===
      if (variant === 'mobile' && phoneRef.current && containerRef.current) {
        // 1. Static Entrance
        gsap.fromTo(phoneRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Elements - scoped selector for safety
        const readyBadge = uiBadgeRef.current?.querySelector('.ready-badge');
        const verifyingBadge = uiBadgeRef.current?.querySelector('.verifying-badge');
        const verifiedBadge = uiBadgeRef.current?.querySelector('.verified-badge');

        // Initial State Setters
        if (readyBadge) gsap.set(readyBadge, { opacity: 1, scale: 1, display: 'flex' });
        if (verifyingBadge) gsap.set(verifyingBadge, { opacity: 0, scale: 0.8, display: 'none' });
        if (verifiedBadge) gsap.set(verifiedBadge, { opacity: 0, scale: 0.8, display: 'none' });

        // 2. Main Scroll-Locked Verification Sequence
        // Initial State: Image Hidden
        if (uiImageRef.current) {
          gsap.set(uiImageRef.current, { opacity: 0, filter: "blur(12px)" });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%", // Play when element is well into view
            end: "bottom top",
            toggleActions: "play none none reverse"
          }
        });

        // Step 1: Ready -> Verifying (Start)
        tl.to(readyBadge, { opacity: 0, scale: 0.9, duration: 0.4 })
          .set(readyBadge, { display: 'none' })
          .set(verifyingBadge, { display: 'flex' })
          .to(verifyingBadge, { opacity: 1, scale: 1, duration: 0.4 })

          // Step 2: "Capturing" - Fade in Blurred Image
          .to(uiImageRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut"
          }, "<+=0.2") // Overlap slightly with badge change

          // Step 3: "Hold" verifying state (Processing...)
          .to(verifyingBadge, {
            y: -5,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            ease: "sine.inOut"
          })

          // Step 4: Verifying -> Verified & Clear Image
          .to(verifyingBadge, { opacity: 0, scale: 0.9, duration: 0.4 })
          .set(verifyingBadge, { display: 'none' })
          .set(verifiedBadge, { display: 'flex' })
          .to([verifiedBadge, uiImageRef.current], {
            opacity: 1, // Ensure both are visible
            scale: 1, // Verified badge scale
            y: 0, // Verified badge y
            filter: "blur(0px)", // CLEAR IMAGE
            duration: 0.8,
            ease: "power2.out" // Smooth clear
          });
      }

      // === DASHBOARD VARIANT ANIMATIONS ===
      if (variant === 'dashboard' && mapContainerRef.current) {
        // Entrance: Map Plane
        gsap.fromTo(mapContainerRef.current,
          { opacity: 0, rotateX: 45, scale: 0.9 },
          { opacity: 1, rotateX: 35, scale: 1, duration: 1.5, ease: "power3.out" }
        );

        // Entrance: HUD Panel
        if (hudRef.current) {
          gsap.fromTo(hudRef.current,
            { opacity: 0, y: 30, x: 20 },
            { opacity: 1, y: 0, x: 0, duration: 1, delay: 0.6, ease: "back.out(1.2)" }
          );
        }

        // Float Agents (Sine wave motion)
        const agents = [agent1Ref.current, agent2Ref.current, agent3Ref.current];
        agents.forEach((agent, i) => {
          if (agent) {
            gsap.to(agent, {
              y: "-=12",
              duration: 3 + i, // Varied duration
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.4
            });
          }
        });
      }
    }, containerRef); // Scope to container

    return () => ctx.revert();
  }, [variant]);

  const getArt = () => {
    switch (variant) {
      case 'mobile':
        return (
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[700px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>

            {/* Phone Shell */}
            <div
              ref={phoneRef}
              className="relative w-[280px] h-[580px] rounded-[44px] bg-[#0A0A0A] border-[6px] border-[#1f1f1f] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Screen Reflection */}
              <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent rounded-[38px]"></div>

              {/* Main Screen Area */}
              <div className="flex-1 bg-[#000] rounded-[38px] overflow-hidden flex flex-col relative mask-image">
                {/* Status Bar */}
                <div className="h-12 flex justify-between items-end px-6 pb-2 z-20 bg-gradient-to-b from-black/60 to-transparent">
                  <span className="text-[12px] font-medium text-white font-sans">{currentTime}</span>
                  <div className="flex gap-1.5 items-center">
                    <Wifi size={14} className="text-white" />
                    <div className="w-5 h-2.5 rounded-[3px] border border-white/40 relative px-[1px]">
                      <div className="absolute inset-y-0.5 left-0.5 right-1 bg-white rounded-[1px]"></div>
                    </div>
                  </div>
                </div>
                {/* App Header */}
                <div className="absolute top-12 left-0 right-0 px-5 pt-2 pb-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <ChevronLeft size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-white drop-shadow-md">Acme Corp HQ</h3>
                      <span className="text-[10px] text-white/80 font-medium bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm self-start mt-0.5">Downtown Sector</span>
                    </div>
                  </div>
                </div>
                {/* Viewfinder Content */}
                <div className="relative flex-1 bg-black w-full overflow-hidden">
                  <img
                    ref={uiImageRef}
                    src="https://images.unsplash.com/photo-1684831652465-9e523949eef2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Building View"
                    className="w-full h-full object-cover scale-100"
                  />
                  {/* Focus Brackets & Grid */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full border-white/10 border-t border-b grid grid-cols-3 opacity-50">
                      <div className="border-r border-white/10"></div>
                      <div className="border-r border-white/10"></div>
                    </div>
                    <div ref={uiFocusRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-50">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white drop-shadow-lg"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white drop-shadow-lg"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white drop-shadow-lg"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white drop-shadow-lg"></div>
                    </div>
                    <div ref={uiGpsTagRef} className="absolute top-[20%] right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-mono text-white tracking-wide">GPS: ±2m</span>
                    </div>
                  </div>
                  <div ref={uiBadgeRef} className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 w-fit">
                    {/* Ready State */}
                    <div className="ready-badge absolute bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-2.5 whitespace-nowrap ring-1 ring-white/5 top-0 left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      <span className="text-[11px] font-medium tracking-wide text-white/90 uppercase">Ready to Capture</span>
                    </div>

                    {/* Verifying State */}
                    <div className="verifying-badge absolute bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-3 whitespace-nowrap ring-1 ring-white/5 opacity-0 top-0 left-1/2 -translate-x-1/2">
                      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-accent-secondary border-t-transparent animate-spin"></div>
                      </div>
                      <span className="text-[11px] font-medium tracking-wide text-white/90 uppercase">Verifying Location...</span>
                    </div>

                    {/* Verified State */}
                    <div className="verified-badge absolute bg-gradient-to-br from-white to-[#F0F0F0] text-black px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white flex items-center gap-2.5 whitespace-nowrap opacity-0 scale-90">
                      <div className="bg-[#635BFF] rounded-full p-0.5">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[11px] font-bold tracking-tight text-[#635BFF]">CONFIRMED</span>
                        <span className="text-[9px] font-semibold text-gray-500">Photo & Location Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Camera Controls */}
                <div className="h-32 bg-black flex items-center justify-between px-8 pb-8 pt-4 relative z-20">
                  <div className="w-11 h-11 rounded-lg bg-gray-800 overflow-hidden border border-white/20">
                    <img src="https://images.unsplash.com/photo-1684831652465-9e523949eef2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="relative cursor-pointer group">
                    <div className="w-[72px] h-[72px] rounded-full border-[4px] border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors duration-300">
                      <div className="w-[58px] h-[58px] rounded-full bg-white transition-transform duration-200 group-hover:scale-105 group-active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                    <RefreshCw size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard': // Feature: Live Team Command Center
        return (
          <div className="relative w-full h-full flex items-center justify-center perspective-1000 group">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-magenta/5 rounded-full blur-[100px] -z-10 opacity-50"></div>

            {/* 3D Map Container */}
            <div
              ref={mapContainerRef}
              className="relative w-[560px] h-[400px] preserve-3d transform rotate-x-[35deg] rotate-z-[20deg] scale-90 transition-transform duration-700 ease-out group-hover:scale-[0.92] group-hover:rotate-x-[32deg]"
            >

              {/* Layer 1: The Vector Map Plane */}
              <div className="absolute inset-0 bg-[#0F0F16] rounded-xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden transform translate-z-0">

                {/* Vector Grid System */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(110,86,207,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(110,86,207,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,22,0),#0F0F16)]"></div>

                {/* SVG Routes & Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.3))' }}>
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#635BFF" stopOpacity="0" />
                      <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Route 1 */}
                  <path
                    d="M 120 150 Q 250 250 420 280"
                    stroke="url(#routeGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 6"
                    className="animate-[dash_3s_linear_infinite]"
                  />
                  <circle r="3" fill="#fff">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 120 150 Q 250 250 420 280" />
                  </circle>

                  {/* Route 2 */}
                  <path
                    d="M 420 280 Q 350 150 200 100"
                    stroke="#635BFF"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 6"
                    opacity="0.5"
                    className="animate-[dash_5s_linear_infinite]"
                  />
                  <circle r="3" fill="#635BFF">
                    <animateMotion dur="5s" repeatCount="indefinite" path="M 420 280 Q 350 150 200 100" />
                  </circle>
                </svg>

                {/* Active Agent Nodes */}
                <div ref={agent1Ref} className="absolute top-[35%] left-[20%] z-20 cursor-pointer transition-transform hover:scale-125">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-secondary rounded-full shadow-[0_0_15px_#00C2FF] relative z-10"></div>
                    <div className="absolute inset-0 bg-accent-secondary rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Agent-01
                    </div>
                  </div>
                </div>

                <div ref={agent2Ref} className="absolute top-[65%] left-[75%] z-20 cursor-pointer transition-transform hover:scale-125">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-primary rounded-full shadow-[0_0_15px_#6E56CF] relative z-10"></div>
                    <div className="absolute inset-0 bg-accent-primary rounded-full animate-ping opacity-75" style={{ animationDelay: '0.8s' }}></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Agent-04
                    </div>
                  </div>
                </div>

                <div ref={agent3Ref} className="absolute top-[20%] left-[60%] z-20 cursor-pointer transition-transform hover:scale-125">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-accent-magenta rounded-full shadow-[0_0_15px_#FF5DAD] relative z-10"></div>
                    <div className="absolute inset-0 bg-accent-magenta rounded-full animate-ping opacity-75" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>

              </div>

              {/* Layer 2: 3D Buildings (CSS Cubes) */}
              <div className="absolute top-[15%] left-[30%] w-16 h-16 transform-style-3d translate-z-10 pointer-events-none">
                {/* Base */}
                <div className="absolute inset-0 bg-accent-primary/10 border border-accent-primary/30 transform translate-z-[0px]"></div>
                {/* Top */}
                <div className="absolute inset-0 bg-accent-primary/20 border border-accent-primary/40 transform translate-z-[30px] shadow-[0_0_15px_rgba(110,86,207,0.3)]"></div>
                {/* Sides (Simulated) */}
                <div className="absolute inset-0 h-[30px] bg-accent-primary/10 border-x border-accent-primary/30 transform rotate-x-[-90deg] origin-bottom translate-y-[16px]"></div>
                <div className="absolute inset-0 w-[16px] h-[30px] bg-accent-primary/10 border-y border-accent-primary/30 transform rotate-y-[-90deg] origin-left translate-x-[-16px]"></div>
              </div>

              <div className="absolute top-[60%] left-[55%] w-10 h-10 transform-style-3d translate-z-10 pointer-events-none opacity-60">
                <div className="absolute inset-0 bg-accent-secondary/10 border border-accent-secondary/30 transform translate-z-[0px]"></div>
                <div className="absolute inset-0 bg-accent-secondary/20 border border-accent-secondary/40 transform translate-z-[20px]"></div>
                <div className="absolute inset-0 h-[20px] bg-accent-secondary/10 border-x border-accent-secondary/30 transform rotate-x-[-90deg] origin-bottom translate-y-[10px]"></div>
              </div>

              {/* Layer 3: Floating HUD */}
              <div
                ref={hudRef}
                className="absolute -top-6 -right-12 w-48 bg-[#15121E]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transform translate-z-40 hover:translate-z-50 transition-transform duration-300 hover:border-white/20"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Activity</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center group/item">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-secondary group-hover/item:text-white transition-colors" />
                      <span className="text-xs text-secondary font-medium">Agents Online</span>
                    </div>
                    <span className="text-sm font-mono text-white font-bold tracking-tight">24</span>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <div className="flex items-center gap-2">
                      <Activity size={12} className="text-secondary group-hover/item:text-white transition-colors" />
                      <span className="text-xs text-secondary font-medium">Check-ins</span>
                    </div>
                    <span className="text-sm font-mono text-white font-bold tracking-tight">142</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );

      case 'tech': // Feature: Offline PWA
        return (
          <div className={`relative w-full h-full rounded-2xl overflow-hidden ${className}`}>
            <TechCard />
          </div>
        );

      case 'billing': // Feature: Subscription Billing
        return (
          <div className={`relative w-full h-full rounded-2xl overflow-hidden ${className}`}>
            <BillingCard />
          </div>
        );

      case 'pricing':
        return <div className="bg-muted w-full h-full rounded-xl"></div>;

      default:
        return <div className="bg-muted w-full h-full rounded-xl"></div>;
    }
  };

  return (
    <div className={`select-none pointer-events-none ${className}`} style={style}>
      {getArt()}
    </div>
  );
};

export default AbstractArt;