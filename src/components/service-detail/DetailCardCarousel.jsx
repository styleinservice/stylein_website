import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DetailInteractiveCard from './DetailInteractiveCard';

export default function DetailCardCarousel({ items = [], service }) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [openCardIndex, setOpenCardIndex] = useState(null);

  const cardItems = (Array.isArray(items) && items.length > 0)
    ? items
    : (service?.servicesImages || service?.cards || []);

  const checkScrollable = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowArrows(scrollWidth > clientWidth + 4);
    }
  }, []);

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [checkScrollable, cardItems]);

  if (!cardItems || cardItems.length === 0) return null;

  const handleToggleCard = (idx) => {
    setOpenCardIndex((prev) => (prev === idx ? null : idx));
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-5 sm:py-8 overflow-hidden select-none">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 relative">
        {/* Left Arrow Icon: Hidden on mobile */}
        {showArrows && (
          <button
            onClick={() => handleScroll('left')}
            className="hidden sm:flex absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0a0c14]/90 border border-white/15 hover:border-stylein-red/50 text-white items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:scale-105"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow Icon: Hidden on mobile */}
        {showArrows && (
          <button
            onClick={() => handleScroll('right')}
            className="hidden sm:flex absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0a0c14]/90 border border-white/15 hover:border-stylein-red/50 text-white items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:scale-105"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Card Track: Centered on laptop/desktop, scrollable when overflowing */}
        <div
          ref={scrollRef}
          onScroll={checkScrollable}
          className={`flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-2 sm:px-4 snap-x snap-mandatory ${
            showArrows ? 'justify-start' : 'justify-center'
          }`}
        >
          {cardItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.94, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[280px] max-w-[300px] sm:min-w-[320px] sm:max-w-[340px] shrink-0 snap-start"
            >
              <DetailInteractiveCard
                item={item}
                isControlled={true}
                isOpen={openCardIndex === idx}
                onToggle={() => handleToggleCard(idx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
