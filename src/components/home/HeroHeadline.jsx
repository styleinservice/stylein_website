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
        {/* Line 1: Pure Natural Text with Framer Motion Optical Entrance */}
        <motion.span
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="block font-bold text-[clamp(2.3rem,4.6vw,3.8rem)] leading-[1.18] bg-gradient-to-b from-white via-white to-neutral-200 bg-clip-text text-transparent"
        >
          On-demand luxury care for
        </motion.span>

        {/* Line 2: Framer Motion Animated Dynamic Phrase */}
        <motion.span
          initial={{ opacity: 0, y: 35, scale: 0.94 }}
          animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.94 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block font-extrabold text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.18] text-[#E50914] min-h-[1.25em] mt-1 relative overflow-hidden [perspective:800px]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: 35, opacity: 0, rotateX: -25 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -35, opacity: 0, rotateX: 25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
