'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import HeroScene from './hero/HeroScene';
import PhoneMockup from './hero/PhoneMockup';
import { animateHeroIntro } from '../lib/animations';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Fire the coordinated intro animation
    const tl = animateHeroIntro(
      badgeRef.current,
      titleRef.current,
      descRef.current,
      btnRef.current,
      visualRef.current
    );

    // Cleanup
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,91,255,0.15),transparent_50%)]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Text Content */}
        <div className="relative mt-10 z-10 max-w-2xl">


          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
            Track Visits. <br />
            Capture Proof. <br />
            <span className="text-transparent bg-clip-text bg-primary-sweep animate-pulse">Close Deals.</span>
          </h1>

          <p ref={descRef} className="text-lg md:text-xl text-secondary mb-8 max-w-lg leading-relaxed font-light">
            The mobile-first CRM for field sales. Log visits with photo & GPS proof, manage leads on the go, and track your team in real-time—even when offline.
          </p>

          <div ref={btnRef} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="btn-primary group px-8 py-3.5" // Override padding slightly for hero size
            >
              <span className="relative z-10 flex items-center gap-2">Start Free Trial <ArrowRight size={18} /></span>
            </Link>
            <Link
              href="/features"
              className="btn-secondary group px-8 py-3.5"
            >
              <Play size={18} fill="currentColor" /> See Features
            </Link>
          </div>
        </div>

        {/* Hero Visual: 3D Scene + Phone Mockup */}
        <div ref={visualRef} className="relative h-[500px] lg:h-[550px] w-full hidden lg:flex items-center justify-center perspective-1000">
          {/* Background 3D Scene - Now a Globe with Pins */}
          <div className="absolute inset-0 z-0 opacity-100">
            <HeroScene />
          </div>

          {/* Foreground Phone Mockup - Showing Field App */}
          <div className="relative z-10 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
            <PhoneMockup />
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[120px] -z-10"></div>
        </div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
    </section>
  );
};

export default HeroSection;