import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function DetailFAQ({ questions = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!questions || questions.length === 0) return null;

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative w-full py-8 sm:py-12 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[960px] mx-auto text-left"
      >
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-8 sm:mb-10">
          Questions? Answered.
        </h2>

        {/* Minimal Accordion List - Closed by default */}
        <div className="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            const q = item.questionName || item.question || item.title || `Question ${idx + 1}`;
            const a = item.questionValue || item.answer || item.description || '';

            return (
              <div key={item._id || idx} className="py-4 sm:py-5">
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer select-none bg-transparent border-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                    {q}
                  </span>
                  <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-stylein-red' : 'text-neutral-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-400 ease-[0.16,1,0.3,1] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-neutral-300/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
