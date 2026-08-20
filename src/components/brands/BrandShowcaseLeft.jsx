import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function BrandShowcaseLeft({ brand, activeIndex, totalBrands }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!brand) return null;
  const displayNumber = String(activeIndex + 1).padStart(2, '0');

  return (
    <div className="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={`brand-left-${activeIndex}`}
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 sm:gap-2.5 items-center lg:items-start w-full"
        >
          {/* Watermark Index Number (Desktop only) with smooth scale */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block font-heading text-4xl sm:text-5xl lg:text-5xl font-black leading-none select-none tracking-tight text-stylein-red/25"
          >
            {displayNumber}
          </motion.span>

          {/* Brand Name */}
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold leading-[1.12] uppercase text-white tracking-tight"
          >
            {brand.name}
          </motion.h3>

          {/* Red Tagline */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.72rem] sm:text-[0.76rem] font-bold tracking-wider uppercase text-stylein-red font-body"
          >
            {brand.tagline}
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-sm font-body flex flex-col items-center lg:items-start"
          >
            <p className={`text-neutral-300/85 text-[0.78rem] sm:text-[0.82rem] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2 lg:line-clamp-none'}`}>
              {brand.description}
            </p>
            <button
              onClick={() => setIsExpanded((p) => !p)}
              className="lg:hidden text-stylein-red text-[0.74rem] font-bold mt-1 bg-transparent border-none p-0 cursor-pointer inline-flex items-center gap-1 hover:underline active:scale-95 transition-transform"
            >
              <span>{isExpanded ? 'Show less' : 'View more...'}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>

          {/* Explore All Brands CTA Button with Hover & Tap Spring */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-2.5 flex items-center justify-center lg:justify-start gap-3 flex-wrap w-full"
          >
            <motion.a
              href="/brands"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.8rem] font-semibold text-white tracking-wide no-underline bg-[#0c0e14]/80 backdrop-blur-xl border border-white/10 hover:border-stylein-red/70 hover:bg-[#12151e] hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] active:scale-95 transition-colors duration-300 group cursor-pointer"
            >
              <span>Explore All Brands</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1 text-white/90 group-hover:text-stylein-red"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
