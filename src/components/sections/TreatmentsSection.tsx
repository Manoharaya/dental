import React, { useState } from 'react';
import { TREATMENTS_DATA } from '../../config/clinicData';
import { Treatment } from '../../types/clinic';
import { Sparkles, Clock, DollarSign, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle, Calendar, ArrowRight } from 'lucide-react';

interface TreatmentsSectionProps {
  onSelectTreatmentForBooking: (treatmentId: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [selectedId, setSelectedId] = useState<string>('veneers');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'cosmetic', label: 'Cosmetic & Veneers' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'ortho', label: 'Invisalign Aligners' },
    { id: 'general', label: 'Restorative & Crowns' },
    { id: 'emergency', label: 'Emergency Care' },
    { id: 'pediatric', label: 'Pediatric' },
  ];

  const filteredTreatments = activeCategory === 'all'
    ? TREATMENTS_DATA
    : TREATMENTS_DATA.filter((t) => t.category === activeCategory);

  const currentTreatment = TREATMENTS_DATA.find((t) => t.id === selectedId) || filteredTreatments[0] || TREATMENTS_DATA[0];

  return (
    <section id="treatments" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Comprehensive Clinical Menu
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Complete Dental Care. One Trusted Team.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Explore our world-class aesthetic, reconstructive, and biological dental treatments designed for lifetime health.
          </p>
        </div>

        {/* Category Pill Navigation */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 px-1 sm:justify-center sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const matching = cat.id === 'all' ? TREATMENTS_DATA[0] : TREATMENTS_DATA.find((t) => t.category === cat.id);
                if (matching) setSelectedId(matching.id);
              }}
              className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-luxury-slate text-white shadow-luxury'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Treatment Explorer: Treatment Selector Strip + Detailed Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Quick Treatment List Cards */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[300px] lg:max-h-[640px] overflow-y-auto pr-1">
            {filteredTreatments.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  selectedId === t.id
                    ? 'border-brand-500 bg-white shadow-luxury'
                    : 'border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.title}</h4>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[170px]">{t.subtitle}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === t.id ? 'text-brand-500 translate-x-1' : 'text-slate-300'}`} />
              </div>
            ))}
          </div>

          {/* Right Column: In-Depth Treatment Dossier Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-luxury">
            {/* Top Banner & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                {currentTreatment.badge && (
                  <span className="text-[11px] px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-bold uppercase tracking-wider inline-block mb-2">
                    {currentTreatment.badge}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-luxury-slate">
                  {currentTreatment.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentTreatment.subtitle}</p>
              </div>

              <button
                onClick={() => onSelectTreatmentForBooking(currentTreatment.id)}
                className="py-3 px-5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 shrink-0 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book This Treatment
              </button>
            </div>

            {/* Quick Metrics Bar: Duration, Recovery, Anesthesia, Cost */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block mb-1">Appointment Time</span>
                <strong className="text-slate-800 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-500" />
                  {currentTreatment.duration}
                </strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block mb-1">Downtime</span>
                <strong className="text-slate-800 font-semibold">{currentTreatment.recoveryTime}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block mb-1">Comfort Protocol</span>
                <strong className="text-slate-800 font-semibold">{currentTreatment.anesthesia}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block mb-1">Investment Guide</span>
                <strong className="text-brand-600 font-semibold">{currentTreatment.costRange}</strong>
              </div>
            </div>

            {/* Treatment Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {currentTreatment.fullDesc}
            </p>

            {/* Key Clinical Benefits Checklist */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Clinical Advantages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTreatment.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure Journey Timeline */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Procedure Roadmap
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {currentTreatment.steps.map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
                    <span className="font-mono text-xs font-bold text-brand-500 mb-1 block">
                      STEP {s.stepNumber}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 mb-1">{s.title}</h5>
                    <p className="text-[11px] text-slate-500 leading-normal">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Specific FAQs */}
            {currentTreatment.faqs.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
                  Frequently Asked Questions About {currentTreatment.title}
                </h4>
                <div className="space-y-2">
                  {currentTreatment.faqs.map((faq, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl text-xs">
                      <strong className="text-slate-800 block mb-1">Q: {faq.question}</strong>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
