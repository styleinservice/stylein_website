import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShowcaseCenter({ collection, activeIndex }) {
  if (!collection) return null;

  return (
    <div className="w-full flex items-center justify-center relative my-1 sm:my-2 lg:my-0">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute w-[220px] sm:w-[360px] h-[220px] sm:h-[360px] rounded-full blur-[90px] bg-[#e50914]/15 opacity-50 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`service-raw-${activeIndex}`}
          initial={{ opacity: 0, x: 35, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 25, scale: 0.96, transition: { duration: 0.24, ease: 'easeIn' } }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[480px] flex items-center justify-center will-change-transform"
        >
          {/* Direct Free-Floating Service Image with Smooth Transitions */}
          <img
            src={collection.image}
            alt={collection.title || collection.name}
            className="w-full h-auto max-h-[250px] sm:max-h-[340px] lg:max-h-[380px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.95),0_0_25px_rgba(229,9,20,0.12)] transition-transform duration-300 hover:scale-105 select-none pointer-events-auto"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
