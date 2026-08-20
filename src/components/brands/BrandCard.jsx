import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.94, filter: 'blur(8px)' },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      delay: (customIndex % 3) * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function BrandCard({ brand, index, onSelect }) {
  if (!brand) return null;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => onSelect(brand)}
      className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-start bg-[#0b0d14] border border-white/[0.08] hover:border-white/[0.28] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.98)] cursor-pointer select-none"
    >
      {/* Top Bar with Affordance Chevron */}
      <div className="flex items-center justify-end w-full mb-2">
        <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-stylein-red/15 border border-white/10 group-hover:border-stylein-red/30 flex items-center justify-center transition-colors">
          <ChevronRight
            size={16}
            className="text-neutral-400 group-hover:text-stylein-red group-hover:translate-x-0.5 transition-all duration-300"
          />
        </div>
      </div>

      {/* Vehicle Image */}
      <div className="w-full h-44 sm:h-52 flex items-center justify-center my-1 relative">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-contain drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500 select-none"
          loading="lazy"
        />
      </div>

      {/* Brand Name & Tagline */}
      <div className="mt-3">
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase group-hover:text-white transition-colors">
          {brand.name}
        </h3>
        <p className="text-stylein-red text-[0.74rem] sm:text-[0.78rem] font-bold tracking-wider uppercase mt-1">
          {brand.tagline}
        </p>
      </div>
    </motion.div>
  );
}
