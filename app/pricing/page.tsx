'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Check } from 'lucide-react';
import CTA from '@/components/CTA';
import PageHeader3D from '@/components/PageHeader3D';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateTextWordByWord } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
    const [annual, setAnnual] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            gsap.from(titleRef.current, {
                y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
            });

            // Animate Description
            animateTextWordByWord(descRef.current, { delay: 0.3 });

            // Animate Cards
            gsap.from(cardsRef.current?.children || [], {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%"
                },
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const plans = [
        {
            name: "Starter",
            desc: "Essential tools for small local teams.",
            price: annual ? "19" : "29",
            features: ["Up to 5 Field Users", "Photo Visit Logging", "Real-time GPS", "7-Day History", "Basic Support"],
            highlight: false
        },
        {
            name: "Growth",
            desc: "Advanced control for scaling organizations.",
            price: annual ? "49" : "59",
            features: ["Up to 25 Field Users", "Unlimited History", "Route Playback", "Follow-up Scheduling", "Role Management"],
            highlight: true
        },
        {
            name: "Enterprise",
            desc: "Custom solutions for national operations.",
            price: "Custom",
            features: ["Unlimited Users", "API Access", "Custom Integration", "Dedicated Account Manager", "SLA Uptime"],
            highlight: false
        }
    ];

    return (
        <div ref={containerRef} className="animate-fade-in relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-accent-primary/5 to-transparent -z-10"></div>

            <section className="pt-36 pb-12 text-center px-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-50 pointer-events-none z-0">
                    <PageHeader3D variant="diamond" className="h-[400px]" />
                </div>

                <div className="relative z-10">
                    <h1 ref={titleRef} className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight">Simple, transparent pricing</h1>
                    <p ref={descRef} className="text-xl text-secondary mb-12 max-w-2xl mx-auto font-light">
                        Pay per team. Scale as you grow. 14-day free trial on all plans.
                    </p>

                    <div className="inline-flex items-center gap-6 p-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm mb-16">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${!annual ? 'bg-white/10 text-white' : 'text-secondary'}`} onClick={() => setAnnual(false)}>Monthly</span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${annual ? 'bg-white/10 text-white' : 'text-secondary'}`} onClick={() => setAnnual(true)}>Yearly <span className="text-accent-secondary text-xs ml-1">-20%</span></span>
                    </div>
                </div>
            </section>

            <section ref={cardsRef} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6 mb-20 perspective-1000">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`relative rounded-3xl p-8 border transition-all duration-500 group flex flex-col ${plan.highlight
                            ? 'bg-card border-accent-primary/50 shadow-[0_0_40px_rgba(99,91,255,0.1)] z-10'
                            : 'bg-surface/50 border-white/5'
                            } 
            hover:-translate-y-2 hover:border-white/20
            `}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#635BFF] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg border border-white/10">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                            <p className="text-secondary text-sm font-light leading-relaxed">{plan.desc}</p>
                        </div>

                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white tracking-tight">${plan.price}</span>
                            {plan.price !== "Custom" && <span className="text-secondary text-sm font-medium">/mo</span>}
                        </div>

                        <button className={`w-full py-3.5 mt-auto mb-8 transition-all duration-300 ${plan.highlight
                            ? 'btn-primary shadow-lg'
                            : 'btn-secondary'
                            }`}>
                            {plan.price === "Custom" ? "Contact Sales" : "Start 14-Day Trial"}
                        </button>

                        <ul className="space-y-4 mt-auto">
                            {plan.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-0.5">
                                        <Check className="text-white w-3 h-3" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm text-secondary/80 group-hover:text-secondary transition-colors leading-tight">{feat}</span>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <CTA />
        </div>
    );
};

export default Pricing;
