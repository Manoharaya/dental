import React from 'react';
import { ClinicProfile } from '../types/clinic';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { EmergencySection } from '../components/sections/EmergencySection';
import { FaqAndEducationSection } from '../components/sections/FaqAndEducationSection';
import { HeartPulse } from 'lucide-react';

interface PatientCarePageProps {
  clinic: ClinicProfile;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (treatmentId?: string) => void;
  onOpenAi: () => void;
}

export const PatientCarePage: React.FC<PatientCarePageProps> = ({
  clinic,
  onNavigate,
  onOpenBooking,
  onOpenAi,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Concierge Patient Resources"
        badgeIcon={HeartPulse}
        title="Patient Care, FAQs & Emergency Access"
        subtitle="Transparent answers, immediate emergency triage protocols, and comprehensive clinical articles to guide your smile care decisions."
        currentPageName="Patient Care & FAQs"
        onNavigate={onNavigate}
      />

      {/* Urgent Care & Same-Day Emergency Dentistry */}
      <EmergencySection
        clinic={clinic}
        onOpenBooking={() => onOpenBooking('emergency')}
        onOpenAi={onOpenAi}
      />

      {/* Searchable FAQ & Educational Blog */}
      <FaqAndEducationSection
        onBookConsultation={() => onOpenBooking()}
      />
    </div>
  );
};
