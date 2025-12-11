'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-300 ease-out flex items-center justify-between px-6 md:px-8 border-b ${scrolled
          ? 'top-0 left-0 w-full h-16 bg-[#0B0A10]/80 backdrop-blur-md border-white/5 shadow-sm'
          : 'top-0 left-0 w-full h-24 bg-transparent border-transparent'
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-bold text-white tracking-tight text-lg">Nexus</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-1 ${scrolled ? 'scale-90' : 'scale-100'} transition-transform duration-500`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${isActive(link.path)
                ? 'text-white bg-white/10'
                : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className={`text-sm font-medium transition-colors ${scrolled ? 'hidden lg:block' : ''} text-secondary hover:text-white`}>
            Sign In
          </Link>
          <Link
            href="/pricing"
            className={`btn-primary h-10 px-6 text-sm ${scrolled ? 'bg-white text-black' : ''}`}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-2xl font-bold text-white tracking-tight hover:text-accent-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-24"></div>
          <Link
            href="/contact"
            className="text-lg font-medium text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-3 bg-white text-black rounded-full font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;