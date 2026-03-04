import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-charcoal/10 bg-cream py-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + links */}
        <div className="flex items-center gap-10">
          <AppLogo size={48} />
          <nav className="flex items-center gap-8">
            <a href="#services" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Services</a>
            <a href="#why" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Why Waju Dynamics</a>
            <a href="#projects" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Projects</a>
            <a href="#quote" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Contact</a>
          </nav>
        </div>

        {/* Legal */}
        <div className="flex items-center gap-6">
          <span className="text-[13px] text-muted">© 2026 Waju Dynamics Inc.</span>
          <a href="#" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Privacy</a>
          <a href="#" className="text-[13px] font-medium text-muted hover:text-charcoal transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;