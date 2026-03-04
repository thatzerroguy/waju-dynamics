'use client';
import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 py-4' :'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#services" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5">
            Services
          </a>
          <a href="#why" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5">
            Why Waju Dynamics
          </a>
          <a href="#projects" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5">
            Projects
          </a>
        </nav>

        {/* Logo center */}
        <div className="flex items-center gap-2">
          <AppLogo size={180} />
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+2349049155555"
            className="hidden md:block text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors"
          >
            +234 904 915 5555
          </a>
          <a
            href="#quote"
            className="text-[11px] font-bold uppercase tracking-widest2 bg-[#001D3C] text-white px-5 py-2.5 hover:bg-mid transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;