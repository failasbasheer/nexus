'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateFadeUp } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const CTA: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use standardized blurred fade-up for consistency
      animateFadeUp(titleRef.current, { delay: 0, duration: 1 });
      animateFadeUp(descRef.current, { delay: 0.2, duration: 1 });
      animateFadeUp(btnsRef.current, { delay: 0.4, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-black border-t border-white/5">

      {/* Ambient Background - very subtle */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1]">
          Ready to scale <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">your ambition?</span>
        </h2>

        <p ref={descRef} className="text-lg text-secondary mb-10 max-w-xl mx-auto font-light leading-relaxed">
          Join thousands of developers and businesses who rely on Nexus to power their mission-critical field operations.
        </p>

        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/pricing"
            className="group btn-primary h-12 px-8 text-base rounded-full flex items-center gap-2"
          >
            View Pricing
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="btn-secondary h-12 px-8 text-base rounded-full bg-white/5 border-white/10 hover:bg-white/10"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;