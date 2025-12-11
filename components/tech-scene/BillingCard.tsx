'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { CreditCard, Check, ArrowUpRight, DollarSign, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';

const BillingCard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [transactions, setTransactions] = useState([
        { id: 1, name: 'Acme Corp', amount: '$4,200', status: 'Paid', time: 'Just now' },
        { id: 2, name: 'Global Tech', amount: '$2,850', status: 'Paid', time: '2m ago' },
        { id: 3, name: 'Stark Ind', amount: '$9,500', status: 'Processing', time: '5m ago' },
    ]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite float animation for the main card
            gsap.to('.billing-card-main', {
                y: -10,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Simulate incoming transactions
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
            tl.to({}, {
                duration: 2,
                onStart: () => {
                    // Add new transaction simulation
                    setTransactions(prev => [
                        { id: Date.now(), name: 'New Client', amount: '+$' + (Math.floor(Math.random() * 50) * 100), status: 'Paid', time: 'Just now' },
                        ...prev.slice(0, 2)
                    ]);
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center perspective-1000 scale-90">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

            {/* Main Billing Card */}
            <div className="billing-card-main w-[380px] bg-[#0F0F12] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm">Revenue Stream</h3>
                            <p className="text-xs text-white/40">Real-time collections</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-500">Active</span>
                    </div>
                </div>

                {/* Total Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 relative group hover:border-accent-primary/30 transition-colors">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">MRR</p>
                        <div className="flex items-baseline gap-1">
                            <h4 className="text-2xl font-bold text-white">$142k</h4>
                            <span className="text-[10px] text-emerald-400 flex items-center">+12% <ArrowUpRight size={8} /></span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-transparent opacity-50"></div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent-secondary/30 transition-colors">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Processing</p>
                        <div className="flex items-baseline gap-1">
                            <h4 className="text-2xl font-bold text-white">$8.4k</h4>
                            <span className="text-[10px] text-white/40"><RefreshCw size={10} className="animate-spin" /></span>
                        </div>
                    </div>
                </div>

                {/* Live Feed */}
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold pl-1">Live Transactions</p>
                    {transactions.map((t, i) => (
                        <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 animate-in slide-in-from-top-2 fade-in duration-500">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {t.status === 'Paid' ? <Check size={14} /> : <RefreshCw size={12} className="animate-spin" />}
                                </div>
                                <div>
                                    <p className="text-sm text-white font-medium">{t.name}</p>
                                    <p className="text-[10px] text-white/40">{t.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-white">{t.amount}</p>
                                <p className={`text-[10px] ${t.status === 'Paid' ? 'text-emerald-500/70' : 'text-amber-500/70'}`}>{t.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Elements simulated 2D */}
            <div className="absolute -right-6 top-20 bg-[#1A1A24] border border-white/10 p-4 rounded-xl shadow-xl animate-float-slow z-0 blur-[1px] opacity-60">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <DollarSign size={16} />
                    </div>
                    <div>
                        <div className="h-2 w-16 bg-white/10 rounded mb-1"></div>
                        <div className="h-1.5 w-10 bg-white/5 rounded"></div>
                    </div>
                </div>
                <div className="h-24 w-32 bg-white/5 rounded-lg"></div>
            </div>
            <div className="absolute -left-4 bottom-10 bg-[#1A1A24] border border-white/10 p-4 rounded-xl shadow-xl animate-float z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs text-white/80 font-medium">Payout Scheduled</span>
                </div>
                <p className="text-lg font-bold text-white mt-1">$42,500.00</p>
                <p className="text-[10px] text-white/40">Arrives tomorrow</p>
            </div>
        </div>
    );
};

export default BillingCard;
