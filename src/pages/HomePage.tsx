import React from 'react';
import { ClinicProfile } from '../types/clinic';
import { PageType } from '../types/navigation';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStatsBar } from '../components/sections/TrustStatsBar';
import { TREATMENTS_DATA, DENTISTS_DATA, TESTIMONIALS_DATA } from '../config/clinicData';
import { Sparkles, ArrowRight, Star, Clock, CheckCircle2, MapPin, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';
import { BeforeAfterSection } from '../components/sections/BeforeAfterSection';

interface HomePageProps {
  clinic: ClinicProfile;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (treatmentId?: string, dentistId?: string) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  clinic,
  onNavigate,
  onOpenBooking,
  onOpenAi,
}) => {
  // Top 3 signature treatments for the streamlined home preview
  const signatureTreatments = TREATMENTS_DATA.slice(0, 3);
  // Top 2 lead clinicians
  const leadDentists = DENTISTS_DATA.slice(0, 2);
  // Top 4 reviews
  const featuredReviews = TESTIMONIALS_DATA.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Interactive 3D Tooth */}
      <HeroSection
        clinic={clinic}
        onOpenBooking={() => onOpenBooking()}
        onOpenAi={onOpenAi}
      />

      {/* 2. Trust Stats Bar */}
      <TrustStatsBar clinic={clinic} />

      {/* 3. Curated Signature Treatments Highlight */}
      <section className="py-20 sm:py-24 bg-[#FBFAF7] relative overflow-hidden border-t border-[#1B2B27]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#3E8E7E]" />
                Signature Clinical Excellence
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
                Curated Aesthetic & Surgical Care
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#536963] max-w-xl">
                Bespoke smile design, biological tooth preservation, and painless surgical mastery.
              </p>
            </div>

            <button
              onClick={() => onNavigate('treatments')}
              className="btn-tactile-secondary self-start md:self-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <span>Explore All Procedures & Pricing</span>
              <ArrowRight className="w-4 h-4 text-[#3E8E7E]" />
            </button>
          </div>

          {/* 3 Highlighted Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {signatureTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="glass-spa glass-spa-hover rounded-3xl overflow-hidden border border-[#1B2B27]/08 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-spa"
              >
                <div className="relative h-56 overflow-hidden bg-[#F5F1EA]">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FBFAF7]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[#1B2B27] border border-[#1B2B27]/08 shadow-sm">
                    {treatment.badge}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#536963] mb-2">
                      <span className="flex items-center gap-1 font-medium text-[#3E8E7E]">
                        <Clock className="w-3.5 h-3.5" /> {treatment.duration}
                      </span>
                      <span className="font-semibold text-[#1B2B27]">{treatment.costRange}</span>
                    </div>

                    <h3 className="font-serif font-normal text-xl text-[#1B2B27] mb-2">
                      {treatment.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#536963] leading-relaxed mb-4 line-clamp-2">
                      {treatment.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1B2B27]/08 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('treatments')}
                      className="text-xs font-semibold text-[#3E8E7E] hover:text-[#327366] flex items-center gap-1 transition-colors"
                    >
                      <span>Clinical Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenBooking(treatment.id)}
                      className="btn-tactile-primary px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Discover More Treatments Bar */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F5F1EA] border border-[#1B2B27]/08 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#3E8E7E] flex items-center justify-center border border-[#1B2B27]/08 shadow-sm shrink-0">
                <HeartPulse className="w-5 h-5 text-[#3E8E7E]" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-semibold text-[#1B2B27] block">
                  Looking for CEREC® Same-Day Crowns, Laser Whitening, or All-on-4?
                </strong>
                <span className="text-xs text-[#536963]">
                  Browse our full clinical catalog with treatment steps, timelines, and 0% APR financing plans.
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('treatments')}
              className="btn-tactile-primary px-5 py-2.5 rounded-xl text-xs font-semibold text-white shrink-0 whitespace-nowrap"
            >
              View Full Treatments Catalog →
            </button>
          </div>
        </div>
      </section>

      {/* 4. Before & After Smile Spotlight */}
      <section className="bg-[#F5F1EA] border-t border-[#1B2B27]/08 relative">
        <BeforeAfterSection
          onBookConsultation={() => onOpenBooking('veneers')}
        />
        <div className="pb-12 text-center max-w-7xl mx-auto px-4">
          <button
            onClick={() => onNavigate('gallery')}
            className="btn-tactile-secondary px-6 py-3 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm"
          >
            <span>Explore Full Smile Gallery & Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#3E8E7E]" />
          </button>
        </div>
      </section>

      {/* 5. Master Clinicians Preview */}
      <section className="py-20 sm:py-24 bg-[#FBFAF7] border-t border-[#1B2B27]/08 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E8E7E]" />
                Elite Medical Faculty
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
                Meet Our Master Specialists
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#536963] max-w-xl">
                Board-certified specialists dedicated to gentle, pain-free artistry and anatomical longevity.
              </p>
            </div>

            <button
              onClick={() => onNavigate('doctors')}
              className="btn-tactile-secondary self-start md:self-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <span>View All Doctors & Faculty Bios</span>
              <ArrowRight className="w-4 h-4 text-[#3E8E7E]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {leadDentists.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1B2B27]/08 shadow-spa flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border border-[#1B2B27]/08 shrink-0 shadow-sm"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
                    <h3 className="font-serif font-normal text-xl text-[#1B2B27]">{doc.name}</h3>
                    <span className="text-xs text-[#3E8E7E] font-medium hidden sm:inline">{doc.credentials}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#3E8E7E] mb-2">{doc.role}</p>
                  <p className="text-xs text-[#536963] leading-relaxed mb-4 line-clamp-3">{doc.bio}</p>

                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <button
                      onClick={() => onOpenBooking(undefined, doc.id)}
                      className="btn-tactile-primary px-4 py-2 rounded-xl text-xs font-semibold text-white"
                    >
                      Book With {doc.name.split(' ')[1]}
                    </button>
                    <button
                      onClick={() => onNavigate('doctors')}
                      className="text-xs font-semibold text-[#536963] hover:text-[#1B2B27] transition-colors"
                    >
                      View Credentials →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Patient Testimonials Preview */}
      <section className="py-20 sm:py-24 bg-[#F5F1EA] border-t border-[#1B2B27]/08 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
              <Star className="w-3.5 h-3.5 text-[#3E8E7E]" />
              Verified Patient Experiences
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
              Loved by Over 10,000+ Happy Smiles
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#1B2B27]">{clinic.rating} Rating</span>
              <span className="text-xs text-[#536963]">({clinic.reviewCount.toLocaleString()}+ verified reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[10px] bg-[#3E8E7E]/10 text-[#3E8E7E] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#536963] leading-relaxed mb-4">"{rev.quote}"</p>
                </div>

                <div className="pt-3 border-t border-[#1B2B27]/08 flex items-center gap-2.5">
                  {rev.patientPhoto ? (
                    <img src={rev.patientPhoto} alt={rev.name} className="w-8 h-8 rounded-full object-cover border border-[#1B2B27]/10" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#3E8E7E]/10 text-[#3E8E7E] font-bold text-xs flex items-center justify-center">
                      {rev.name[0]}
                    </div>
                  )}
                  <div>
                    <strong className="text-xs text-[#1B2B27] block font-semibold">{rev.name}</strong>
                    <span className="text-[10px] text-[#3E8E7E] block">{rev.treatment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('gallery')}
              className="text-xs font-semibold text-[#3E8E7E] hover:text-[#327366] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Watch Video Testimonials & Read More Stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Concierge Visit Invitation Card */}
      <section className="py-16 sm:py-20 bg-[#FBFAF7] border-t border-[#1B2B27]/08">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-[#F5F1EA] rounded-3xl p-6 sm:p-10 border border-[#1B2B27]/08 shadow-spa flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#3E8E7E]" />
                Private Sanctuary in {clinic.city}
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#1B2B27]">
                Experience Private Dental Concierge Care
              </h3>
              <p className="text-xs sm:text-sm text-[#536963] leading-relaxed">
                Enjoy complimentary subterranean valet parking, tranquil soundproof surgical suites, and dedicated on-demand concierge hospitality.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#536963] pt-1">
                <span>• {clinic.address}, {clinic.city}</span>
                <span>• Mon–Fri: {clinic.hours.monFri}</span>
                <span>• 24/7 On-Call Emergency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenBooking()}
                className="btn-tactile-primary px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Schedule Consultation</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-tactile-secondary px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#3E8E7E]" />
                <span>Directions & Amenities</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
