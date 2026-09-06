import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../config/clinicData';
import { Testimonial, ClinicProfile } from '../../types/clinic';
import { Star, CheckCircle2, Play, Sparkles, Quote, X } from 'lucide-react';

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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Patient Voices & Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Loved by Over 10,000+ Happy Patients
          </h2>

          {/* Aggregate Google Review Badge */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 text-amber-500 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-luxury-slate text-sm sm:text-base">
              {clinic.rating} out of 5.0
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({clinic.reviewCount.toLocaleString()}+ verified Google & Yelp reviews)
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-luxury flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div>
                {/* Star Rating & Verified Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Patient Info & Optional Video Trigger */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {rev.patientPhoto ? (
                    <img
                      src={rev.patientPhoto}
                      alt={rev.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 font-bold flex items-center justify-center text-xs">
                      {rev.name[0]}
                    </div>
                  )}
                  <div>
                    <strong className="text-xs text-slate-900 block font-semibold">{rev.name}</strong>
                    <span className="text-[11px] text-brand-600 block">{rev.treatment}</span>
                  </div>
                </div>

                {rev.hasVideo && (
                  <button
                    onClick={() => setActiveVideoTestimonial(rev)}
                    className="w-8 h-8 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-glow transition-transform hover:scale-110"
                    title="Watch video testimonial"
                  >
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial Modal Simulation */}
        {activeVideoTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
            <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 relative border border-slate-800 shadow-2xl">
              <button
                onClick={() => setActiveVideoTestimonial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-brand-400 uppercase font-semibold">
                Patient Video Experience
              </span>
              <h4 className="text-xl font-display font-bold text-white mt-1 mb-4">
                {activeVideoTestimonial.name}’s Smile Journey
              </h4>

              {/* Video Player Preview Mock */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute w-16 h-16 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-glow animate-pulse">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded-full text-xs text-white backdrop-blur-sm">
                  1:42 • {activeVideoTestimonial.treatment}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic mb-4">
                "{activeVideoTestimonial.quote}"
              </p>

              <button
                onClick={() => {
                  setActiveVideoTestimonial(null);
                  onBookConsultation();
                }}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow"
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
