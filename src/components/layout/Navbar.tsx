import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Bot, Calendar, ChevronRight } from 'lucide-react';
import type { ClinicProfile } from '../../types/clinic';

interface NavbarProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  clinic,
  onOpenBooking,
  onOpenAi,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: '3D Explorer', href: '#3d-explorer' },
    { label: 'Smile Gallery', href: '#gallery' },
    { label: 'Dentists', href: '#dentists' },
    { label: 'Technology', href: '#technology' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Financing', href: '#financing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#0A110F]/92 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-[#3ED9C0]/15 py-2.5 sm:py-3'
          : 'bg-[#0A110F]/70 backdrop-blur-md border-b border-white/[0.06] py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1 sm:gap-4 w-full flex-nowrap">
          
          {/* Logo & Clinic Brand */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#131F1C] border border-[#3ED9C0]/30 text-[#3ED9C0] flex items-center justify-center shadow-[0_0_20px_rgba(62,217,192,0.18)] group-hover:border-[#3ED9C0]/60 transition-all shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3ED9C0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5 2.5 7.5S8 22 10 22s2-2.5 2-4.5c0 2 0 4.5 2 4.5s2.5-4 3.5-6.5S20 11 20 8c0-3.5-3.5-6-8-6z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-sm sm:text-lg text-[#F9FAF9] tracking-tight truncate block whitespace-nowrap group-hover:text-[#3ED9C0] transition-colors">
                {clinic.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#A8B8B4] tracking-widest uppercase font-mono block -mt-0.5 whitespace-nowrap">
                {clinic.city} • {clinic.state}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs font-medium text-[#A8B8B4] shrink-0 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#3ED9C0] transition-colors py-1 relative group tracking-wide"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#3ED9C0] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 whitespace-nowrap">
            
            {/* Desktop Direct Phone */}
            <a
              href={`tel:${clinic.phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#D1DED9] hover:text-[#3ED9C0] px-3 py-1.5 rounded-xl hover:bg-[#131F1C] border border-transparent hover:border-[#3ED9C0]/20 transition-all whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#3ED9C0] shrink-0" />
              <span className="whitespace-nowrap">{clinic.phone}</span>
            </a>

            {/* Mobile Call Icon Button */}
            <a
              href={`tel:${clinic.phone}`}
              className="inline-flex lg:hidden p-2 rounded-xl text-[#D1DED9] hover:bg-[#131F1C] border border-white/5 transition-colors shrink-0"
              title={`Call ${clinic.name}`}
            >
              <Phone className="w-4 h-4 text-[#3ED9C0]" />
            </a>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium bg-[#131F1C] hover:bg-[#182723] text-[#F9FAF9] border border-[#3ED9C0]/25 hover:border-[#3ED9C0]/45 transition-all shadow-[0_0_15px_rgba(62,217,192,0.1)] whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9C0] animate-pulse shrink-0" />
              <Bot className="w-3.5 h-3.5 text-[#3ED9C0] shrink-0" />
              <span className="whitespace-nowrap hidden xs:inline sm:hidden">AI</span>
              <span className="whitespace-nowrap hidden sm:inline">AI Receptionist</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="btn-tactile-primary inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs whitespace-nowrap shrink-0 group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#07221C] shrink-0" />
              <span className="whitespace-nowrap hidden xs:inline sm:hidden">Book</span>
              <span className="whitespace-nowrap hidden sm:inline">Book Appointment</span>
              <ChevronRight className="w-3 h-3 text-[#07221C] group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:inline" />
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#D1DED9] hover:bg-[#131F1C] border border-white/5 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#3ED9C0]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden pt-3 pb-5 border-t border-white/10 mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#D1DED9]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#131F1C]/90 border border-white/5 hover:border-[#3ED9C0]/30 hover:text-[#3ED9C0] transition-colors whitespace-nowrap text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <a
                href={`tel:${clinic.phone}`}
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 text-xs font-medium text-[#F2E9DC] flex items-center justify-center gap-2 hover:bg-[#131F1C] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#3ED9C0]" />
                <span>Direct Concierge: {clinic.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-tactile-primary w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#07221C]" />
                <span>Reserve Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
