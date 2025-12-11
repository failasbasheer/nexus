import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Globe, Hexagon, Zap, Triangle, Circle, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ValueStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Logos with icons for a more premium look
  const logos = [
    { name: "Acme Corp", icon: Box },
    { name: "Global Bank", icon: Globe },
    { name: "Starlight", icon: Sparkles },
    { name: "Umbrella", icon: Hexagon },
    { name: "Cyberdyne", icon: Zap },
    { name: "Massive", icon: Triangle },
    { name: "Vortex", icon: Circle },
  ];

  // Duplicate for seamless loop
  const displayLogos = [...logos, ...logos];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-10 border-y border-white/5 bg-surface/30 backdrop-blur-sm overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-semibold text-secondary uppercase tracking-widest opacity-80">Empowering field teams at leading organizations</p>
      </div>

      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-scroll gap-20 items-center">
        {displayLogos.map((brand, i) => (
          <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 group cursor-default grayscale hover:grayscale-0">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-primary/20 transition-colors">
              <brand.icon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold text-white tracking-widest font-sans">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueStrip;