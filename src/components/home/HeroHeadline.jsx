import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DYNAMIC_PHRASES } from '../../constants/heroData';

export default function HeroHeadline({ isReady, isFirstVisit = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isReady) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isReady]);

  const currentPhrase = DYNAMIC_PHRASES[currentIndex];

  return (
    <div className="text-center max-w-[880px] mx-auto select-none">
      <h1 className="font-heading tracking-tight mb-8">
        {/* Line 1: Instant entrance on revisit, silky smooth on first load */}
        <motion.span
          initial={isFirstVisit ? { opacity: 0, y: 45, filter: 'blur(12px)' } : false}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 45, filter: 'blur(12px)' }}
          transition={isFirstVisit ? { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="block font-bold text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[1.18] bg-gradient-to-b from-white via-white to-neutral-200 bg-clip-text text-transparent"
        >
          On-demand luxury care for
        </motion.span>

        {/* Line 2: Animated Dynamic Phrase */}
        <motion.span
          initial={isFirstVisit ? { opacity: 0, y: 50, scale: 0.92, filter: 'blur(12px)' } : false}
          animate={isReady ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 50, scale: 0.92, filter: 'blur(12px)' }}
          transition={isFirstVisit ? { duration: 0.95, delay: 0.55, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="block font-extrabold text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.18] text-[#E50914] min-h-[1.25em] mt-1 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: 42, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -38, opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {currentPhrase}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </h1>
    </div>
  );
}
