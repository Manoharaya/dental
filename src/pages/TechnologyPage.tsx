import React from 'react';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { DentalExplorer3D } from '../components/three/DentalExplorer3D';
import { SmileSimulatorSection } from '../components/sections/SmileSimulatorSection';
import { TechnologySection } from '../components/sections/TechnologySection';
import { Cpu } from 'lucide-react';

interface TechnologyPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (treatmentId?: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Digital Dentistry & 3D Lab"
        badgeIcon={Cpu}
        title="Interactive 3D Technology & Diagnostics"
        subtitle="Experience biological precision: interactive dental anatomy visualization, AI-powered smile simulations, and sub-millimeter robotics designed for painless treatment."
        currentPageName="Technology & 3D Lab"
        onNavigate={onNavigate}
      />

      {/* Signature Interactive 3D Dental Arch & Anatomy Explorer */}
      <section id="3d-explorer" className="py-20 sm:py-24 bg-[#FBFAF7] text-[#1B2B27] relative border-b border-[#1B2B27]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DentalExplorer3D
            onSelectTreatment={() => onOpenBooking()}
            onBookConsultation={() => onOpenBooking()}
          />
        </div>
      </section>

      {/* Interactive Smile Simulator */}
      <SmileSimulatorSection
        onBookSmileDesign={() => onOpenBooking('veneers')}
      />

      {/* High-Tech Diagnostic & Robotics Showcase */}
      <TechnologySection
        onBookConsultation={() => onOpenBooking()}
      />
    </div>
  );
};
