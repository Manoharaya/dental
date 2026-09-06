import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Car, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            Concierge Facility Access
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Visit Our Private Dental Studio
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Valet parking, tranquil soundproof surgical suites, and dedicated concierge hospitality.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Contact Info & Opening Hours Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-luxury flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              {/* Clinic Name & Status */}
              <div className="pb-3 sm:pb-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-luxury-slate">{clinic.name}</h3>
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 sm:px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open Now
                  </span>
                </div>
                <p className="text-xs text-slate-500">{clinic.tagline}</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 block font-semibold">Studio Address</strong>
                  <span className="text-slate-600">{clinic.address}, {clinic.suite}</span>
                  <br />
                  <span className="text-slate-600">{clinic.city}, {clinic.state} {clinic.zip}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-600">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 block font-semibold">Concierge Desk & Appointments</strong>
                  <a href={`tel:${clinic.phone}`} className="text-brand-600 hover:underline font-medium">
                    {clinic.phone}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Emergency 24/7: {clinic.emergencyPhone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-brand-600">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 block font-semibold">Direct Concierge Email</strong>
                  <a href={`mailto:${clinic.email}`} className="text-brand-600 hover:underline font-medium">
                    {clinic.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="pt-3 sm:pt-4 border-t border-slate-200">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 sm:mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-500" /> Operating Schedule
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">Monday – Friday</span>
                    <span className="text-slate-900 font-semibold">{clinic.hours.monFri}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium">Saturday</span>
                    <span className="text-slate-900 font-semibold">{clinic.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Sunday</span>
                    <span className="text-rose-600 font-semibold">{clinic.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-5 sm:mt-6 w-full py-3 sm:py-3.5 px-4 rounded-xl bg-luxury-slate hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-luxury flex items-center justify-center gap-2"
            >
              <span>Schedule Your Visit to {clinic.city}</span>
            </button>
          </div>

          {/* Right: Elegant Stylized Map Card */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-800 text-white flex flex-col justify-between relative overflow-hidden shadow-luxury-dark min-h-[360px] sm:min-h-[420px]">
            {/* Stylized Google Map Visual Representation */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 h-60 sm:h-80 flex items-center justify-center">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Concentric radar locator rings */}
              <div className="w-48 h-48 rounded-full border border-brand-400/30 animate-ping absolute pointer-events-none" />
              <div className="w-32 h-32 rounded-full border border-brand-400/50 absolute pointer-events-none" />

              {/* Pin Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 text-white flex items-center justify-center shadow-glow mb-2 animate-bounce">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="bg-white text-luxury-slate px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl shadow-xl border border-slate-200 text-[11px] sm:text-xs font-bold flex items-center gap-1.5">
                  <span>{clinic.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Direction Overlay Action */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address + ', ' + clinic.city + ', ' + clinic.state)}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-luxury-slate/95 hover:bg-black text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md border border-slate-700 shadow-md"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-400" />
                <span>Google Maps</span>
              </a>
            </div>

            {/* Parking & Accessibility Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Complimentary subterranean valet parking for all appointments.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Private VIP elevator access with discreet entry upon request.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
