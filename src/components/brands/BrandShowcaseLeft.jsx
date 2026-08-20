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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.22, ease: 'easeIn' } }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 sm:gap-2.5 items-center lg:items-start w-full will-change-transform"
        >
          {/* Watermark Index Number (Desktop only) */}
          <span className="hidden lg:block font-heading text-4xl sm:text-5xl lg:text-5xl font-black leading-none select-none tracking-tight text-stylein-red/25">
            {displayNumber}
          </span>

          {/* Brand Name */}
          <h3 className="font-heading text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold leading-[1.12] uppercase text-white tracking-tight">
            {brand.name}
          </h3>

          {/* Red Tagline */}
          <p className="text-[0.72rem] sm:text-[0.76rem] font-bold tracking-wider uppercase text-stylein-red font-body">
            {brand.tagline}
          </p>

          {/* Description */}
          <div className="max-w-sm font-body flex flex-col items-center lg:items-start">
            <p className={`text-neutral-300/85 text-[0.78rem] sm:text-[0.82rem] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2 lg:line-clamp-none'}`}>
              {brand.description}
            </p>
            <button
              onClick={() => setIsExpanded((p) => !p)}
              className="lg:hidden text-neutral-400 hover:text-neutral-200 text-[0.74rem] font-medium mt-1 bg-transparent border-none p-0 cursor-pointer inline-flex items-center gap-1 hover:underline active:scale-95 transition-colors"
            >
              <span>{isExpanded ? 'Show less' : 'View more...'}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-neutral-400`} />
            </button>
          </div>

          {/* Explore All Brands CTA Button */}
          <div className="pt-2.5 flex items-center justify-center lg:justify-start gap-3 flex-wrap w-full">
            <a
              href="/brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.8rem] font-semibold text-white tracking-wide no-underline bg-[#0c0e14]/80 backdrop-blur-xl border border-white/10 hover:border-stylein-red/70 hover:bg-[#12151e] hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span>Explore All Brands</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1 text-white/90 group-hover:text-stylein-red"
              />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
