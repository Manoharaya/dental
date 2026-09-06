import React, { useState } from 'react';
import { CalendarCheck, Scan, FileText, Sparkles, HeartHandshake, ChevronRight } from 'lucide-react';

interface TreatmentJourneySectionProps {
  onBookConsultation: () => void;
}

export const TreatmentJourneySection: React.FC<TreatmentJourneySectionProps> = ({
  onBookConsultation,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const journeySteps = [
    {
      step: '01',
      title: 'Private Consultation',
      icon: <CalendarCheck className="w-5 h-5 text-[#3E8E7E]" />,
      tagline: 'Listening to your smile ambitions',
      description: 'Your journey begins with an unrushed, 1-on-1 discussion in our private consultation suite. We discuss your aesthetic desires, previous anxieties, and personal timetable with zero judgment.',
      deliverables: ['Beverage concierge service', 'Smile goal aesthetic questionnaire', 'Preliminary photo series'],
    },
    {
      step: '02',
      title: 'Comprehensive 3D Diagnostics',
      icon: <Scan className="w-5 h-5 text-[#3E8E7E]" />,
      tagline: 'Sub-millimeter biological mapping',
      description: 'Zero gooey impression putty. We capture your teeth and jawbone in ultra-definition using optical TRIOS 5 intraoral scanners and ultra-low-dose 3D CBCT bone radiography.',
      deliverables: ['6,000 fps impressionless optical scan', '360° cranial bone & nerve model', 'AI caries and gum health analysis'],
    },
    {
      step: '03',
      title: 'Personalized Treatment Blueprint',
      icon: <FileText className="w-5 h-5 text-[#3E8E7E]" />,
      tagline: 'Transparent choices & virtual trial',
      description: 'Using Digital Smile Design (DSD), we calibrate tooth proportions with your facial symmetry and produce a 3D simulation of your prospective smile before any treatment occurs.',
      deliverables: ['Digital smile simulation video', 'Clear itemized fee schedule (0% APR options)', 'Guaranteed timeline breakdown'],
    },
    {
      step: '04',
      title: 'Precision Gentle Treatment',
      icon: <Sparkles className="w-5 h-5 text-[#3E8E7E]" />,
      tagline: 'Biomimetic mastery with zero pain',
      description: 'Relax in ergonomic memory foam chairs with noise-canceling headphones. Our clinicians utilize computerized Wand anesthesia, dental lasers, and microscopic precision to restore your teeth.',
      deliverables: ['Custom sensory entertainment streaming', 'Painless needle-free anesthesia option', 'German CEREC same-day restorations'],
    },
    {
      step: '05',
      title: 'Lifetime Support & Aftercare',
      icon: <HeartHandshake className="w-5 h-5 text-[#3E8E7E]" />,
      tagline: 'Protecting your smile investment',
      description: 'We safeguard your results with custom nocturnal guards, complimentary maintenance whitening gel, and our 24/7 AI concierge ensuring rapid access whenever you need us.',
      deliverables: ['Complimentary annual whitening touch-ups', 'Direct on-call dentist cell access', 'Written warranty on ceramic restorations'],
    },
  ];

  return (
    <section className="py-24 bg-[#F5F1EA] relative overflow-hidden border-t border-[#1B2B27]/08">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E]" />
            Care Protocol & Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            How Your Smile Transformation Unfolds
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            From your private introductory consultation to lifetime aftercare, every milestone is calibrated for serenity.
          </p>
        </div>

        {/* 5-Step Interactive Journey */}
        <div className="flex md:grid md:grid-cols-5 overflow-x-auto no-scrollbar gap-3 mb-6 sm:mb-10 pb-2 md:pb-0 snap-x">
          {journeySteps.map((item, idx) => {
            const stepNum = idx + 1;
            const isCurrent = activeStep === stepNum;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(stepNum)}
                className={`flex-shrink-0 w-[210px] sm:w-[240px] md:w-auto snap-center p-3.5 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between select-none ${
                  isCurrent
                    ? 'border-[#3E8E7E]/60 bg-white shadow-spa ring-1 ring-[#3E8E7E]/20'
                    : 'border-[#1B2B27]/06 bg-white/70 hover:bg-white hover:border-[#1B2B27]/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className={`font-mono text-[11px] sm:text-xs font-semibold ${isCurrent ? 'text-[#3E8E7E]' : 'text-[#536963]'}`}>
                    Phase {item.step}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${
                    isCurrent ? 'bg-[#D4EFE8] text-[#1B2B27]' : 'bg-[#F5F1EA] text-[#536963]'
                  }`}>
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1B2B27] leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-[#536963] mt-1 line-clamp-2">{item.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Active Step Detail View Card */}
        {(() => {
          const current = journeySteps[activeStep - 1];
          return (
            <div className="glass-spa text-[#1B2B27] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#1B2B27]/08 shadow-spa grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#3E8E7E] font-medium tracking-wide">
                  <span>Phase {current.step} of 05</span>
                  <span>•</span>
                  <span>{current.tagline}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-serif font-normal text-[#1B2B27]">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-base text-[#536963] leading-relaxed max-w-2xl font-normal">
                  {current.description}
                </p>

                <div className="pt-2 sm:pt-3">
                  <h5 className="text-[11px] sm:text-xs font-mono tracking-wider text-[#536963] mb-2">
                    Included in this stage:
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {current.deliverables.map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] sm:text-xs bg-white text-[#1B2B27] px-3 py-1.5 rounded-xl border border-[#1B2B27]/08 shadow-sm"
                      >
                        ✦ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-2 lg:pt-0">
                <button
                  onClick={onBookConsultation}
                  className="btn-tactile-primary w-full sm:w-auto py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold group"
                >
                  <span>Begin Phase 01: Reserve Consultation</span>
                  <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
