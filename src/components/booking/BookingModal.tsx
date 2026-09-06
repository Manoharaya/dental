import React, { useState } from 'react';
import { X, Check, Download, CheckCircle2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicProfile } from '../../types/clinic';
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

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3E8E7E', '#5FA592', '#D4EFE8', '#FBFAF7'],
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FBFAF7] text-[#1B2B27] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#1B2B27]/10 overflow-hidden flex flex-col h-[94vh] sm:h-auto sm:max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 bg-white text-[#1B2B27] flex items-center justify-between border-b border-[#1B2B27]/08 shrink-0">
          <div>
            <span className="text-[11px] font-mono text-[#3E8E7E] font-semibold tracking-wider block">
              Instant Online Scheduling
            </span>
            <h3 className="text-base sm:text-xl font-serif font-normal text-[#1B2B27] mt-0.5 truncate max-w-[280px] sm:max-w-none">
              Book Your Visit at {clinic.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#536963] hover:text-[#1B2B27] hover:bg-[#1B2B27]/05 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        {step < 6 && (
          <div className="px-4 sm:px-6 py-3 bg-[#F5F1EA] border-b border-[#1B2B27]/08 flex items-center justify-between text-xs shrink-0">
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
                      ? 'bg-[#3E8E7E] text-white shadow-sm'
                      : step > s.num
                      ? 'bg-[#3E8E7E]/15 text-[#3E8E7E] border border-[#3E8E7E]/30'
                      : 'bg-[#1B2B27]/08 text-[#536963]'
                  }`}
                >
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`hidden sm:inline font-semibold ${step === s.num ? 'text-[#1B2B27]' : 'text-[#536963]'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* STEP 1: Patient Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-normal text-[#1B2B27]">
                Step 1: Purpose of Your Visit
              </h4>
              <p className="text-xs sm:text-sm text-[#536963]">
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
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      patientType === item.id
                        ? item.isUrgent
                          ? 'border-rose-500 bg-rose-50 shadow-sm'
                          : 'border-[#3E8E7E] bg-[#3E8E7E]/08 shadow-sm ring-1 ring-[#3E8E7E]/30'
                        : 'border-[#1B2B27]/08 hover:border-[#3E8E7E]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className={`font-semibold text-sm ${item.isUrgent ? 'text-rose-700' : 'text-[#1B2B27]'}`}>
                        {item.title}
                      </h5>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        item.isUrgent ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-[#3E8E7E]/10 text-[#3E8E7E] border border-[#3E8E7E]/20'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#536963] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Treatment Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-normal text-[#1B2B27]">
                Step 2: Select Treatment of Interest
              </h4>
              <p className="text-xs sm:text-sm text-[#536963]">
                Choose the primary clinical service you wish to receive or discuss.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {TREATMENTS_DATA.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTreatmentId(t.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      selectedTreatmentId === t.id
                        ? 'border-[#3E8E7E] bg-[#3E8E7E]/08 shadow-sm ring-1 ring-[#3E8E7E]/30'
                        : 'border-[#1B2B27]/08 hover:border-[#3E8E7E]/30 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#1B2B27]/08 bg-[#FBFAF7]">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-xs sm:text-sm text-[#1B2B27] truncate">{t.title}</h5>
                      <span className="text-[11px] text-[#3E8E7E] block mt-0.5 font-medium">{t.duration}</span>
                      <span className="text-[11px] text-[#536963]">{t.costRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Doctor Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-normal text-[#1B2B27]">
                Step 3: Choose Your Preferred Clinician
              </h4>
              <p className="text-xs sm:text-sm text-[#536963]">
                Select a specific dentist or allow us to assign the first available specialist.
              </p>

              <div className="space-y-3 pt-2">
                <div
                  onClick={() => setSelectedDentistId('any')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedDentistId === 'any'
                      ? 'border-[#3E8E7E] bg-[#3E8E7E]/08 shadow-sm ring-1 ring-[#3E8E7E]/30'
                      : 'border-[#1B2B27]/08 hover:border-[#3E8E7E]/30 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3E8E7E]/10 text-[#3E8E7E] border border-[#3E8E7E]/20 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5 text-[#3E8E7E]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-[#1B2B27]">First Available Specialist</h5>
                      <p className="text-xs text-[#536963]">Fastest appointment availability guaranteed</p>
                    </div>
                  </div>
                  {selectedDentistId === 'any' && <CheckCircle2 className="w-5 h-5 text-[#3E8E7E]" />}
                </div>

                {DENTISTS_DATA.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDentistId(doc.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedDentistId === doc.id
                        ? 'border-[#3E8E7E] bg-[#3E8E7E]/08 shadow-sm ring-1 ring-[#3E8E7E]/30'
                        : 'border-[#1B2B27]/08 hover:border-[#3E8E7E]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-[#1B2B27]/08" />
                      <div>
                        <h5 className="font-semibold text-sm text-[#1B2B27]">{doc.name}</h5>
                        <p className="text-xs text-[#3E8E7E] font-medium">{doc.role}</p>
                        <span className="text-[11px] text-[#536963]">Available: {doc.availableDays}</span>
                      </div>
                    </div>
                    {selectedDentistId === doc.id && <CheckCircle2 className="w-5 h-5 text-[#3E8E7E]" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Date & Time */}
          {step === 4 && (
            <div className="space-y-5">
              <h4 className="text-lg font-serif font-normal text-[#1B2B27]">
                Step 4: Select Date & Time
              </h4>

              {/* Date Pills */}
              <div>
                <label className="text-xs font-semibold text-[#1B2B27] block mb-2">
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
                          ? 'bg-[#3E8E7E] text-white font-semibold border-[#3E8E7E] shadow-sm'
                          : 'bg-white border-[#1B2B27]/10 text-[#1B2B27] hover:border-[#3E8E7E]/40'
                      }`}
                    >
                      <span className="text-[11px] block font-medium">{d.label}</span>
                      <span className="text-[10px] opacity-75 block">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-semibold text-[#1B2B27] block mb-2">
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
                          ? 'bg-[#3E8E7E] text-white font-semibold border-[#3E8E7E] shadow-sm'
                          : 'bg-white border-[#1B2B27]/10 text-[#1B2B27] hover:border-[#3E8E7E]/40'
                      }`}
                    >
                      <span>{slot.time}</span>
                      <span className="text-[10px] opacity-75">{slot.period}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Patient Details Form */}
          {step === 5 && (
            <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-4">
              <h4 className="text-lg font-serif font-normal text-[#1B2B27]">
                Step 5: Patient Contact & Confirmation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-[#1B2B27] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jessica Sterling"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#1B2B27]/12 bg-white text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1B2B27] block mb-1">Phone Number (SMS Confirmation) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#1B2B27]/12 bg-white text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-[#1B2B27] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#1B2B27]/12 bg-white text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1B2B27] block mb-1">Dental Insurance Provider</label>
                  <input
                    type="text"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    placeholder="Delta Dental, Cigna, Aetna, or Cash"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#1B2B27]/12 bg-white text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1B2B27] block mb-1">
                  Symptoms or Notes for the Doctor (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe any sensitivity, cosmetic goals, or anxiety preferences..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#1B2B27]/12 bg-white text-[#1B2B27] placeholder-[#536963]/50 focus:outline-none focus:border-[#3E8E7E] resize-none"
                />
              </div>

              {/* Summary recap box */}
              <div className="p-3.5 rounded-2xl bg-[#F5F1EA] border border-[#1B2B27]/08 text-xs space-y-1 text-[#536963]">
                <div className="flex justify-between">
                  <span>Procedure:</span>
                  <strong className="text-[#1B2B27]">{currentTreatment.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <strong className="text-[#1B2B27]">{selectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Doctor:</span>
                  <strong className="text-[#1B2B27]">{currentDentist ? currentDentist.name : 'First Available Specialist'}</strong>
                </div>
              </div>
            </form>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#3E8E7E]/10 text-[#3E8E7E] mx-auto flex items-center justify-center border border-[#3E8E7E]/20 shadow-spa animate-in zoom-in-50">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#3E8E7E] font-semibold tracking-wider">
                  Appointment Confirmed
                </span>
                <h4 className="text-2xl font-serif font-normal text-[#1B2B27] mt-1">
                  You’re Scheduled, {fullName}!
                </h4>
                <p className="text-xs sm:text-sm text-[#536963] max-w-md mx-auto mt-2">
                  A calendar invite and SMS reminder have been dispatched. Our concierge will welcome you in private comfort.
                </p>
              </div>

              {/* Booking Confirmation Pass Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#1B2B27]/08 max-w-md mx-auto text-left text-xs space-y-3 shadow-spa">
                <div className="flex items-center justify-between pb-3 border-b border-[#1B2B27]/08">
                  <span className="text-[#536963]">Confirmation Code</span>
                  <span className="font-mono font-bold text-[#3E8E7E] text-sm">{bookingCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#536963]">Clinic</span>
                  <span className="font-semibold text-[#1B2B27]">{clinic.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#536963]">Treatment</span>
                  <span className="font-semibold text-[#1B2B27]">{currentTreatment.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#536963]">Date & Time</span>
                  <span className="font-semibold text-[#1B2B27]">{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#536963]">Location</span>
                  <span className="font-semibold text-[#1B2B27]">{clinic.address}, {clinic.city}</span>
                </div>
              </div>

              {/* Actions: Download Calendar + Done */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="btn-tactile-secondary w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#3E8E7E]" />
                  Add to Calendar (.ics)
                </button>
                <button
                  onClick={onClose}
                  className="btn-tactile-primary w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        {step < 6 && (
          <div className="p-4 sm:p-6 bg-white border-t border-[#1B2B27]/08 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-tactile-secondary px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5"
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
                className="btn-tactile-primary px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                Continue <ArrowRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="btn-tactile-primary px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                Confirm Appointment <Check className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
