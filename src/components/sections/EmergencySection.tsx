import React from 'react';
import { Phone, Calendar, Bot, AlertCircle } from 'lucide-react';
import { ClinicProfile } from '../../types/clinic';

interface EmergencySectionProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  clinic,
  onOpenBooking,
  onOpenAi,
}) => {
  const commonEmergencies = [
    { title: 'Severe Throbbing Toothache', advice: 'Rinse with warm salt water, apply cold pack to cheek. Avoid aspirin directly on gums.' },
    { title: 'Knocked-Out Permanent Tooth', advice: 'Handle ONLY by crown, store in cold milk. Visit us within 60 mins for reimplantation.' },
    { title: 'Broken or Dislodged Crown', advice: 'Keep restoration clean in zip pouch. Avoid chewing hard food on that quadrant.' },
    { title: 'Dental Abscess or Facial Swelling', advice: 'Acute bacterial infection requiring urgent systemic antibiotic & drainage therapy.' },
  ];

  return (
    <section className="py-20 bg-[#FBFAF7] text-[#1B2B27] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Soft ambient urgency glow in pastel blush */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#F9EBE7]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#FFF8F6] border border-[#F3D7D0] rounded-3xl p-6 sm:p-10 shadow-spa relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Urgency Value Proposition */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200/80 text-rose-800 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Guaranteed Same-Day Emergency Care
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#1B2B27] tracking-tight leading-snug">
                Have an Urgent Dental Emergency? We’re Here to Help.
              </h2>

              <p className="text-xs sm:text-base text-[#536963] leading-relaxed max-w-xl">
                Acute dental pain, fractured crowns, or trauma cannot wait. Our clinicians prioritize rapid pain alleviation, digital diagnostics, and tooth preservation immediately.
              </p>

              {/* Three Primary Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={`tel:${clinic.emergencyPhone}`}
                  className="py-3.5 px-5 rounded-xl bg-gradient-to-b from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-900/20 border-t border-rose-400/40 flex items-center justify-center gap-2 transition-all w-full sm:w-auto text-center"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call Emergency Hotline: {clinic.emergencyPhone}</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="btn-tactile-primary py-3.5 px-5 text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <Calendar className="w-4 h-4 text-white shrink-0" />
                  <span>Request Emergency Slot Online</span>
                </button>

                <button
                  onClick={onOpenAi}
                  className="btn-tactile-secondary py-3.5 px-5 text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <Bot className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                  <span>Triage with AI Concierge</span>
                </button>
              </div>
            </div>

            {/* Right: Quick First-Aid Advice Guide */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#F3D7D0] space-y-3 text-xs shadow-sm">
              <span className="font-mono text-rose-800 text-[11px] font-semibold tracking-wide block">
                Immediate First-Aid Protocol
              </span>

              {commonEmergencies.map((em, idx) => (
                <div key={idx} className="p-3 bg-[#FFFBFB] rounded-xl border border-[#F3D7D0]/60">
                  <span className="font-medium text-[#1B2B27] block mb-0.5">{em.title}</span>
                  <p className="text-[#536963] leading-relaxed text-[11px]">{em.advice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
