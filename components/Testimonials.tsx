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
                <div ref={sliderRef} className="flex gap-8 whitespace-nowrap pl-8">
                    {/* Double the array for seamless loop */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="w-[400px] flex-shrink-0 bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors group backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-white tracking-widest border border-white/5">
                                    {t.logo}
                                </div>
                                <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                            <p className="text-white text-lg font-medium leading-relaxed whitespace-normal mb-8">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                                <div>
                                    <p className="text-base font-semibold text-white">{t.author}</p>
                                    <p className="text-sm text-white/40">{t.role}</p>
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
