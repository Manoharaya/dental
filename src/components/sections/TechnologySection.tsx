import React, { useState } from 'react';
import { TECHNOLOGY_DATA } from '../../config/clinicData';
import { TechnologyItem } from '../../types/clinic';
import { Sparkles, Scan, Camera, Cpu, Zap, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

interface TechnologySectionProps {
  onBookConsultation: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  onBookConsultation,
}) => {
  const [selectedTech, setSelectedTech] = useState<TechnologyItem>(TECHNOLOGY_DATA[0]);

  const iconMap: Record<string, React.ReactNode> = {
    Scan: <Scan className="w-5 h-5 text-[#3E8E7E]" />,
    Camera: <Camera className="w-5 h-5 text-[#5FA592]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#3E8E7E]" />,
    Zap: <Zap className="w-5 h-5 text-emerald-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#3E8E7E]" />,
    Eye: <Eye className="w-5 h-5 text-[#5FA592]" />,
  };

  return (
    <section id="technology" className="py-24 bg-[#F5F1EA] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D4EFE8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Digital Diagnostic Prowess
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Technology That Changes How We Treat You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Eliminating messy impressions, minimizing radiation, and delivering same-day restorations with sub-millimeter precision.
          </p>
        </div>

        {/* Interactive Tech Showcase: Cards + Featured Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Interactive Tech Selection Cards */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            {TECHNOLOGY_DATA.map((tech) => (
              <div
                key={tech.id}
                onClick={() => setSelectedTech(tech)}
                className={`p-3.5 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none ${
                  selectedTech.id === tech.id
                    ? 'border-[#3E8E7E]/60 bg-white shadow-spa ring-1 ring-[#3E8E7E]/20'
                    : 'glass-spa border-[#1B2B27]/06 hover:bg-white hover:border-[#1B2B27]/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F5F1EA] border border-[#1B2B27]/08 flex items-center justify-center shrink-0">
                      {iconMap[tech.icon] || <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#3E8E7E]" />}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#D4EFE8] text-[#1B2B27] border border-[#3E8E7E]/20 truncate max-w-[90px]">
                      {tech.badge}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1B2B27] leading-snug line-clamp-1 sm:line-clamp-none">
                    {tech.title}
                  </h4>
                  <p className="text-[11px] text-[#536963] mt-1 line-clamp-2 leading-relaxed">
                    {tech.tagline}
                  </p>
                </div>
                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#1B2B27]/06 flex items-center justify-between text-[11px] sm:text-xs text-[#3E8E7E] font-medium">
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Featured Deep-Dive Stage Card */}
          <div className="lg:col-span-6 glass-spa text-[#1B2B27] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-[#1B2B27]/08 bg-[#FBFAF7] shadow-sm">
                <img
                  src={selectedTech.image}
                  alt={selectedTech.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="text-xs font-mono text-[#3E8E7E] font-medium tracking-wide">
                  {selectedTech.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#1B2B27] mb-1.5 sm:mb-2">
                {selectedTech.title}
              </h3>
              <p className="text-xs text-[#3E8E7E] font-medium mb-3 sm:mb-4">{selectedTech.tagline}</p>
              <p className="text-xs sm:text-sm text-[#536963] leading-relaxed mb-4 sm:mb-6">
                {selectedTech.description}
              </p>

              <div>
                <h5 className="text-xs font-semibold tracking-wider text-[#1B2B27] mb-2.5">
                  Direct Patient Benefits:
                </h5>
                <div className="space-y-2">
                  {selectedTech.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#1B2B27]">
                      <CheckCircle2 className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1B2B27]/08 z-10">
              <button
                onClick={onBookConsultation}
                className="btn-tactile-primary w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Experience 3D Digital Dentistry in Person
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
