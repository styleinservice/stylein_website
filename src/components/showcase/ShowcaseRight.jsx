import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collections } from '../../data/collections';

export default function ShowcaseRight({ collection, activeIndex, onSelect }) {
  return (
    <div className="w-full lg:w-[30%] flex flex-col justify-center items-start lg:items-end order-3 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`right-${activeIndex}`}
          initial={{ x: 25, opacity: 0, filter: 'blur(6px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ x: -25, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:gap-5 w-full lg:w-auto"
        >
          {collection.specs.map((spec) => (
            <div
              key={spec.label}
              className="text-left lg:text-right bg-white/[0.04] lg:bg-transparent p-2.5 lg:p-0 rounded-xl border border-white/5 lg:border-0 backdrop-blur-sm lg:backdrop-blur-none"
            >
              <p className="font-body text-[0.6rem] sm:text-[0.66rem] tracking-[0.14em] uppercase text-white/50 mb-0.5">
                {spec.label}
              </p>
              <p className="font-heading text-xs sm:text-sm lg:text-[0.95rem] font-extrabold text-white">
                {spec.value}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Progress Dash Indicators in Unified Red */}
      <div className="flex items-center gap-1.5 mt-4 lg:mt-6 self-center lg:self-end">
        {collections.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Jump to service ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300 cursor-pointer border-none p-0"
            style={{
              width: i === activeIndex ? '28px' : '10px',
              backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.2)',
              boxShadow: i === activeIndex ? '0 0 8px rgba(229,9,20,0.6)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
