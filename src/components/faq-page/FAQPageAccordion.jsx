import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQPageAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-3.5 relative z-10 text-left">
      <AnimatePresence initial={false}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className={`w-full rounded-2xl sm:rounded-[20px] transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? 'bg-[#090b11] border-white/[0.14] shadow-[0_12px_35px_rgba(0,0,0,0.7)]'
                  : 'bg-[#07080d] border-white/[0.06] hover:border-white/12'
              }`}
            >
              {/* Clean Question Header Button */}
              <button
                onClick={() => toggleItem(idx)}
                className="w-full p-4.5 sm:p-5.5 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none select-none group"
                aria-expanded={isOpen}
              >
                <span className="font-heading text-sm sm:text-[0.96rem] md:text-base font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors pr-2">
                  {faq.question}
                </span>

                <div
                  className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-white/[0.08] text-white rotate-180'
                      : 'bg-white/[0.03] text-neutral-400 group-hover:text-white'
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Clean Answer Box */}
              <div
                className={`grid transition-[grid-template-rows,opacity,padding] duration-400 ease-[0.16,1,0.3,1] ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100 px-4.5 sm:px-5.5 pb-4.5 sm:pb-5.5 pt-0'
                    : 'grid-rows-[0fr] opacity-0 px-4.5 sm:px-5.5 pb-0 pt-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-2.5 border-t border-white/[0.05]">
                    <p className="font-body text-neutral-300/85 text-xs sm:text-[0.84rem] leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
