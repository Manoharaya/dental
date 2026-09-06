import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Car, Shield } from 'lucide-react';
import { ClinicProfile } from '../../types/clinic';

interface LocationContactSectionProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
}

export const LocationContactSection: React.FC<LocationContactSectionProps> = ({
  clinic,
  onOpenBooking,
}) => {
  return (
    <section id="contact" className="py-24 bg-[#FBFAF7] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[350px] bg-[#D4EFE8]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-[#F9EBE7]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Concierge Facility Access
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Visit Our Private Dental Studio
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Valet parking, tranquil soundproof surgical suites, and dedicated concierge hospitality.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Contact Info & Opening Hours Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1B2B27]/08 shadow-spa flex flex-col justify-between">
            <div className="space-y-6">
              {/* Clinic Name & Status */}
              <div className="pb-4 border-b border-[#1B2B27]/08">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-normal text-xl text-[#1B2B27]">{clinic.name}</h3>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#3E8E7E] bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-pulse" />
                    Open Now
                  </span>
                </div>
                <p className="text-xs text-[#536963]">{clinic.tagline}</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FBFAF7] border border-[#1B2B27]/08 flex items-center justify-center shrink-0 text-[#3E8E7E]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#1B2B27] block font-semibold">Studio Address</strong>
                  <span className="text-[#536963]">{clinic.address}, {clinic.suite}</span>
                  <br />
                  <span className="text-[#536963]">{clinic.city}, {clinic.state} {clinic.zip}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FBFAF7] border border-[#1B2B27]/08 flex items-center justify-center shrink-0 text-[#3E8E7E]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#1B2B27] block font-semibold">Concierge Desk & Appointments</strong>
                  <a href={`tel:${clinic.phone}`} className="text-[#3E8E7E] hover:text-[#327366] font-medium transition-colors">
                    {clinic.phone}
                  </a>
                  <p className="text-[11px] text-[#536963] mt-0.5">Emergency 24/7: {clinic.emergencyPhone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FBFAF7] border border-[#1B2B27]/08 flex items-center justify-center shrink-0 text-[#3E8E7E]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#1B2B27] block font-semibold">Direct Concierge Email</strong>
                  <a href={`mailto:${clinic.email}`} className="text-[#3E8E7E] hover:text-[#327366] font-medium transition-colors">
                    {clinic.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="pt-4 border-t border-[#1B2B27]/08">
                <h4 className="text-xs font-semibold tracking-wider text-[#536963] mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3E8E7E]" /> Operating Schedule
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1B2B27]/05 text-[#536963]">
                    <span>Monday – Friday</span>
                    <span className="text-[#1B2B27] font-medium">{clinic.hours.monFri}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B2B27]/05 text-[#536963]">
                    <span>Saturday</span>
                    <span className="text-[#1B2B27] font-medium">{clinic.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between py-1 text-[#536963]">
                    <span>Sunday</span>
                    <span className="text-[#3E8E7E] font-medium">{clinic.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn-tactile-primary mt-6 w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Schedule Your Visit to {clinic.city}</span>
            </button>
          </div>

          {/* Right: Elegant Stylized Map Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1B2B27]/08 text-[#1B2B27] flex flex-col justify-between relative overflow-hidden shadow-spa min-h-[360px] sm:min-h-[420px]">
            {/* Stylized Google Map Visual Representation */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1B2B27]/08 bg-[#F5F1EA] h-60 sm:h-80 flex items-center justify-center">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(#3E8E7E_1px,transparent_1px)] [background-size:20px_20px]" />
              
              {/* Concentric radar locator rings */}
              <div className="w-48 h-48 rounded-full border border-[#3E8E7E]/20 animate-ping absolute pointer-events-none" />
              <div className="w-32 h-32 rounded-full border border-[#3E8E7E]/40 absolute pointer-events-none" />

              {/* Pin Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl btn-tactile-primary text-white flex items-center justify-center shadow-spa mb-2 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="bg-white text-[#1B2B27] px-3.5 py-1.5 rounded-xl shadow-spa border border-[#1B2B27]/08 text-xs font-semibold flex items-center gap-1.5">
                  <span>{clinic.name}</span>
                  <span className="w-2 h-2 rounded-full bg-[#3E8E7E]" />
                </div>
              </div>

              {/* Direction Overlay Action */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address + ', ' + clinic.city + ', ' + clinic.state)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-tactile-secondary absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium backdrop-blur-md"
              >
                <Navigation className="w-3.5 h-3.5 text-[#3E8E7E]" />
                <span>Google Maps</span>
              </a>
            </div>

            {/* Parking & Accessibility Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-[#1B2B27]/08 text-xs text-[#536963]">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                <span>Complimentary subterranean valet parking for all appointments.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#3E8E7E] shrink-0" />
                <span>Private VIP elevator access with discreet entry upon request.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
