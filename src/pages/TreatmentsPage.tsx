import React from 'react';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { TreatmentsSection } from '../components/sections/TreatmentsSection';
import { TreatmentJourneySection } from '../components/sections/TreatmentJourneySection';
import { FinancingInsuranceSection } from '../components/sections/FinancingInsuranceSection';
import { Sparkles } from 'lucide-react';

interface TreatmentsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (treatmentId?: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Clinical Procedure Menu"
        badgeIcon={Sparkles}
        title="Aesthetic & Surgical Treatments"
        subtitle="Explore our comprehensive array of bespoke aesthetic porcelain laminates, 3D computer-guided implantology, and painless preventative care."
        currentPageName="Treatments & Procedures"
        onNavigate={onNavigate}
      />

      {/* Full Treatments Grid with Category Filters & Search */}
      <TreatmentsSection
        onSelectTreatmentForBooking={(treatmentId) => onOpenBooking(treatmentId)}
      />

      {/* 5-Step Patient Treatment Journey */}
      <TreatmentJourneySection
        onBookConsultation={() => onOpenBooking()}
      />

      {/* Flexible 0% APR Financing & Insurance Checker */}
      <FinancingInsuranceSection
        onCheckInsurance={() => onOpenBooking()}
      />
    </div>
  );
};
