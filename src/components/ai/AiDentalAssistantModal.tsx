import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Mic, Phone, Calendar, ChevronRight, Volume2 } from 'lucide-react';
import { ClinicProfile } from '../../types/clinic';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
  actionButton?: {
    label: string;
    action: 'book' | 'call' | 'emergency';
  };
}

interface AiDentalAssistantModalProps {
  clinic: ClinicProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AiDentalAssistantModal: React.FC<AiDentalAssistantModalProps> = ({
  clinic,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello! I'm Ava, ${clinic.name}'s AI Clinical Concierge. I can answer treatment inquiries, verify insurance status, assess symptoms, or schedule your visit. How may I assist you today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How much does Invisalign cost?',
    'I have a sudden severe toothache',
    'Do you accept my dental insurance?',
    'I want to book an appointment',
    'What are your opening hours?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAiReply = (userText: string) => {
    const text = userText.toLowerCase();

    // 1. Emergency Detection
    if (text.includes('toothache') || text.includes('pain') || text.includes('emergency') || text.includes('knocked') || text.includes('bleeding') || text.includes('broken')) {
      return {
        text: `⚠️ DENTAL EMERGENCY TRIAGE DETECTED: Acute pain or tooth trauma requires immediate attention to prevent nerve damage or permanent loss. We guarantee same-day emergency triage. Apply a cold compress to your cheek and avoid pressure on that quadrant.`,
        isEmergency: true,
        actionButton: {
          label: 'Request Emergency Slot Now',
          action: 'emergency' as const,
        }
      };
    }

    // 2. Invisalign & Aligners
    if (text.includes('invisalign') || text.includes('aligner') || text.includes('straighten') || text.includes('braces')) {
      return {
        text: `Our Invisalign® clear aligner treatments range from $2,800 to $5,500 depending on complexity, with 0% APR financing starting at $99/month. We use 3D optical scans (no putty impressions) and display a 3D digital simulation before treatment starts.`,
        actionButton: {
          label: 'Book Free 3D Aligner Scan',
          action: 'book' as const,
        }
      };
    }

    // 3. Veneers & Cosmetic Cost
    if (text.includes('veneer') || text.includes('cosmetic') || text.includes('cost') || text.includes('price')) {
      return {
        text: `Handcrafted porcelain veneers at ${clinic.name} range from $1,200 to $2,400 per tooth and are custom-shaded by master ceramists with a 15–20 year lifespan. In-studio laser whitening is $450–$750. 0% APR financing is available.`,
        actionButton: {
          label: 'Schedule Cosmetic Consultation',
          action: 'book' as const,
        }
      };
    }

    // 4. Insurance & Payment
    if (text.includes('insurance') || text.includes('delta') || text.includes('cigna') || text.includes('metlife') || text.includes('coverage')) {
      return {
        text: `We accept and electronically file claims for all major PPO insurance plans including Delta Dental, MetLife, Cigna, Aetna, Guardian, and UnitedHealthcare. Our team provides complimentary benefit checks before your appointment.`,
        actionButton: {
          label: 'Check My Insurance Coverage',
          action: 'book' as const,
        }
      };
    }

    // 5. Booking appointment
    if (text.includes('book') || text.includes('appointment') || text.includes('schedule') || text.includes('visit') || text.includes('consultation')) {
      return {
        text: `I'd be delighted to arrange your visit with our doctors! You can select your preferred dentist, procedure, and time slot right here.`,
        actionButton: {
          label: 'Open Appointment Scheduler',
          action: 'book' as const,
        }
      };
    }

    // 6. Hours & Location
    if (text.includes('hour') || text.includes('time') || text.includes('open') || text.includes('location') || text.includes('where')) {
      return {
        text: `${clinic.name} is located at ${clinic.address}, ${clinic.suite}, ${clinic.city}, ${clinic.state}. We are open Mon–Fri (${clinic.hours.monFri}) and Saturday (${clinic.hours.saturday}), with 24/7 on-call emergency dental support.`,
      };
    }

    // Default polite clinical intelligence reply
    return {
      text: `Thank you for your inquiry regarding "${userText}". Our clinical team specializes in modern 3D biological dentistry, painless anesthesia, and bespoke aesthetics. Would you like me to book a consultation or check insurance coverage for you?`,
      actionButton: {
        label: 'Schedule a Consultation',
        action: 'book' as const,
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateAiReply(query);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyData.text,
        timestamp: 'Just now',
        isEmergency: replyData.isEmergency,
        actionButton: replyData.actionButton,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:w-[460px] h-[94vh] sm:h-[650px] bg-[#0E1614] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden relative text-[#F9FAF9]">
        {/* Header */}
        <div className="bg-[#0A110F] text-white p-4 sm:p-5 flex items-center justify-between relative z-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shadow-glow-teal">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-[#0A110F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-normal text-base text-[#F2E9DC]">Ava Clinical AI</h3>
                <span className="text-[10px] bg-teal-500/15 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                  Online 24/7
                </span>
              </div>
              <p className="text-xs text-[#A8B8B4]">{clinic.name} Concierge</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Voice Mode Toggle */}
            <button
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              title={isVoiceMode ? 'Switch to text chat' : 'Switch to voice mode'}
              className={`p-2 rounded-xl transition-all ${
                isVoiceMode ? 'bg-teal-400 text-teal-950 shadow-glow-teal font-bold' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Mode Simulation Screen */}
        {isVoiceMode ? (
          <div className="flex-1 bg-[#0A110F] text-white p-6 flex flex-col items-center justify-between">
            <div className="text-center pt-8">
              <span className="text-xs font-mono text-teal-400 font-medium tracking-wider">
                Voice Assistant Mode
              </span>
              <h4 className="text-xl font-serif font-normal text-[#F2E9DC] mt-1">Speak Naturally with Ava</h4>
              <p className="text-xs text-[#A8B8B4] max-w-xs mx-auto mt-2">
                Ask about dental procedures, emergency triage, or clinic schedule.
              </p>
            </div>

            {/* Audio Waveform Visualization */}
            <div className="flex items-center justify-center gap-1.5 h-32 my-6">
              <div className="w-1.5 bg-teal-400 rounded-full wave-bar-1" />
              <div className="w-1.5 bg-teal-300 rounded-full wave-bar-2" />
              <div className="w-1.5 bg-teal-500 rounded-full wave-bar-3" />
              <div className="w-1.5 bg-[#F2E9DC] rounded-full wave-bar-4" />
              <div className="w-1.5 bg-teal-400 rounded-full wave-bar-5" />
              <div className="w-1.5 bg-teal-300 rounded-full wave-bar-2" />
              <div className="w-1.5 bg-[#F2E9DC] rounded-full wave-bar-1" />
            </div>

            <div className="w-full text-center pb-6 space-y-4">
              <button
                onClick={() => setIsListening(!isListening)}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50'
                    : 'btn-tactile-primary'
                }`}
              >
                <Mic className="w-7 h-7 text-teal-950" />
              </button>
              <p className="text-xs text-[#A8B8B4]">
                {isListening ? 'Listening to your voice...' : 'Tap microphone to speak'}
              </p>
              <button
                onClick={() => setIsVoiceMode(false)}
                className="text-xs text-teal-400 hover:underline"
              >
                Return to Text Chat
              </button>
            </div>
          </div>
        ) : (
          /* Normal Text Chat Screen */
          <>
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A110F]/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-teal-400 text-teal-950 rounded-br-none font-medium'
                        : msg.isEmergency
                        ? 'bg-rose-950/40 text-rose-200 border border-rose-500/30 rounded-bl-none'
                        : 'bg-[#131F1C] text-[#F2E9DC] border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}

                    {/* Contextual Action Buttons */}
                    {msg.actionButton && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                        {msg.actionButton.action === 'book' || msg.actionButton.action === 'emergency' ? (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenBooking();
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              msg.actionButton.action === 'emergency'
                                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                                : 'btn-tactile-primary'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5 text-teal-950" />
                            <span>{msg.actionButton.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-teal-950" />
                          </button>
                        ) : null}

                        {msg.isEmergency && (
                          <a
                            href={`tel:${clinic.emergencyPhone}`}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0A110F] text-white flex items-center gap-1.5 hover:bg-white/10 border border-white/10"
                          >
                            <Phone className="w-3.5 h-3.5 text-teal-400" />
                            Call Emergency: {clinic.emergencyPhone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-white/40 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[#A8B8B4] text-xs bg-[#131F1C] p-3 rounded-2xl border border-white/10 w-fit">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Ava is consulting clinical database...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Carousel */}
            <div className="p-2.5 bg-[#0A110F] border-t border-white/10 overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1.5 bg-[#131F1C] hover:bg-white/10 text-[#A8B8B4] hover:text-teal-300 text-[11px] font-medium rounded-full border border-white/10 shrink-0 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0A110F] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about treatments, pricing, emergency..."
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#131F1C] text-white placeholder-white/40 focus:outline-none focus:border-teal-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="btn-tactile-primary p-2.5 rounded-xl disabled:opacity-40"
              >
                <Send className="w-4 h-4 text-teal-950" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
