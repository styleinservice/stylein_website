import React from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="w-full pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 flex flex-col items-center text-center px-4 relative z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[200px] sm:h-[260px] bg-stylein-red/12 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Tag without border or dot */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <span className="text-[0.7rem] sm:text-[0.75rem] font-semibold text-neutral-400 tracking-widest uppercase font-heading">
          Direct Concierge & Support Hub
        </span>
      </motion.div>

      {/* Headline matching About page gradient and uppercase typography */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="font-heading font-bold text-white text-[1.65rem] sm:text-2xl md:text-3xl lg:text-[2.35rem] leading-[1.16] tracking-tight uppercase max-w-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
      >
        Get in Touch with{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
          STYLEIN Automotive.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="text-neutral-300/80 text-xs sm:text-[0.88rem] max-w-lg mt-3 leading-relaxed font-body"
      >
        Need rapid doorstep service, roadside rescue, or a quote in Ajman & across the UAE? Our concierge team is on standby 24/7.
      </motion.p>
    </section>
  );
}
