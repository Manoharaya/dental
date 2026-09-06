import React, { useState } from 'react';
import { TREATMENTS_DATA } from '../../config/clinicData';
import { Clock, CheckCircle2, ChevronRight, HelpCircle, Calendar } from 'lucide-react';

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
    <section id="treatments" className="py-24 bg-[#FBFAF7] relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4EFE8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E]" />
            Clinical Disciplines & Procedures
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Restorative Artistry. Biological Precision.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Aesthetic, reconstructive, and laser dental therapies engineered for biological longevity.
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
              className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'btn-tactile-primary text-white shadow-tactile-teal'
                  : 'bg-white border border-[#1B2B27]/08 text-[#536963] hover:text-[#1B2B27] hover:border-[#3E8E7E]/30 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Treatment Explorer: Treatment Selector Strip + Detailed Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Quick Treatment List Cards */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[340px] lg:max-h-[640px] overflow-y-auto pr-1">
            {filteredTreatments.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedId === t.id
                    ? 'border-[#3E8E7E]/50 bg-white shadow-spa ring-1 ring-[#3E8E7E]/20'
                    : 'border-[#1B2B27]/06 bg-white/70 hover:bg-white hover:border-[#1B2B27]/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#1B2B27]/08 bg-[#F5F1EA]">
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1B2B27]">{t.title}</h4>
                    <span className="text-[11px] text-[#536963] block truncate max-w-[170px]">{t.subtitle}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === t.id ? 'text-[#3E8E7E] translate-x-1' : 'text-[#536963]/40'}`} />
              </div>
            ))}
          </div>

          {/* Right Column: In-Depth Treatment Dossier Card */}
          <div className="lg:col-span-8 glass-spa rounded-3xl p-5 sm:p-8 border border-[#1B2B27]/08 shadow-spa">
            {/* Top Banner & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1B2B27]/08">
              <div>
                {currentTreatment.badge && (
                  <span className="text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-[#D4EFE8] border border-[#3E8E7E]/25 text-[#1B2B27] font-mono tracking-wide inline-block mb-2 font-medium">
                    {currentTreatment.badge}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#1B2B27]">
                  {currentTreatment.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#536963] mt-1">{currentTreatment.subtitle}</p>
              </div>

              <button
                onClick={() => onSelectTreatmentForBooking(currentTreatment.id)}
                className="btn-tactile-primary py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Reserve Procedure</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-6 text-xs">
              <div className="bg-[#F5F1EA] p-3.5 rounded-xl border border-[#1B2B27]/05">
                <span className="text-[11px] text-[#536963] block mb-1">Appointment Time</span>
                <strong className="text-[#1B2B27] font-medium flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#3E8E7E]" />
                  {currentTreatment.duration}
                </strong>
              </div>
              <div className="bg-[#F5F1EA] p-3.5 rounded-xl border border-[#1B2B27]/05">
                <span className="text-[11px] text-[#536963] block mb-1">Downtime</span>
                <strong className="text-[#1B2B27] font-medium font-mono">{currentTreatment.recoveryTime}</strong>
              </div>
              <div className="bg-[#F5F1EA] p-3.5 rounded-xl border border-[#1B2B27]/05">
                <span className="text-[11px] text-[#536963] block mb-1">Comfort Protocol</span>
                <strong className="text-[#1B2B27] font-medium">{currentTreatment.anesthesia}</strong>
              </div>
              <div className="bg-[#F5F1EA] p-3.5 rounded-xl border border-[#1B2B27]/05">
                <span className="text-[11px] text-[#536963] block mb-1">Investment Guide</span>
                <strong className="text-[#3E8E7E] font-medium font-mono">{currentTreatment.costRange}</strong>
              </div>
            </div>

            {/* Treatment Description */}
            <p className="text-xs sm:text-sm text-[#536963] leading-relaxed mb-6 font-normal">
              {currentTreatment.fullDesc}
            </p>

            {/* Key Clinical Benefits Checklist */}
            <div className="mb-7">
              <h4 className="text-xs font-mono tracking-wider text-[#536963] mb-3">
                Key Clinical Advantages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTreatment.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#1B2B27] bg-white p-3 rounded-xl border border-[#1B2B27]/06 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#3E8E7E] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure Journey Timeline */}
            <div className="mb-7">
              <h4 className="text-xs font-mono tracking-wider text-[#536963] mb-3">
                Procedure Roadmap
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentTreatment.steps.map((s, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-[#1B2B27]/06 shadow-sm">
                    <span className="font-mono text-xs font-semibold text-[#3E8E7E] mb-1 block">
                      Phase 0{s.stepNumber}
                    </span>
                    <h5 className="font-semibold text-xs text-[#1B2B27] mb-1">{s.title}</h5>
                    <p className="text-[11px] text-[#536963] leading-normal">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Specific FAQs */}
            {currentTreatment.faqs.length > 0 && (
              <div className="pt-5 border-t border-[#1B2B27]/08">
                <h4 className="text-xs font-mono tracking-wider text-[#536963] mb-3 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#3E8E7E]" />
                  Frequently Asked Questions
                </h4>
                <div className="space-y-2">
                  {currentTreatment.faqs.map((faq, i) => (
                    <div key={i} className="p-3 bg-white/80 rounded-xl border border-[#1B2B27]/06 text-xs">
                      <strong className="text-[#1B2B27] block mb-1 font-medium">Q: {faq.question}</strong>
                      <p className="text-[#536963] leading-relaxed">{faq.answer}</p>
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
