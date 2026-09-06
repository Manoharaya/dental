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
      icon: <CalendarCheck className="w-5 h-5 text-brand-500" />,
      tagline: 'Listening to your smile ambitions',
      description: 'Your journey begins with an unrushed, 1-on-1 discussion in our private consultation suite. We discuss your aesthetic desires, previous anxieties, and personal timetable with zero judgment.',
      deliverables: ['Beverage concierge service', 'Smile goal aesthetic questionnaire', 'Preliminary photo series'],
    },
    {
      step: '02',
      title: 'Comprehensive 3D Diagnostics',
      icon: <Scan className="w-5 h-5 text-brand-500" />,
      tagline: 'Sub-millimeter biological mapping',
      description: 'Zero gooey impression putty. We capture your teeth and jawbone in ultra-definition using optical TRIOS 5 intraoral scanners and ultra-low-dose 3D CBCT bone radiography.',
      deliverables: ['6,000 fps impressionless optical scan', '360° cranial bone & nerve model', 'AI caries and gum health analysis'],
    },
    {
      step: '03',
      title: 'Personalized Treatment Blueprint',
      icon: <FileText className="w-5 h-5 text-brand-500" />,
      tagline: 'Transparent choices & virtual trial',
      description: 'Using Digital Smile Design (DSD), we calibrate tooth proportions with your facial symmetry and produce a 3D simulation of your prospective smile before any treatment occurs.',
      deliverables: ['Digital smile simulation video', 'Clear itemized fee schedule (0% APR options)', 'Guaranteed timeline breakdown'],
    },
    {
      step: '04',
      title: 'Precision Gentle Treatment',
      icon: <Sparkles className="w-5 h-5 text-brand-500" />,
      tagline: 'Biomimetic mastery with zero pain',
      description: 'Relax in ergonomic memory foam chairs with noise-canceling headphones. Our clinicians utilize computerized Wand anesthesia, dental lasers, and microscopic precision to restore your teeth.',
      deliverables: ['Custom sensory entertainment streaming', 'Painless needle-free anesthesia option', 'German CEREC same-day restorations'],
    },
    {
      step: '05',
      title: 'Lifetime Support & Aftercare',
      icon: <HeartHandshake className="w-5 h-5 text-brand-500" />,
      tagline: 'Protecting your smile investment',
      description: 'We safeguard your results with custom nocturnal guards, complimentary maintenance whitening gel, and our 24/7 AI concierge ensuring rapid access whenever you need us.',
      deliverables: ['Complimentary annual whitening touch-ups', 'Direct on-call dentist cell access', 'Written warranty on ceramic restorations'],
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Patient Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            How Your Smile Transformation Unfolds
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From your very first greeting to long-term preventive vitality, every stage is orchestrated for supreme serenity.
          </p>
        </div>

        {/* 5-Step Desktop Interactive Journey Horizontal Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
          {journeySteps.map((item, idx) => {
            const stepNum = idx + 1;
            const isCurrent = activeStep === stepNum;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(stepNum)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-brand-500 bg-brand-50/40 shadow-luxury'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-brand-600' : 'text-slate-400'}`}>
                    STEP {item.step}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isCurrent ? 'bg-white shadow-sm' : 'bg-slate-200/60'
                  }`}>
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Active Step Detail View Card */}
        {(() => {
          const current = journeySteps[activeStep - 1];
          return (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-luxury-dark border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest">
                  <span>Phase {current.step} of 05</span>
                  <span>•</span>
                  <span>{current.tagline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {current.description}
                </p>

                <div className="pt-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Included in this stage:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {current.deliverables.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700"
                      >
                        ✦ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <button
                  onClick={onBookConsultation}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
                >
                  <span>Begin Step 01: Book Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
