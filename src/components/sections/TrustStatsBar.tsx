import React from 'react';
import type { ClinicProfile } from '../../types/clinic';

interface TrustStatsBarProps {
  clinic: ClinicProfile;
}

export const TrustStatsBar: React.FC<TrustStatsBarProps> = ({ clinic }) => {
  return (
    <div className="border-y border-[#1B2B27]/08 bg-[#F5F1EA] relative z-10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-4 lg:gap-0 lg:divide-x divide-[#1B2B27]/08">
          {clinic.trustStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start px-4 py-4 sm:px-6 sm:py-2 text-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E]" />
                <span className="text-[10px] font-mono tracking-wider text-[#3E8E7E]">
                  Clinical Metric 0{idx + 1}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-medium text-[#1B2B27] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#1B2B27] mt-1 tracking-wide">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#536963] mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
