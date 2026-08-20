import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BrandDetailModal({ brand, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, []);

  if (!brand) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.18, ease: 'easeIn' } }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1020px] max-h-[90vh] rounded-3xl bg-[#0b0d14] border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col lg:flex-row will-change-transform"
      >
        {/* Top-Right Circular Close 'X' Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Left / Top: Vehicle Image Presentation */}
        <div className="w-full lg:w-[46%] min-h-[220px] sm:min-h-[280px] lg:min-h-[420px] p-6 lg:p-8 flex items-center justify-center relative bg-gradient-to-b lg:bg-gradient-to-r from-white/[0.03] to-transparent shrink-0">
          <div className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-stylein-red/15 blur-3xl pointer-events-none" />
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full max-h-[240px] sm:max-h-[300px] lg:max-h-[360px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] select-none z-10"
          />
        </div>

        {/* Right / Bottom: Detailed Brand Specifications & Information */}
        <div className="w-full lg:w-[54%] p-6 sm:p-8 lg:p-10 flex flex-col justify-start overflow-y-auto max-h-[55vh] lg:max-h-[85vh]">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight leading-[1.12]">
            {brand.name}
          </h2>

          <p className="text-stylein-red text-[0.78rem] sm:text-[0.84rem] font-bold uppercase tracking-wider mt-1.5">
            {brand.tagline}
          </p>

          <p className="text-neutral-300 text-[0.84rem] sm:text-[0.88rem] leading-relaxed mt-4 font-body">
            {brand.description}
          </p>

          {/* Bespoke Care Highlights */}
          {brand.highlights && brand.highlights.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-stylein-red" />
                <span className="font-heading text-xs uppercase tracking-widest text-neutral-400 font-bold">
                  Bespoke Care Highlights
                </span>
              </div>
              {brand.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[0.78rem] sm:text-[0.82rem] text-neutral-300">
                  <CheckCircle2 size={14} className="text-stylein-red shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
