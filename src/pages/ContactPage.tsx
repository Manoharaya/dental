import React from 'react';
import { ClinicProfile } from '../types/clinic';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { LocationContactSection } from '../components/sections/LocationContactSection';
import { MapPin } from 'lucide-react';

interface ContactPageProps {
  clinic: ClinicProfile;
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  clinic,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Concierge Studio Access"
        badgeIcon={MapPin}
        title="Visit Our Private Dental Sanctuary"
        subtitle="Located in the heart of Beverly Hills with complimentary subterranean valet parking, soundproof suites, and VIP discreet entry."
        currentPageName="Location & Contact"
        onNavigate={onNavigate}
      />

      {/* Clinic Location, Interactive Map & Operating Hours */}
      <LocationContactSection
        clinic={clinic}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
};
