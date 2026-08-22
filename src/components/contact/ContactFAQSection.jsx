import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CONTACT_FAQS_DATA } from '../../constants/contactData';

export default function ContactFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 bg-[#040406] border-t border-white/[0.04] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[960px] mx-auto text-left"
      >
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/25 text-stylein-red text-[0.68rem] font-bold tracking-widest uppercase font-heading mb-3">
            <HelpCircle size={12} />
            <span>GOT QUESTIONS?</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
              Questions
            </span>
          </h2>
        </div>

        {/* Minimal Accordion List - Single open only */}
        <div className="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {CONTACT_FAQS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={item.id} className="py-4 sm:py-5">
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer select-none bg-transparent border-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-white tracking-tight">
                    {item.question}
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
                      {item.answer}
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
