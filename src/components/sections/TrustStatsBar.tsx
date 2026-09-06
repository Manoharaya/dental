import React from 'react';
import { Star, ShieldCheck, Award, HeartPulse, Clock } from 'lucide-react';
import { ClinicProfile } from '../../types/clinic';

interface TrustStatsBarProps {
  clinic: ClinicProfile;
}

export const TrustStatsBar: React.FC<TrustStatsBarProps> = ({ clinic }) => {
  const icons = [
    <Star key="star" className="w-5 h-5 text-amber-500 fill-amber-400" />,
    <HeartPulse key="heart" className="w-5 h-5 text-brand-500" />,
    <Award key="award" className="w-5 h-5 text-emerald-500" />,
    <Clock key="clock" className="w-5 h-5 text-indigo-500" />,
  ];

  return (
    <div className="border-y border-slate-200/80 bg-white/60 backdrop-blur-sm relative z-10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {clinic.trustStats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-2.5 shadow-sm">
                {icons[idx % icons.length]}
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-luxury-slate tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-0.5 uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
