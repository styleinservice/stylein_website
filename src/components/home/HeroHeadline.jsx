import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DYNAMIC_PHRASES } from '../../constants/heroData';

export default function HeroHeadline({ isReady }) {
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
        {/* Line 1: Instantly painted in DOM for sub-second LCP */}
        <span className="block font-bold text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[1.18] bg-gradient-to-b from-white via-white to-neutral-200 bg-clip-text text-transparent">
          On-demand luxury care for{' '}
        </span>

        {/* Line 2: Animated Dynamic Phrase with Smooth Framer Motion */}
        <span className="block font-extrabold text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.18] text-[#E50914] min-h-[1.25em] mt-1 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentIndex}
              initial={currentIndex === 0 ? false : { y: 35, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {currentPhrase}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
    </div>
  );
}
