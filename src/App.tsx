import React, { useState, useEffect } from 'react';
import { CLINIC_PROFILES } from './config/clinicData';
import { PageType } from './types/navigation';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { AiDentalAssistantModal } from './components/ai/AiDentalAssistantModal';
import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { PatientCarePage } from './pages/PatientCarePage';
import { ContactPage } from './pages/ContactPage';
import { Bot, Sparkles } from 'lucide-react';

export function App() {
  const [activeClinicId] = useState<string>('aura');
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const hash = window.location.hash.replace('#', '') as PageType;
    const validPages: PageType[] = ['home', 'treatments', 'technology', 'doctors', 'gallery', 'patient-care', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string>('veneers');
  const [preselectedDentist, setPreselectedDentist] = useState<string>('any');

  const currentClinic = CLINIC_PROFILES[activeClinicId] || CLINIC_PROFILES.aura;

  // Listen to browser hash change (Back / Forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      const validPages: PageType[] = ['home', 'treatments', 'technology', 'doctors', 'gallery', 'patient-care', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (treatmentId?: string, dentistId?: string) => {
    if (treatmentId) setPreselectedTreatment(treatmentId);
    if (dentistId) setPreselectedDentist(dentistId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF7] text-[#1B2B27] font-sans selection:bg-[#3E8E7E]/20 selection:text-[#1B2B27]">

      {/* Sticky Glassmorphic Navbar with Active Page Indicators */}
      <Navbar
        clinic={currentClinic}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Routed Page Flow */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            clinic={currentClinic}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenAi={() => setIsAiOpen(true)}
          />
        )}

        {currentPage === 'treatments' && (
          <TreatmentsPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'technology' && (
          <TechnologyPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            clinic={currentClinic}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'patient-care' && (
          <PatientCarePage
            clinic={currentClinic}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenAi={() => setIsAiOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            clinic={currentClinic}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Comprehensive Footer with Page Navigation */}
      <Footer
        clinic={currentClinic}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Persistent Mobile Bottom Action Bar */}
      <MobileBottomBar
        clinic={currentClinic}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Desktop Floating AI Assistant Quick Trigger Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiOpen(true)}
          className="glass-spa hover:border-[#3E8E7E]/40 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[#1B2B27] shadow-spa hover:shadow-spa-hover transition-all hover:-translate-y-1 group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3E8E7E] to-[#5FA592] flex items-center justify-center text-white shadow-md font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#5FA592] animate-ping" />
          </div>
          <div className="text-left">
            <span className="text-xs font-semibold block flex items-center gap-1.5 text-[#1B2B27]">
              AI Clinical Concierge
              <Sparkles className="w-3 h-3 text-[#3E8E7E]" />
            </span>
            <span className="text-[10px] text-[#536963] block -mt-0.5">Instant Medical Triage</span>
          </div>
        </button>
      </div>

      {/* Conversion Modals */}
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
