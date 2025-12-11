import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit">
              <Logo className="w-6 h-6" />
              <span className="font-bold text-lg tracking-tight">Nexus</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed">
              The operating system for field sales. Track visits, verify locations, and close more deals.
            </p>
            <div className="flex gap-4 mt-2">
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Spacer / Empty Column on wide screens if needed, or structured columns */}

          {/* Product Column */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Enterprise</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact / Legal Column */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li><a href="mailto:hello@nexus.com" className="hover:text-white transition-colors">hello@nexus.com</a></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-secondary text-xs">© 2024 Nexus Inc. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-secondary font-medium">System Operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a href={href} className="text-secondary hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
    {icon}
  </a>
)

export default Footer;