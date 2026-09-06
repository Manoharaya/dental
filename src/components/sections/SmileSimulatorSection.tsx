import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, Stethoscope, Eye, RefreshCcw } from 'lucide-react';

interface SmileSimulatorSectionProps {
  onBookSmileDesign: () => void;
}

type SmileGoal = 'whitening' | 'veneers' | 'alignment' | 'makeover';

export const SmileSimulatorSection: React.FC<SmileSimulatorSectionProps> = ({ onBookSmileDesign }) => {
  const [activeGoal, setActiveGoal] = useState<SmileGoal>('veneers');
  const [shadeLevel, setShadeLevel] = useState<number>(3); // 1 = A2, 2 = A1, 3 = B1, 4 = BL1 (Hollywood)
  const [alignmentIntensity, setAlignmentIntensity] = useState<number>(85);
  const [gumContouring, setGumContouring] = useState<boolean>(true);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const shades = [
    { level: 1, name: 'Natural Vita A2', desc: 'Warm ivory tone' },
    { level: 2, name: 'Bright Vita A1', desc: 'Healthy radiant white' },
    { level: 3, name: 'Bleached B1', desc: 'High luminosity studio white' },
    { level: 4, name: 'Hollywood BL1', desc: 'Peak celebrity brilliance' },
  ];

  const goalPresets: Record<SmileGoal, { title: string; imageAfter: string; imageBefore: string; note: string }> = {
    whitening: {
      title: 'In-Studio Photon Whitening Simulation',
      imageAfter: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      imageBefore: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
      note: 'Dissolves intrinsic enamel stains up to 8–10 shades without touching tooth enamel structure.'
    },
    veneers: {
      title: 'Ultra-Thin Porcelain Veneers Simulation',
      imageAfter: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
      imageBefore: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
      note: 'Corrects length, micro-fractures, symmetry, and color with artisan-crafted porcelain laminates.'
    },
    alignment: {
      title: 'Invisalign® Clear Aligner Outcome',
      imageAfter: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80',
      imageBefore: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
      note: 'Realigns crowded teeth and balances bite forces seamlessly over 6–12 months.'
    },
    makeover: {
      title: 'Comprehensive 3D Hollywood Smile Transformation',
      imageAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      imageBefore: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
      note: 'Complete aesthetic synergy uniting laser gum contouring, 10-unit veneers, and bite harmonization.'
    }
  };

  const currentPreset = goalPresets[activeGoal];

  return (
    <section id="simulator" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-400/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Smile Studio Prototype
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            See Your Potential Smile
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Customize treatment variables below to preview how modern aesthetic dentistry can elevate your confidence.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Visual Canvas */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
              <div className="relative h-80 sm:h-[440px] w-full overflow-hidden">
                <img
                  src={showOriginal ? currentPreset.imageBefore : currentPreset.imageAfter}
                  alt={currentPreset.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: showOriginal
                      ? 'none'
                      : `brightness(${1 + (shadeLevel - 1) * 0.05}) contrast(${1 + (alignmentIntensity - 50) * 0.002})`,
                  }}
                />

                {/* Simulation Mode Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
                    showOriginal
                      ? 'bg-amber-500/80 text-white border-amber-400/40'
                      : 'bg-brand-500/80 text-white border-brand-400/40 shadow-glow'
                  }`}>
                    {showOriginal ? 'Base Natural Smile' : 'Simulated Target Aesthetic'}
                  </span>
                </div>

                {/* Hold to compare button */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onMouseDown={() => setShowOriginal(true)}
                    onMouseUp={() => setShowOriginal(false)}
                    onTouchStart={() => setShowOriginal(true)}
                    onTouchEnd={() => setShowOriginal(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-xs text-white border border-slate-700 shadow-lg active:scale-95 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-400" />
                    Press & Hold to Compare Original
                  </button>
                </div>
              </div>

              {/* Simulation Note & Medical Disclaimer Bar */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-slate-400">
                  <strong className="text-slate-200">{currentPreset.title}:</strong> {currentPreset.note}
                </p>
                <span className="text-[11px] text-slate-500 shrink-0 italic">
                  * Illustrative simulation only. Actual clinical outcomes vary.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls Panel */}
          <div className="lg:col-span-5 bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-luxury-dark">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-brand-400" />
                <h3 className="font-display font-bold text-lg text-white">Simulation Controls</h3>
              </div>
              <button
                onClick={() => {
                  setShadeLevel(3);
                  setAlignmentIntensity(85);
                  setGumContouring(true);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* 1. Select Treatment Goal */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Step 1: Choose Smile Objective
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['whitening', 'veneers', 'alignment', 'makeover'] as const).map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setActiveGoal(goal)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold capitalize border transition-all text-left flex items-center justify-between ${
                      activeGoal === goal
                        ? 'bg-brand-500/20 border-brand-400 text-white shadow-glow'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span>{goal}</span>
                    {activeGoal === goal && <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Enamel Shade Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-slate-400">
                  Step 2: Target Enamel Shade
                </span>
                <span className="text-brand-400 font-mono font-medium">
                  {shades[shadeLevel - 1].name}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700">
                {shades.map((s) => (
                  <button
                    key={s.level}
                    onClick={() => setShadeLevel(s.level)}
                    className={`py-2 px-1 rounded-xl text-xs text-center transition-all ${
                      shadeLevel === s.level
                        ? 'bg-brand-500 text-white font-bold shadow-glow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    L{s.level}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">{shades[shadeLevel - 1].desc}</p>
            </div>

            {/* 3. Arch Symmetry & Alignment */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-slate-400">
                  Step 3: Arch Alignment Symmetry
                </span>
                <span className="text-brand-400 font-mono">{alignmentIntensity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={alignmentIntensity}
                onChange={(e) => setAlignmentIntensity(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
              />
            </div>

            {/* 4. Laser Gum Contouring Toggle */}
            <div className="mb-8 p-3 bg-slate-900/60 rounded-2xl border border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Laser Gum Symmetry Contouring</span>
                <span className="text-[11px] text-slate-400">Harmonizes gingival zeniths with smile arc</span>
              </div>
              <button
                onClick={() => setGumContouring(!gumContouring)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  gumContouring ? 'bg-brand-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    gumContouring ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Conversion CTA */}
            <button
              onClick={onBookSmileDesign}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 text-white font-semibold text-sm transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              Book In-Person 3D Smile Design Preview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
