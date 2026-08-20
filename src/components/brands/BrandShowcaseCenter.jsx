import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandShowcaseCenter({ brand, activeIndex, totalBrands, onPrev, onNext, onSelect }) {
  if (!brand) return null;

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold && onNext) {
      onNext();
    } else if (info.offset.x > swipeThreshold && onPrev) {
      onPrev();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative my-1 sm:my-2 lg:my-0 min-h-[190px] sm:min-h-[240px] lg:min-h-[290px] select-none">
      {/* Pulsing Cinematic Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full blur-[90px] bg-[#e50914]/20 pointer-events-none"
      />

      {/* Vehicle Image Container with Elastic Touch Drag Swipe */}
      <div className="relative w-full max-w-[320px] sm:max-w-[390px] lg:max-w-[460px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing">
        <AnimatePresence mode="wait">
          <motion.div
            key={`brand-img-${activeIndex}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.88, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.92, y: -18, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex items-center justify-center"
          >
            <motion.img
              src={brand.image}
              alt={brand.name}
              draggable={false}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-full h-auto max-h-[210px] sm:max-h-[270px] lg:max-h-[305px] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(229,9,20,0.22)] select-none pointer-events-auto"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Progress Indicator Dots with Spring Layout */}
      {totalBrands && onSelect && (
        <div className="flex lg:hidden items-center gap-1.5 mt-3 z-10">
          {Array.from({ length: totalBrands }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Jump to brand ${i + 1}`}
              layout
              animate={{
                width: i === activeIndex ? 22 : 6,
                backgroundColor: i === activeIndex ? '#e50914' : 'rgba(255,255,255,0.25)',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="h-1.5 rounded-full cursor-pointer border-none p-0"
              style={{
                boxShadow: i === activeIndex ? '0 0 8px rgba(229,9,20,0.8)' : 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
