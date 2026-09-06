import React from 'react';
import { ClinicProfile } from '../../types/clinic';
import { PageType } from '../../types/navigation';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
  onNavigate?: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  clinic,
  onOpenBooking,
  onNavigate,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, page: PageType) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-[#F5F1EA] text-[#1B2B27] pt-16 pb-28 lg:pb-16 border-t border-[#1B2B27]/08 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#1B2B27]/08">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleLinkClick(e, 'home')}
                className="flex items-center gap-3 text-left group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-[#3E8E7E] flex items-center justify-center border border-[#1B2B27]/08 shadow-spa group-hover:border-[#3E8E7E]/50 transition-colors">
                  <svg className="w-5 h-5 text-[#3E8E7E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C7.5 2 4 4.5 4 8c0 3 1.5 5 2.5 7.5S8 22 10 22s2-2.5 2-4.5c0 2 0 4.5 2 4.5s2.5-4 3.5-6.5S20 11 20 8c0-3.5-3.5-6-8-6z"/>
                  </svg>
                </div>
                <span className="font-serif font-normal text-xl text-[#1B2B27] tracking-tight group-hover:text-[#3E8E7E] transition-colors">
                  {clinic.name}
                </span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#536963] leading-relaxed max-w-sm">
              {clinic.tagline} {clinic.subheadline}
            </p>

            <div className="pt-2 text-xs text-[#536963] space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                <span>{clinic.address}, {clinic.suite}, {clinic.city}, {clinic.state} {clinic.zip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                <span>{clinic.phone} • Emergency 24/7: {clinic.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                <span>{clinic.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Key Treatments */}
          <div>
            <h4 className="text-xs font-semibold text-[#1B2B27] tracking-wider mb-4">
              Aesthetic & Surgical
            </h4>
            <ul className="space-y-2 text-xs text-[#536963]">
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">Porcelain Veneers</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">Computer-Guided Implants</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">Invisalign® Aligners</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">Laser Teeth Whitening</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">All-on-4 Same-Day Arch</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">CEREC® Same-Day Crowns</button></li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Tech */}
          <div>
            <h4 className="text-xs font-semibold text-[#1B2B27] tracking-wider mb-4">
              Explore Practice
            </h4>
            <ul className="space-y-2 text-xs text-[#536963]">
              <li><button onClick={(e) => handleLinkClick(e, 'technology')} className="hover:text-[#3E8E7E] transition-colors text-left">3D Dental Anatomy Explorer</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'gallery')} className="hover:text-[#3E8E7E] transition-colors text-left">Before & After Smile Gallery</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'technology')} className="hover:text-[#3E8E7E] transition-colors text-left">Interactive Smile Simulator</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'doctors')} className="hover:text-[#3E8E7E] transition-colors text-left">Doctor Credentials & Faculty</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'technology')} className="hover:text-[#3E8E7E] transition-colors text-left">3D CBCT & Optical Scanners</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'treatments')} className="hover:text-[#3E8E7E] transition-colors text-left">0% APR Payment Calculator</button></li>
            </ul>
          </div>

          {/* Col 5: Hours & Emergency */}
          <div>
            <h4 className="text-xs font-semibold text-[#1B2B27] tracking-wider mb-4">
              Clinic Schedule
            </h4>
            <div className="space-y-1.5 text-xs text-[#536963] mb-5">
              <div>
                <span className="text-[#1B2B27] block font-semibold">Mon – Fri:</span>
                <span>{clinic.hours.monFri}</span>
              </div>
              <div>
                <span className="text-[#1B2B27] block font-semibold">Saturday:</span>
                <span>{clinic.hours.saturday}</span>
              </div>
              <div>
                <span className="text-[#3E8E7E] block font-semibold">Emergency Line:</span>
                <span>24/7 Dedicated On-Call</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn-tactile-primary w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white"
            >
              Book Online Now
            </button>
          </div>
        </div>

        {/* Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#536963]/70">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-[#1B2B27] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1B2B27] transition-colors">HIPAA Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1B2B27] transition-colors">Accessibility Statement</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#536963] hover:text-[#1B2B27] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#3E8E7E]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
