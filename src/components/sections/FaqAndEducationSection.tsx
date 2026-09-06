import React, { useState } from 'react';
import { FAQS_DATA, BLOG_POSTS } from '../../config/clinicData';
import { FAQItem, BlogPost } from '../../types/clinic';
import { HelpCircle, ChevronDown, Search, BookOpen, Clock, ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface FaqAndEducationSectionProps {
  onBookConsultation: () => void;
}

export const FaqAndEducationSection: React.FC<FaqAndEducationSectionProps> = ({
  onBookConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');

  const faqCategories = ['all', 'Appointments & Booking', 'Cost & Financing', 'Insurance', 'Pain & Comfort', 'Treatments'];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            Patient Guidance & Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-luxury-slate tracking-tight">
            Frequently Asked Questions & Dental Insights
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Clear, transparent answers to empower your clinical decisions and smile care journey.
          </p>
        </div>

        {/* Grid: Searchable FAQ Accordion on Left, Educational Blog Guides on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left: Searchable FAQ Accordion */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-luxury">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-500" />
                <h3 className="font-display font-bold text-lg text-luxury-slate">
                  Search Common Inquiries
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {/* FAQ Search Bar */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics: insurance, root canals, whitening, cost..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-brand-500' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No matching questions found. Try asking our 24/7 AI Dental Receptionist!
                </div>
              )}
            </div>
          </div>

          {/* Right: Curated Educational Articles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-bold text-lg text-luxury-slate mb-4">
              Featured Clinical Articles
            </h3>

            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row"
              >
                <div className="sm:w-36 h-36 shrink-0 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span className="text-brand-600 font-semibold">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <button
                    onClick={onBookConsultation}
                    className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 mt-2 pt-2 border-t border-slate-100"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Ask AI Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 text-white shadow-glow flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold block">Have a unique personal question?</strong>
                <span className="text-[11px] text-white/90">Our AI assistant answers immediately 24/7.</span>
              </div>
              <button
                onClick={onBookConsultation}
                className="px-3.5 py-2 rounded-xl bg-white text-brand-700 font-semibold text-xs shadow-md shrink-0 hover:bg-slate-50"
              >
                Ask Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
