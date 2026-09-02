import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { optimizeCloudinary } from '../../utils/imageOptimizer';

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BrandCard({ brand, index, onSelect }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  if (!brand) return null;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -20px 0px' }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(brand)}
      className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-5.5 flex flex-col justify-start bg-[#0b0d14] border border-white/[0.08] hover:border-white/[0.28] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.98)] cursor-pointer select-none will-change-transform"
    >
      {/* Top Bar with Affordance Chevron */}
      <div className="flex items-center justify-end w-full mb-1">
        <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/[0.04] group-hover:bg-stylein-red/15 border border-white/10 group-hover:border-stylein-red/30 flex items-center justify-center transition-colors duration-200">
          <ChevronRight
            size={14}
            className="text-neutral-400 group-hover:text-stylein-red group-hover:translate-x-0.5 transition-all duration-200"
          />
        </div>
      </div>

      {/* Prominent Vehicle Centerpiece Image */}
      <div className="w-full h-42 sm:h-48 md:h-50 flex items-center justify-center my-0.5 relative overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 rounded-2xl bg-white/[0.02] animate-pulse" />
        )}
        <img
          src={optimizeCloudinary(brand.image, 450)}
          alt={brand.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-all duration-300 select-none ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>

      {/* Brand Name & Tagline */}
      <div className="mt-2 text-left">
        <h3 className="font-heading text-lg sm:text-xl md:text-[1.35rem] font-extrabold text-white tracking-tight uppercase group-hover:text-white transition-colors duration-200 leading-tight">
          {brand.name}
        </h3>
        <p className="text-stylein-red text-[0.7rem] sm:text-[0.74rem] font-bold tracking-wider uppercase mt-0.5 leading-snug">
          {brand.tagline}
        </p>
      </div>
    </motion.div>
  );
}
