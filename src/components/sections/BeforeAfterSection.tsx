import React, { useState, useRef } from 'react';
import { BEFORE_AFTER_CASES } from '../../config/clinicData';
import { Sparkles, ArrowLeftRight, CheckCircle2, User, Clock, Stethoscope } from 'lucide-react';

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
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative luxury gradient ambient */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-luxury-champagne rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Clinical Excellence Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Real Results. Real Confidence.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Drag the interactive slider to reveal how our minimally invasive artistry and 3D precision transform natural smiles.
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
              className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCaseId === item.id
                  ? 'bg-luxury-slate text-white shadow-luxury'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
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
              className="relative w-full h-64 sm:h-[400px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-slate-200 group touch-none"
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
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 pointer-events-none">
                Before
              </div>
              <div className="absolute top-3 right-3 z-10 bg-brand-500/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 pointer-events-none shadow-glow">
                Restored (After)
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-luxury-slate shadow-xl border-2 border-brand-500 flex items-center justify-center transition-transform group-active:scale-110">
                  <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                </div>
              </div>

              {/* Drag instruction overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-md text-white/90 text-[10px] sm:text-xs px-3 sm:px-4 py-1 rounded-full pointer-events-none whitespace-nowrap">
                ✦ Slide to compare
              </div>
            </div>
          </div>

          {/* Right: Clinical Case Details & CTA */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-luxury flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-brand-600">
                Case Documentation
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-luxury-slate mt-1 mb-4">
                {currentCase.title}
              </h3>

              {/* Case Metadata */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <User className="w-3.5 h-3.5 text-slate-500" /> Patient
                  </div>
                  <span className="font-semibold text-slate-800">{currentCase.patientAge}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> Timeline
                  </div>
                  <span className="font-semibold text-slate-800">{currentCase.duration}</span>
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="space-y-4 mb-6 text-xs sm:text-sm">
                <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/70">
                  <span className="font-semibold text-amber-800 block mb-1">Diagnostic Challenge:</span>
                  <p className="text-amber-900/80 leading-relaxed">{currentCase.problem}</p>
                </div>

                <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200/70">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Clinical Solution:
                  </span>
                  <p className="text-emerald-900/80 leading-relaxed">{currentCase.solution}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 pb-6 border-b border-slate-200">
                <Stethoscope className="w-4 h-4 text-brand-600" />
                <span>Lead Clinician: <strong className="text-slate-800">{currentCase.doctorName}</strong></span>
              </div>
            </div>

            <button
              onClick={onBookConsultation}
              className="w-full py-3.5 px-6 rounded-xl bg-luxury-slate text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              Discuss Similar Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
