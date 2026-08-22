import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LifeBuoy, ArrowRight, Phone } from 'lucide-react';

export default function ContactRescueCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-22 px-6 sm:px-10 lg:px-12 bg-gradient-to-b from-[#0c0406] via-[#140508] to-[#040406] border-y border-stylein-red/25 overflow-hidden text-center">
      {/* Dynamic Ambient Emergency Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[180px] bg-stylein-red/20 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[840px] mx-auto flex flex-col items-center"
      >
        {/* Flashing Hazard Icon */}
        <div className="w-14 h-14 rounded-2xl bg-stylein-red/20 border border-stylein-red/40 flex items-center justify-center text-stylein-red mb-5 shadow-[0_0_30px_rgba(229,9,20,0.5)]">
          <LifeBuoy size={28} className="animate-spin-slow" />
        </div>

        <span className="text-[0.74rem] sm:text-xs font-bold text-stylein-red uppercase tracking-widest font-heading mb-2.5">
          24/7 ON-DEMAND ROADSIDE SUPPORT
        </span>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.12]">
          Vehicle{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">
            Emergency?
          </span>
        </h2>

        <p className="font-body text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mt-3.5 sm:mt-4">
          Flat tyre? Dead battery? Sudden roadside breakdown? Our rapid emergency rescue vans reach you in under 30 minutes anywhere in our service areas.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={() => { navigate('/rescue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase font-heading shadow-[0_8px_30px_rgba(229,9,20,0.55)] hover:shadow-[0_12px_40px_rgba(229,9,20,0.8)] hover:scale-103 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <span>Explore Rescue Services</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:+97180078953"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs sm:text-sm font-bold tracking-wide font-heading transition-all duration-300 no-underline cursor-pointer"
          >
            <Phone size={15} className="text-stylein-red" />
            <span>Call 800 STYLEIN</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
