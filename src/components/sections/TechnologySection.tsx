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
    Scan: <Scan className="w-5 h-5 text-brand-500" />,
    Camera: <Camera className="w-5 h-5 text-cyan-500" />,
    Cpu: <Cpu className="w-5 h-5 text-amber-500" />,
    Zap: <Zap className="w-5 h-5 text-emerald-500" />,
    Sparkles: <Sparkles className="w-5 h-5 text-sky-500" />,
    Eye: <Eye className="w-5 h-5 text-indigo-500" />,
  };

  return (
    <section id="technology" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Diagnostic Prowess
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Technology That Changes the Way We Treat You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Eliminating messy impressions, minimizing radiation, and delivering same-day robotic restorations with sub-millimeter precision.
          </p>
        </div>

        {/* Interactive Tech Showcase: Cards + Featured Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Tech Selection Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECHNOLOGY_DATA.map((tech) => (
              <div
                key={tech.id}
                onClick={() => setSelectedTech(tech)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTech.id === tech.id
                    ? 'border-brand-500 bg-brand-50/30 shadow-luxury'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {iconMap[tech.icon] || <Sparkles className="w-5 h-5 text-brand-500" />}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600">
                      {tech.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{tech.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{tech.tagline}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-semibold">
                  <span>Explore Tech</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Featured Deep-Dive Stage Card */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-luxury-dark flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-52 w-full rounded-2xl overflow-hidden mb-6 border border-slate-700/80 bg-slate-950">
                <img
                  src={selectedTech.image}
                  alt={selectedTech.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-brand-400 uppercase tracking-widest font-semibold">
                  {selectedTech.badge}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {selectedTech.title}
              </h3>
              <p className="text-xs text-brand-300 font-medium mb-4">{selectedTech.tagline}</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedTech.description}
              </p>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Direct Patient Benefits:
                </h5>
                <div className="space-y-2">
                  {selectedTech.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 z-10">
              <button
                onClick={onBookConsultation}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Experience 3D Digital Dentistry in Person
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
