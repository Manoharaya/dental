import React, { useState } from 'react';
import { DENTISTS_DATA } from '../../config/clinicData';
import { Dentist } from '../../types/clinic';
import { Sparkles, Star, Award, GraduationCap, Globe, Calendar, ChevronRight, X } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (dentistId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onBookWithDoctor,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Dentist | null>(null);

  return (
    <section id="dentists" className="py-24 bg-[#FBFAF7] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1B2B27]/08 text-[#3E8E7E] text-xs font-medium mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Clinical Faculty & Specialists
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Meet Your Dental Specialists
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963] leading-relaxed">
            Pioneering clinicians combining Ivy League academic credentials, fine-arts aesthetic mastery, and empathetic bedside warmth.
          </p>
        </div>

        {/* Doctor Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DENTISTS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="glass-spa rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-spa hover:shadow-spa-hover border border-[#1B2B27]/08"
            >
              <div>
                {/* Doctor Portrait Image */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#F5F1EA]">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-[#1B2B27] border border-[#1B2B27]/08 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-[#536963] font-normal">({doc.reviewCount})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#1B2B27] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#1B2B27]/08 shadow-sm">
                    {doc.experienceYears}+ Years Clinical Exp.
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5">
                  <span className="text-[11px] font-mono text-[#3E8E7E] font-medium tracking-wide block">
                    {doc.credentials}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-normal text-[#1B2B27] mt-1 group-hover:text-[#3E8E7E] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-medium text-[#536963] mt-0.5">{doc.role}</p>
                  <p className="text-[11px] text-[#1B2B27] bg-[#D4EFE8] border border-[#3E8E7E]/20 px-2.5 py-1 rounded-lg mt-2.5 inline-block font-medium">
                    {doc.specialization}
                  </p>

                  <p className="text-xs text-[#536963] mt-2.5 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="btn-tactile-secondary w-full py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <span>Credentials & Background</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#536963]" />
                </button>
                <button
                  onClick={() => onBookWithDoctor(doc.id)}
                  className="btn-tactile-primary w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Bio Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#FBFAF7] text-[#1B2B27] rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-2xl border border-[#1B2B27]/10">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-[#F5F1EA] text-[#536963] hover:text-[#1B2B27] transition-colors border border-[#1B2B27]/08"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-3.5 sm:gap-4 mb-4 sm:mb-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#1B2B27]/08 shrink-0"
                />
                <div>
                  <span className="text-xs font-mono text-[#3E8E7E] font-medium tracking-wide">
                    {selectedDoctor.credentials}
                  </span>
                  <h3 className="text-xl font-serif font-normal text-[#1B2B27]">{selectedDoctor.name}</h3>
                  <p className="text-xs text-[#536963] font-medium">{selectedDoctor.role}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#536963]">
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {selectedDoctor.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedDoctor.reviewCount} Verified Patient Reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#536963] leading-relaxed mb-6">
                <p>{selectedDoctor.bio}</p>

                <div className="bg-white p-4 rounded-2xl border border-[#1B2B27]/08 space-y-3 shadow-sm">
                  <div>
                    <h5 className="font-medium text-[#1B2B27] flex items-center gap-1.5 text-xs mb-1.5">
                      <GraduationCap className="w-4 h-4 text-[#3E8E7E]" /> Formal Clinical Education:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-[#536963] space-y-1 pl-1">
                      {selectedDoctor.education.map((edu, i) => (
                        <li key={i}>{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2.5 border-t border-[#1B2B27]/08">
                    <h5 className="font-medium text-[#1B2B27] flex items-center gap-1.5 text-xs mb-1.5">
                      <Award className="w-4 h-4 text-[#3E8E7E]" /> Academic & Professional Memberships:
                    </h5>
                    <ul className="list-disc list-inside text-xs text-[#536963] space-y-1 pl-1">
                      {selectedDoctor.memberships.map((mem, i) => (
                        <li key={i}>{mem}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2.5 border-t border-[#1B2B27]/08 flex items-center gap-2 text-xs">
                    <Globe className="w-4 h-4 text-[#3E8E7E]" />
                    <span className="font-medium text-[#1B2B27]">Languages:</span>
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
                className="btn-tactile-primary w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                Schedule Consultation with {selectedDoctor.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
