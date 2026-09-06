import React, { useState } from 'react';
import { INSURANCE_PROVIDERS } from '../../config/clinicData';
import { DollarSign, ShieldCheck, Search, Calculator, CreditCard, Sparkles } from 'lucide-react';

interface FinancingInsuranceSectionProps {
  onCheckInsurance: () => void;
}

export const FinancingInsuranceSection: React.FC<FinancingInsuranceSectionProps> = ({
  onCheckInsurance,
}) => {
  const [treatmentCost, setTreatmentCost] = useState<number>(3500);
  const [termMonths, setTermMonths] = useState<number>(24);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const monthlyPayment = Math.round(treatmentCost / termMonths);

  const filteredInsurances = INSURANCE_PROVIDERS.filter((ins) =>
    ins.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="financing" className="py-24 bg-[#F5F1EA] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Ambient gradient */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <DollarSign className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Transparent Investment & Insurance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Flexible Financing & Insurance Coverage
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            We believe world-class healthcare should be transparent and accessible. Calculate monthly plans with 0% APR or check in-network PPO status.
          </p>
        </div>

        {/* Two Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Pillar 1: Monthly Payment Calculator */}
          <div className="lg:col-span-6 glass-spa rounded-3xl p-6 sm:p-8 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between text-[#1B2B27]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1B2B27]/08 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4EFE8] text-[#3E8E7E] flex items-center justify-center">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif font-normal text-lg text-[#1B2B27]">
                    Financing Estimator
                  </h3>
                </div>
                <span className="text-xs bg-[#D4EFE8] text-[#1B2B27] border border-[#3E8E7E]/20 px-2.5 py-0.5 rounded-full font-medium">
                  0% APR Available
                </span>
              </div>

              {/* Treatment Cost Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#536963] font-medium">Estimated Treatment Cost</span>
                  <span className="text-xl font-serif font-normal text-[#1B2B27]">${treatmentCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={treatmentCost}
                  onChange={(e) => setTreatmentCost(Number(e.target.value))}
                  className="w-full accent-[#3E8E7E] cursor-pointer h-2 bg-[#F5F1EA] rounded-lg appearance-none touch-none"
                />
                <div className="flex justify-between text-[11px] text-[#536963] mt-1.5">
                  <span>$500 (Prophylaxis / Fillings)</span>
                  <span>$5,000 (Invisalign)</span>
                  <span>$15,000+ (Full Arch)</span>
                </div>
              </div>

              {/* Term Selection Pills */}
              <div className="mb-6">
                <label className="text-xs text-[#536963] font-medium block mb-2">
                  Repayment Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[12, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setTermMonths(months)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-center ${
                        termMonths === months
                          ? 'btn-tactile-primary text-white shadow-tactile-teal'
                          : 'bg-white text-[#536963] hover:text-[#1B2B27] border border-[#1B2B27]/08'
                      }`}
                    >
                      {months} Mo. {months <= 24 ? '(0% APR)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Monthly Payment Display Box */}
              <div className="p-5 rounded-2xl bg-white border border-[#1B2B27]/08 text-[#1B2B27] flex items-center justify-between mb-4 shadow-sm">
                <div>
                  <span className="text-xs text-[#536963] block font-medium">Estimated Payment</span>
                  <span className="text-2xl sm:text-3xl font-serif font-normal text-[#3E8E7E]">
                    ${monthlyPayment}
                    <span className="text-xs text-[#536963] font-sans font-normal"> / mo</span>
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#536963]">
                  <span className="text-[#3E8E7E] font-medium">$0 Down Payment</span>
                  <br />
                  <span>No Prepayment Penalty</span>
                </div>
              </div>

              <p className="text-[11px] text-[#536963] leading-relaxed">
                * Representative estimate via CareCredit & Cherry. Soft credit check with no impact to credit score.
              </p>
            </div>

            <button
              onClick={onCheckInsurance}
              className="btn-tactile-primary mt-6 w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-white" />
              Pre-Qualify for Financing (Soft Check)
            </button>
          </div>

          {/* Pillar 2: Insurance Provider Checker */}
          <div className="lg:col-span-6 glass-spa rounded-3xl p-6 sm:p-8 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between text-[#1B2B27]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1B2B27]/08 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4EFE8] text-[#3E8E7E] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif font-normal text-lg text-[#1B2B27]">
                    Accepted Insurance Plans
                  </h3>
                </div>
                <span className="text-xs text-[#3E8E7E] font-medium">Electronic Instant Claims</span>
              </div>

              {/* Instant Search Bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-[#536963]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search insurance (e.g. Delta, MetLife, Cigna)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1B2B27]/10 bg-white text-xs sm:text-sm text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E]"
                />
              </div>

              {/* Insurance Providers List */}
              <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 mb-4">
                {filteredInsurances.map((ins, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-[#1B2B27]/06 flex items-center justify-between text-xs shadow-sm"
                  >
                    <div>
                      <strong className="text-[#1B2B27] font-medium block">{ins.name}</strong>
                      <span className="text-[11px] text-[#536963]">{ins.coverageNote}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D4EFE8] text-[#1B2B27] font-medium border border-[#3E8E7E]/20 shrink-0">
                      {ins.networkType}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#D4EFE8]/70 rounded-xl border border-[#3E8E7E]/20 text-xs text-[#1B2B27] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#3E8E7E] shrink-0 mt-0.5" />
                <span>
                  Don't see your specific plan? We accept <strong>all PPO dental insurance</strong> with out-of-network benefits and handle 100% of claims on your behalf.
                </span>
              </div>
            </div>

            <button
              onClick={onCheckInsurance}
              className="btn-tactile-secondary mt-6 w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#3E8E7E]" />
              Complimentary Benefit Verification
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
