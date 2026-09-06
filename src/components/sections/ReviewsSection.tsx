import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../config/clinicData';
import { Testimonial, ClinicProfile } from '../../types/clinic';
import { Star, CheckCircle2, Play, Sparkles, X } from 'lucide-react';

interface ReviewsSectionProps {
  clinic: ClinicProfile;
  onBookConsultation: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  clinic,
  onBookConsultation,
}) => {
  const [activeVideoTestimonial, setActiveVideoTestimonial] = useState<Testimonial | null>(null);

  return (
    <section className="py-24 bg-[#0A110F] relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Patient Voices & Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F2E9DC] tracking-tight">
            Loved by Over 10,000+ Happy Patients
          </h2>

          {/* Aggregate Google Review Badge */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-medium text-[#F2E9DC] text-sm sm:text-base">
              {clinic.rating} out of 5.0
            </span>
            <span className="text-xs text-white/50 font-normal">
              ({clinic.reviewCount.toLocaleString()}+ verified patient reviews)
            </span>
          </div>
        </div>

        {/* Testimonials: Swipeable on mobile, 4-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto no-scrollbar gap-4 sm:gap-6 pb-2 md:pb-0 snap-x">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="flex-shrink-0 w-[280px] sm:w-auto snap-center glass-clinical hover:border-teal-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div>
                {/* Star Rating & Verified Pill */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="text-[10px] bg-teal-500/10 text-teal-300 font-medium px-2 py-0.5 rounded-full flex items-center gap-1 border border-teal-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#A8B8B4] leading-relaxed mb-4 sm:mb-6">
                  "{rev.quote}"
                </p>
              </div>

              {/* Patient Info & Optional Video Trigger */}
              <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {rev.patientPhoto ? (
                    <img
                      src={rev.patientPhoto}
                      alt={rev.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-500/20 text-teal-300 font-semibold flex items-center justify-center text-xs border border-teal-500/30">
                      {rev.name[0]}
                    </div>
                  )}
                  <div>
                    <strong className="text-xs text-[#F2E9DC] block font-medium">{rev.name}</strong>
                    <span className="text-[10px] sm:text-[11px] text-teal-400 block">{rev.treatment}</span>
                  </div>
                </div>

                {rev.hasVideo && (
                  <button
                    onClick={() => setActiveVideoTestimonial(rev)}
                    className="btn-tactile-primary w-8 h-8 rounded-full p-0 flex items-center justify-center transition-transform hover:scale-110 shrink-0"
                    title="Watch video testimonial"
                  >
                    <Play className="w-3.5 h-3.5 fill-teal-950 text-teal-950 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="md:hidden flex items-center justify-center text-[11px] text-white/40 mt-3">
          <span>Swipe horizontally to explore more patient stories →</span>
        </div>

        {/* Video Testimonial Modal */}
        {activeVideoTestimonial && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#0E1614] text-[#F9FAF9] rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 relative border border-white/15 shadow-2xl">
              <button
                onClick={() => setActiveVideoTestimonial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-teal-400 font-medium tracking-wider">
                Patient Video Experience
              </span>
              <h4 className="text-xl font-serif font-normal text-[#F2E9DC] mt-1 mb-4">
                {activeVideoTestimonial.name}’s Smile Journey
              </h4>

              {/* Video Player Preview Mock */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="btn-tactile-primary absolute w-14 h-14 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 fill-teal-950 text-teal-950 ml-0.5" />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1 rounded-full text-xs text-white/90 backdrop-blur-sm border border-white/10">
                  1:42 • {activeVideoTestimonial.treatment}
                </div>
              </div>

              <p className="text-xs text-[#A8B8B4] mb-4">
                "{activeVideoTestimonial.quote}"
              </p>

              <button
                onClick={() => {
                  setActiveVideoTestimonial(null);
                  onBookConsultation();
                }}
                className="btn-tactile-primary w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold"
              >
                Start Your Own Smile Journey
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
