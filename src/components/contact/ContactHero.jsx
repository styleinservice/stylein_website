import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="w-full pt-32 sm:pt-40 md:pt-44 pb-12 sm:pb-16 flex flex-col items-center text-center px-4 sm:px-6 relative z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[250px] sm:h-[350px] bg-stylein-red/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-5"
      >
        <span className="w-2 h-2 rounded-full bg-[#FF3B47] animate-pulse" />
        <span className="text-[0.76rem] sm:text-[0.82rem] font-semibold text-neutral-300 tracking-wider uppercase font-heading">
          Direct Concierge & Support Hub
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-heading max-w-3xl leading-[1.12]"
      >
        Get in Touch with <br className="hidden sm:inline" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B47] via-[#FF6B6B] to-[#FF3B47]">
          STYLEIN Automotive
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mt-4 leading-relaxed font-body"
      >
        Need rapid doorstep service, emergency roadside assistance, or a corporate fleet quote in Ajman & across the UAE? Our concierge specialists are ready to help 24/7.
      </motion.p>

      {/* Highlight Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.24 }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-7 text-xs sm:text-sm text-neutral-300 font-medium"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Zap size={14} className="text-[#FF3B47]" /> 20-Min Response Time
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <ShieldCheck size={14} className="text-emerald-400" /> Certified Technicians
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <MapPin size={14} className="text-amber-400" /> Ajman, UAE Hub & Doorstep
        </span>
      </motion.div>
    </section>
  );
}
