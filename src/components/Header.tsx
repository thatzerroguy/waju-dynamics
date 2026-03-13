'use client';
import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

const serviceLinks = [
  { name: 'Fuel Haulage & Delivery', href: '/services/fuel-haulage' },
  { name: 'Heavy Duty Equipment Hire', href: '/services/equipment-hire' },
  { name: 'Real Estate Solutions', href: '/services/real-estate' },
];

const projectLinks = [
  { name: 'Fuel Haulage Projects', href: '/projects/fuel-haulage' },
  { name: 'Equipment Hire Projects', href: '/projects/equipment-hire' },
  { name: 'Real Estate Projects', href: '/projects/real-estate' },
];

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 py-4 transition-all duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/home#services" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5 flex items-center gap-1">
              Services
              <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-4 w-64 bg-white border border-charcoal/10 shadow-lg py-2 transition-all duration-300 origin-top-left ${activeDropdown === 'services' ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" /> {/* Invisible hover bridge */}
              {serviceLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="block px-5 py-3 text-sm text-[#001D3C] hover:bg-cream hover:text-[#FEBE01] transition-colors border-b border-charcoal/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/home#why" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5">
            Why Waju Dynamics
          </Link>

          {/* Projects Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown('projects')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/home#projects" className="nav-link text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors pb-0.5 flex items-center gap-1">
              Projects
              <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-4 w-64 bg-white border border-charcoal/10 shadow-lg py-2 transition-all duration-300 origin-top-left ${activeDropdown === 'projects' ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
               <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" /> {/* Invisible hover bridge */}
              {projectLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="block px-5 py-3 text-sm text-[#001D3C] hover:bg-cream hover:text-[#FEBE01] transition-colors border-b border-charcoal/5 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Logo center */}
        <Link href="/home" className="flex items-center gap-2">
          <AppLogo size={180} />
        </Link>

        {/* Right CTA */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+2349049155555"
            className="hidden md:block text-[14px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors"
          >
            +234 904 915 5555
          </a>
          <Link
            href="/home#quote"
            className="text-[11px] font-bold uppercase tracking-widest2 bg-[#001D3C] text-white px-5 py-2.5 hover:bg-mid transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;