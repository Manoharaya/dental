import React from 'react';
import { ClinicProfile } from '../../types/clinic';
import { Phone, Mail, MapPin, Heart, Shield, Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  clinic,
  onOpenBooking,
  onOpenAi,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 lg:pb-16 border-t border-slate-800 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-luxury-slate text-brand-400 flex items-center justify-center border border-slate-700 shadow-glow">
                <svg className="w-5 h-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5 2.5 7.5S8 22 10 22s2-2.5 2-4.5c0 2 0 4.5 2 4.5s2.5-4 3.5-6.5S20 11 20 8c0-3.5-3.5-6-8-6z"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                {clinic.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {clinic.tagline} {clinic.subheadline}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{clinic.address}, {clinic.suite}, {clinic.city}, {clinic.state} {clinic.zip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{clinic.phone} • Emergency: {clinic.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{clinic.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Key Treatments */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Aesthetic & Surgical
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#treatments" className="hover:text-white transition-colors">Porcelain Veneers</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Computer-Guided Implants</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Invisalign® Aligners</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Laser Teeth Whitening</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">All-on-4 Same-Day Teeth</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">CEREC® Same-Day Crowns</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Tech */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Explore Practice
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#3d-explorer" className="hover:text-white transition-colors">3D Dental Anatomy Explorer</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Before & After Smile Gallery</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Interactive Smile Simulator</a></li>
              <li><a href="#dentists" className="hover:text-white transition-colors">Doctor Credentials & Faculty</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">3D CBCT & Intraoral Scanners</a></li>
              <li><a href="#financing" className="hover:text-white transition-colors">0% APR Payment Calculator</a></li>
            </ul>
          </div>

          {/* Col 5: Hours & Emergency */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Clinic Schedule
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400 mb-4">
              <div>
                <span className="text-slate-200 block font-medium">Mon – Fri:</span>
                <span>{clinic.hours.monFri}</span>
              </div>
              <div>
                <span className="text-slate-200 block font-medium">Saturday:</span>
                <span>{clinic.hours.saturday}</span>
              </div>
              <div>
                <span className="text-rose-400 block font-medium">Emergency Line:</span>
                <span>24/7 Dedicated On-Call</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-all shadow-glow"
            >
              Book Online Now
            </button>
          </div>
        </div>

        {/* Legal, Accreditations & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">HIPAA Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Accessibility Statement</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
