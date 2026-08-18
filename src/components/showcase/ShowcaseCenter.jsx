import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShowcaseCenter({ collection, activeIndex }) {
  return (
    <div className="w-full lg:w-[48%] flex items-center justify-center relative my-4 lg:my-0">
      {/* Subtle Ambient Back-Glow */}
      <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full blur-[100px] bg-[#e50914]/10 opacity-35 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`car-${activeIndex}`}
          initial={{ x: 30, opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ x: -30, opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[540px] aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-[#07080a]/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.95)] group"
        >
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark Glassy Gradient Blend to Pure Black */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-85 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/60 via-transparent to-[#050507]/60 pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
