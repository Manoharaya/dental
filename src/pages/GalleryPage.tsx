import React from 'react';
import { ClinicProfile } from '../types/clinic';
import { PageType } from '../types/navigation';
import { PageHeader } from '../components/common/PageHeader';
import { BeforeAfterSection } from '../components/sections/BeforeAfterSection';
import { ReviewsSection } from '../components/sections/ReviewsSection';
import { Sparkles } from 'lucide-react';

interface GalleryPageProps {
  clinic: ClinicProfile;
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  clinic,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        badge="Real Results. Real Confidence."
        badgeIcon={Sparkles}
        title="Smile Transformations & Patient Stories"
        subtitle="Every smile is a custom bespoke creation. Examine unretouched clinical before-and-after cases and listen to verified patient journeys."
        currentPageName="Smile Gallery & Reviews"
        onNavigate={onNavigate}
      />

      {/* "Real Results. Real Confidence." Draggable Before/After Slider */}
      <BeforeAfterSection
        onBookConsultation={onOpenBooking}
      />

      {/* Patient Reviews, Ratings & Video Testimonials */}
      <ReviewsSection
        clinic={clinic}
        onBookConsultation={onOpenBooking}
      />
    </div>
  );
};
