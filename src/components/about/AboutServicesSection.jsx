import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchHomeServices } from '../../store/services/servicesSlice';
import AboutServiceCard from './AboutServiceCard';

export default function AboutServicesSection() {
  const dispatch = useDispatch();
  const { items: services } = useSelector((state) => state.services);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchHomeServices());
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [services]);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#040406] text-white overflow-hidden border-t border-white/[0.04]">
      {/* Section Header with Left/Right Navigation Controls */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 lg:px-10 w-full mb-6 sm:mb-8">
        <div className="flex items-end justify-between gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-left"
          >
            <span className="font-heading text-[0.74rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-neutral-400 mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] font-bold text-white tracking-tight leading-[1.16] uppercase">
              Services We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-stylein-red font-bold">
                Deliver
              </span>
            </h2>
            <p className="font-body text-neutral-300/80 text-xs sm:text-[0.88rem] lg:text-[0.92rem] leading-relaxed max-w-lg mt-2">
              Professional automotive solutions designed to keep your vehicle protected, maintained, and performing at its best.
            </p>
          </motion.div>

          {/* Left / Right Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2 select-none shrink-0 pb-1">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-neutral-400 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Showcase */}
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3.5 sm:gap-4.5 overflow-x-auto overflow-y-hidden pb-6 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full"
        >
          {services && services.length > 0 ? (
            services.map((service, idx) => (
              <AboutServiceCard key={service.id || idx} service={service} index={idx} />
            ))
          ) : (
            <div className="text-neutral-500 text-xs py-4">Loading services...</div>
          )}
          <div className="w-5 sm:w-6 shrink-0 select-none pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
