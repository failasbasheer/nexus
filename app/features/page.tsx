'use client';

import React, { useRef, useLayoutEffect } from 'react';
import FeatureSection from '@/components/FeatureSection';
import CTA from '@/components/CTA';
import { Map, Users, Globe, Database, CreditCard, ShieldCheck, WifiOff, DollarSign } from 'lucide-react';
import { animateFadeUp } from '@/lib/animations';
import { gsap } from 'gsap';

const Features: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            animateFadeUp(headerRef.current, { y: 30, duration: 1 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <section ref={headerRef} className="pt-36 pb-20 text-center max-w-4xl mx-auto px-6">
                <h1 className="text-5xl font-bold text-white mb-6">The Complete Field OS</h1>
                <p className="text-xl text-secondary">
                    Everything you need to manage field operations, from lead capture to team payroll.
                </p>
            </section>

            <FeatureSection
                title="Lead & Follow-Up Management"
                description="Never drop a lead. Capture names, notes, and sources on the fly. Schedule callbacks and view your daily follow-up queue directly from the home screen."
                icon={Database}
                features={["Exact Location Capture", "One-Tap Navigation", "Status Tracking", "History Logs"]}
                artVariant="mobile"
            />

            <FeatureSection
                title="Role-Based Team Control"
                description="Secure your data. Assign specific roles—CEO, Manager, Sales, or Staff—to control access to sensitive analytics and settings."
                icon={ShieldCheck}
                features={["Multi-Role Support", "Attendance Tracking", "Check-in/Out Logs", "User Deactivation"]}
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

            <CTA />
        </div>
    );
};

export default Features;
