import React from 'react';
import { Phone, Calendar, Bot, AlertTriangle, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
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
    <section className="py-20 bg-gradient-to-b from-slate-900 to-luxury-slate text-white relative overflow-hidden">
      {/* Red ambient urgency glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-rose-950/40 border border-rose-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Urgency Value Proposition */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Guaranteed Same-Day Emergency Care
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Have a Dental Emergency? We’re Here to Help.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Acute dental pain, fractured crowns, or facial trauma cannot wait. Our clinicians prioritize rapid pain alleviation, digital diagnostics, and tooth preservation immediately.
              </p>

              {/* Three Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${clinic.emergencyPhone}`}
                  className="py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Emergency Hotline: {clinic.emergencyPhone}
                </a>

                <button
                  onClick={onOpenBooking}
                  className="py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-luxury-slate font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-brand-600" />
                  Request Emergency Slot Online
                </button>

                <button
                  onClick={onOpenAi}
                  className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <Bot className="w-4 h-4 text-brand-400" />
                  Triage with AI Receptionist
                </button>
              </div>
            </div>

            {/* Right: Quick First-Aid Advice Guide */}
            <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 text-xs">
              <span className="font-mono text-rose-400 font-bold uppercase tracking-wider block">
                Immediate First-Aid Protocol
              </span>

              {commonEmergencies.map((em, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="font-semibold text-white block mb-0.5">{em.title}</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">{em.advice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
