import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LifeBuoy, ArrowRight } from 'lucide-react';

export default function FAQPageRescueBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-10 sm:mt-14 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-[24px] p-6 sm:p-8 bg-gradient-to-r from-[#140608] via-[#1a070a] to-[#0d070a] border border-stylein-red/30 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-[0_15px_40px_rgba(229,9,20,0.2)]"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stylein-red/20 border border-stylein-red/40 flex items-center justify-center text-stylein-red shrink-0 shadow-[0_0_25px_rgba(229,9,20,0.45)]">
            <LifeBuoy size={24} className="animate-spin-slow" />
          </div>
          <div>
            <span className="text-[0.68rem] font-bold text-stylein-red tracking-widest uppercase font-heading block mb-1">
              URGENT ROADSIDE ASSISTANCE
            </span>
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
              Facing A Roadside Breakdown Right Now?
            </h4>
            <p className="font-body text-xs sm:text-sm text-neutral-300/80 leading-relaxed mt-1 max-w-xl">
              An emergency technician will be dispatched directly to your location in under 20-30 minutes for battery, tyre, or roadside assistance.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigate('/rescue');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white text-xs sm:text-sm font-bold tracking-wider uppercase font-heading shadow-[0_6px_25px_rgba(229,9,20,0.5)] hover:shadow-[0_8px_30px_rgba(229,9,20,0.7)] hover:scale-103 active:scale-95 transition-all duration-300 shrink-0 cursor-pointer group"
        >
          <span>Instant Rescue</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
