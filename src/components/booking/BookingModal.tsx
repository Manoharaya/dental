import React, { useState } from 'react';
import { X, Check, Calendar, Clock, User, Stethoscope, Shield, ArrowRight, ArrowLeft, Download, CheckCircle2, AlertTriangle, Sparkles, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicProfile, Treatment, Dentist } from '../../types/clinic';
import { TREATMENTS_DATA, DENTISTS_DATA } from '../../config/clinicData';

interface BookingModalProps {
  clinic: ClinicProfile;
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatmentId?: string;
  preselectedDentistId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  clinic,
  isOpen,
  onClose,
  preselectedTreatmentId,
  preselectedDentistId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [patientType, setPatientType] = useState<'new' | 'existing' | 'emergency' | 'consultation'>('new');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(preselectedTreatmentId || 'veneers');
  const [selectedDentistId, setSelectedDentistId] = useState<string>(preselectedDentistId || 'any');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 10:00 AM');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('Delta Dental PPO');
  const [notes, setNotes] = useState<string>('');
  const [bookingCode, setBookingCode] = useState<string>('');

  if (!isOpen) return null;

  const currentTreatment = TREATMENTS_DATA.find((t) => t.id === selectedTreatmentId) || TREATMENTS_DATA[0];
  const currentDentist = DENTISTS_DATA.find((d) => d.id === selectedDentistId);

  // Available upcoming dates
  const availableDates = [
    { label: 'Tomorrow', date: 'Mon, Sep 7' },
    { label: 'Tuesday', date: 'Tue, Sep 8' },
    { label: 'Wednesday', date: 'Wed, Sep 9' },
    { label: 'Thursday', date: 'Thu, Sep 10' },
    { label: 'Friday', date: 'Fri, Sep 11' },
    { label: 'Saturday', date: 'Sat, Sep 12' },
  ];

  const timeSlots = [
    { time: '08:30 AM', period: 'Morning' },
    { time: '10:00 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '01:30 PM', period: 'Afternoon' },
    { time: '03:00 PM', period: 'Afternoon' },
    { time: '04:30 PM', period: 'Evening' },
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const randomId = `${clinic.id.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingCode(randomId);
    setStep(6);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0EA5E9', '#38BDF8', '#C5A880', '#0F172A'],
      });
    } catch {
      // ignore
    }
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${clinic.name}//Dental Appointment//EN
BEGIN:VEVENT
SUMMARY:Dental Visit: ${currentTreatment.title} at ${clinic.name}
DESCRIPTION:Confirmed appointment for ${fullName} with ${currentDentist ? currentDentist.name : 'Clinical Team'}.
LOCATION:${clinic.address}, ${clinic.suite}, ${clinic.city}, ${clinic.state}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `appointment-${clinic.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 bg-luxury-slate text-white flex items-center justify-between border-b border-slate-700">
          <div>
            <span className="text-[11px] font-mono text-brand-400 uppercase tracking-widest font-semibold">
              Instant Online Scheduling
            </span>
            <h3 className="text-xl font-display font-bold text-white mt-0.5">
              Book Your Visit at {clinic.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker (Steps 1–5) */}
        {step < 6 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Patient' },
              { num: 2, label: 'Treatment' },
              { num: 3, label: 'Doctor' },
              { num: 4, label: 'Time' },
              { num: 5, label: 'Details' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === s.num
                      ? 'bg-brand-500 text-white shadow-glow'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`hidden sm:inline font-medium ${step === s.num ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {/* STEP 1: Patient Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-display font-bold text-luxury-slate">
                Step 1: What is the purpose of your visit?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Please indicate your relationship with our studio so we allocate optimal consultation time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  {
                    id: 'new',
                    title: 'New Patient Experience',
                    desc: 'Comprehensive 3D scan, digital charting, cancer screening & full exam.',
                    badge: 'Includes 3D Imaging',
                  },
                  {
                    id: 'consultation',
                    title: 'Cosmetic Smile Consultation',
                    desc: 'Discuss veneers, Invisalign, or whitening with master aesthetic dentist.',
                    badge: 'Complimentary Mockup',
                  },
                  {
                    id: 'emergency',
                    title: 'Same-Day Urgent Emergency',
                    desc: 'Severe pain, knocked-out tooth, crown fracture, or acute trauma.',
                    badge: 'Priority Same-Day Slot',
                    isUrgent: true,
                  },
                  {
                    id: 'existing',
                    title: 'Existing Patient Checkup',
                    desc: 'Routine 6-month hygiene recall, prophylaxis, and fluoride reapplication.',
                    badge: 'Established Care',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPatientType(item.id as any)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      patientType === item.id
                        ? item.isUrgent
                          ? 'border-rose-500 bg-rose-50/50 shadow-md'
                          : 'border-brand-500 bg-brand-50/40 shadow-glow'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className={`font-bold text-sm ${item.isUrgent ? 'text-rose-900' : 'text-slate-900'}`}>
                        {item.title}
                      </h5>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        item.isUrgent ? 'bg-rose-100 text-rose-700' : 'bg-brand-100 text-brand-700'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Treatment Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-display font-bold text-luxury-slate">
                Step 2: Select Treatment of Interest
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the primary service you wish to receive or discuss.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {TREATMENTS_DATA.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTreatmentId(t.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      selectedTreatmentId === t.id
                        ? 'border-brand-500 bg-brand-50/40 shadow-glow'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{t.title}</h5>
                      <span className="text-[11px] text-brand-600 block mt-0.5 font-medium">{t.duration}</span>
                      <span className="text-[11px] text-slate-400">{t.costRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Doctor Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-display font-bold text-luxury-slate">
                Step 3: Choose Your Preferred Clinician
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Select a specific dentist or allow us to assign the first available specialist.
              </p>

              <div className="space-y-3 pt-2">
                <div
                  onClick={() => setSelectedDentistId('any')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedDentistId === 'any'
                      ? 'border-brand-500 bg-brand-50/40 shadow-glow'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">First Available Specialist</h5>
                      <p className="text-xs text-slate-500">Fastest appointment availability guaranteed</p>
                    </div>
                  </div>
                  {selectedDentistId === 'any' && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                </div>

                {DENTISTS_DATA.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDentistId(doc.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedDentistId === doc.id
                        ? 'border-brand-500 bg-brand-50/40 shadow-glow'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">{doc.name}</h5>
                        <p className="text-xs text-brand-600 font-medium">{doc.role}</p>
                        <span className="text-[11px] text-slate-400">Available: {doc.availableDays}</span>
                      </div>
                    </div>
                    {selectedDentistId === doc.id && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Date & Time */}
          {step === 4 && (
            <div className="space-y-5">
              <h4 className="text-lg font-display font-bold text-luxury-slate">
                Step 4: Select Preferred Date & Time
              </h4>

              {/* Date Pills */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Select Day
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(`${d.label}, ${selectedTimeSlot}`)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate.includes(d.label)
                          ? 'bg-brand-500 text-white border-brand-500 shadow-glow'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{d.label}</span>
                      <span className="text-[10px] opacity-80 block">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedTimeSlot(slot.time);
                        setSelectedDate(`${selectedDate.split(',')[0]}, ${slot.time}`);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-medium transition-all ${
                        selectedTimeSlot === slot.time
                          ? 'bg-luxury-slate text-white border-luxury-slate shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{slot.time}</span>
                      <span className="text-[10px] opacity-60">{slot.period}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Patient Details Form */}
          {step === 5 && (
            <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-4">
              <h4 className="text-lg font-display font-bold text-luxury-slate">
                Step 5: Patient Contact & Confirmation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jessica Sterling"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number (SMS Confirmation) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Dental Insurance Provider</label>
                  <input
                    type="text"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="Delta Dental, Cigna, Aetna, or Cash"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Symptoms or Notes for the Doctor (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe any sensitivity, cosmetic goals, or anxiety preferences..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>

              {/* Summary recap box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Procedure:</span>
                  <strong className="text-slate-900">{currentTreatment.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <strong className="text-slate-900">{selectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Doctor:</span>
                  <strong className="text-slate-900">{currentDentist ? currentDentist.name : 'First Available Specialist'}</strong>
                </div>
              </div>
            </form>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg animate-in zoom-in-50">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-mono text-brand-600 uppercase tracking-widest font-semibold">
                  Appointment Confirmed
                </span>
                <h4 className="text-2xl font-display font-bold text-luxury-slate mt-1">
                  You’re Scheduled, {fullName}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
                  A calendar invite and SMS reminder have been dispatched. Our concierge will welcome you in private comfort.
                </p>
              </div>

              {/* Booking Confirmation Pass Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-400">Confirmation Code</span>
                  <span className="font-mono font-bold text-brand-600 text-sm">{bookingCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Clinic</span>
                  <span className="font-semibold text-slate-800">{clinic.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Treatment</span>
                  <span className="font-semibold text-slate-800">{currentTreatment.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date & Time</span>
                  <span className="font-semibold text-slate-800">{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-slate-800">{clinic.address}, {clinic.city}</span>
                </div>
              </div>

              {/* Actions: Download Calendar + Done */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Add to Apple / Google Calendar (.ics)
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow"
                >
                  Close & Return to Studio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls (Back & Next) */}
        {step < 6 && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-glow flex items-center gap-1.5"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 text-white text-xs font-semibold shadow-glow flex items-center gap-1.5"
              >
                Confirm Appointment <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
