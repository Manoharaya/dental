import React from 'react';
import { Calendar, ChevronRight, ShieldCheck, AlertCircle, ArrowDown, Sparkles } from 'lucide-react';
import type { ClinicProfile } from '../../types/clinic';
import { Tooth3DViewer } from '../three/Tooth3DViewer';

interface HeroSectionProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  clinic,
  onOpenBooking,
  onOpenAi,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32 bg-[#FBFAF7]">
      {/* Soft, diffused light glows: Pale mint behind 3D render & subtle warm blush */}
      <div className="absolute top-0 right-0 w-[600px] lg:w-[750px] h-[450px] lg:h-[550px] bg-[#D4EFE8]/65 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 left-0 w-[450px] lg:w-[550px] h-[400px] bg-[#F9EBE7]/55 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Tactile CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            
            {/* Clinical Boutique Badge (No loud all-caps) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-pulse" />
              <span>{clinic.badge}</span>
            </div>

            {/* Main Headline: Refined Display Serif */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1B2B27] tracking-tight leading-[1.12]">
              Precision Dentistry. <br className="hidden sm:inline" />
              Uncompromised Serenity.
            </h1>

            {/* Supporting Subtitle: Geometric Sans */}
            <p className="text-base sm:text-lg text-[#536963] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {clinic.subheadline} Experience biomimetic restorations and bespoke smile design orchestrated in a tranquil, private clinical studio.
            </p>

            {/* Primary & Secondary Tactile CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-tactile-primary w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold group"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Reserve Consultation</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#treatments"
                className="btn-tactile-secondary w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>Explore Treatments</span>
                <ArrowDown className="w-4 h-4 text-[#536963]" />
              </a>

              <button
                onClick={onOpenAi}
                className="btn-tactile-secondary w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-pulse" />
                <span>Ask AI Concierge</span>
              </button>
            </div>

            {/* Emergency Ribbon & Quality Standards */}
            <div className="pt-4 border-t border-[#1B2B27]/08 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-[#536963]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3E8E7E]" />
                <span className="text-[#1B2B27] font-medium">Studio Hours:</span>
                <span>{clinic.hours.monFri}</span>
              </div>

              <a
                href={`tel:${clinic.emergencyPhone}`}
                className="flex items-center gap-1.5 text-rose-600 font-medium hover:underline"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                <span>Direct Hotline: {clinic.emergencyPhone}</span>
              </a>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E8E7E] shrink-0" />
                <span>Zero-Pain Protocol</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Anatomical Tooth Model Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glassmorphic 3D Card Backdrop */}
              <div className="glass-spa rounded-3xl p-5 sm:p-7 border border-[#1B2B27]/08 shadow-spa relative overflow-hidden">
                {/* 3D Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-pulse" />
                    <span className="text-xs font-mono text-[#536963] tracking-wide">
                      Biomimetic 3D Model
                    </span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4EFE8] text-[#1B2B27] font-medium">
                    WebGL Real-Time
                  </span>
                </div>

                {/* 3D Tooth Viewer Component */}
                <Tooth3DViewer showControls={true} />

                {/* Clinical note */}
                <p className="text-[11px] text-[#536963] text-center mt-3 font-normal">
                  Toggle clinical states above to observe the transition from natural enamel to ceramic restoration.
                </p>
              </div>

              {/* Floating Doctor Faculty Endorsement Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#1B2B27]/08 shadow-spa items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D4EFE8] text-[#1B2B27] flex items-center justify-center font-bold text-xs shadow-sm">
                  4.9★
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#1B2B27] block">Board-Certified Specialists</span>
                  <span className="text-[#536963]">Top 1% aesthetic clinicians nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
