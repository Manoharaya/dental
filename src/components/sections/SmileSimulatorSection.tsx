import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, Stethoscope, Eye, RefreshCcw } from 'lucide-react';

interface SmileSimulatorSectionProps {
  onBookSmileDesign: () => void;
}

type SmileGoal = 'whitening' | 'veneers' | 'alignment' | 'makeover';

export const SmileSimulatorSection: React.FC<SmileSimulatorSectionProps> = ({ onBookSmileDesign }) => {
  const [activeGoal, setActiveGoal] = useState<SmileGoal>('veneers');
  const [shadeLevel, setShadeLevel] = useState<number>(3);
  const [alignmentIntensity, setAlignmentIntensity] = useState<number>(85);
  const [gumContouring, setGumContouring] = useState<boolean>(true);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const shades = [
    { level: 1, name: 'Natural Vita A2', desc: 'Warm ivory tone' },
    { level: 2, name: 'Bright Vita A1', desc: 'Healthy radiant white' },
    { level: 3, name: 'Bleached B1', desc: 'High luminosity studio white' },
    { level: 4, name: 'Hollywood BL1', desc: 'Peak brilliance' },
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
    <section id="simulator" className="py-24 bg-[#FBFAF7] text-[#1B2B27] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4EFE8]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F9EBE7]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Digital Smile Studio Prototype
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            See Your Potential Smile
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Customize treatment variables below to preview how aesthetic dentistry can elevate your appearance.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Visual Canvas */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-spa border border-[#1B2B27]/08 bg-[#F5F1EA]">
              <div className="relative h-64 sm:h-[400px] md:h-[440px] w-full overflow-hidden">
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
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-md border shadow-sm ${
                    showOriginal
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white/95 text-[#1B2B27] border-[#1B2B27]/08'
                  }`}>
                    {showOriginal ? 'Base Smile' : 'Simulated Target'}
                  </span>
                </div>

                {/* Hold to compare button */}
                <div className="absolute bottom-3 right-3 z-10">
                  <button
                    onMouseDown={() => setShowOriginal(true)}
                    onMouseUp={() => setShowOriginal(false)}
                    onTouchStart={() => setShowOriginal(true)}
                    onTouchEnd={() => setShowOriginal(false)}
                    className="btn-tactile-secondary flex items-center gap-1.5 px-3.5 py-2 text-[10px] sm:text-xs text-[#1B2B27] shadow-sm select-none touch-none"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#3E8E7E]" />
                    Hold to Compare
                  </button>
                </div>
              </div>

              {/* Simulation Note Bar */}
              <div className="p-4 bg-white border-t border-[#1B2B27]/08 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs">
                <p className="text-[#536963]">
                  <strong className="text-[#1B2B27]">{currentPreset.title}:</strong> {currentPreset.note}
                </p>
                <span className="text-[10px] sm:text-[11px] text-[#536963]/70 shrink-0">
                  * Illustrative simulation. Actual clinical outcomes vary.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls Panel */}
          <div className="lg:col-span-5 glass-spa rounded-3xl border border-[#1B2B27]/08 p-5 sm:p-7 shadow-spa text-[#1B2B27]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B2B27]/08">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#3E8E7E]" />
                <h3 className="font-serif font-normal text-lg text-[#1B2B27]">Simulation Controls</h3>
              </div>
              <button
                onClick={() => {
                  setShadeLevel(3);
                  setAlignmentIntensity(85);
                  setGumContouring(true);
                }}
                className="text-xs text-[#536963] hover:text-[#1B2B27] flex items-center gap-1 transition-colors"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* 1. Select Treatment Goal */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-[#1B2B27] block mb-2">
                Step 1: Choose Smile Objective
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['whitening', 'veneers', 'alignment', 'makeover'] as const).map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setActiveGoal(goal)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium capitalize border transition-all text-left flex items-center justify-between ${
                      activeGoal === goal
                        ? 'btn-tactile-primary text-white shadow-tactile-teal'
                        : 'bg-white border-[#1B2B27]/08 text-[#536963] hover:text-[#1B2B27] hover:border-[#3E8E7E]/30'
                    }`}
                  >
                    <span>{goal}</span>
                    {activeGoal === goal && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Enamel Shade Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#1B2B27]">
                  Step 2: Target Enamel Shade
                </span>
                <span className="text-[#3E8E7E] font-mono font-medium">
                  {shades[shadeLevel - 1].name}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 bg-[#F5F1EA] p-1.5 rounded-2xl border border-[#1B2B27]/06">
                {shades.map((s) => (
                  <button
                    key={s.level}
                    onClick={() => setShadeLevel(s.level)}
                    className={`py-2 px-1 rounded-xl text-xs text-center transition-all ${
                      shadeLevel === s.level
                        ? 'bg-white text-[#1B2B27] font-bold shadow-sm border border-[#3E8E7E]/30'
                        : 'text-[#536963] hover:text-[#1B2B27]'
                    }`}
                  >
                    L{s.level}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#536963] mt-1.5">{shades[shadeLevel - 1].desc}</p>
            </div>

            {/* 3. Arch Symmetry & Alignment */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#1B2B27]">
                  Step 3: Arch Alignment Symmetry
                </span>
                <span className="text-[#3E8E7E] font-mono">{alignmentIntensity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={alignmentIntensity}
                onChange={(e) => setAlignmentIntensity(Number(e.target.value))}
                className="w-full accent-[#3E8E7E] cursor-pointer h-2 bg-[#F5F1EA] rounded-lg appearance-none touch-none"
              />
            </div>

            {/* 4. Laser Gum Contouring Toggle */}
            <div className="mb-8 p-3 bg-white rounded-2xl border border-[#1B2B27]/08 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs font-semibold text-[#1B2B27] block">Laser Gum Symmetry Contouring</span>
                <span className="text-[11px] text-[#536963]">Harmonizes gingival zeniths with smile arc</span>
              </div>
              <button
                onClick={() => setGumContouring(!gumContouring)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  gumContouring ? 'bg-[#3E8E7E]' : 'bg-[#D4E2DE]'
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
              className="btn-tactile-primary w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-white" />
              Book In-Person 3D Smile Design Preview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
