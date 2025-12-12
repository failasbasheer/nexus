'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateFadeUp } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "Nexus allows us to scale our field team without losing visibility. It's the operating system we've been waiting for.",
        author: "Elena Rodriguez",
        role: "VP Ops, SolarFlow",
        logo: "SF",
        img: "/avatars/elena.png"
    },
    {
        quote: "The automated billing features alone saved us 20 hours a week. It pays for itself ten times over.",
        author: "Marcus Chen",
        role: "Director, UrbanLogistics",
        logo: "UL",
        img: "/avatars/marcus.png"
    },
    {
        quote: "Finally, a CRM that field reps actually want to use. The offline mode is flawless.",
        author: "Sarah Johnson",
        role: "Head of Sales, TechStream",
        logo: "TS",
        img: "/avatars/sarah.png"
    },
    {
        quote: "We've increased our daily visit capacity by 35% since switching to Nexus. Data quality is up, fraud is down.",
        author: "David Park",
        role: "Regional Manager, Apex",
        logo: "AP",
        img: "/avatars/marcus.png" // Reusing due to generation limit
    },
    {
        quote: "Implementation took days, not months. The support team is incredible.",
        author: "Jessica Wu",
        role: "CTO, BuildSmart",
        logo: "BS",
        img: "/avatars/elena.png" // Reusing 
    }
];

const Testimonials: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            const totalWidth = sliderRef.current?.scrollWidth;

            // Header Entrance
            if (headerRef.current) {
                animateFadeUp(headerRef.current, { y: 30, duration: 1 });
            }

            // Infinite Scroll Marquee
            gsap.to(sliderRef.current, {
                x: "-50%", // Move half the width (since we double the content)
                duration: 40, // Slower for readability
                ease: "linear",
                repeat: -1,
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 bg-dark overflow-hidden relative border-t border-white/5">

            <div ref={headerRef} className="text-center mb-20 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">The standard for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">high-performance field teams.</span></h2>
                <p className="text-secondary text-lg max-w-2xl mx-auto">Join the world's best companies scaling with Nexus.</p>
            </div>

            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#0B0A10] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#0B0A10] to-transparent z-20 pointer-events-none"></div>

            <div className="relative w-full flex overflow-hidden">
                <div ref={sliderRef} className="flex gap-6 whitespace-nowrap pl-6 py-10">
                    {/* Double the array for seamless loop */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="w-[360px] flex-shrink-0 bg-[#0F0F12]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">

                            {/* Quote Icon - Subtle */}
                            <div className="mb-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/20">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                </svg>
                            </div>

                            <p className="text-white/90 text-[15px] font-medium leading-relaxed whitespace-normal mb-6 min-h-[80px]">"{t.quote}"</p>

                            <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-4">
                                <img src={t.img} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{t.author}</p>
                                    <p className="text-xs text-secondary truncate">{t.role}</p>
                                </div>
                                <div className="px-2 py-1 rounded bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-bold text-white/40 tracking-wider">{t.logo}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
