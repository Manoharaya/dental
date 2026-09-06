import React, { useState } from 'react';
import { FAQS_DATA, BLOG_POSTS } from '../../config/clinicData';
import { HelpCircle, ChevronDown, Search, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface FaqAndEducationSectionProps {
  onBookConsultation: () => void;
}

export const FaqAndEducationSection: React.FC<FaqAndEducationSectionProps> = ({
  onBookConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section className="py-24 bg-[#F5F1EA] relative overflow-hidden border-t border-[#1B2B27]/08">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#3E8E7E]" />
            Patient Guidance & Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight">
            Frequently Asked Questions & Clinical Insights
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536963]">
            Clear, transparent answers to empower your clinical decisions and smile care journey.
          </p>
        </div>

        {/* Grid: Searchable FAQ Accordion on Left, Educational Blog Guides on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Left: Searchable FAQ Accordion */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#1B2B27]/08 shadow-spa">
            <div className="flex items-center justify-between pb-4 border-b border-[#1B2B27]/08 mb-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#3E8E7E]" />
                <h3 className="font-serif font-normal text-lg text-[#1B2B27]">
                  Search Common Inquiries
                </h3>
              </div>
              <span className="text-xs text-[#536963]">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {/* FAQ Search Bar */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-[#536963]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics: insurance, root canals, whitening, cost..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1B2B27]/12 bg-[#FBFAF7] text-xs sm:text-sm text-[#1B2B27] placeholder-[#536963]/60 focus:outline-none focus:border-[#3E8E7E]"
              />
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-[#1B2B27]/08 rounded-2xl overflow-hidden transition-colors bg-[#FBFAF7]/80"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-white transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-[#1B2B27]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#536963] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#3E8E7E]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#536963] leading-relaxed border-t border-[#1B2B27]/05 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-[#536963] text-xs">
                  No matching questions found. Try asking our 24/7 AI Dental Receptionist!
                </div>
              )}
            </div>
          </div>

          {/* Right: Curated Educational Articles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-normal text-lg text-[#1B2B27] mb-4">
              Featured Clinical Articles
            </h3>

            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#1B2B27]/08 hover:border-[#3E8E7E]/30 transition-all flex flex-col sm:flex-row shadow-spa hover:-translate-y-0.5"
              >
                <div className="sm:w-36 h-36 shrink-0 bg-[#FBFAF7]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-[#536963] mb-1">
                      <span className="text-[#3E8E7E] font-medium">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h4 className="font-medium text-xs sm:text-sm text-[#1B2B27] line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-[#536963] line-clamp-2 mt-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <button
                    onClick={onBookConsultation}
                    className="text-[11px] font-medium text-[#3E8E7E] hover:text-[#327366] flex items-center gap-1 mt-2 pt-2 border-t border-[#1B2B27]/06"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Ask AI Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#3E8E7E]/25 text-[#1B2B27] flex items-center justify-between shadow-spa">
              <div>
                <strong className="text-xs font-semibold text-[#1B2B27] block">Have a unique personal question?</strong>
                <span className="text-[11px] text-[#536963]">Our AI concierge answers immediately 24/7.</span>
              </div>
              <button
                onClick={onBookConsultation}
                className="btn-tactile-primary px-3.5 py-2 text-xs font-semibold shrink-0 ml-3"
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
