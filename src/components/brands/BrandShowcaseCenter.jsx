import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeCloudinary } from '../../utils/imageOptimizer';

export default function BrandShowcaseCenter({ brand, activeIndex, totalBrands, onPrev, onNext, onSelect }) {
  if (!brand) return null;

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 30;
    if (info.offset.x < -swipeThreshold && onNext) {
      onNext();
    } else if (info.offset.x > swipeThreshold && onPrev) {
      onPrev();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative my-1 sm:my-2 lg:my-0 min-h-[190px] sm:min-h-[240px] lg:min-h-[290px] select-none">
      {/* Subtle Static Ambient Glow for Max Performance */}
      <div className="absolute w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full blur-[90px] bg-[#e50914]/15 pointer-events-none" />

      {/* Vehicle Image Container with Touch Drag Swipe */}
      <div className="relative w-full max-w-[320px] sm:max-w-[390px] lg:max-w-[460px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing">
        <AnimatePresence mode="wait">
          <motion.div
            key={`brand-img-${activeIndex}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex items-center justify-center will-change-transform"
          >
            <img
              src={optimizeCloudinary(brand.image, 500)}
              alt={brand.name}
              draggable={false}
              className="w-full h-auto max-h-[210px] sm:max-h-[270px] lg:max-h-[305px] object-contain drop-shadow-[0_16px_35px_rgba(0,0,0,0.95)] select-none pointer-events-auto transition-transform duration-300 hover:scale-[1.03]"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Progress Indicator Dots */}
      {totalBrands && onSelect && (
        <div className="flex lg:hidden items-center gap-1.5 mt-3 z-10">
          {Array.from({ length: totalBrands }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Jump to brand ${i + 1}`}
              className="h-1.5 rounded-full cursor-pointer border-none p-0 transition-all duration-300"
              style={{
                width: i === activeIndex ? '22px' : '6px',
                backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.25)',
                boxShadow: i === activeIndex ? '0 0 8px rgba(229,9,20,0.8)' : 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
