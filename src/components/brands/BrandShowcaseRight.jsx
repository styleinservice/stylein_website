import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export default function BrandShowcaseRight({ brand, activeIndex, totalBrands, onSelect, onPrev, onNext }) {
  if (!brand) return null;
  const highlights = brand.highlights || [];

  return (
    <div className="w-full flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
      <AnimatePresence mode="wait">
        <motion.div
          key={`brand-right-${activeIndex}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' } }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2 sm:gap-2.5 w-full max-w-sm items-center lg:items-end will-change-transform"
        >
          <div className="flex items-center gap-1.5 mb-0.5 self-center lg:self-end">
            <ShieldCheck size={14} className="text-stylein-red" />
            <span className="font-heading text-[0.68rem] uppercase tracking-widest text-neutral-400 font-bold">
              Bespoke Care Highlights
            </span>
          </div>

          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="w-full p-2 sm:p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] backdrop-blur-md transition-all text-left cursor-default"
            >
              <p className="font-body text-[0.72rem] sm:text-[0.76rem] text-neutral-300 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots and Next/Prev Controls */}
      <div className="flex items-center gap-2.5 mt-3.5 sm:mt-4 self-center lg:self-end">
        <button
          onClick={onPrev}
          aria-label="Previous Brand"
          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalBrands }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Jump to brand ${i + 1}`}
              className="h-1.5 rounded-full cursor-pointer border-none p-0 transition-all duration-300"
              style={{
                width: i === activeIndex ? '24px' : '7px',
                backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.2)',
                boxShadow: i === activeIndex ? '0 0 8px rgba(229,9,20,0.8)' : 'none',
              }}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          aria-label="Next Brand"
          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
