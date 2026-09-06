import React from 'react';
import { Star, Award, HeartPulse, Clock } from 'lucide-react';
import type { ClinicProfile } from '../../types/clinic';

interface TrustStatsBarProps {
  clinic: ClinicProfile;
}

export const TrustStatsBar: React.FC<TrustStatsBarProps> = ({ clinic }) => {
  const icons = [
    <Star key="star" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400" />,
    <HeartPulse key="heart" className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" />,
    <Award key="award" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />,
    <Clock key="clock" className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />,
  ];

  return (
    <div className="border-y border-slate-200/80 bg-white/70 backdrop-blur-sm relative z-10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {clinic.trustStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 shadow-sm"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center mb-2 shadow-sm">
                {icons[idx % icons.length]}
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-luxury-slate tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-700 mt-0.5 uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
