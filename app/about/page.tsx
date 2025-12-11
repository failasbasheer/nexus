'use client';

import React, { useRef, useLayoutEffect } from 'react';
import CTA from '@/components/CTA';
import PageHeader3D from '@/components/PageHeader3D';
import { animateFadeUp, animateStaggeredChildren, animateTextWordByWord } from '@/lib/animations';
import { gsap } from 'gsap';

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const statsGridRef = useRef<HTMLDivElement>(null);
    const valuesGridRef = useRef<HTMLDivElement>(null);
    const teamGridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            animateFadeUp(titleRef.current, { y: 30, duration: 1 });
            animateTextWordByWord(descRef.current, { delay: 0.2 });

            // Stats Animation
            animateStaggeredChildren(statsGridRef.current, { stagger: 0.1, y: 30 });

            // Values Grid
            animateStaggeredChildren(valuesGridRef.current, { stagger: 0.15 });

            // Team Grid
            animateStaggeredChildren(teamGridRef.current, { stagger: 0.1, y: 50 });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-dark">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <PageHeader3D variant="particles" className="h-full w-full" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-secondary text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md">
                        Our Mission
                    </div>
                    <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                        Empowering the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">workforce on the move.</span>
                    </h1>
                    <p ref={descRef} className="text-xl text-secondary leading-relaxed font-light max-w-2xl mx-auto">
                        We're replacing outdated clipboards and spreadsheets with a seamless, mobile-first operating system designed for the modern field team.
                    </p>
                </div>
            </section>

            {/* Premium Stats Grid */}
            <section className="py-12 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div ref={statsGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Users', value: '50k+' },
                            { label: 'Visits Logged', value: '10M+' },
                            { label: 'Countries', value: '30+' },
                            { label: 'Uptime', value: '99.99%' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group cursor-default">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300 ease-out">{stat.value}</h3>
                                <p className="text-sm font-medium text-secondary uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-3xl font-semibold text-white mb-6">Our Values</h2>
                        <div className="h-px w-24 bg-accent-primary"></div>
                    </div>

                    <div ref={valuesGridRef} className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'Accountability', desc: 'Trust is built on transparency. verified data ensures everyone is on the same page.' },
                            { title: 'Reliability', desc: 'Offline-first means work never stops. We engineer for the edge cases so you don\'t have to.' },
                            { title: 'Simplicity', desc: 'Complex doesn\'t mean complicated. We strive for consumer-grade UX in enterprise tools.' }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group">
                                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <div className="w-20 h-20 bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full blur-2xl"></div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-secondary leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-3xl font-semibold text-white tracking-tight">Leadership</h2>
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-white transition-colors">
                        View all positions
                    </a>
                </div>

                <div ref={teamGridRef} className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: 'Alex Morgan', role: 'CEO & Founder', img: 'https://i.pravatar.cc/400?img=11' },
                        { name: 'Sarah Chen', role: 'CTO', img: 'https://i.pravatar.cc/400?img=5' },
                        { name: 'James Wilson', role: 'Head of Product', img: 'https://i.pravatar.cc/400?img=3' },
                        { name: 'Emily Davis', role: 'VP of Sales', img: 'https://i.pravatar.cc/400?img=9' },
                    ].map((leader, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="w-full aspect-[3/4] bg-muted rounded-xl mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                {/* Image with Hover Effect */}
                                <img
                                    src={leader.img}
                                    alt={leader.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                            <h4 className="text-base font-bold text-white mb-1 group-hover:text-accent-primary transition-colors">{leader.name}</h4>
                            <p className="text-xs font-medium text-secondary uppercase tracking-wider">{leader.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <CTA />
        </div>
    );
};

export default About;
