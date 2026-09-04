import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';
import ReviewsCarousel from './ReviewsCarousel';

export default function TestimonialsSection() {
  return (
    <section className="w-full py-10 sm:py-14 bg-[#040406] relative z-15 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[140px] bg-stylein-red/5 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center text-center relative z-10">
        {/* Section Header with Staggered Framer Motion */}
        <div className="flex flex-col items-center gap-2 mb-8 sm:mb-10 max-w-xl">
          {/* Category Pill with Drop-Down Entrance */}
          <motion.div
            initial={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 text-stylein-red text-[0.66rem] font-bold tracking-widest uppercase font-heading w-fit"
          >
            <MessageSquareQuote size={12} className="text-stylein-red" />
            <span>CLIENT EXPERIENCES</span>
          </motion.div>

          {/* Main Title with Bottom-to-Top Optical Blur Reveal */}
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            What Our Customers Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">About Our Services.</span>
          </motion.h2>
        </div>

        {/* Lightweight Infinite Carousel with Smooth Rising Motion */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.15, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ReviewsCarousel />
        </motion.div>
      </div>
    </section>
  );
}
