import React, { useState } from 'react';
import { CLINIC_PROFILES } from './config/clinicData';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { HeroSection } from './components/sections/HeroSection';
import { TrustStatsBar } from './components/sections/TrustStatsBar';
import { TreatmentsSection } from './components/sections/TreatmentsSection';
import { DentalExplorer3D } from './components/three/DentalExplorer3D';
import { TreatmentJourneySection } from './components/sections/TreatmentJourneySection';
import { BeforeAfterSection } from './components/sections/BeforeAfterSection';
import { DoctorsSection } from './components/sections/DoctorsSection';
import { EmergencySection } from './components/sections/EmergencySection';
import { TechnologySection } from './components/sections/TechnologySection';
import { SmileSimulatorSection } from './components/sections/SmileSimulatorSection';
import { FinancingInsuranceSection } from './components/sections/FinancingInsuranceSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { FaqAndEducationSection } from './components/sections/FaqAndEducationSection';
import { LocationContactSection } from './components/sections/LocationContactSection';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { AiDentalAssistantModal } from './components/ai/AiDentalAssistantModal';
import { Bot, Calendar, Sparkles } from 'lucide-react';

export function App() {
  const [activeClinicId, setActiveClinicId] = useState<string>('aura');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string>('veneers');
  const [preselectedDentist, setPreselectedDentist] = useState<string>('any');

  const currentClinic = CLINIC_PROFILES[activeClinicId] || CLINIC_PROFILES.aura;

  const handleOpenBooking = (treatmentId?: string, dentistId?: string) => {
    if (treatmentId) setPreselectedTreatment(treatmentId);
    if (dentistId) setPreselectedDentist(dentistId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-luxury-slate font-sans selection:bg-brand-500 selection:text-white">

      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar
        clinic={currentClinic}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* 3. Main Page Flow */}
      <main className="flex-grow">
        {/* Hero Section with Interactive 3D Tooth */}
        <HeroSection
          clinic={currentClinic}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* Configurable Trust Stats Bar */}
        <TrustStatsBar clinic={currentClinic} />

        {/* Interactive Treatment Explorer */}
        <TreatmentsSection
          onSelectTreatmentForBooking={(treatmentId) => handleOpenBooking(treatmentId)}
        />

        {/* Signature Interactive 3D Dental Arch & Anatomy Explorer */}
        <section id="3d-explorer" className="py-24 bg-luxury-slate text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DentalExplorer3D
              onSelectTreatment={(name) => handleOpenBooking()}
              onBookConsultation={() => handleOpenBooking()}
            />
          </div>
        </section>

        {/* 5-Step Animated Patient Treatment Journey */}
        <TreatmentJourneySection
          onBookConsultation={() => handleOpenBooking()}
        />

        {/* "Real Results. Real Confidence." Draggable Before/After Slider */}
        <BeforeAfterSection
          onBookConsultation={() => handleOpenBooking()}
        />

        {/* World-Class Specialist Dentists */}
        <DoctorsSection
          onBookWithDoctor={(dentistId) => handleOpenBooking(undefined, dentistId)}
        />

        {/* Urgent Care & Same-Day Emergency Dentistry */}
        <EmergencySection
          clinic={currentClinic}
          onOpenBooking={() => handleOpenBooking('emergency')}
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* High-Tech Diagnostic & Robotics Showcase */}
        <TechnologySection
          onBookConsultation={() => handleOpenBooking()}
        />

        {/* Interactive Smile Simulator */}
        <SmileSimulatorSection
          onBookSmileDesign={() => handleOpenBooking('veneers')}
        />

        {/* Flexible 0% APR Financing & Insurance Checker */}
        <FinancingInsuranceSection
          onCheckInsurance={() => handleOpenBooking()}
        />

        {/* Patient Reviews, Ratings & Video Testimonials */}
        <ReviewsSection
          clinic={currentClinic}
          onBookConsultation={() => handleOpenBooking()}
        />

        {/* Searchable FAQ & Educational Blog */}
        <FaqAndEducationSection
          onBookConsultation={() => handleOpenBooking()}
        />

        {/* Clinic Location, Interactive Map & Operating Hours */}
        <LocationContactSection
          clinic={currentClinic}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* 4. Comprehensive Footer */}
      <Footer
        clinic={currentClinic}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* 5. Persistent Mobile Bottom Action Bar */}
      <MobileBottomBar
        clinic={currentClinic}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* 6. Desktop Floating AI Assistant Quick Trigger Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-luxury-slate/95 hover:bg-black text-white shadow-2xl border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105 group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-glow">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block flex items-center gap-1.5">
              Ask AI Dental Assistant
              <Sparkles className="w-3 h-3 text-brand-400" />
            </span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Online • Instant Answers</span>
          </div>
        </button>
      </div>

      {/* 7. Conversion Modals */}
      <BookingModal
        clinic={currentClinic}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTreatmentId={preselectedTreatment}
        preselectedDentistId={preselectedDentist}
      />

      <AiDentalAssistantModal
        clinic={currentClinic}
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onOpenBooking={() => {
          setIsAiOpen(false);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}

export default App;
