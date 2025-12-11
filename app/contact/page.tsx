'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import PageHeader3D from '@/components/PageHeader3D';
import { gsap } from 'gsap';
import { registerScrollTrigger, animateTextWordByWord } from '@/lib/animations';

const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        registerScrollTrigger();
        const ctx = gsap.context(() => {
            // Animate Title
            animateTextWordByWord(titleRef.current, { start: "top 70%" });

            // Animate Left Text Column
            gsap.from(textRef.current, {
                opacity: 0,
                x: -30,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            // Animate Form Column (Fade Up & Scale)
            gsap.from(formRef.current, {
                opacity: 0,
                y: 40,
                scale: 0.98,
                duration: 1.2,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            // Stagger Contact Items
            if (textRef.current) {
                gsap.from(textRef.current.querySelectorAll('.contact-item'), {
                    opacity: 0,
                    x: -20,
                    stagger: 0.1,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.out"
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-dark pt-32 pb-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-2/3 -z-10 opacity-30 pointer-events-none">
                <PageHeader3D variant="rings" className="h-[800px] w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left Column: Info */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-primary text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md">
                        Contact Us
                    </div>
                    <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Let's talk business.</h1>

                    <div ref={textRef}>
                        <p className="text-xl text-secondary mb-16 max-w-md font-light leading-relaxed">
                            Ready to transform your field operations? Our team is standing by to give you a personalized demo.
                        </p>

                        <div className="space-y-8">
                            <ContactItem icon={<Mail />} title="Email sales" value="sales@nexus.inc" />
                            <ContactItem icon={<MapPin />} title="Visit our office" value="100 Innovation Dr, SF, CA" />
                            <ContactItem icon={<Phone />} title="Call support" value="+1 (555) 123-4567" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Form */}
                <div ref={formRef} className="relative group">
                    {/* Glow effect behind form */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/30 to-accent-secondary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                    <div className="relative bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <FloatingInput label="First Name" placeholder="Jane" />
                                <FloatingInput label="Last Name" placeholder="Doe" />
                            </div>

                            <FloatingInput label="Work Email" placeholder="jane@company.com" type="email" />
                            <FloatingInput label="Company Name" placeholder="Acme Inc." />

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all h-32 placeholder:text-white/10 resize-none"
                                    placeholder="Tell us about your team size and needs..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 text-base font-semibold shadow-lg group-hover:shadow-accent-primary/20">
                                Send Message <ArrowRight size={18} />
                            </button>

                            <p className="text-center text-xs text-secondary mt-4">
                                By submitting, you agree to our Terms and Privacy Policy.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const ContactItem = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <div className="contact-item flex items-start gap-5 group cursor-pointer">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all text-white">
            {React.cloneElement(icon as React.ReactElement, { size: 20, strokeWidth: 1.5 })}
        </div>
        <div>
            <h3 className="text-white font-medium mb-0.5 text-sm">{title}</h3>
            <p className="text-secondary font-light text-base group-hover:text-white transition-colors">{value}</p>
        </div>
    </div>
);

const FloatingInput = ({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) => (
    <div className="space-y-1.5 group">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider ml-1 group-focus-within:text-accent-primary transition-colors">{label}</label>
        <input
            type={type}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:bg-white/[0.07] focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 outline-none transition-all placeholder:text-white/10"
            placeholder={placeholder}
        />
    </div>
);

export default Contact;
