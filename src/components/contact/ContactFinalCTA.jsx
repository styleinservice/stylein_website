import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';

export default function ContactFinalCTA() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 bg-[#040406] overflow-hidden text-center">
      {/* Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[160px] bg-stylein-red/15 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center"
      >
        <span className="text-[0.72rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2.5">
          ELEVATE YOUR AUTOMOTIVE CARE
        </span>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.14]">
          Ready To Experience{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
            Premium Car Care?
          </span>
        </h2>

        <p className="font-body text-neutral-300/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mt-3.5 sm:mt-4">
          Book your next doorstep service in minutes and let our certified mobile technicians deliver showroom perfection directly to your location.
        </p>

        {/* Dual Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8 w-full sm:w-auto">
          <a
            href="#contact-form"
            onClick={handleScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white text-xs sm:text-sm font-bold tracking-wider uppercase font-heading shadow-[0_6px_25px_rgba(229,9,20,0.45)] hover:shadow-[0_8px_30px_rgba(229,9,20,0.65)] hover:scale-103 active:scale-95 transition-all duration-300 no-underline cursor-pointer group"
          >
            <span>Book Service</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs sm:text-sm font-bold tracking-wide font-heading transition-all duration-300 no-underline cursor-pointer group"
          >
            <Smartphone size={15} className="text-stylein-red group-hover:scale-110 transition-transform" />
            <span>Download App</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
