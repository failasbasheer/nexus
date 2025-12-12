'use client';

import React, { useRef, useLayoutEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ValueStrip from '@/components/ValueStrip';
import FeatureSection from '@/components/FeatureSection';
import CTA from '@/components/CTA';
import Testimonials from '@/components/Testimonials';
import { Smartphone, Map, Camera, WifiOff, Users, CalendarCheck, DollarSign, FileText, Gauge, Globe, Calculator, Images, MapPin, ShieldCheck, Lock, Navigation, Activity, Clock, Filter, Database, RefreshCw, HardDrive, Zap } from 'lucide-react';
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
                    features={[]}
                    detailedFeatures={[
                        { title: "Double Photo Capture", description: "Capture both customer proof and venue context.", icon: Images },
                        { title: "Auto-GPS Tagging", description: "Immutable location data stamp on every photo.", icon: MapPin },
                        { title: "Visit Verification", description: "AI-driven analysis to flag simplified or fake reports.", icon: ShieldCheck },
                        { title: "Fraud Prevention", description: "Prevent spoofing with device-level integrity checks.", icon: Lock },
                    ]}
                    artVariant="mobile"
                />

                <FeatureSection
                    title="Live Team Command Center"
                    description="Visualize your workforce in real-time. The manager dashboard offers map clustering, active route playback, and daily visit timelines for every sales user."
                    icon={Map}
                    features={[]}
                    detailedFeatures={[
                        { title: "Real-time GPS Clustering", description: "See your entire fleet's position in real-time.", icon: Navigation },
                        { title: "Activity Timelines", description: "Scrub through daily movements for any agent.", icon: Activity },
                        { title: "Attendance Logs", description: "Automated clock-in/out based on geofence entry.", icon: Clock },
                        { title: "Territory Filters", description: "Segment views by region, team, or status.", icon: Filter },
                    ]}
                    reversed={true}
                    artVariant="dashboard"
                />

                <FeatureSection
                    title="Offline-First PWA"
                    description="Sales never stop for bad signal. Our PWA uses IndexedDB to store leads and visit logs locally, syncing automatically via background sockets when online."
                    icon={WifiOff}
                    features={[]}
                    detailedFeatures={[
                        { title: "Local Database Queue", description: "Store unlimited actions locally without internet.", icon: Database, iconColor: "text-rose-500", iconBgColor: "bg-rose-500/10" },
                        { title: "Background Sync", description: "Auto-syncs packet data when connection restores.", icon: RefreshCw, iconColor: "text-amber-500", iconBgColor: "bg-amber-500/10" },
                        { title: "Zero Data Loss", description: "Persistent storage ensures no form is ever lost.", icon: HardDrive, iconColor: "text-emerald-500", iconBgColor: "bg-emerald-500/10" },
                        { title: "Native-Like Speed", description: "60fps interactions regardless of network latency.", icon: Zap, iconColor: "text-emerald-500", iconBgColor: "bg-emerald-500/10" },
                    ]}
                    artVariant="tech"
                />

                <FeatureSection
                    title="Automated Revenue"
                    description="Handle subscriptions, usage-based billing, and payouts with zero code. Watch your MRR grow in real-time with our transparent billing engine."
                    icon={DollarSign}
                    features={[]} // Legacy prop but we use detailed
                    detailedFeatures={[
                        { title: "Smart Invoicing", description: "Auto-generate PDF invoices for every completed job.", icon: FileText },
                        { title: "Usage Metering", description: "Track realtime API consumption and active seats.", icon: Gauge },
                        { title: "Global Payouts", description: "Settle instantly in 135+ currencies worldwide.", icon: Globe },
                        { title: "Tax Handling", description: "Auto-calculate VAT, GST, and sales tax variance.", icon: Calculator },
                    ]}
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
