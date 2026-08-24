import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FAQPageHero() {
  return (
    <section className="relative w-full pt-26 sm:pt-30 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-12 overflow-hidden bg-[#040406] text-center">
      {/* Red Ambient Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[300px] sm:h-[400px] rounded-full blur-[160px] bg-stylein-red/10 pointer-events-none z-0" />

      {/* Subtle Grid Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[860px] mx-auto flex flex-col items-center"
      >
        {/* Category Pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-[0.7rem] sm:text-xs font-bold tracking-widest uppercase mb-4 font-heading"
        >
          <HelpCircle size={13} className="text-stylein-red" />
          <span>HELP & KNOWLEDGE BASE</span>
        </motion.div>

        {/* Main Heading with Luxury Red Gradient */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold uppercase text-white tracking-tight leading-[1.12] max-w-3xl"
        >
          Frequently Asked{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
            Questions
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mt-3.5 sm:mt-4.5"
        >
          Everything you need to know about our premium on-demand automotive services, 20-minute roadside rescue, and mobile auto care across the UAE.
        </motion.p>
      </motion.div>
    </section>
  );
}
