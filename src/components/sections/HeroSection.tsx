import React from 'react';
import { Calendar, ChevronRight, Phone, ShieldCheck, Sparkles, AlertCircle, ArrowDown } from 'lucide-react';
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
    <section className="relative overflow-hidden pt-4 pb-14 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-28">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[700px] h-[250px] sm:h-[350px] bg-brand-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-4 w-72 sm:w-96 h-72 sm:h-96 bg-luxury-champagne/80 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Clinic Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{clinic.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-luxury-slate tracking-tight leading-[1.15]">
              Modern Dentistry.{' '}
              <span className="bg-gradient-to-r from-brand-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                Exceptional Smiles.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {clinic.subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-luxury-slate hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>Book an Appointment</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#treatments"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Treatments</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenAi}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-brand-50/80 hover:bg-brand-100 text-brand-700 font-semibold text-xs sm:text-sm border border-brand-200 transition-all flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ask AI Receptionist</span>
              </button>
            </div>

            {/* Emergency Ribbon & Reassurance */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-6 text-[11px] sm:text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-800">Open Today:</span>
                <span>{clinic.hours.monFri}</span>
              </div>

              <a
                href={`tel:${clinic.emergencyPhone}`}
                className="flex items-center gap-1 text-rose-600 font-semibold hover:underline"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Emergency Hotline: {clinic.emergencyPhone}</span>
              </a>

              <div className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>Zero-Pain Promise</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Anatomical Tooth Model Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glassmorphic 3D Card Backdrop */}
              <div className="bg-white/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/90 shadow-2xl relative overflow-hidden">
                {/* 3D Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Real-Time 3D Tooth Model
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    WebGL Render
                  </span>
                </div>

                {/* 3D Tooth Viewer Component */}
                <Tooth3DViewer showControls={true} />

                {/* Micro educational note */}
                <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-2">
                  Toggle states above to observe the transition from healthy enamel to restoration.
                </p>
              </div>

              {/* Floating Doctor Endorsement Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 text-white flex items-center justify-center font-bold text-xs shadow-glow">
                  4.9★
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Board-Certified Specialists</span>
                  <span className="text-slate-500">Top 1% aesthetic clinicians nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
