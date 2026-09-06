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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBFAF7]/92 backdrop-blur-xl border-t border-[#1B2B27]/08 shadow-spa pt-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1. Phone Call */}
        <a
          href={`tel:${clinic.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[#1B2B27] hover:bg-[#1B2B27]/05 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white text-[#3E8E7E] border border-[#1B2B27]/08 shadow-sm flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium text-[#536963]">Call Clinic</span>
        </a>

        {/* 2. AI Assistant Chat */}
        <button
          onClick={onOpenAi}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[#3E8E7E] hover:bg-[#3E8E7E]/05 transition-colors relative"
        >
          <div className="w-8 h-8 rounded-full bg-[#3E8E7E]/12 text-[#3E8E7E] border border-[#3E8E7E]/20 flex items-center justify-center mb-0.5 relative">
            <Bot className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#3E8E7E] animate-ping" />
          </div>
          <span className="text-[10px] font-medium text-[#3E8E7E]">AI Concierge</span>
        </button>

        {/* 3. Book Online */}
        <button
          onClick={onOpenBooking}
          className="btn-tactile-primary flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-white"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-white">Book Visit</span>
        </button>
      </div>
    </div>
  );
};
