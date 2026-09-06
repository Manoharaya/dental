import React, { useState, useRef } from 'react';
import { BEFORE_AFTER_CASES } from '../../config/clinicData';
import { Sparkles, ArrowLeftRight, CheckCircle2, User, Clock, Stethoscope, ChevronRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onBookConsultation: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onBookConsultation }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(BEFORE_AFTER_CASES[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50);
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
    <section id="gallery" className="py-24 bg-[#FBFAF7] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4EFE8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E]" />
            Clinical Evidence & Case Logs
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Documented Outcomes. Restored Confidence.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Drag the interactive divider to inspect how ceramic artistry and biological diagnostics transform smiles.
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
                  ? 'btn-tactile-primary text-white shadow-tactile-teal'
                  : 'bg-white border border-[#1B2B27]/08 text-[#536963] hover:text-[#1B2B27] hover:border-[#3E8E7E]/30 shadow-sm'
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
              className="relative w-full h-64 sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-spa select-none cursor-ew-resize border border-[#1B2B27]/08 group touch-none bg-[#F5F1EA]"
            >
              {/* After Image */}
              <img
                src={currentCase.afterImage}
                alt={`${currentCase.title} - After Treatment`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Image */}
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
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-[#1B2B27] text-[10px] sm:text-xs font-mono font-medium px-3 py-1.5 rounded-full border border-[#1B2B27]/08 pointer-events-none shadow-sm">
                Pre-Treatment
              </div>
              <div className="absolute top-3 right-3 z-10 bg-[#D4EFE8]/95 backdrop-blur-md text-[#1B2B27] text-[10px] sm:text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[#3E8E7E]/30 pointer-events-none shadow-sm">
                Restored Result
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-md pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-[#3E8E7E] shadow-md border-2 border-[#3E8E7E] flex items-center justify-center transition-transform group-active:scale-110">
                  <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-md text-[#536963] text-[10px] sm:text-xs px-3.5 sm:px-4 py-1.5 rounded-full pointer-events-none whitespace-nowrap border border-[#1B2B27]/08 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E8E7E] animate-ping" />
                <span>Drag slider horizontally to inspect transformation</span>
              </div>
            </div>
          </div>

          {/* Right: Clinical Case Details & CTA */}
          <div className="lg:col-span-4 glass-spa rounded-3xl p-5 sm:p-7 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3E8E7E] font-semibold">
                Clinical Case Log
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#1B2B27] mt-1 mb-4">
                {currentCase.title}
              </h3>

              {/* Case Metadata */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs">
                <div className="bg-[#F5F1EA] p-3 rounded-xl border border-[#1B2B27]/05">
                  <div className="text-[#536963] flex items-center gap-1.5 mb-1 font-mono text-[11px]">
                    <User className="w-3.5 h-3.5 text-[#3E8E7E]" /> Patient
                  </div>
                  <span className="font-semibold text-[#1B2B27]">{currentCase.patientAge}</span>
                </div>
                <div className="bg-[#F5F1EA] p-3 rounded-xl border border-[#1B2B27]/05">
                  <div className="text-[#536963] flex items-center gap-1.5 mb-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#3E8E7E]" /> Timeline
                  </div>
                  <span className="font-semibold text-[#1B2B27] font-mono">{currentCase.duration}</span>
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="space-y-3.5 mb-5 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-2xl border border-amber-500/20 shadow-sm">
                  <span className="font-semibold text-amber-800 block mb-1 text-xs font-mono tracking-wide">
                    Diagnostic Challenge:
                  </span>
                  <p className="text-[#536963] text-xs leading-relaxed">{currentCase.problem}</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[#3E8E7E]/20 shadow-sm">
                  <span className="font-semibold text-[#3E8E7E] flex items-center gap-1.5 mb-1 text-xs font-mono tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3E8E7E]" /> Clinical Solution:
                  </span>
                  <p className="text-[#536963] text-xs leading-relaxed">{currentCase.solution}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#536963] mb-5 pb-5 border-t border-[#1B2B27]/08">
                <Stethoscope className="w-4 h-4 text-[#3E8E7E]" />
                <span>Lead Clinician: <strong className="text-[#1B2B27]">{currentCase.doctorName}</strong></span>
              </div>
            </div>

            <button
              onClick={onBookConsultation}
              className="btn-tactile-primary w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Discuss Similar Transformation</span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
