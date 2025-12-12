import React, { useRef, useLayoutEffect, useState } from 'react';
import { LucideIcon, CheckCircle2 } from 'lucide-react';
import AbstractArt from './AbstractArt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateFadeUp, animateTextWordByWord } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  reversed?: boolean;
  artVariant: 'mobile' | 'dashboard' | 'tech' | 'pricing' | 'billing';
}

const FeatureSection: React.FC<FeatureProps> = ({
  title,
  description,
  icon: Icon,
  features,
  reversed = false,
  artVariant
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isMobileVariant = artVariant === 'mobile';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Icon Entrance
      animateFadeUp(iconRef.current, { duration: 0.8, y: 30, start: "top 80%", trigger: containerRef.current });

      // 2. Title Word-by-Word
      animateTextWordByWord(titleRef.current, { delay: 0.2, start: "top 80%", trigger: containerRef.current });

      // 3. Description Fade Up
      animateFadeUp(descRef.current, { delay: 0.4, duration: 1, y: 30, start: "top 80%", trigger: containerRef.current });

      // 4. Staggered Bullet Reveal
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, x: -20, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true
            }
          }
        );
      }

      // 5. Visual Parallax
      if (visualRef.current) {
        gsap.fromTo(visualRef.current,
          { opacity: 0, scale: 0.9, y: 50, rotationY: reversed ? -10 : 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              once: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <section
      ref={containerRef}
      className={`py-20 lg:py-24 relative border-t border-white/5 
        ${isMobileVariant ? 'bg-[#0B0A10]' : 'bg-transparent'}
      `}
    >
      {/* Background Container - Handles Overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Premium Minimal Background for Mobile Section */}
        {isMobileVariant && (
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(99,91,255,0.05),transparent_70%)]"></div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col gap-20 lg:gap-32 ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>

          {/* Text Content */}
          <div className="flex-1 relative">
            <div ref={iconRef} className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-md border border-white/10 transition-transform duration-500 hover:scale-110 ${isMobileVariant ? 'bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-white/[0.03]'}`}>
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <span className="text-secondary font-mono text-xs uppercase tracking-widest font-semibold opacity-70">
                Feature 0{artVariant === 'mobile' ? '1' : artVariant === 'dashboard' ? '2' : '3'}
              </span>
            </div>

            <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {title}
            </h2>

            <p ref={descRef} className="text-lg md:text-xl text-secondary leading-relaxed font-light max-w-lg mb-12">
              {description}
            </p>

            <div ref={listRef} className="flex flex-col gap-5">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-5 p-4 rounded-xl border transition-all duration-300 group cursor-default
                    ${isMobileVariant
                      ? 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                      : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isMobileVariant ? 'bg-white/5 text-white' : 'bg-white/5 text-white'}`}>
                    <CheckCircle2 size={16} strokeWidth={2} className="opacity-80" />
                  </div>
                  <span className="text-base font-medium transition-colors text-secondary group-hover:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div ref={visualRef} className="w-full h-[650px] relative z-10 flex items-center justify-center">
              <AbstractArt variant={artVariant} className="w-full h-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;