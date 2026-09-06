import React from 'react';
import { CLINIC_PROFILES } from '../../config/clinicData';
import { Sparkles, Building2, Check } from 'lucide-react';

interface DemoClinicBarProps {
  currentClinicId: string;
  onSelectClinic: (clinicId: string) => void;
}

export const DemoClinicBar: React.FC<DemoClinicBarProps> = ({
  currentClinicId,
  onSelectClinic,
}) => {
  return (
    <div className="bg-slate-950 text-white text-xs border-b border-slate-800 py-2 px-3 sm:px-6 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            MULTI-CLINIC SALES DEMO ENGINE:
          </span>
          <span className="hidden sm:inline text-slate-400">Switch clinic branding preset in real-time:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {Object.values(CLINIC_PROFILES).map((clinic) => (
            <button
              key={clinic.id}
              onClick={() => onSelectClinic(clinic.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all ${
                currentClinicId === clinic.id
                  ? 'bg-brand-500 text-white shadow-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3 h-3" />
              <span>{clinic.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-70">({clinic.city})</span>
              {currentClinicId === clinic.id && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
