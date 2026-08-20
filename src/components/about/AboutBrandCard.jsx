import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 15 },
  visible: (idx) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: idx * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AboutBrandCard({ brand, index }) {
  if (!brand) return null;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative min-w-[220px] max-w-[245px] sm:min-w-[250px] sm:max-w-[275px] h-[260px] sm:h-[285px] rounded-[24px] p-5 flex flex-col justify-between bg-gradient-to-b from-[#0e111a] via-[#090b12] to-[#05060a] border border-white/[0.08] hover:border-stylein-red/35 shadow-[0_12px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.15)] shrink-0 snap-start select-none cursor-pointer overflow-hidden will-change-transform"
    >
      {/* Ambient Top Glow on Hover */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-stylein-red/0 group-hover:bg-stylein-red/15 blur-2xl transition-all duration-500 pointer-events-none" />

      {/* Top Header: Brand Name & Minimal Index */}
      <div className="flex items-start justify-between w-full relative z-10">
        <div className="flex flex-col text-left">
          <h3 className="font-heading text-[1.12rem] sm:text-[1.22rem] font-bold text-white tracking-tight uppercase group-hover:text-white leading-tight">
            {brand.name}
          </h3>
          {brand.tagline && (
            <p className="text-stylein-red text-[0.68rem] sm:text-[0.72rem] font-bold tracking-wider uppercase mt-0.5 line-clamp-1">
              {brand.tagline}
            </p>
          )}
        </div>
        <span className="font-heading text-[0.72rem] font-bold text-white/20 group-hover:text-stylein-red/60 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Floating Vehicle Centerpiece with Perspective Zoom */}
      <div className="w-full h-32 sm:h-36 relative flex items-center justify-center my-auto z-10">
        {brand.image ? (
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)] group-hover:scale-110 transition-transform duration-500 ease-out select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="text-neutral-600 font-heading text-xs uppercase">{brand.name}</div>
        )}
      </div>

      {/* Bottom Subtle Studio Pedestal Reflection Line */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 group-hover:via-stylein-red/40 to-transparent transition-colors duration-300" />
      </div>
    </motion.div>
  );
}
