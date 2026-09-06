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
    <section className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-32 bg-[#0A110F]">
      {/* Soft ambient gradient glow: Mint-teal and warm porcelain */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-b from-[#3ED9C0]/12 via-[#1E8D7B]/05 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-[#F2E9DC]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Tactile CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            
            {/* Subtle Clinical Badge (No loud all-caps) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131F1C] border border-[#3ED9C0]/25 text-[#D1DED9] text-xs font-medium shadow-[0_0_20px_rgba(62,217,192,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#3ED9C0] animate-pulse" />
              <span>{clinic.badge}</span>
            </div>

            {/* Main Headline: Refined Display Serif */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-[#F9FAF9] tracking-tight leading-[1.12]">
              Precision Dentistry. <br className="hidden sm:inline" />
              <span className="text-[#3ED9C0]">Uncompromised</span> Serenity.
            </h1>

            {/* Supporting Subtitle: Geometric Sans */}
            <p className="text-sm sm:text-base lg:text-lg text-[#A8B8B4] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {clinic.subheadline} Experience biomimetic restorations and bespoke smile design orchestrated in a tranquil, private clinical studio.
            </p>

            {/* Primary & Secondary Tactile CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-tactile-primary w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold group"
              >
                <Calendar className="w-4 h-4 text-[#07221C]" />
                <span>Reserve Consultation</span>
                <ChevronRight className="w-4 h-4 text-[#07221C] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#treatments"
                className="btn-tactile-secondary w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>Explore Treatments</span>
                <ArrowDown className="w-4 h-4 text-[#A8B8B4]" />
              </a>

              <button
                onClick={onOpenAi}
                className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#131F1C]/70 hover:bg-[#182723] text-[#D1DED9] hover:text-[#F9FAF9] border border-white/10 hover:border-[#3ED9C0]/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-[#3ED9C0] animate-pulse" />
                <span>Ask AI Concierge</span>
              </button>
            </div>

            {/* Emergency Ribbon & Quality Standards */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-[#A8B8B4]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3ED9C0]" />
                <span className="text-[#F9FAF9] font-medium">Studio Hours:</span>
                <span>{clinic.hours.monFri}</span>
              </div>

              <a
                href={`tel:${clinic.emergencyPhone}`}
                className="flex items-center gap-1.5 text-rose-400 font-medium hover:underline"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Direct Hotline: {clinic.emergencyPhone}</span>
              </a>

              <div className="flex items-center gap-1.5 text-[#D1DED9]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3ED9C0] shrink-0" />
                <span>Zero-Pain Protocol</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Anatomical Tooth Model Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glassmorphic 3D Card Backdrop with Ambient Teal Rim */}
              <div className="glass-clinical rounded-3xl p-5 sm:p-7 border border-[#3ED9C0]/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
                {/* Subtle internal aura */}
                <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#3ED9C0]/10 rounded-full blur-3xl pointer-events-none" />

                {/* 3D Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3ED9C0] animate-pulse" />
                    <span className="text-xs font-mono text-[#D1DED9] tracking-wider">
                      Biomimetic 3D Model
                    </span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#182723] text-[#3ED9C0] border border-[#3ED9C0]/20 font-medium">
                    WebGL Real-Time
                  </span>
                </div>

                {/* 3D Tooth Viewer Component */}
                <Tooth3DViewer showControls={true} />

                {/* Clinical note */}
                <p className="text-[11px] text-[#A8B8B4] text-center mt-3 font-normal">
                  Toggle clinical states above to observe the transition from natural enamel to ceramic restoration.
                </p>
              </div>

              {/* Floating Doctor Faculty Endorsement Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 bg-[#131F1C]/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-2xl items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3ED9C0] to-[#1E8D7B] text-[#07221C] flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(62,217,192,0.3)]">
                  4.9★
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#F9FAF9] block">Board-Certified Specialists</span>
                  <span className="text-[#A8B8B4]">Top 1% aesthetic clinicians nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
