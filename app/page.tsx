'use client';

import React, { useRef, useLayoutEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ValueStrip from '@/components/ValueStrip';
import FeatureSection from '@/components/FeatureSection';
import CTA from '@/components/CTA';
import Testimonials from '@/components/Testimonials';
import { Smartphone, Map, Camera, WifiOff, Users, CalendarCheck, DollarSign } from 'lucide-react';
import { animateFadeUp, animateTextWordByWord } from '@/lib/animations';
import { gsap } from 'gsap';

const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const testimonialContainerRef = useRef<HTMLElement>(null);
    const testimonialQuoteRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate container background/entrance
            animateFadeUp(testimonialContainerRef.current, { y: 30 });
            // Animate text word by word
            animateTextWordByWord(testimonialQuoteRef.current, { delay: 0.2 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            <HeroSection />
            <ValueStrip />

            <div className="bg-neutral-depth relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <FeatureSection
                    title="Photo-Verified Visits"
                    description="Eliminate fake reports. Field staff capture 2 photos—customer and location—with auto-GPS stamps for indisputable proof of every visit."
                    icon={Camera}
                    features={["Double Photo Capture", "Auto-GPS Tagging", "Visit Verification", "Fraud Prevention"]}
                    artVariant="mobile"
                />

                <FeatureSection
                    title="Live Team Command Center"
                    description="Visualize your workforce in real-time. The manager dashboard offers map clustering, active route playback, and daily visit timelines for every sales user."
                    icon={Map}
                    features={["Real-time GPS Clustering", "Activity Timelines", "Attendance Logs", "Territory Filters"]}
                    reversed={true}
                    artVariant="dashboard"
                />

                <FeatureSection
                    title="Offline-First PWA"
                    description="Sales never stop for bad signal. Our PWA uses IndexedDB to store leads and visit logs locally, syncing automatically via background sockets when online."
                    icon={WifiOff}
                    features={["Local Database Queue", "Background Sync", "Zero Data Loss", "Native-Like Speed"]}
                    artVariant="tech"
                />

                <FeatureSection
                    title="Automated Revenue"
                    description="Handle subscriptions, usage-based billing, and payouts with zero code. Watch your MRR grow in real-time with our transparent billing engine."
                    icon={DollarSign}
                    features={["Smart Invoicing", "Usage Metering", "Global Payouts", "Tax Handling"]}
                    reversed={true}
                    artVariant="billing"
                />
            </div>

            <Testimonials />

            <CTA />
        </div>
    );
};

export default Home;
