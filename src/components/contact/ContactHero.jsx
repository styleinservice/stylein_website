import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { CONTACT_HERO_DATA } from '../../constants/contactData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactHero() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full min-h-[84vh] sm:min-h-[88vh] flex items-center justify-center pt-24 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-12 overflow-hidden bg-[#030406]">
      {/* Subtle Luxury Red Ambient Backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] rounded-full blur-[180px] bg-stylein-red/10 pointer-events-none z-0" />

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[880px] mx-auto text-center flex flex-col items-center"
      >
        {/* Category Pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stylein-red/10 border border-stylein-red/30 text-stylein-red text-[0.7rem] sm:text-xs font-bold tracking-widest uppercase mb-4 font-heading"
        >
          <span className="w-2 h-2 rounded-full bg-stylein-red animate-pulse" />
          <span>{CONTACT_HERO_DATA.badge}</span>
        </motion.div>

        {/* Main Heading with Luxury Red Gradient */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold uppercase text-white tracking-tight leading-[1.12] max-w-3xl"
        >
          Premium Vehicle Care,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
            Delivered To Your Doorstep
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mt-4 sm:mt-5"
        >
          {CONTACT_HERO_DATA.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full sm:w-auto"
        >
          <a
            href="#contact-form"
            onClick={handleScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white text-xs sm:text-sm font-bold tracking-wider uppercase font-heading shadow-[0_6px_25px_rgba(229,9,20,0.45)] hover:shadow-[0_8px_30px_rgba(229,9,20,0.65)] hover:scale-103 active:scale-95 transition-all duration-300 no-underline cursor-pointer group"
          >
            <span>Book Service</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://wa.me/971507895346?text=Hello%20STYLEIN%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 hover:border-emerald-500/50 text-white text-xs sm:text-sm font-semibold tracking-wide font-heading transition-all duration-300 no-underline cursor-pointer group"
          >
            <MessageSquare size={15} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>WhatsApp Us</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
