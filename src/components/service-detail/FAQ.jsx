import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ({ questions = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!questions || questions.length === 0) return null;

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative w-full py-14 sm:py-20 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04]">
      <div className="w-full max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-stylein-red text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase mb-3 font-heading">
            <HelpCircle size={12} />
            <span>CLARITY & DETAILS</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-[1.14]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3.5">
          {questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            const q = item.questionName || item.question || item.title || `Question ${idx + 1}`;
            const a = item.questionValue || item.answer || item.description || '';

            return (
              <div
                key={item._id || idx}
                className={`rounded-[22px] bg-[#090C12] border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-stylein-red/40 bg-[#0c1018]' : 'border-white/[0.06] hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none bg-transparent border-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-stylein-red/20 text-stylein-red' : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && a && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-neutral-300/80 text-xs sm:text-sm font-body leading-relaxed border-t border-white/[0.04] pt-3">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
