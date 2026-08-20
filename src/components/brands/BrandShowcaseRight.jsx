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
          initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 sm:gap-2.5 w-full max-w-sm items-center lg:items-end"
        >
          <div className="flex items-center gap-1.5 mb-0.5 self-center lg:self-end">
            <ShieldCheck size={14} className="text-stylein-red" />
            <span className="font-heading text-[0.68rem] uppercase tracking-widest text-neutral-400 font-bold">
              Bespoke Care Highlights
            </span>
          </div>

          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.06)' }}
              className="w-full p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md transition-all text-left cursor-default"
            >
              <p className="font-body text-[0.72rem] sm:text-[0.76rem] text-neutral-300 leading-snug">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots and Next/Prev Controls with Spring Physics */}
      <div className="flex items-center gap-2.5 mt-3.5 sm:mt-4 self-center lg:self-end">
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous Brand"
          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
        >
          <ChevronLeft size={14} />
        </motion.button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalBrands }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Jump to brand ${i + 1}`}
              layout
              animate={{
                width: i === activeIndex ? 24 : 7,
                backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.2)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="h-1.5 rounded-full cursor-pointer border-none p-0"
              style={{
                boxShadow: i === activeIndex ? '0 0 8px rgba(229,9,20,0.8)' : 'none',
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next Brand"
          className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
        >
          <ChevronRight size={14} />
        </motion.button>
      </div>
    </div>
  );
}
