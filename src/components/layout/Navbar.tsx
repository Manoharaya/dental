import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Bot, Calendar, ChevronRight, Sparkles } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Single Line Flex Container */}
        <div className="flex items-center justify-between gap-2 lg:gap-4 w-full flex-nowrap">
          
          {/* 1. Clinic Brand & Logo (Strictly 1 line, no wrapping) */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-luxury-slate text-white flex items-center justify-center shadow-luxury group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5 2.5 7.5S8 22 10 22s2-2.5 2-4.5c0 2 0 4.5 2 4.5s2.5-4 3.5-6.5S20 11 20 8c0-3.5-3.5-6-8-6z"/>
              </svg>
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="font-display font-bold text-sm sm:text-base lg:text-lg text-luxury-slate tracking-tight whitespace-nowrap block">
                {clinic.name}
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-mono block -mt-0.5 whitespace-nowrap">
                {clinic.city} • {clinic.state}
              </span>
            </div>
          </a>

          {/* 2. Desktop Navigation Links (Strictly 1 line, no wrapping) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-xs font-semibold text-slate-600 shrink-0 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-brand-600 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* 3. Action CTAs (Strictly 1 line, all buttons in single row, no wrapping) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 whitespace-nowrap">
            
            {/* Phone (Shown on large screens) */}
            <a
              href={`tel:${clinic.phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-600 px-2.5 py-2 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span className="whitespace-nowrap">{clinic.phone}</span>
            </a>

            {/* AI Receptionist Button (Single line, responsive text) */}
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <Bot className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">AI Receptionist</span>
              <span className="whitespace-nowrap sm:hidden">AI</span>
            </button>

            {/* Primary Book Appointment CTA (Single line, responsive text) */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-luxury-slate hover:bg-slate-800 transition-all shadow-luxury hover:shadow-glow whitespace-nowrap shrink-0 group"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">Book Appointment</span>
              <span className="whitespace-nowrap sm:hidden">Book</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:inline" />
            </button>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden pt-4 pb-5 border-t border-slate-200 mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-colors whitespace-nowrap text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <a
                href={`tel:${clinic.phone}`}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span>Call Clinic: {clinic.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 rounded-xl bg-luxury-slate text-white text-xs font-bold flex items-center justify-center gap-2 shadow-luxury hover:bg-slate-800 transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
