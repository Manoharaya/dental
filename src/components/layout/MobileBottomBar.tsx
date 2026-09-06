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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A110F]/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.5)] pt-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1. Phone Call */}
        <a
          href={`tel:${clinic.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-white/80 hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#131F1C] text-teal-400 border border-white/10 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium text-[#A8B8B4]">Call Clinic</span>
        </a>

        {/* 2. AI Assistant Chat */}
        <button
          onClick={onOpenAi}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-teal-300 hover:bg-white/5 transition-colors relative"
        >
          <div className="w-8 h-8 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center justify-center mb-0.5 relative">
            <Bot className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          </div>
          <span className="text-[10px] font-medium text-teal-300">AI Concierge</span>
        </button>

        {/* 3. Book Online */}
        <button
          onClick={onOpenBooking}
          className="btn-tactile-primary flex flex-col items-center justify-center py-1.5 px-2 rounded-xl"
        >
          <div className="w-8 h-8 rounded-full bg-teal-950/20 text-teal-950 flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-teal-950">Book Visit</span>
        </button>
      </div>
    </div>
  );
};
