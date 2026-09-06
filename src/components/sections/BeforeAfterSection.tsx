import React, { useState, useRef } from 'react';
import { BEFORE_AFTER_CASES } from '../../config/clinicData';
import { Sparkles, ArrowLeftRight, CheckCircle2, User, Clock, Stethoscope, ChevronRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onBookConsultation: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onBookConsultation }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(BEFORE_AFTER_CASES[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = BEFORE_AFTER_CASES.find((c) => c.id === selectedCaseId) || BEFORE_AFTER_CASES[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section id="gallery" className="py-24 bg-[#0A110F] relative overflow-hidden border-t border-white/[0.06]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#3ED9C0]/06 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131F1C] border border-[#3ED9C0]/25 text-[#D1DED9] text-xs font-medium mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9C0]" />
            Clinical Evidence & Case Logs
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#F9FAF9] tracking-tight">
            Documented Outcomes. Restored Confidence.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#A8B8B4]">
            Drag the interactive divider to inspect how biomimetic ceramic artistry and sub-millimeter diagnostics transform smiles.
          </p>
        </div>

        {/* Case Category Navigation Selector */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 px-1 sm:justify-center sm:flex-wrap">
          {BEFORE_AFTER_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCaseId(item.id);
                setSliderPos(50);
              }}
              className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCaseId === item.id
                  ? 'btn-tactile-primary text-[#07221C] shadow-[0_0_20px_rgba(62,217,192,0.3)]'
                  : 'bg-[#131F1C]/80 border border-white/10 text-[#A8B8B4] hover:text-[#F9FAF9] hover:border-[#3ED9C0]/30'
              }`}
            >
              {item.treatmentType}
            </button>
          ))}
        </div>

        {/* Main Comparison Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left / Top: Draggable Interactive Comparison Window */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-64 sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/10 group touch-none bg-black"
            >
              {/* After Image (Background full layer) */}
              <img
                src={currentCase.afterImage}
                alt={`${currentCase.title} - After Treatment`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Image (Foreground clipped layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt={`${currentCase.title} - Before Treatment`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-95"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                />
              </div>

              {/* Badges: Before and After */}
              <div className="absolute top-3 left-3 z-10 bg-[#0E1614]/80 backdrop-blur-md text-[#F2E9DC] text-[10px] sm:text-xs font-mono font-medium px-3 py-1.5 rounded-full border border-white/15 pointer-events-none">
                Pre-Treatment
              </div>
              <div className="absolute top-3 right-3 z-10 bg-[#182723]/90 backdrop-blur-md text-[#3ED9C0] text-[10px] sm:text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[#3ED9C0]/30 pointer-events-none shadow-[0_0_15px_rgba(62,217,192,0.25)]">
                Restored Result
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/90 shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#131F1C] text-[#3ED9C0] shadow-2xl border-2 border-[#3ED9C0] flex items-center justify-center transition-transform group-active:scale-110">
                  <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#3ED9C0]" />
                </div>
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-[#0E1614]/85 backdrop-blur-md text-[#D1DED9] text-[10px] sm:text-xs px-3.5 sm:px-4 py-1.5 rounded-full pointer-events-none whitespace-nowrap border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9C0] animate-ping" />
                <span>Drag slider horizontally to inspect transformation</span>
              </div>
            </div>
          </div>

          {/* Right: Clinical Case Details & CTA */}
          <div className="lg:col-span-4 glass-clinical rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#3ED9C0] font-semibold">
                Clinical Case Log
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#F9FAF9] mt-1 mb-4">
                {currentCase.title}
              </h3>

              {/* Case Metadata */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs">
                <div className="bg-[#0E1614] p-3 rounded-xl border border-white/5">
                  <div className="text-[#A8B8B4] flex items-center gap-1.5 mb-1 font-mono text-[11px]">
                    <User className="w-3.5 h-3.5 text-[#3ED9C0]" /> Patient
                  </div>
                  <span className="font-semibold text-[#F9FAF9]">{currentCase.patientAge}</span>
                </div>
                <div className="bg-[#0E1614] p-3 rounded-xl border border-white/5">
                  <div className="text-[#A8B8B4] flex items-center gap-1.5 mb-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#3ED9C0]" /> Timeline
                  </div>
                  <span className="font-semibold text-[#F9FAF9] font-mono">{currentCase.duration}</span>
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="space-y-3.5 mb-5 text-xs sm:text-sm">
                <div className="bg-[#0E1614] p-3.5 rounded-2xl border border-amber-500/20">
                  <span className="font-semibold text-amber-300 block mb-1 text-xs font-mono uppercase tracking-wide">
                    Diagnostic Challenge:
                  </span>
                  <p className="text-[#D1DED9] text-xs leading-relaxed">{currentCase.problem}</p>
                </div>

                <div className="bg-[#0E1614] p-3.5 rounded-2xl border border-[#3ED9C0]/20">
                  <span className="font-semibold text-[#3ED9C0] flex items-center gap-1.5 mb-1 text-xs font-mono uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3ED9C0]" /> Clinical Solution:
                  </span>
                  <p className="text-[#D1DED9] text-xs leading-relaxed">{currentCase.solution}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A8B8B4] mb-5 pb-5 border-t border-white/10">
                <Stethoscope className="w-4 h-4 text-[#3ED9C0]" />
                <span>Lead Clinician: <strong className="text-[#F9FAF9]">{currentCase.doctorName}</strong></span>
              </div>
            </div>

            <button
              onClick={onBookConsultation}
              className="btn-tactile-primary w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-[#07221C]" />
              <span>Discuss Similar Transformation</span>
              <ChevronRight className="w-4 h-4 text-[#07221C] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
