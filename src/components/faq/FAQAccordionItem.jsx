import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordionItem({ item, index, isOpen, onToggle }) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl sm:rounded-2xl border transition-colors duration-300 overflow-hidden text-left ${
        isOpen
          ? 'bg-gradient-to-r from-white/[0.05] via-[#11131c]/90 to-white/[0.03] border-stylein-red/40 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(229,9,20,0.1)]'
          : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/8 hover:border-white/16 shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3.5 p-4 sm:p-4.5 text-left cursor-pointer bg-transparent border-none focus:outline-none group select-none"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Index Counter Pill */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-[0.68rem] font-bold tracking-tight font-heading shrink-0 transition-colors duration-300 ${
              isOpen
                ? 'bg-stylein-red text-white shadow-[0_0_10px_rgba(229,9,20,0.6)]'
                : 'bg-white/8 text-neutral-400 group-hover:text-white group-hover:bg-white/12'
            }`}
          >
            {indexStr}
          </div>

          {/* Question Text */}
          <span
            className={`text-[0.88rem] sm:text-[0.95rem] font-semibold tracking-tight font-heading transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-white'
            }`}
          >
            {item.question}
          </span>
        </div>

        {/* Chevron Indicator */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen
              ? 'bg-stylein-red/20 border-stylein-red/40 text-stylein-red rotate-180'
              : 'bg-white/5 border-white/10 text-neutral-400 group-hover:text-white group-hover:border-white/20'
          }`}
        >
          <ChevronDown size={14} />
        </div>
      </button>

      {/* Accordion Expandable Answer Body - Silky Smooth Non-stuttering Motion */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4.5 sm:px-5 sm:pb-5 pt-0 pl-[44px] sm:pl-[48px]">
              <p className="text-neutral-300 text-[0.82rem] sm:text-[0.86rem] leading-relaxed font-body max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
