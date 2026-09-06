import React, { useState } from 'react';
import { DENTISTS_DATA } from '../../config/clinicData';
import { Dentist } from '../../types/clinic';
import { Sparkles, Star, Award, GraduationCap, Globe, Calendar, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (dentistId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onBookWithDoctor,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Dentist | null>(null);

  return (
    <section id="dentists" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            World-Class Clinical Faculty
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Meet Your Dental Specialists
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Pioneering clinicians combining Ivy League academic credentials, fine-arts aesthetic mastery, and empathetic bedside warmth.
          </p>
        </div>

        {/* Doctor Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DENTISTS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Portrait Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-luxury-slate/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {doc.experienceYears}+ Years Clinical Exp.
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5">
                  <span className="text-[10px] sm:text-[11px] font-mono text-brand-600 uppercase tracking-widest font-semibold block">
                    {doc.credentials}
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-bold text-luxury-slate mt-0.5 group-hover:text-brand-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{doc.role}</p>
                  <p className="text-[11px] sm:text-xs text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg mt-2 inline-block font-medium">
                    {doc.specialization}
                  </p>

                  <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Credentials & Bio</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => onBookWithDoctor(doc.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-luxury-slate hover:bg-slate-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-400" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Bio Modal (Bottom-sheet on mobile, centered dialog on desktop) */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl border border-slate-200">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-3.5 sm:gap-4 mb-4 sm:mb-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <span className="text-xs font-mono text-brand-600 font-bold uppercase tracking-wider">
                    {selectedDoctor.credentials}
                  </span>
                  <h3 className="text-xl font-display font-bold text-luxury-slate">{selectedDoctor.name}</h3>
                  <p className="text-xs text-slate-600 font-medium">{selectedDoctor.role}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {selectedDoctor.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedDoctor.reviewCount} Verified Patient Reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                <p>{selectedDoctor.bio}</p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                  <div>
                    <h5 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs mb-1">
                      <GraduationCap className="w-4 h-4 text-brand-500" /> Formal Dental Education:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                      {selectedDoctor.education.map((edu, i) => (
                        <li key={i}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <h5 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs mb-1">
                      <Award className="w-4 h-4 text-brand-500" /> Prestigious Memberships:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                      {selectedDoctor.memberships.map((mem, i) => (
                        <li key={i}>{mem}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs">
                    <Globe className="w-4 h-4 text-brand-500" />
                    <span className="font-semibold text-slate-700">Languages Spoken:</span>
                    <span>{selectedDoctor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const id = selectedDoctor.id;
                  setSelectedDoctor(null);
                  onBookWithDoctor(id);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-glow flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Consultation with {selectedDoctor.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
