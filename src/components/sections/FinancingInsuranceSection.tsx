import React, { useState } from 'react';
import { INSURANCE_PROVIDERS } from '../../config/clinicData';
import { DollarSign, ShieldCheck, CheckCircle2, Search, Calculator, ArrowRight, CreditCard, Sparkles } from 'lucide-react';

interface FinancingInsuranceSectionProps {
  onCheckInsurance: () => void;
}

export const FinancingInsuranceSection: React.FC<FinancingInsuranceSectionProps> = ({
  onCheckInsurance,
}) => {
  const [treatmentCost, setTreatmentCost] = useState<number>(3500);
  const [termMonths, setTermMonths] = useState<number>(24);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate monthly payment: 0% APR promotional financing
  const monthlyPayment = Math.round(treatmentCost / termMonths);

  const filteredInsurances = INSURANCE_PROVIDERS.filter((ins) =>
    ins.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="financing" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <DollarSign className="w-3.5 h-3.5 text-brand-500" />
            Transparent Investment & Insurance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Flexible Financing & Insurance Coverage
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            We believe world-class healthcare should be transparent and accessible. Calculate monthly plans with 0% APR or check in-network PPO status.
          </p>
        </div>

        {/* Two Pillars Grid: Left = Financing Calculator, Right = Insurance Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Pillar 1: Monthly Payment Calculator */}
          <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-luxury-slate">
                    Financing Estimator
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold">
                  0% APR Available
                </span>
              </div>

              {/* Treatment Cost Slider */}
              <div className="mb-5 sm:mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">Estimated Treatment Cost</span>
                  <span className="text-base sm:text-lg font-display font-bold text-luxury-slate">${treatmentCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={treatmentCost}
                  onChange={(e) => setTreatmentCost(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none touch-none"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 mt-1">
                  <span>$500 (Fillings)</span>
                  <span>$5k (Invisalign)</span>
                  <span>$15k+ (Full Arch)</span>
                </div>
              </div>

              {/* Term Selection Pills */}
              <div className="mb-5 sm:mb-6">
                <label className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                  Repayment Duration
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[12, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setTermMonths(months)}
                      className={`py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-[10px] sm:text-xs font-semibold transition-all text-center ${
                        termMonths === months
                          ? 'bg-luxury-slate text-white shadow-luxury ring-2 ring-brand-400/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {months} Mo. {months <= 24 ? '(0% APR)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Monthly Payment Display Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-luxury-dark mb-3 sm:mb-4">
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-400 block font-medium">Estimated Payment</span>
                  <span className="text-xl sm:text-3xl font-display font-extrabold text-brand-400">
                    ${monthlyPayment}
                    <span className="text-xs text-slate-400 font-normal"> / mo</span>
                  </span>
                </div>
                <div className="text-right text-[10px] sm:text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">$0 Down Payment</span>
                  <br />
                  <span>No Prepayment Penalty</span>
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed italic">
                * Representative estimate via CareCredit & Cherry. Subject to credit approval.
              </p>
            </div>

            <button
              onClick={onCheckInsurance}
              className="mt-5 sm:mt-6 w-full py-3 sm:py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              Pre-Qualify for Financing (Soft Check)
            </button>
          </div>

          {/* Pillar 2: Insurance Provider Checker */}
          <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-luxury-slate">
                    Accepted Insurance Plans
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Electronic Claims</span>
              </div>

              {/* Instant Search Bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search your insurance (e.g. Delta, MetLife, Cigna)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Insurance Providers List */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 mb-4">
                {filteredInsurances.map((ins, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="text-slate-800 font-semibold block">{ins.name}</strong>
                      <span className="text-[11px] text-slate-500">{ins.coverageNote}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-bold border border-brand-200 shrink-0">
                      {ins.networkType}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/60 text-xs text-brand-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  Don't see your specific plan? We accept <strong>all PPO dental insurance</strong> with out-of-network benefits and handle 100% of claims on your behalf.
                </span>
              </div>
            </div>

            <button
              onClick={onCheckInsurance}
              className="mt-6 w-full py-3.5 px-4 rounded-xl bg-luxury-slate hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-luxury flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              Complimentary Benefit Verification
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
