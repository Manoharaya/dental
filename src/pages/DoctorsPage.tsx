import React from 'react';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { DoctorsSection } from '../components/sections/DoctorsSection';
import { UserCheck, Sparkles, Calendar, Shield } from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (treatmentId?: string, dentistId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Elite Medical Faculty"
        badgeIcon={UserCheck}
        title="Master Clinicians & Board-Certified Faculty"
        subtitle="Our multidisciplinary specialists combine Ivy-league academic training, Dawson Academy fellowships, and over 15 years of surgical excellence."
        currentPageName="Doctors & Specialists"
        onNavigate={onNavigate}
      />

      {/* Specialist Dentists Grid */}
      <DoctorsSection
        onBookWithDoctor={(dentistId) => onOpenBooking(undefined, dentistId)}
      />

      {/* Clinical Care Philosophy & Standards Banner */}
      <section className="py-16 bg-[#F5F1EA] border-t border-[#1B2B27]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#1B2B27]/08 shadow-spa">
              <div className="w-10 h-10 rounded-xl bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-normal text-lg text-[#1B2B27] mb-2">Biological Preservation</h4>
              <p className="text-xs text-[#536963] leading-relaxed">
                We believe in preserving healthy natural tooth structure. Our ultra-conservative preparation protocols maintain tooth vitality for decades.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#1B2B27]/08 shadow-spa">
              <div className="w-10 h-10 rounded-xl bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-normal text-lg text-[#1B2B27] mb-2">100% Pain-Free Guarantee</h4>
              <p className="text-xs text-[#536963] leading-relaxed">
                Using computer-controlled needleless Wand anesthesia, nitrous oxide, and tranquil surgical suites, our procedures are peaceful and calm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-normal text-lg text-[#1B2B27] mb-2">Direct Doctor Access</h4>
                <p className="text-xs text-[#536963] leading-relaxed">
                  Every patient receives dedicated 1-on-1 time with their lead specialist, never rushed, with personal post-procedure direct follow-up.
                </p>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="btn-tactile-primary mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-white"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
