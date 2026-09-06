import React from 'react';
import { Phone, Bot, Calendar } from 'lucide-react';
import { ClinicProfile } from '../../types/clinic';

interface MobileBottomBarProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenAi: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  clinic,
  onOpenBooking,
  onOpenAi,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pt-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1. Phone Call */}
        <a
          href={`tel:${clinic.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4 text-brand-600" />
          </div>
          <span className="text-[10px] font-semibold">Call Clinic</span>
        </a>

        {/* 2. AI Assistant Chat */}
        <button
          onClick={onOpenAi}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-brand-600 hover:bg-brand-50 transition-colors relative"
        >
          <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-0.5 relative">
            <Bot className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[10px] font-semibold">AI Assistant</span>
        </button>

        {/* 3. Book Online */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-luxury-slate text-white shadow-luxury hover:bg-slate-800 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 text-brand-300 flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Book Online</span>
        </button>
      </div>
    </div>
  );
};
