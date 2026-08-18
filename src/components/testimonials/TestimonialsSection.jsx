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
        {/* Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2 mb-6 sm:mb-8 max-w-xl"
        >
          {/* Category Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stylein-red/10 border border-stylein-red/25 w-fit">
            <MessageSquareQuote size={12} className="text-stylein-red" />
            <span className="text-stylein-red text-[0.66rem] font-bold tracking-widest uppercase font-heading">
              CLIENT EXPERIENCES
            </span>
          </div>

          {/* Main Title (Updated for Customer Service Feedback) */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What Our Customers Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-stylein-red">About Our Services.</span>
          </h2>
        </motion.div>

        {/* Lightweight Infinite Carousel */}
        <ReviewsCarousel />
      </div>
    </section>
  );
}
