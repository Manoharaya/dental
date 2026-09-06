import React from 'react';
import { ClinicProfile } from '../../types/clinic';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  clinic,
  onOpenBooking,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070C0B] text-white pt-16 pb-28 lg:pb-16 border-t border-white/10 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0E1614] text-teal-400 flex items-center justify-center border border-teal-500/30 shadow-glow-teal">
                <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5 2.5 7.5S8 22 10 22s2-2.5 2-4.5c0 2 0 4.5 2 4.5s2.5-4 3.5-6.5S20 11 20 8c0-3.5-3.5-6-8-6z"/>
                </svg>
              </div>
              <span className="font-serif font-light text-xl text-[#F2E9DC] tracking-tight">
                {clinic.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A8B8B4] leading-relaxed max-w-sm">
              {clinic.tagline} {clinic.subheadline}
            </p>

            <div className="pt-2 text-xs text-[#A8B8B4] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{clinic.address}, {clinic.suite}, {clinic.city}, {clinic.state} {clinic.zip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{clinic.phone} • Emergency 24/7: {clinic.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{clinic.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Key Treatments */}
          <div>
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              Aesthetic & Surgical
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B8B4]">
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">Porcelain Veneers</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">Computer-Guided Implants</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">Invisalign® Aligners</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">Laser Teeth Whitening</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">All-on-4 Same-Day Arch</a></li>
              <li><a href="#treatments" className="hover:text-teal-300 transition-colors">CEREC® Same-Day Crowns</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Tech */}
          <div>
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              Explore Practice
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B8B4]">
              <li><a href="#3d-explorer" className="hover:text-teal-300 transition-colors">3D Dental Anatomy Explorer</a></li>
              <li><a href="#gallery" className="hover:text-teal-300 transition-colors">Before & After Smile Gallery</a></li>
              <li><a href="#simulator" className="hover:text-teal-300 transition-colors">Interactive Smile Simulator</a></li>
              <li><a href="#dentists" className="hover:text-teal-300 transition-colors">Doctor Credentials & Faculty</a></li>
              <li><a href="#technology" className="hover:text-teal-300 transition-colors">3D CBCT & Optical Scanners</a></li>
              <li><a href="#financing" className="hover:text-teal-300 transition-colors">0% APR Payment Calculator</a></li>
            </ul>
          </div>

          {/* Col 5: Hours & Emergency */}
          <div>
            <h4 className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">
              Clinic Schedule
            </h4>
            <div className="space-y-1.5 text-xs text-[#A8B8B4] mb-5">
              <div>
                <span className="text-[#F2E9DC] block font-medium">Mon – Fri:</span>
                <span>{clinic.hours.monFri}</span>
              </div>
              <div>
                <span className="text-[#F2E9DC] block font-medium">Saturday:</span>
                <span>{clinic.hours.saturday}</span>
              </div>
              <div>
                <span className="text-teal-300 block font-medium">Emergency Line:</span>
                <span>24/7 Dedicated On-Call</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn-tactile-primary w-full py-2.5 px-3 rounded-xl text-xs font-semibold"
            >
              Book Online Now
            </button>
          </div>
        </div>

        {/* Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A8B8B4] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
