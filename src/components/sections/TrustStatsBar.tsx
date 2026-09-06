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
    <div className="border-y border-white/[0.07] bg-[#0E1614] relative z-10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-4 lg:gap-0 lg:divide-x divide-white/[0.07]">
          {clinic.trustStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start px-4 py-4 sm:px-6 sm:py-2 text-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9C0]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#3ED9C0]">
                  Clinical Metric 0{idx + 1}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-medium text-[#F9FAF9] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-[#F2E9DC] mt-1 tracking-wide">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#A8B8B4] mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
